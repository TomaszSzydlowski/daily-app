using MongoDB.Bson;
using MongoDB.Driver;
using DailyApi.Domain.Repositories;
using ServiceStack;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DailyApi.Persistence.Repositories
{
    public abstract class BaseRepository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected readonly IAppDbContext Context;
        protected IMongoCollection<TEntity> DbSet;
        protected virtual string _collectionName { get { return typeof(TEntity).Name; } }

        protected BaseRepository(IAppDbContext context)
        {
            Context = context;
        }

        public virtual void Add(TEntity obj)
        {
            ConfigDbSet();
            Context.AddCommand(() => DbSet.InsertOneAsync(obj));
        }

        protected void ConfigDbSet()
        {
            DbSet = Context.GetCollection<TEntity>(_collectionName);
        }

        public virtual async Task<TEntity> GetById(int id)
        {
            ConfigDbSet();
            var data = await DbSet.FindAsync(Builders<TEntity>.Filter.Eq("_id", id));
            return data.SingleOrDefault();
        }

        public virtual async Task<TEntity> GetById(Guid id)
        {
            ConfigDbSet();
            var data = await DbSet.FindAsync(Builders<TEntity>.Filter.Eq("_id", id));
            return data.SingleOrDefault();
        }

        public virtual async Task<TEntity> GetByPropertyName(string propertyName, string value)
        {
            ConfigDbSet();
            var data = await DbSet.FindAsync(Builders<TEntity>.Filter.Eq(propertyName, value));
            return data.SingleOrDefault();
        }

        public virtual async Task<IEnumerable<TEntity>> ListAsync()
        {
            ConfigDbSet();
            var all = await DbSet.FindAsync(Builders<TEntity>.Filter.Empty);
            return all.ToList();
        }

        public virtual void Update(TEntity obj)
        {
            ConfigDbSet();
            Context.AddCommand(() => DbSet.ReplaceOneAsync(Builders<TEntity>.Filter.Eq("_id", obj.GetId()), obj));
        }

        public virtual void Remove(Guid id)
        {
            ConfigDbSet();
            Context.AddCommand(() => DbSet.DeleteOneAsync(Builders<TEntity>.Filter.Eq("_id", id)));
        }

        public virtual void Remove(int id)
        {
            ConfigDbSet();
            Context.AddCommand(() => DbSet.DeleteOneAsync(Builders<TEntity>.Filter.Eq("_id", id)));
        }

        public void RemoveAll(Guid userId)
        {
            ConfigDbSet();
            Context.AddCommand(() => DbSet.DeleteManyAsync(Builders<TEntity>.Filter.Eq("userId", userId)));
        }

        public void Dispose()
        {
            Context?.Dispose();
        }
    }
}