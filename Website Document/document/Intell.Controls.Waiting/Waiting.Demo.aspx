<%@ Page Language="C#" AutoEventWireup="false"%>
<%@ OutputCache Duration="36000" VaryByParam="none"  %>
<%@ Register Src="~/bin/Controls/Nav-Bar.ascx" TagPrefix="uc1" TagName="NavBar" %>

<!DOCTYPE html>

<html>
<head runat="server">
    <title>Intell UI API Documentation</title>
    <script src="/static/lib/jquery-3.3.1.min.js"></script>
    <script src="/static/lib/intell.js"></script>
    <script src="/static/lib/highlight.pack.js"></script>
    <script src="/static/lib/docjs.js"></script>

    <script src="/static/js/live-example.js"></script>

    <link href="/static/css/global.css" rel="stylesheet"/>
    <link href="/static/css/docjs.css" rel="stylesheet" />
    <link href="/static/css/hljs.css" rel="stylesheet"/>

    <style>
        .example-template{margin-bottom:20px}
        .example-template>.title{margin:10px 0;font-size:1.3em;font-weight:bold}
    </style>
        
    <script>
        $(document).ready(function () { liveexample.auto() });
    </script>
</head>
<body>
    <uc1:NavBar runat="server" ID="NavBar" />

    <div class="example-template Content">
        <div class="title">Office themes</div>
        <div id="Example1" data-code-ref="Example1">
            <style>
                #Example1 .box{display:flex;flex-direction:column;background:#d6dbe9}
                #Example1 .box .item{position:relative;height:70px;margin:2px 4px;border:1px solid #000}

                #Example1 .X-Waiting{position:absolute;height:5px;top:50%;overflow:hidden;left:0;right:0}
                #Example1 .X-Waiting .Cycle{position:absolute;left:-10px;width:5px;height:5px;background:#00abff;border-radius:1px;
                    animation:5s pWz3 infinite cubic-bezier(0,0.85,1,0.15),2s pWz4 infinite cubic-bezier(0,0.85,1,0.15)}
                @keyframes pWz3{0%{left:-10px}70%{left:100%}100%{left:100%}}
                @keyframes pWz4{0%{top:-10px}70%{top:100%}100%{top:0}}
            </style>

            <div class="box">
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
            </div>
            
            

            <script>
                $(document).ready(function() {
                    var $example = $('#Example1');
                    var $box = $example.find('.box');
                    var $action = $example.find('.action-do5s');

                    $box.on('click', '.item', function() {
                        var element = this;

                        if (element.loading == true) return;
                        element.loading = true;

                        var w = intell.controls.Waiting.startWait(this);

                        setTimeout(function() {
                            element.loading = false;

                            w.enabled = false;
                        }, 100000);
                    });
                });
            </script>
        </div>

        <div class="item-code-block">
            <header>Source code - Office themes</header>
            <code data-code-name="Example1"></code>    
        </div>
    </div>


    <div class="example-template Content">
        <div class="title">Custom Style themes</div>
        <div id="Example2" data-code-ref="Example2">
            <style>

                #Example2 .box{display:flex;background:#d6dbe9}
                #Example2 .box.WAITING{position:relative}
                #Example2 .box .item{position:relative;width:80px;height:80px;margin:4px;border:1px solid #000}


                #Example2 .X-Waiting-Custom{position:absolute;left:0;top:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center}
                #Example2 .X-Waiting-Custom .Cycle1{position:absolute;width:35px;height:35px;animation:x-waiting-spin 1s linear infinite;border:5px solid transparent;border-top:5px solid #00abff;border-radius:50%}
                #Example2 .X-Waiting-Custom .Cycle2{position:absolute;width:24px;height:24px;animation:x-waiting-spin 1.3s linear infinite;border:3px solid transparent;border-top:3px solid #0066ff    ;border-radius:50%}
               

                @keyframes x-waiting-spin {
                    0%{transform:rotate(0deg)}
                    100%{transform:rotate(360deg)}
                }
                    

                
            </style>

            <div class="box" style="">
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>

            </div>
            <div class="X-Waiting-Custom" style="display:none">
                <div class="Cycle1"></div>
                <div class="Cycle2"></div>
            </div>

            <script>
                
                $(document).ready(function() {
                    var $example = $('#Example2');
                    var $box = $example.find('.box');
                    var elementWaiting = $example.find('.X-Waiting-Custom').remove()[0];

                    var loading = false;

                    $box.on('click', '.item', function() {
                        var element = this;

                        if (element.loading == true) return;
                        element.loading = true;

                        var w = intell.controls.Waiting.startWait(this, elementWaiting);

                        setTimeout(function() {
                            element.loading = false;

                            w.enabled = false;
                        }, 10000);
                    });
                });


            </script>
        </div>

        <div class="item-code-block">
            <header>Source code - Office themes</header>
            <code data-code-name="Example2"></code>    
        </div>
    </div>

</body>
</html>
