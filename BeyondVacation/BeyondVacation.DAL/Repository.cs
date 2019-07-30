using Microsoft.Practices.Unity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;

namespace BeyondVacation.DAL
{
    public class Repository : IRepository
    {
        private DbContext _context;
        

        //private RelianceJio.AuditLog.IAuditService _auditService;

        public Repository(IUnityContainer container)
        {
            _context = container.Resolve<DbContext>();
            //_auditService = container.Resolve<RelianceJio.AuditLog.IAuditService>();     
        }

        //private RelianceJioEntities Context
        //{
        //    get
        //    {
        //        return _context as RelianceJioEntities;
        //    }
        //}

        public IQueryable<T> Set<T>() where T : class
        {
            return _context.Set<T>();
        }

        public IQueryable<T> SetReadOnly<T>() where T : class
        {
            return _context.Set<T>().AsNoTracking();
        }

        public void LoadEntity<T, U>(T entity, Expression<Func<T, U>> selector) where T : class where U : class
        {
            _context.Entry(entity).Reference(selector).Load();
        }

        public void LoadCollection<T, U>(T entity, Expression<Func<T, ICollection<U>>> selector) where T : class where U : class
        {
            _context.Entry(entity).Collection(selector).Load();
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Set<T>().Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Set<T>().Remove(entity);
        }

