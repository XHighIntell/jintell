<%@ Page Language="C#" AutoEventWireup="false" %>
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
        .item-code-block{margin:10px}
    </style>

</head>
<body>
    <uc1:NavBar runat="server" ID="NavBar" />
    <div data-code-ref="Example1">
        <style>
            #slideshow1{position:relative}
            #slideshow1 .X-Slideshow-Items{height:500px}
            #slideshow1 .X-Slideshow-Item{display:none;position:absolute;left:0;right:0;top:0;bottom:0;opacity:0;overflow:hidden}
            #slideshow1 .X-Slideshow-Item.ACTIVE{z-index:3}
            #slideshow1 .X-Slideshow-Item.IN{transition:opacity 1s;opacity:1}
            #slideshow1 .X-Slideshow-Item.OUT{transition:opacity 1s;opacity:0;z-index:0}


            /*Optional Buttons*/
            #slideshow1>.Button{position:absolute;top:50%;display:flex;width:40px;height:80px;align-items:center;justify-content:center;background-color:rgba(0,0,0,.4);color:#00aeff;font-family:fontello;border:solid 1px rgba(255,255,255,.15);opacity:0;transition:all .4s;cursor:pointer;font-size:39px;transform:translateY(-50%);z-index:10}
            #slideshow1>.Button:hover{color:#91e4ff}
            #slideshow1:hover>.Button{opacity:1}
            #slideshow1 .X-Prev{left:40px}
            #slideshow1 .X-Next{right:40px}

            /*Optional Scrolls*/
            #slideshow1 .X-Scrolls{position:absolute;left:0;right:0;bottom:0;display:flex;justify-content:center;z-index:10}
            #slideshow1 .X-Scrolls>.X-Scroll{position:relative;display:flex;padding:9px 0;margin:0 5px;cursor:pointer}
            #slideshow1 .X-Scrolls>.X-Scroll::before{content:"";display:block;width:60px;height:6px;background:rgba(255,255,255,.3);outline:1px solid rgba(0,0,0,.3)}
            #slideshow1 .X-Scrolls .X-Scroll::after{content:"";display:none;position:absolute;width:0%;height:6px;left:0;background:#00aeff}
            #slideshow1 .X-Scrolls .X-Scroll.ACTIVE::before{background:#0e86ca}
            #slideshow1 .X-Scrolls .X-Scroll.ACTIVE::after{display:block}
            #slideshow1 .X-Scrolls .X-Scroll.ACTIVE.RUNNING::after{width:100%;transition:width linear;transition-duration:inherit}

            
            /* User code start from here. You can customize in your own ways */
            #slideshow1 .X-Slideshow-Item>.slide-bg{position:absolute;left:-80px;right:-80px;top:0;bottom:0}
            #slideshow1 .X-Slideshow-Item.NEXT-IN .slide-bg{animation:next-in 4s ease-out backwards}
            #slideshow1 .X-Slideshow-Item.PREV-IN .slide-bg{animation:prev-in 4s ease-out backwards}
            @keyframes next-in {
                0%{transform:translateX(-80px)}
                20%{transform:translateX(-20px)}
                100%{transform:translateX(0)}
            }
            @keyframes prev-in {
                0%{transform:translateX(80px)}
                20%{transform:translateX(20px)}
                100%{transform:translateX(0)}
            }

            #slideshow1 .slide-content{position:absolute;left:0;top:0;right:0;bottom:0;max-width:1280px;margin:0 auto;padding-left:40px;padding-right:40px}


            #slideshow1 .slide1 .slide-bg{background:center 0 url(/Document/Intell.Controls.Slideshow/static/1.jpg) no-repeat;background-size:1500px auto} 
            #slideshow1 .slide1 .slide-content{opacity:0;transition:opacity 1s 1s}
            #slideshow1 .slide1 .slide-content>.title{margin-top:100px;text-align:center;font-size:34px;color:#fff;text-shadow:0px 2px 0px #000}
            #slideshow1 .slide1.IN .slide-bg{transition:background-position-y 2s;background-position-y:-200px}
            #slideshow1 .slide1.IN .slide-content{opacity:1}

            #slideshow1 .slide3 .slide-bg{}
            #slideshow1 .slide3 .slide-bg>.bg{width:100%;height:100%;transform:translateX(15px) translateY(40px)}
            #slideshow1 .slide3 .slide-bg>.bg>.slide-bg-image{position:absolute;left:-100px;right:-100px;top:-200px;bottom:-200px;background:center center url(/Document/Intell.Controls.Slideshow/static/3.jpg) no-repeat;background-size:1550px auto}
            #slideshow1 .slide3 .slide-bg>.bg>video{position:absolute;left:calc(50% - 615px);top:95px;height:413px}

            #slideshow1 .slide4 .slide-bg{display:flex;align-items:center;flex-direction:column}
            #slideshow1 .slide4 .slide-bg:before{content:"";position:absolute;left:0;top:0;right:0;bottom:0;background:radial-gradient(rgba(0,0,0,.3) 15%,transparent 15%),3px 3px radial-gradient(rgba(0,0,0,.3) 15%, transparent 15%);background-size:6px 6px}
            #slideshow1 .slide4 .slide-bg>video{margin-top:-30px;transition:margin-top 4s}
            #slideshow1 .slide4 .slide-content{opacity:0;transition:opacity 1s 3s}
            #slideshow1 .slide4 .slide-content>.title-svg{display:block;margin:50px auto 0;height:80px}
            #slideshow1 .slide4 .slide-content>.title-svg>text{font-size:40px;text-anchor:middle;stroke:white;font-weight:bolder;fill:rgba(0,0,0,.3)}
            #slideshow1 .slide4 .slide-content>.separate{height:50px;margin:15px 0;background:center 0 url(/Document/Intell.Controls.Slideshow/static/4-title.png) no-repeat;background-size:auto 30px}

            #slideshow1 .slide4.IN .slide-bg>video{margin-top:-300px}
            #slideshow1 .slide4.IN .slide-content{opacity:1}
        </style>

        <div id="slideshow1" class="X-Slideshow">
            <div class="X-Slideshow-Items">
                <div class="X-Slideshow-Item slide1">
                    <div class="slide-bg"></div>
                    <div class="slide-content">
                        <div class="title">Lets explored</div>
                    </div>
                </div>
                <div class="X-Slideshow-Item slide3">
                    <div class="slide-bg">
                        <div class="bg">
                            <div class="slide-bg-image"></div>
                            <video loop="" playsinline="" autoplay="">
                                <source src="/Document/Intell.Controls.Slideshow/static/3-sword.webm" type="video/webm">
                                <source src="/Document/Intell.Controls.Slideshow/static/3-sword.mp4" type="video/mp4">
                            </video>
                        </div>
                    </div>
                
                </div>
                <div class="X-Slideshow-Item slide4">
                    <div class="slide-bg">
                        <video loop="" playsinline="" autoplay="">
                            <source src="/Document/Intell.Controls.Slideshow/static/4.webm" type="video/webm">
                            <source src="/Document/Intell.Controls.Slideshow/static/4.mp4" type="video/mp4">
                        </video>
                    </div>
                    <div class="slide-content">
                        <svg class="title-svg" width="100%">
                            <text x="50%" y="70%">Wrath of Fire Never Rest</text>
                        </svg>
                        <div class="separate"></div>
                    </div>
                </div>
            </div>

            <!-- Remove if you don't want prev and next button-->
            <div class="X-Prev Button"></div>
            <div class="X-Next Button"></div>

            <!-- Remove if you don't want scroll -->
            <div class="X-Scrolls"></div>
        </div>

        <script>
            $(document).ready(function () {
                var slideshow1 = window.slideshow1 = intell.controls.Slideshow($('#slideshow1'), { index: 0, interval: 5000 });
                slideshow1.start();

                slideshow1.onchange(function (event) {
                    if ($(event.target).is('.slide4') == true) {
                        this.interval = 10000;
                    } else {
                        this.interval = 5000;
                    }
                    console.log(event);
                });
            });
        </script>

    </div>

    <div class="item-code-block">
        <header>Source code - A Completed Application</header>
        <code data-code-name="Example1"></code>    
    </div>

    
    <div data-code-ref="Example2">
        <style>
            #slideshow2{position:relative}
            #slideshow2 .X-Slideshow-Items{height:500px}
            #slideshow2 .X-Slideshow-Item{display:none;position:absolute;left:0;right:0;top:0;bottom:0;opacity:0;overflow:hidden}
            #slideshow2 .X-Slideshow-Item.ACTIVE{z-index:3}
            #slideshow2 .X-Slideshow-Item.IN{transition:opacity 1s;opacity:1}
            #slideshow2 .X-Slideshow-Item.OUT{transition:opacity 1s;opacity:0;z-index:0}


            /*Optional Buttons*/
            #slideshow2>.Button{position:absolute;top:50%;display:flex;width:40px;height:80px;align-items:center;justify-content:center;background-color:rgba(0,0,0,.4);color:#00aeff;font-family:fontello;border:solid 1px rgba(255,255,255,.15);opacity:0;transition:all .4s;cursor:pointer;font-size:39px;transform:translateY(-50%);z-index:10}
            #slideshow2>.Button:hover{color:#91e4ff}
            #slideshow2:hover>.Button{opacity:1}
            #slideshow2 .X-Prev{left:40px}
            #slideshow2 .X-Next{right:40px}

            /*Optional Scrolls*/
            #slideshow2 .X-Scrolls{position:absolute;left:0;right:0;bottom:0;display:flex;justify-content:center;z-index:10}
            #slideshow2 .X-Scrolls>.X-Scroll{position:relative;display:flex;padding:9px 0;margin:0 5px;cursor:pointer}
            #slideshow2 .X-Scrolls>.X-Scroll::before{content:"";display:block;width:60px;height:6px;background:rgba(255,255,255,.3)}
            #slideshow2 .X-Scrolls .X-Scroll.ACTIVE::before{background:#0e86ca} 
            #slideshow2 .X-Scrolls .X-Scroll>.X-Bar{content:"";display:none;position:absolute;width:0%;left:0;background:#00aeff;height:6px}
            #slideshow2 .X-Scrolls .X-Scroll.ACTIVE>.X-Bar{display:block}
            #slideshow2 .X-Scrolls .X-Scroll.ACTIVE.RUNNING>.X-Bar{width:100%;transition:width linear}

            /* User code start from here. You can customize in your own ways */
            #slideshow2 .X-Slideshow-Item>.slide-bg{position:absolute;left:0;right:0;top:0;bottom:0}

            #slideshow2 .slide1 .slide-bg{background:center 0 url(/Document/Intell.Controls.Slideshow/static/11.jpg) no-repeat;background-size:auto 100%} 
            #slideshow2 .slide2 .slide-bg{background:center 0 url(/Document/Intell.Controls.Slideshow/static/22.jpg) no-repeat;background-size:auto 100%} 
        </style>

        <div id="slideshow2" class="X-Slideshow">
            <div class="X-Slideshow-Items">
                <div class="X-Slideshow-Item slide1">
                    <div class="slide-bg"></div> 
                </div>
                <div class="X-Slideshow-Item slide2">
                    <div class="slide-bg"></div>
                </div>
            </div>

            <!-- Remove if you don't want scroll -->
            <div class="X-Scrolls"></div>
            
        </div>

        <script>
            $(document).ready(function () {
                var slideshow2 = intell.controls.Slideshow($('#slideshow2'), { interval: 5000 });
                slideshow2.start();
            });
        </script>
    </div>

    <div class="item-code-block">
        <header>Source code - A Simple Template</header>
        <code data-code-name="Example2"></code>    
    </div>

    <script>
        liveexample.auto();
    </script>
</body>
</html>
