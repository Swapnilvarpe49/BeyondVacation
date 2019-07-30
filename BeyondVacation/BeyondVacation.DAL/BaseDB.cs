using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Data;
using Microsoft.Practices.Unity;

namespace BeyondVacation.DAL
{
    public class BaseDB
    {

        private IUnityContainer _container;
        private IRepository _repository;

        protected IRepository repository
        {
            get
            {
                if (_repository == null)
                    _repository = _container.Resolve<IRepository>();
                return _repository;
            }
        }

        public BaseDB(IUnityContainer container)
        {
            _container = container;
        }


        public IEnumerable<T> GetList<T>(string procName)
        {
            return repository.ExecuteStoredProcedureList<T>(procName).ToList();
        }

        public EfMRSHelper GetMultipleResults(string procedureName, SqlParameter[] parameters = null, bool useTransaction = false)
        {
            return repository.ExecuteMRSStoredProcedure(procedureName, parameters, useTransaction);
        }

        //public IEnumerable<GenericValuesInt> GetLookupDetails(int lookupParentId)
        //{

        //   return (from d in repository.SetReadOnly<LOOKUP_DET_T>()
        //                  join m in repository.SetReadOnly<LOOKUP_MST_T>()
        //                  on d.LookUpMasterId equals m.Id
        //           where m.Id == lookupParentId
        //           select new GenericValuesInt { Key = d.Id, Value = d.Name }).ToList();
                        
                        
        //}

        //public IEnumerable<GenericValuesInt> GetStates(int stateId)
        //{

        //    return (from c in repository.SetReadOnly<COUNTRY_MST_T>()
        //            join s in repository.SetReadOnly<STATE_MST_T>()
        //            on c.Id equals s.CountryId
        //            where c.Id == stateId &&  s.Active == true
        //            select new GenericValuesInt { Key = s.Id, Value = s.Name }).ToList();


        //}

        //public IEnumerable<GenericValuesInt> GetCities(int stateId, int CountryId)
        //{

        //    var Result = from c in repository.SetReadOnly<CITY_MST_T>().Where(x => x.CountryId == CountryId && x.Active== true)
        //                 select c;

        //    if (stateId > 0)
        //        Result = Result.Where(p => p.StateId == stateId);

        //    return (from r in Result
        //              select new GenericValuesInt { Key = r.Id, Value = r.City }).ToList();

        //}


        //public IEnumerable<GenericValuesInt> GetPincode(int CityId)
        //{

        //    var Result  = (from p in repository.SetReadOnly<PINCODE_MST_T>()
        //     where p.CityId == CityId
        //     select new GenericValuesInt { Key = p.Id, Value = p.Pincode }).ToList();

        //    return Result;
        //}


        //public IEnumerable<GenericValuesInt> GetLocation(int CityId)
        //{

        //    var Result = (from l in repository.SetReadOnly<LOCATION_MST_T>()
        //                  where l.CityId == CityId 
        //                  select new GenericValuesInt { Key = l.Id, Value = l.Location }).ToList();

        //    return Result;
        //}

        //public IEnumerable<GenericValuesInt> GetCountry()
        //{

        //    return (from c in repository.SetReadOnly<COUNTRY_MST_T>()
        //            where c.Active == true
        //            select new GenericValuesInt { Key = c.Id, Value = c.Name }).ToList();
        //}


        //public DataSet  GetDataSet(string ProcedureName, Dictionary<string, object> ParamatersDictonary)
        //{

        //    SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["strcon"].ConnectionString.ToString());
        //    SqlCommand sqlComm = new SqlCommand(ProcedureName, con);
        //    foreach (var item in ParamatersDictonary)
        //    {
        //        sqlComm.Parameters.AddWithValue(item.Key, item.Value);
        //    }
        //    DataSet ds = new DataSet();
        //    sqlComm.CommandType = CommandType.StoredProcedure;
        //    SqlDataAdapter da = new SqlDataAdapter();
        //    da.SelectCommand = sqlComm;
        //    da.Fill(ds);

        //    return ds;
        //}
            
    }
}
