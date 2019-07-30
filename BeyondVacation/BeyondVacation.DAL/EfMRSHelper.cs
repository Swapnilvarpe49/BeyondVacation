using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.Common;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BeyondVacation.DAL
{
    public class EfMRSHelper : IDisposable
    {
        private readonly DbContext _db;
        private readonly string _commandText;
        public List<Func<IObjectContextAdapter, DbDataReader, IEnumerable>> _resultSets;
        private object[] _parameters;
        private bool _useTransaction = false;
        // Pointer to an external unmanaged resource. 
        private IntPtr handle;
        // Other managed resource this class uses. 
        private Component component = new Component();
        // Track whether Dispose has been called. 
        private bool disposed = false;

        DbConnection SqlConn;

        public EfMRSHelper(DbContext db, string commandText, object[] parameters, bool useTransaction = false)
        {
            _db = db;
            _resultSets = new List<Func<IObjectContextAdapter, DbDataReader, IEnumerable>>();
            var tuple = CommandHelper.PrepareCommand(commandText, parameters);
            _commandText = tuple.Item1;
            _parameters = tuple.Item2;
            _useTransaction = useTransaction;
            SqlConn = _db.Database.Connection;
        }


        //public EfMRSHelper(DbContext db, string commandText, bool useTransaction = false)
        //{
        //    _db = db;
        //    _resultSets = new List<Func<IObjectContextAdapter, DbDataReader, IEnumerable>>();
        //    var tuple = CommandHelper.PrepareCommand(commandText,null);
        //    _commandText = tuple.Item1;
        //    _parameters = tuple.Item2;
        //    _useTransaction = useTransaction;
        //    SqlConn = _db.Database.Connection;
        //}

        public EfMRSHelper WithEntity<TResult>()
        {
            _resultSets.Add((adapter, reader) => adapter
                .ObjectContext
                .Translate<TResult>(reader)
                .ToList());

            return this;
        }

        /// <summary>
        /// Open Sql Connection
        /// </summary>
        public void OpenConnection()
        {
            if (SqlConn != null && SqlConn.State != ConnectionState.Open)
                SqlConn.Open();
        }

        /// <summary>
        /// Close Sql Connection
        /// </summary>
        public void CloseConnection()
        {
            if (SqlConn != null && SqlConn.State == ConnectionState.Open)
                SqlConn.Close();
        }

        /// <summary>
        /// Dispose Sql Connection object
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            // Check to see if Dispose has already been called. 
            if (!disposed)
            {
                if (disposing)
                {
                    CloseConnection();
                    component.Dispose();
                }
                SafeNativeMethods.CloseHandle(handle);
                handle = IntPtr.Zero;

                // Note disposing has been done.
                disposed = true;

            }
        }
        // Use C# destructor syntax for finalization code. 
        // This destructor will run only if the Dispose method 
        // does not get called. 
        // It gives your base class the opportunity to finalize. 
        // Do not provide destructor in types derived from this class.
        ~EfMRSHelper()
        {
            // Do not re-create Dispose clean-up code here. 
            // Calling Dispose(false) is optimal in terms of 
            // readability and maintainability.
            Dispose(false);
        }

        public List<IEnumerable> Execute()
        {
            var results = new List<IEnumerable>();

            try
            {
                OpenConnection();
                var command = SqlConn.CreateCommand();
                command.CommandText = _commandText;
                // command.CommandType = CommandType.StoredProcedure;

                if (_parameters != null && _parameters.Any())
                    command.Parameters.AddRange(_parameters);

                if (_useTransaction)
                {
                    using (var transaction = SqlConn.BeginTransaction())
                    {
                        try
                        {
                            command.Transaction = transaction;
                            using (var reader = command.ExecuteReader())
                            {
                                var adapter = ((IObjectContextAdapter)_db);
                                foreach (var resultSet in _resultSets)
                                {
                                    results.Add(resultSet(adapter, reader));
                                    reader.NextResult();
                                }
                            }

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
                    using (var reader = command.ExecuteReader())
                    {
                        var adapter = ((IObjectContextAdapter)_db);
                        foreach (var resultSet in _resultSets)
                        {
                            results.Add(resultSet(adapter, reader));
                            reader.NextResult();
                        }
                    }
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                Dispose();
            }

            return results;
        }
    }

    [System.Security.SuppressUnmanagedCodeSecurityAttribute]
    internal static class SafeNativeMethods
    {
        [System.Runtime.InteropServices.DllImport("Kernel32")]
        internal static extern Boolean CloseHandle(IntPtr handle);
    }
}
