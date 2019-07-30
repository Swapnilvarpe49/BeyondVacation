using Microsoft.Practices.Unity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BeyondVacation.Controllers
{
    public class TestController : BaseController
    {
        public TestController(IUnityContainer container) : base(container)
        {

        }

        // GET: Test
        public ActionResult Index()
        {
            return View();
        }
    }
}