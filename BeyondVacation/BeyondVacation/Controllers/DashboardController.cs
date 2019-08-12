using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.Practices.Unity;

namespace BeyondVacation.Controllers
{
    public class DashboardController : BaseController
    {
        public DashboardController(IUnityContainer container) : base(container)
        {
        }

        // GET: Dashboard
        public ActionResult Index()
        {
            return View();
        }
    }
}