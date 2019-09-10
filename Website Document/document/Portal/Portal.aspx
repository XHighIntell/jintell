<%@ Page Language="C#" AutoEventWireup="false"%>
<%@ Register Src="~/bin/Controls/Nav-Bar.ascx" TagPrefix="uc1" TagName="NavBar" %>

<!DOCTYPE html>
<html>
<head runat="server">
    <title></title>
    <script src="/static/lib/jquery-3.3.1.min.js"></script>
    <script src="/static/lib/docjs.js"></script>
    <script src="/static/lib/highlight.pack.js"></script>
    
    <link href="/static/css/global.css" rel="stylesheet" />
    <link href="/static/css/docjs.css" rel="stylesheet" />
    <link href="/static/css/hljs.css" rel="stylesheet" />

    <style>
        .document-session>.title{padding:15px 0;font-size:40px;word-wrap:break-word;word-break:break-all;text-align:center}
    </style>
</head>
<body>
    <uc1:NavBar runat="server" ID="NavBar" />
    
    <div class="document-session Content">
        <div class="title">Portal</div>
        <div id="document"></div>
    </div>

    <script src="/document/Portal/Portal-doc.js"></script>
    <script>
        $('#document').append(docjs.generate(o));
    </script>
</body>
</html>
