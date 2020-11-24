using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Web;
using Newtonsoft.Json.Linq;
using Intell.Ice;

namespace Jintell.Xortal.Transfusions {
    public static class TransfusionsApi {

        public static string ApplicationRootPath {
            get { return Path.Combine(HttpRuntime.AppDomainAppPath, @"xortal\applications\transfusions"); }
        }

        public static string ApplicationStorageTextPath {
            get { return Path.Combine(HttpRuntime.AppDomainAppPath, @"xortal\applications\transfusions\storage\text.txt"); }
        }
        public static string ApplicationStorageFilePath {
            get { return Path.Combine(HttpRuntime.AppDomainAppPath, @"xortal\applications\transfusions\storage\files"); }
        }




        public static string GetText() {
            return File.ReadAllText(ApplicationStorageTextPath);
            
        }
        public static void SetText(string text) {

            if (text == null) throw new HandledException("text can't be null");
            if (text.Length >= 1024 * 1024) { throw new HandledException("Maximum text length exceeded 1mb."); }

            File.WriteAllText(ApplicationStorageTextPath, text);
        }



        public static FileDetail[] GetFolders(string path = "") {
            if (path == null) path = "";
            var original = Path.GetFullPath(Path.Combine(ApplicationStorageFilePath, path));
            
            SafeCheck(original);


            var files = Directory.GetDirectories(original);
            var details = new List<FileDetail>();

            for (var i = 0; i < files.Length; i++) {
                var fileInfo = new DirectoryInfo(files[i]);
                var fileDetail = new FileDetail(fileInfo);

                fileDetail.Path = fileDetail.Path.Substring(ApplicationStorageFilePath.Length + 1);

                details.Add(fileDetail);
            }

            return details.ToArray();
        }
        public static FileDetail[] GetFiles(string path = "") {
            if (path == null) path = "";
            var original = Path.GetFullPath(Path.Combine(ApplicationStorageFilePath, path));

            SafeCheck(original);


            var files = Directory.GetFiles(original);
            var details = new List<FileDetail>();

            for (var i = 0; i < files.Length; i++) {
                var fileInfo = new FileInfo(files[i]);
                var fileDetail = new FileDetail(fileInfo);

                fileDetail.Path = fileDetail.Path.Substring(ApplicationStorageFilePath.Length + 1);
                details.Add(fileDetail);
            }

            return details.ToArray();
        }
        public static void UploadFiles(string path, HttpFileCollection files) {
            if (path == null) path = "";

            var original = Path.Combine(ApplicationStorageFilePath, path);
            if (original.StartsWith(ApplicationStorageFilePath, StringComparison.OrdinalIgnoreCase) == false) throw new HandledException("Invalid path", -1);

            for (var i = 0; i < files.Count; i++) {
                var file = files[i];
                file.SaveAs(original + @"\" + file.FileName);
            }
        }
        public static void DownloadFile(string path, HttpContext context) {
            if (path == null) throw new HandledException("path can't be null.");
            var original = Path.GetFullPath(Path.Combine(ApplicationStorageFilePath, path));

            SafeCheck(original);

            var response = context.Response;
            response.ClearContent();
            response.Clear();
            response.ContentType = "application/octet-stream";
            response.AddHeader("Content-Disposition", "attachment; filename=" + Path.GetFileName(original) + ";");
            response.TransmitFile(original);
            response.Flush();
            response.End();

        }
        public static bool DeleteFile(string path) {
            if (path == null) throw new HandledException("path can't be null.");
            var original = Path.GetFullPath(Path.Combine(ApplicationStorageFilePath, path));

            SafeCheck(original);

            File.Delete(original);

            return true;
        }


        ///<summary>This function will throw error for safe</summary>
        public static void SafeCheck(string path) {
            var absolute = Path.GetFullPath(path);


            if (absolute.StartsWith(ApplicationStorageFilePath, StringComparison.OrdinalIgnoreCase) == false)
                throw new HandledException("Transfusion doesn't have permission to access that path", -1);
            

        }

    }

    public class FileDetail {

        public string Path { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public int Size { get; set; }

        public FileDetail() {}
        public FileDetail(FileInfo fileInfo) {
            Path = fileInfo.FullName;
            Name = fileInfo.Name;
            Date = fileInfo.LastWriteTimeUtc;
            Size = (int)fileInfo.Length;

        }
        public FileDetail(DirectoryInfo fileInfo) {
            Path = fileInfo.FullName;
            Name = fileInfo.Name;
            Date = fileInfo.LastWriteTimeUtc;
        }

        public JObject ToJObject() {
            return new JObject {
                ["path"] = Path,
                ["name"] = Name,
                ["date"] = Date,
                ["size"] = Size,
            };
        }

        public static JArray ToJArray(FileDetail[] array) {
            var jArray = new JArray();

            if (array == null) return jArray;

            for (var i = 0; i < array.Length; i++)
                jArray.Add(array[i].ToJObject());

            return jArray;

        }

    }

}












