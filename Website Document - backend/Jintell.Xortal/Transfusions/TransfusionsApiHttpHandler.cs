using System;
using System.Web;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

using Intell.Ice.Api;

namespace Jintell.Xortal.Transfusions {
    public class TransfusionsApiHttpHandler: ApiHttpHandler {
        

        public override JObject ProcessRequestApi(HttpContext context) {

            //if (context.Request.HttpMethod != "POST") return new JApiResult(-1, ErrorResources.HttpVerbMustBePost);

            var rootPath = "/api/xortal/transfusions/";
            var action = context.Request.Path.Substring(rootPath.Length).Replace("_", "-");


            if (action == "get-text") return GetText(context);
            if (action == "set-text") return SetText(context);

            if (action == "get-folders") return GetFolders(context);
            if (action == "get-files") return GetFiles(context);
            if (action == "upload-file") return Upload(context);
            if (action == "download") return Download(context);
            if (action == "delete") return Delete(context);


            return null;
        }


        public static JApiResult GetText(HttpContext context) {
            return new JApiResult(0, DescriptionResources.OK) {
                ["text"] = TransfusionsApi.GetText()
            };
        }
        public static JApiResult SetText(HttpContext context) {

            var text = context.Request.QueryString["text"];

            TransfusionsApi.SetText(text);

            return new JApiResult(0, DescriptionResources.OK);
        }

        public static JApiResult GetFolders(HttpContext context) {

            var path = context.Request.QueryString["path"];

            return new JApiResult(0, DescriptionResources.OK) {
                ["folders"] = FileDetail.ToJArray(TransfusionsApi.GetFolders(path))
            };
        }
        public static JApiResult GetFiles(HttpContext context) {
            var path = context.Request.QueryString["path"];

            return new JApiResult(0, DescriptionResources.OK) {
                ["files"] = FileDetail.ToJArray(TransfusionsApi.GetFiles(path))
            };
        }
        public static JApiResult Upload(HttpContext context) {
            var request = context.Request;
            var path = request.QueryString["path"];
            var overwrite = request.QueryString["overwrite"];

            TransfusionsApi.UploadFiles(path, request.Files);


            
            return new JApiResult(0, DescriptionResources.OK) {
                //["files"] = FileDetail.ToJArray(TransfusionsApi.GetFiles(path))
            };
        }
        public static JApiResult Download(HttpContext context) {
            var request = context.Request;
            var path = request.QueryString["path"];

            TransfusionsApi.DownloadFile(path, context);
            return null;
        }
        public static JApiResult Delete(HttpContext context) {
            var request = context.Request;
            var path = request.QueryString["path"];

            TransfusionsApi.DeleteFile(path);
            return new JApiResult(0, DescriptionResources.OK);
        }

    }
}









