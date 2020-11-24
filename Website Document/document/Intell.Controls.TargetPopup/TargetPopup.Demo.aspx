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

    <script>
        $(document).ready(function () { liveexample.auto() });
    </script>
    <style>
        .example-template{margin-bottom:20px}
        .example-template>.title{margin:10px 0;font-size:1.3em;font-weight:bold}
    </style>
        

</head>
<body>
    <uc1:NavBar runat="server" ID="NavBar" />



    <div class="example-template Content">
        <div class="title">Light Themes With Arrow</div>
        <div data-code-ref="Example1">
            <style>
                #popup1{position:absolute;width:300px;height:60px;background:#fff;box-shadow:0 0 2px black;transition:opacity .3s,left 0s,top 0s,visibility 0s .3s;opacity:0}
                #popup1.ACTIVE{opacity:1;transition:opacity .3s,left 0s,top 0s}

                #popup1 .X-Arrow{position:absolute;height:8px;width:8px;box-shadow:1px 1px 1px rgba(0,0,0,.4);background:white}
                
                #popup1 .X-Arrow.DOWN{bottom:-4px;transform:rotate(45deg)}
                #popup1 .X-Arrow.LEFT{left:-4px;transform: rotate(135deg)}
                #popup1 .X-Arrow.UP{top:-4px;transform:rotate(225deg)}
                #popup1 .X-Arrow.RIGHT{right:-4px;transform:rotate(315deg)}
                

                #box-container1 .box{display:inline-block;width:100px;height:100px;margin:10px;border:1px solid}
                #box-container1 .box.ACTIVE{outline:3px dashed #00aee2;outline-offset:-1px}
            </style>

            <div id="box-container1">
                <div class="box"></div>
                <div class="box"></div>
                <div class="box"></div>
                <div class="box"></div>
                <div class="box"></div>
                <div class="box"></div>
                <div class="box"></div>
                <div class="box"></div>     
            </div>
            
            <div id="popup1" style="display:none">
                <span class="X-Arrow"></span>
                <div>Here is popup1</div>
            </div>

            <script>
                var popup1 = intell.controls.TargetPopup($('#popup1'));
                popup1.onshow(function() {
                    console.log('onshow');
                })
                $('#box-container1').on('click', '.box', function(e) {
                    popup1.target = this;

                    var location = popup1.previousSolution.location;
                    

                    var $arrow = popup1.$element.find('>.X-Arrow');
                    intell.controls.Menu.SetArrowDirection($arrow[0], location, $(this).centerOffset());
                    //intell.controls.Menu.SetArrowDirectionAuto($arrow[0], $(this).centerOffset());

                    return;
                    var $arrow = popup1.$element.find('>.X-Arrow').removeClass('LEFT UP RIGHT DOWN').css({ left: '', top: '' });
                    var centerOffset = $(this).centerOffset();
                    centerOffset.left -= $arrow.outerWidth() / 2;
                    centerOffset.top -= $arrow.outerHeight() / 2;
                    


                    if (location <= 3) $arrow.offset({ left: centerOffset.left }).addClass('DOWN');
                    else if (location <= 6) $arrow.offset({ top: centerOffset.top }).addClass('LEFT');
                    else if (location <= 9) $arrow.offset({ left: centerOffset.left }).addClass('UP');
                    else $arrow.offset({ top: centerOffset.top }).addClass('RIGHT');


                });
            </script>
        </div>

        <div class="item-code-block">
            <header>Source code</header>
            <code data-code-name="Example1"></code>    
        </div>
    </div>


    <div class="example-template Content">
        <div class="title">Simple</div>
        <div data-code-ref="Example2">
            <style>
                #popup2{position:absolute;width:300px;height:60px;background:#fff;box-shadow:0 0 2px black;transition:opacity .3s,left 0s,top 0s,visibility 0s .3s;opacity:0}
                #popup2.ACTIVE{opacity:1;transition:opacity .3s,left 0s,top 0s}

                #box-container2 .box{display:inline-block;width:100px;height:100px;margin:10px;border:1px solid}
                #box-container2 .box.ACTIVE{outline:3px dashed #00aee2;outline-offset:-1px}
            </style>

            <div id="box-container2">
                <div class="box"></div>
                <div class="box"></div>
                <div class="box"></div>
                <div class="box"></div>
                <div class="box"></div>
                <div class="box"></div>
                <div class="box"></div>
                <div class="box"></div>     
            </div>
            
            <div id="popup2" style="display:none">
                <div>Here is popup2</div>
            </div>

            <script>
                var popup2 = intell.controls.TargetPopup($('#popup2'), { option: { space: 0 } });

                $('#box-container2').on('click', '.box', function(e) {
                    popup2.target = this;
                });
            </script>
        </div>

        <div class="item-code-block">
            <header>Source code</header>
            <code data-code-name="Example2"></code>    
        </div>
    </div>


</body>
</html>
