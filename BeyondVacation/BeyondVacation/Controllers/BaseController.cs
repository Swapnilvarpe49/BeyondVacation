using Microsoft.Practices.Unity;
using System.Web.Mvc;

namespace BeyondVacation.Controllers
{
    public class BaseController : Controller
    {
        private IUnityContainer _container;
        public BaseController(IUnityContainer container)
        {
            _container = container;
        }

        // GET: Base
        public ActionResult Index()
        {
            return View();
        }
    }
}