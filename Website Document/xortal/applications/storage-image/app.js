

!function() {

    var pathname = new URL(document.currentScript.src).pathname;
    var pathfolder = pathname.substr(0, pathname.lastIndexOf('/'));


    var manifest = {
        id: "storage-image",
        name: "Storage Image",
        title: "Storage contain tons of useful images",
        icon: pathfolder + "/icon2.svg",
        content: {
            html: pathfolder +  "/ui.html"
        }
    }


    /** @type Portal */
    var portal = window.portal;
    portal.addManifest(manifest, function(application) {
        //return;
        var $root = $(application.root).find('#Storage-Image');
        var $groupAbstract = $root.find('.group.abstract').removeClass('abstract').remove();
        

        application.setui = function(storage) {
            storage.images.forEach(function(value) {
                var $group = $groupAbstract.clone();
                $group.find('>.name').html(value.name);

                var $images = $group.find('.images').html('');

                value.files.forEach(function(item) {

                    var filename = item.substr(item.lastIndexOf('/') + 1);
                    var fileNameWithoutExtension = filename.split('.')[0];

                    $images.append(`<a class="item" href="${item}" target="_blank">                
    <div class="img" style="background-image:url('${item}')"></div>
    <div class="name">${fileNameWithoutExtension}</div>
</a>`);
                });




                $root.append($group)

            });
        }


        
        return new Promise(function(resolve, reject) {

            intell.get('/api/xortal/storage?action=getAllImage').load(function(e) {
                application.setui(JSON.parse(this.responseText));

                resolve();
            }).error(function(e) {
                reject();
            }).send();
        })
    });
}();