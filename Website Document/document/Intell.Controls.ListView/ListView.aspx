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
        .document-session{position:relative}
        .document-session>.title{padding:15px 0 5px;font-size:40px;word-wrap:break-word;word-break:break-all;text-align:center}
        .document-session>.tags{display:flex;flex-wrap:wrap;justify-content:center}
        .document-session>.tags>.tag{margin:2px 4px;padding:0 8px;border:1px solid rgba(0,0,0,.5);border-radius:3px}
        .document-session>.information{padding:10px;text-align:right}
    </style>
</head>
<body>
    <uc1:NavBar runat="server" ID="NavBar" />
    


    <div class="document-session Content">
        <div class="title">TreeView</div>

        <div class="tags">
            <div class="tag">Namespace</div>
            <div class="tag">Version 0.0.0</div>
            <div class="tag">UI/UX</div>
        </div>
        <div class="information">
            <div>intell.controls.TreeView</div>
            <div>November 5th 2020</div>
        </div>
        <div id="document"></div>
    </div>

    <script src="/document/Intell.Controls.TreeView/TreeView-doc.js"></script>
    <script>
        $('#document').append(docjs.generate(o));
    </script>
</body>
</html>
