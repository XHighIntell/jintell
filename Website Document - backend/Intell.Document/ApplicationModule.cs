using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

using Intell.WebGadget;
using Intell.WebGadget.Web;

namespace Intell.Document {
    public partial class ApplicationModule : HttpApplication {
        static UrlRewriter urlRewriter;
        ///<summary>Gets urlrewriter.</summary>
        public static UrlRewriter UrlRewriter {
            get {
                if (urlRewriter == null) {
                    

                    urlRewriter = new UrlRewriter();


                    urlRewriter.Add(new UrlRewriteRule("/Portal", "/Document/Portal/Portal.aspx"));
                    urlRewriter.Add(new UrlRewriteRule("/Portal/demo", "/Document/Portal/demo/demo.html"));
                    

                    //urlRewriter.Add(new UrlRewriteRule("/Intell.Controls", "/Document/Intell.Control/Intell.Controls.aspx"));

                    //Intell
                    urlRewriter.Add(new UrlRewriteRule("/Intell", "/Document/Intell/Intell.aspx"));
                    urlRewriter.Add(new UrlRewriteRule("/JQuery", "/Document/JQuery/JQuery.aspx"));

                    //Checkbox
                    urlRewriter.Add(new UrlRewriteRule("/Intell/Controls/Checkbox/Demo", "/Document/Intell.Controls.Checkbox/Checkbox.Demo.aspx"));

                    //ComboBox
                    urlRewriter.Add(new UrlRewriteRule("/Intell/Controls/ComboBox", "/Document/Intell.Controls.ComboBox/ComboBox.aspx"));
                    urlRewriter.Add(new UrlRewriteRule("/Intell/Controls/ComboBox/Demo", "/Document/Intell.Controls.ComboBox/ComboBox.Demo.aspx"));

                    //ContextMenu
                    urlRewriter.Add(new UrlRewriteRule("/Intell/Controls/ContextMenu",      "/Document/Intell.Controls.ContextMenu/ContextMenu.aspx"));
                    urlRewriter.Add(new UrlRewriteRule("/Intell/Controls/ContextMenu/Demo", "/Document/Intell.Controls.ContextMenu/ContextMenu.Demo.aspx"));

                    //Menu
                    urlRewriter.Add(new UrlRewriteRule("/Intell/Controls/Menu",      "/Document/Intell.Controls.Menu/Menu.aspx"));
                    urlRewriter.Add(new UrlRewriteRule("/Intell/Controls/Menu/Demo", "/Document/Intell.Controls.Menu/Menu.Demo.aspx"));



                    //NumericUpDown
                    urlRewriter.Add(new UrlRewriteRule("/Intell/Controls/NumericUpDown",      "/Document/Intell.Controls.NumericUpDown/NumericUpDown.aspx"));
                    urlRewriter.Add(new UrlRewriteRule("/Intell/Controls/NumericUpDown/Demo", "/Document/Intell.Controls.NumericUpDown/NumericUpDown.Demo.aspx"));
                    //Slideshow
                    urlRewriter.Add(new UrlRewriteRule("/Intell/Controls/Slideshow",      "/Document/Intell.Controls.Slideshow/Slideshow.aspx"));
                    urlRewriter.Add(new UrlRewriteRule("/Intell/Controls/Slideshow/Demo", "/Document/Intell.Controls.Slideshow/Slideshow.Demo.aspx"));

                    //TagsInput
                    urlRewriter.Add(new UrlRewriteRule("/Intell/Controls/TagsInput",      "/Document/Intell.Controls.TagsInput/TagsInput.aspx"));
                    urlRewriter.Add(new UrlRewriteRule("/Intell/Controls/TagsInput/Demo", "/Document/Intell.Controls.TagsInput/TagsInput.Demo.aspx"));
                    //TargetPopup
                    urlRewriter.Add(new UrlRewriteRule("/Intell/Controls/TargetPopup",      "/Document/Intell.Controls.TargetPopup/TargetPopup.aspx"));
                    urlRewriter.Add(new UrlRewriteRule("/Intell/Controls/TargetPopup/Demo", "/Document/Intell.Controls.TargetPopup/TargetPopup.Demo.aspx"));
                    
                    //urlRewriter.Add(new RewriteRule("/Portal", "/Portal/document.html"));

                    urlRewriter.Add(new UrlRewriteRule("/Controls/NumericUpDown/demo", "/Controls/NumericUpDown/demo.aspx"));
                    urlRewriter.Add(new UrlRewriteRule("/Controls/TagsInput/demo", "/Controls/TagsInput/demo.aspx"));
                    urlRewriter.Add(new UrlRewriteRule("/Controls/TargetPopup/demo", "/Controls/TargetPopup/TargetPopupDemo.aspx"));

                    urlRewriter.Add(new UrlRewriteRule("/Controls/Slideshow/demo", "/Controls/Slideshow/SlideshowDemo.aspx"));
                    urlRewriter.Add(new UrlRewriteRule("/Controls/Menu/demo", "/Controls/Menu/MenuDemo.aspx"));

                    urlRewriter.Add(new UrlRewriteRule("/download", "/download.aspx"));


                    //urlRewriter.Add(new UrlRewriteRule("/products/[*]", "/products/products.aspx",  UrlRewriteRuleAction.Rewrite));

                }
                return urlRewriter;
            }
        }

        protected void Application_BeginRequest(object sender, EventArgs e) {


            if (Request.RawUrl == "/.well-known/acme-challenge/YVwOIOUc5YLmMi9UPLlfHnxLvuKtHAhls7QEuXZkMFs") {
                Response.Write("YVwOIOUc5YLmMi9UPLlfHnxLvuKtHAhls7QEuXZkMFs.qPUheL3087MJ3Xqh9hYIdWweaOmz7M6DXsvWfORlzcI");
                Response.End();
            }

            if (Request.RawUrl == "/.well-known/acme-challenge/pzZW_AZIgXtYd6y3A1cnCobrv-WbvreGXyg3tG2OpvY") {
                Response.Write("pzZW_AZIgXtYd6y3A1cnCobrv-WbvreGXyg3tG2OpvY.qPUheL3087MJ3Xqh9hYIdWweaOmz7M6DXsvWfORlzcI");
                Response.End();
            }


            var result = UrlRewriter.Rewrite(Context);
            if (result == null) UrlRewriter.RewriteDefaultFile(Context, UrlRewriteRuleAction.Rewrite);
        }
    }
}
