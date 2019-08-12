using BeyondVacation.BAL.Common;
using BeyondVacation.BAL.Models;
using BeyondVacation.DAL;
using BeyondVacation.Model;
using Microsoft.Practices.Unity;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace BeyondVacation.BAL.Process
{
    public class TourProcess : Root
    {
        COUNTRY_MST_T _COUNTRY_MST_T;

        public TourProcess(IUnityContainer container) : base(container)
        {
            _COUNTRY_MST_T = container.Resolve<COUNTRY_MST_T>();
           // baseDb = new BaseDB(container);
        }

        public List<SelectListItem> GetCountryList()
        {
            return (from m in repository.SetReadOnly<COUNTRY_MST_T>()
                        select new SelectListItem { Text = m.Name, Value = m.Id.ToString() }).ToList();

        }
        public dynamic SaveTourDetails(TourDetails tourDetails, int userSessionId)
        {

            SqlParameter[] parameters = {
                            new SqlParameter("@TourName", Convert.ToString(tourDetails.TourName).Trim()),
                            new SqlParameter("@Location", Convert.ToString(tourDetails.Destination).Trim()),
                            new SqlParameter("@CountryId",tourDetails.CountryId),
                            new SqlParameter("@Days", tourDetails.Days),
                            new SqlParameter("@Nights", tourDetails.Nights),
                            new SqlParameter("@Cost", tourDetails.Cost ),
                            new SqlParameter("@CreatedBy", userSessionId )
            };

            return repository.ExecuteStoredProcedureScalar<TourDetails>("ProcSaveTourDetails", parameters);
        }

        public void SaveTourImgDetails(long tourId, string fileName)
        {

            SqlParameter[] parameters = {
                            new SqlParameter("@TourId", tourId),
                            new SqlParameter("@FileName", fileName)
            };

             repository.ExecuteSqlCommand("ProcSaveTourImgDetails", parameters);
        }
    }
}
