

!function(element) {
    var $element = $(element); // the container have overflow equal hidden
    var $scrollbar = $element.find('.X-Scrollbar');
    var $offset = $scrollbar.find('.Offset');


    $element.on('mousewheel', function(ev) {
        var e = ev.originalEvent;

        var maxScrollTop = element.scrollHeight - element.clientHeight;

        if (e.wheelDeltaY > 0) {
            if (element.scrollTop == 0) return;

            element.scrollTop -= e.wheelDeltaY;
        } else {
            if (element.scrollTop == maxScrollTop) return;

            element.scrollTop -= e.wheelDeltaY;
        }


        $element.find('.X-Scrollbar').css('top', element.scrollTop);



        $element.find('.X-Scrollbar .Offset').css('top', element.scrollTop / maxScrollTop * (element.clientHeight - $element.find('.X-Scrollbar .Offset').height()) + 'px');


        e.preventDefault();

        console.log(maxScrollTop)
    });
    $scrollbar.mousedown(function(ev) {
        var e = ev.originalEvent;

        if (e.target != this) return;

        $offset.css('top', e.offsetY - $offset.height() / 2);

        var maxScrollTop = element.scrollHeight - element.clientHeight;

        var offsetTop = e.offsetY - $offset.height() / 2;

        element.scrollTop = offsetTop * maxScrollTop / (element.clientHeight - $offset.height());
        $scrollbar.css('top', element.scrollTop);
        $offset.css('top', element.scrollTop / maxScrollTop * (element.clientHeight - $offset.height()) + 'px');


        $offset.triggerHandler(ev);
    })

    $offset.draggable({
        axis: "y",
        
        containment: "parent",
        drag: function(e, ui) {
            
            // let find scroll percent
    
            var maxScrollTop = element.scrollHeight - element.clientHeight;
    
            var offsetTop = ui.position.top;
            
    
            // element.scrollTop / maxScrollTop * (element.clientHeight - $offset.height()) == offsetTop
            //console.log(offsetTop, ui.position.top);
            
            element.scrollTop = offsetTop * maxScrollTop / (element.clientHeight - $offset.height());
            $scrollbar.css('top', element.scrollTop);
            $offset.css('top', element.scrollTop / maxScrollTop * (element.clientHeight - $offset.height()) + 'px');
    
        }
    });



    return;

    /***************** */
    var isDragging = false;
    var draggingElement = document;

    /** @param {HTMLElement} element */
    function startDrag(element) {
        draggingElement = element;
        isDragging = true;
    }
    function stopDrag() {
        //draggingElement = element;
        isDragging = false;
    }


    $(document).on('mousemove', function(ev) {
        var e = ev.originalEvent;

        if (isDragging == true) {

            $(draggingElement).offset({ top: e.pageY });

        }

        //console.log(e.clientY, e.offsetY);
    });

    $(document).on('mousedown', '.Offset', function(ev) {

        return;
        var e = ev.originalEvent;
        console.log('mousedown')

        startDrag(e.target);
        e.preventDefault();
    });
    $(document).on('mouseup', function(ev) {
        stopDrag();
        console.log('mouseup')
    });
    $(document).on('mousedown', function() {
        console.log('document.mousedown');
    });
}($('#A')[0]);













