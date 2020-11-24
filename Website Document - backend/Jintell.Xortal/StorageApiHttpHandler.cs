using System;
using System.Web;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

using Intell.Ice.Api;

namespace Jintell.Xortal {
    public class StorageApiHttpHandler : ApiHttpHandler {
        

        public override JObject ProcessRequestApi(HttpContext context) {
            
            if (context.Request.QueryString["action"] == "getAllImage") {
                var jObject = JApiResult.Done;
                jObject["images"] = StorageImageGroup.ToJArray(StorageApi.GetAllImage());


                return jObject;
            }
            
            return null;
        }

    }
}
