using System;
using System.Data;
using System.Data.SqlClient;

namespace BeyondVacation.DAL
{
    public class CommandHelper
    {
        /// <summary>
        /// prepares the sql command as 'EXEC SPName @ParamName' format
        /// </summary>
        /// <param name="commandText">Stored Procedure Name</param>
        /// <param name="parameters">Parameters</param>
        /// <returns>string: SQL Command Text</returns>
        public static Tuple<string, object[]> PrepareCommand(string commandText, object[] parameters)
        {
            //add parameters to command
            if (parameters != null && parameters.Length > 0)
            {
                for (int i = 0; i <= parameters.Length - 1; i++)
                {
                    var p = parameters[i] as System.Data.Common.DbParameter;
                    if (p == null)
                        throw new Exception("Not support parameter type");

                    p.Value = p.Value ?? DBNull.Value;

                    commandText += i == 0 ? " " : ", ";

                    commandText += p.ParameterName;
                    if (p.Direction == System.Data.ParameterDirection.InputOutput || p.Direction == ParameterDirection.Output)
                    {
                        //output parameter
                        commandText += " output";
                    }
                }
            }

            return new Tuple<string, object[]>(commandText, parameters);
        }

        /// <summary>
        /// Get Parameter object for Table Type
        /// </summary>
        /// <param name="Name"></param>
        /// <param name="Value"></param>
        /// <param name="TypeName"></param>
        /// <returns></returns>
        public static SqlParameter GetTableTypeParam(string Name, DataTable Value, string TypeName)
        {
            SqlParameter sqlParam = new SqlParameter()
            {
                SqlDbType = SqlDbType.Structured,
                TypeName = TypeName,
                ParameterName = Name,
                Value = Value,

            };

            return sqlParam;
        }
    }
}
