using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BeyondVacation.DAL
{
   public interface IRepository
    {

        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        void Detach(object entity);
        //IQueryable Set(Type type);
        IQueryable<T> Set<T>() where T : class;
        IQueryable<T> SetReadOnly<T>() where T : class;
        void LoadEntity<T, U>(T entity, Expression<Func<T, U>> selector) where T : class where U : class;
        void LoadCollection<T, U>(T entity, Expression<Func<T, ICollection<U>>> selector) where T : class where U : class;
        void Save();
        void Update<T>(T entity, int id) where T : class;
        IEnumerable<T> ExecuteStoredProcedureList<T>(string commandText, object[] parameters, bool useTransaction = false);
        IEnumerable<T> ExecuteStoredProcedureList<T>(string commandText);
        IEnumerable<T> ExecuteStoredProcedureList<T>(string commandText, bool useTransaction);
        T ExecuteStoredProcedureScalar<T>(string commandText, object[] parameters, bool useTransaction = false);
        T ExecuteStoredProcedureScalar<T>(string commandText);
        T ExecuteStoredProcedureScalar<T>(string commandText, bool useTransaction);
        int ExecuteSqlCommand(string sql, object[] parameters, bool useTransaction = false);
        int ExecuteSqlCommand(string sql);
        int ExecuteSqlCommand(string sql, bool useTransaction);
        EfMRSHelper ExecuteMRSStoredProcedure(string commandText, object[] parameters, bool useTransaction = false);
    }
}
