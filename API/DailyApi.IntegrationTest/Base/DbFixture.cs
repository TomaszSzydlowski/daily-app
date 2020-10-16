using System;
using System.Net.Http;
using DailyApi.Persistence.Contexts;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;


namespace DailyApi.IntegrationTest.Base
{
    public abstract class DbFixture : IDisposable
    {
        private Settings settings { get; }

        private readonly WebApplicationFactory<Startup> factory;

        protected readonly HttpClient TestClient;

        public DbFixture()
        {
            var config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();

            var connectionString = config.GetConnectionString("DefaultConnection");
            var database = config.GetSection("MongoSettings:IntegrationTestDb").Value;

            this.settings = new Settings
            {
                ConnectionString = connectionString,
                Database = database
            };

            factory = new WebApplicationFactory<Startup>().WithWebHostBuilder(builder =>
            {
                builder.ConfigureTestServices(services =>
                {
                    services.Configure<Settings>(opts =>
                    {
                        opts.Database = settings.Database;
                    });
                });
            });

            TestClient = factory.CreateClient();
        }

        public void Dispose()
        {
            factory?.Dispose();

            var client = new MongoClient(settings.ConnectionString);
            client.DropDatabase(settings.Database);
        }
    }
}