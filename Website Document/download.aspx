<%@ Page Language="C#" AutoEventWireup="false"%>
<%@ Register Src="~/bin/Controls/Nav-Bar.ascx" TagPrefix="uc1" TagName="NavBar" %>

<!DOCTYPE html>
<html>
<head runat="server">
    <title>IntellJs API Documentation</title>
    <link href="/static/css/global.css" rel="stylesheet" />
    <style>        
        .document-session{max-width:980px}
        .document-session>.title{padding:15px 0;font-size:40px;word-wrap:break-word;word-break:break-all;text-align:center}
        .document-session .name{font-size:30px;text-decoration:underline}
        .document-session .list{margin:5px 0 20px 0;padding-left:40px}
        .document-session .list>.item{display:list-item;list-style-type:decimal;font-size:1.2em}
        .document-session .list>.item>a{display:inline-block;padding:2px 10px;color:#000;border:dashed 1px transparent;text-decoration:none}
        .document-session .list>.item>a:hover{border-color:#00bcf2}        
    </style>
</head>
<body>
    <uc1:NavBar runat="server" id="NavBar" />
    
    <div class="document-session Content">
        <div class="title">Download</div>
        
        
        <div class="group">
            <div class="name">Compressed</div>
            <div class="list">
                <div class="item">
                    <a class="link" href="/static/download/intell-1.0.0.zip">Core & Intell.Controls</a>
                </div>
            </div>
        </div>
    </div>

</body>
</html>
