using BeyondVacation.DAL;
using Microsoft.Practices.Unity;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BeyondVacation.BAL.Common
{
    public class Root
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
        public Root(IUnityContainer container)
        {
            _container = container;
        }

        public BaseDB baseDb { get; set; }

        //public dynamic getAllCoutry()
        //{
        //    return baseDb.GetCountry();
        //}
        //public dynamic getAllStates(int stateId)
        //{
        //    return baseDb.GetStates(stateId);
        //}
        //public dynamic getCitiesById(int stateId, int CountryId)
        //{
        //    return baseDb.GetCities(stateId, CountryId);
        //}
        //public dynamic getPincodeById(int CityId)
        //{
        //    return baseDb.GetPincode(CityId);
        //}

        //public dynamic getLocation(int CityId)
        //{
        //    return baseDb.GetLocation(CityId);
        //}
        //public string GetReferenceNo(string procedureName, string refNoPrefix,int branchId)
        //{
        //    SqlParameter[] parameters = {
        //        new SqlParameter("@Type",refNoPrefix),
        //        new SqlParameter("@BranchId",branchId)

        //    };

        //    return repository.ExecuteStoredProcedureScalar<string>(procedureName, parameters);

        //}
        //public dynamic GetLookupData(int parentId)
        //{
        //    return baseDb.GetLookupDetails(parentId);
        //}

    }
}
