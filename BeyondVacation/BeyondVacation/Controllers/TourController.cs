using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.Practices.Unity;
using BeyondVacation.BAL.Process;
using BeyondVacation.BAL.Models;
using System.IO;
using System.Configuration;

namespace BeyondVacation.Controllers
{
    public class TourController : BaseController
    {
        private TourProcess _TourProcess;
        string serverPath = ConfigurationManager.AppSettings["TourImgPath"];
        public TourController(IUnityContainer container) : base(container)
        {
            _TourProcess = container.Resolve<TourProcess>();
        }

        // GET: Tour
        public ActionResult Index()
        {
            var countryList = _TourProcess.GetCountryList();
            ViewBag.CountryList = countryList;
            return View();
        }
        [HttpPost]
        public JsonResult SaveTourDetails(string TourData)
        {
            string fileSavePath = "" , tourCode = "";
            try
            {
                // Write Asyn method for Pkg Upload and Save Data
                //int userSessionId = Convert.ToInt32(Session["UserId"]);

                var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
                TourDetails tourDetails = serializer.Deserialize<TourDetails>(TourData);
               var tourDet = _TourProcess.SaveTourDetails(tourDetails, 1 /*userSessionId*/);
                tourCode = tourDet.TourCode;
                if (Request.Files.Count > 0)
                {
                    serverPath = serverPath + "/" + tourCode;
                    if (!(Directory.Exists(serverPath)))
                        Directory.CreateDirectory(Server.MapPath(serverPath));


                    for (int i = 0; i < Request.Files.Count; i++)
                    {
                        var file = Request.Files[i];
                            fileSavePath = Path.Combine(Server.MapPath(serverPath), file.FileName);
                        file.SaveAs(fileSavePath);
                        _TourProcess.SaveTourImgDetails(tourDet.TourId, file.FileName);
                    }
                    
                }

                  }
           
            catch (Exception ex)
            {
                throw ex;
            }
            return Json(new { success = true, tourCode });
            }

       

    }
}