        public void Save()
        {
            try
            {
                _context.SaveChanges();
            }
            catch (DbEntityValidationException dbEx)
            {
                Exception raise = dbEx;
                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        string message = string.Format("{0}:{1}",
                            validationErrors.Entry.Entity.ToString(),
                            validationError.ErrorMessage);
                        raise = new InvalidOperationException(message, raise);
                    }
                }
                throw raise;
            }
            catch (Exception ex)
            {
                throw ex.InnerException.InnerException;
            }
        }

        public void Detach(object entity)
        {
            var objectContext = ((IObjectContextAdapter)_context).ObjectContext;
            objectContext.Detach(entity);
        }

        public void Update<T>(T entity, int id) where T : class
        {
            if (entity == null)
            {
                throw new ArgumentException("Cannot add a null entity.");
            }

            var entry = _context.Entry<T>(entity);

            if (entry.State == System.Data.Entity.EntityState.Detached)
            {
                var set = _context.Set<T>();
                T attachedEntity = set.Find(id);  // You need to have access to key

                if (attachedEntity != null)
                {
                    var attachedEntry = _context.Entry(attachedEntity);
                    attachedEntry.CurrentValues.SetValues(entity);
                }
                else
                {
                    entry.State = System.Data.Entity.EntityState.Modified; // This should attach entity
                }
            }
        }

        /// <summary>
        /// Get full error
        /// </summary>
        /// <param name="exc">Exception</param>
        /// <returns>Error</returns>
        protected string GetFullErrorText(DbEntityValidationException exc)
        {
            var msg = string.Empty;
            foreach (var validationErrors in exc.EntityValidationErrors)
                foreach (var error in validationErrors.ValidationErrors)
                    msg += string.Format("Property: {0} Error: {1}", error.PropertyName, error.ErrorMessage) + Environment.NewLine;
            return msg;
        }

        /// <summary>
        /// prepares the sql command as 'EXEC SPName @ParamName' format
        /// </summary>
        /// <param name="commandText">Stored Procedure Name</param>
        /// <param name="parameters">Parameters</param>
        /// <returns>string: SQL Command Text</returns>
        private static Tuple<string, object[]> PrepareCommand(string commandText, object[] parameters)
        {
            //add parameters to command
            if (parameters != null && parameters.Length > 0)
            {
                for (int i = 0; i <= parameters.Length - 1; i++)
                {
                    var p = parameters[i] as DbParameter;
                    if (p == null)
                        throw new Exception("Not support parameter type");

                    p.Value = p.Value ?? DBNull.Value;

                    commandText += i == 0 ? " " : ", ";

                    commandText += p.ParameterName;
                    if (p.Direction == ParameterDirection.InputOutput || p.Direction == ParameterDirection.Output)
                    {
                        //output parameter
                        commandText += " output";
                    }
                }
            }

            return new Tuple<string, object[]>(commandText, parameters);
        }

        /// <summary>
        /// Execute stores procedure and load a list of entities at the end
        /// </summary>
        /// <typeparam name="TEntity">Entity type</typeparam>
        /// <param name="commandText">Command text</param>
        /// <param name="parameters">Parameters</param>
        /// <returns>Entities</returns>
        public IEnumerable<T> ExecuteStoredProcedureList<T>(string commandText, object[] parameters, bool useTransaction)
        {
            IEnumerable<T> result = null;
            try
            {
                if (useTransaction)
                {
                    using (var transaction = _context.Database.BeginTransaction())
                    {
                        try
                        {
                            var tuple = PrepareCommand(commandText, parameters);
                            result = _context.Database.SqlQuery<T>(tuple.Item1, tuple.Item2);
                            transaction.Commit();
                        }
                        catch (Exception ex)
                        {
                            transaction.Rollback();
                            throw;
                        }
                    }
                }
                else
                {
                    try
                    {
                        var tuple = PrepareCommand(commandText, parameters);
                        result = _context.Database.SqlQuery<T>(tuple.Item1, tuple.Item2);
                    }
                    catch (Exception ex)
                    {
                        throw ex;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }

        public IEnumerable<T> ExecuteStoredProcedureListV2<T>(string commandText, bool useTransaction, params object[] parameters)
        {
            IEnumerable<T> result = null;
            try
            {
                if (useTransaction)
                {
                    using (var transaction = _context.Database.BeginTransaction())
                    {
                        try
                        {
                            var tuple = PrepareCommand(commandText, parameters);
                            result = _context.Database.SqlQuery<T>(tuple.Item1, tuple.Item2);
                            transaction.Commit();
                        }
                        catch (Exception ex)
                        {
                            transaction.Rollback();
                            throw;
                        }
                    }
                }
                else
                {
                    try
                    {
                        var tuple = PrepareCommand(commandText, parameters);
                        result = _context.Database.SqlQuery<T>(tuple.Item1, tuple.Item2);
                    }
                    catch (Exception ex)
                    {
                        throw ex;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }

        /// <summary>
        /// Execute stores procedure with command text only
        /// </summary>
        /// <param name="commandText">Command text</param>
        /// <returns>Entities</returns>
        public IEnumerable<T> ExecuteStoredProcedureList<T>(string commandText)
        {
            try
            {
                return ExecuteStoredProcedureList<T>(commandText, new SqlParameter[] { }, useTransaction: false);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Execute stores procedure with command text with Transaction Support
        /// </summary>
        /// <param name="commandText">Command text</param>
        /// <returns>Entities</returns>
        public IEnumerable<T> ExecuteStoredProcedureList<T>(string commandText, bool useTransaction)
        {
            try
            {
                return ExecuteStoredProcedureList<T>(commandText, new SqlParameter[] { }, useTransaction);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Execute stores procedure and returns a single object
        /// </summary>
        /// <typeparam name="TEntity">Entity type</typeparam>
        /// <param name="commandText">Command text</param>
        /// <param name="parameters">Parameters</param>
        /// <returns>Entities</returns>
        public T ExecuteStoredProcedureScalar<T>(string commandText, object[] parameters, bool useTransaction)
        {
            try
            {
                return ExecuteStoredProcedureList<T>(commandText, parameters, useTransaction).ToList().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        /// <summary>
        /// Execute stores procedure scalar and returns a single object with command text only
        /// </summary>
        /// <param name="commandText">Command text</param>
        /// <returns>Entities</returns>
        public T ExecuteStoredProcedureScalar<T>(string commandText)
        {
            try
            {
                return ExecuteStoredProcedureList<T>(commandText, new SqlParameter[] { }, false).ToList().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Execute stores procedure scalar and returns a single object with command text and Transaction Support
        /// </summary>
        /// <param name="commandText">Command text</param>
        /// <returns>Entities</returns>
        public T ExecuteStoredProcedureScalar<T>(string commandText, bool useTransaction)
        {
            try
            {
                return ExecuteStoredProcedureList<T>(commandText, new SqlParameter[] { }, useTransaction).ToList().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Execute SQL Command
        /// </summary>
        /// <param name="sql">sql to execute</param>
        /// <param name="parameters">parameters collection</param>
        /// <returns></returns>
        public int ExecuteSqlCommand(string sql, object[] parameters, bool useTransaction)
        {
            var result = 0;
            if (useTransaction)
            {
                using (var transaction = _context.Database.BeginTransaction())
                {
                    try
                    {
                        var tuple = PrepareCommand(sql, parameters);
                        result = _context.Database.ExecuteSqlCommand(tuple.Item1, tuple.Item2);
                        transaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        throw;
                    }
                }
            }
            else
            {
                try
                {
                    var tuple = PrepareCommand(sql, parameters);
                    result = _context.Database.ExecuteSqlCommand(tuple.Item1, tuple.Item2);
                }
                catch (Exception ex)
                {
                    throw;
                };
            }

            return result;
        }

        /// <summary>
        /// Execute SQL Command without params
        /// </summary>
        /// <param name="sql">sql to execute</param>
        /// <returns></returns>
        public int ExecuteSqlCommand(string sql)
        {
            return ExecuteSqlCommand(sql, new SqlParameter[] { }, false);
        }

        /// <summary>
        /// Execute SQL Command without params and with Transaction Support
        /// </summary>
        /// <param name="sql">sql to execute</param>
        /// <returns></returns>
        public int ExecuteSqlCommand(string sql, bool useTransaction)
        {
            return ExecuteSqlCommand(sql, new SqlParameter[] { }, useTransaction);
        }

        public EfMRSHelper ExecuteMRSStoredProcedure(string commandText, object[] parameters, bool useTransaction)
        {
            return new EfMRSHelper(_context, commandText, parameters, useTransaction);
        }

    }
}
