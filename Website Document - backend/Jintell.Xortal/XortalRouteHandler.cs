using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Routing;

namespace Jintell.Xortal {

    public class XortalRouteHandler : IRouteHandler {
        static IHttpHandler httpHander;

        public IHttpHandler GetHttpHandler(RequestContext requestContext) {

            if (httpHander != null) {
                if (httpHander.IsReusable == true) return httpHander;
            }

            return httpHander = new HelloWorldHttpHandler();
        }
        private class HelloWorldHttpHandler : IHttpHandler {

            public bool IsReusable { get { return true; } }
            public void ProcessRequest(HttpContext context) {
                context.Response.Write("abcdef");
            }
        }
    }
}
