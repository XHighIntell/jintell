using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Web;
using Newtonsoft.Json.Linq;

namespace Jintell.Xortal {
    public class StorageApi {
        public static StorageImageGroup[] GetAllImage() {
            var len = HttpRuntime.AppDomainAppPath.Length;


            var dirs = Directory.GetDirectories(HttpRuntime.AppDomainAppPath + @"xortal\storage\image\");

            var groups = new List<StorageImageGroup>();

            for (var f = 0; f < dirs.Length; f++) {
                var name = Path.GetFileName(dirs[f]);
                var files = Directory.GetFiles(HttpRuntime.AppDomainAppPath + @"xortal\storage\image\" + name + @"\", "*", SearchOption.AllDirectories);

                for (var j = 0; j < files.Length; j++) {
                    files[j] = files[j].Substring(len - 1).Replace('\\', '/');
                }

                groups.Add(new StorageImageGroup(name, files));
            }




            return groups.ToArray();


            //return Directory.GetFiles(HttpRuntime.AppDomainAppPath  +  @"xortal\storage\image\", "*", SearchOption.AllDirectories);
            //return paths;
        }
    }

    public class StorageImageGroup {

        public StorageImageGroup(string name, string[] files) {
            Name = name;
            Files = files;
        }

        public string Name { get; set; }

        public string[] Files { get; set; }


        public JObject ToJObject() {
            return new JObject {
                ["name"] = Name,
                ["files"] = JArray.FromObject(Files)
            };
        }

        public static JArray ToJArray(StorageImageGroup[] groups) {
            var jArray = new JArray();

            if (groups == null) return jArray;

            for (var i = 0; i < groups.Length; i++)
                jArray.Add(groups[i].ToJObject());

            return jArray;

        }

    }


}












