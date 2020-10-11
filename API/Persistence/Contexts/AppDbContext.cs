using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using netCoreMongoDbApi.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace netCoreMongoDbApi.Persistence.Contexts
{
    public class AppDbContext : IAppDbContext
    {
        private IMongoDatabase _database { get; set; }
        public IClientSessionHandle _session { get; set; }
        public MongoClient _mongoClient { get; set; }
        private readonly List<Func<Task>> _commands;
        private readonly IConfiguration _configuration;
        private readonly IOptions<Settings> _settings;

        public AppDbContext(IConfiguration configuration, IOptions<Settings> settings)
        {
            _configuration = configuration;
            _settings=settings;
            _commands = new List<Func<Task>>();
        }

        public async Task<int> SaveChanges()
        {
            ConfigureMongo();

            using (_session = await _mongoClient.StartSessionAsync())
            {
                _session.StartTransaction();

                var commandTasks = _commands.Select(c => c());

                await Task.WhenAll(commandTasks);

                await _session.CommitTransactionAsync();
            }

            return _commands.Count;
        }

        private void ConfigureMongo()
        {
            if (_mongoClient != null)
                return;

            _mongoClient = new MongoClient(_settings.Value.ConnectionString);
            _database = _mongoClient.GetDatabase(_settings.Value.Database);
        }

        public IMongoCollection<T> GetCollection<T>(string name)
        {
            ConfigureMongo();
            return _database.GetCollection<T>(name);
        }

        public void Dispose()
        {
            _session?.Dispose();
            GC.SuppressFinalize(this);
        }

        public void AddCommand(Func<Task> func)
        {
            _commands.Add(func);
        }
    }
}