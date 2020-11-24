<%@ Page Language="C#" AutoEventWireup="true" %>

<!DOCTYPE html>

<html>
<head runat="server">
    <title>Xortal</title>
    <!-- 3 important scripts -->
    <script src="/static/lib/jquery-3.3.1.min.js"></script>
    <script src="/static/lib/intell.min.js"></script>
    <script src="/static/lib/portal.js"></script>

    <!-- 1 important style sheet -->
    <link href="/static/css/portal.css" rel="stylesheet" />

    
    <!-- place resources, that share for all applications-->
    <script src="/static/js/__.js"></script>
    <link href="/xortal/static/css/portal.css" rel="stylesheet" />
    

</head>
<body>
    <div class="topbar">
        <a class="topbar-logo" href="/">Xortal - Warehouse</a>
        <div class="spring"></div>
    </div>
    

    <div class="X-Portal">
        <div class="Sidebar">
            <div class="Sidebar-Top">
                <div class="Collapse-Button" tabindex="0"></div>
            </div>
            <div class="Sidebar-Middle">
                <!-- Portal give the best ways to customize ui -->
                <div class="Group" data-group="Tools">
                    <header>
                        <div class="Name">Tools</div>
                    </header>
                    <div class="Apps"></div>
                </div>
                <!--  -->
            </div>
        </div>
    </div>


    <script>
        var $portal = $('.X-Portal');
        var portal = window.portal = new Portal($portal[0]);

        $(document).ready(function() {
            /* Allow portal to load/save collapsed key on localStorage */
            portal.sidebar.enableCollapseStorage('portal.sidebar.collapsed');
            

            /* add a listener to customize url for current state of portal. */
            portal.onchange(function(e) {

                // location.pathname = "/xortal/storage-image/svg"
                
                var applicationPath = location.pathname.split('/').splice(2).join('/'); // "storage-image/svg"

                // if url open an portal 
                if (applicationPath && applicationPath.split('/')[0] == e.newApplication.manifest.id)
                    return;

                applicationPath = e.newApplication.manifest.id;
                var url = '/xortal/' + applicationPath;

                history.replaceState(null, document.title, url);
            });

            var applicationId = location.pathname.split('/')[2];
            //if (applicationId) applicationId = applicationId.split('/')[0];

            
            portal.open(applicationId);
        })
    </script>
    <script src="/xortal/applications/storage-image/app.js"></script>
    <script src="/xortal/applications/themes/themes.js"></script>
    <script src="/xortal/applications/transfusions/transfusions.js"></script>
    

</body>
</html>
