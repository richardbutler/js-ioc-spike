(function() {

    /*var listView = new PR.ListView({
        el: "#list",
        collection: new Backbone.Collection([
            { title: "Thing one", description: "This is thing one." },
            { title: "Thing two", description: "This is thing two." },
            { title: "Thing three", description: "This is thing three." }
        ])
    });

    listView.render();*/

    var container = new PR.Container({
        el: "#container",
        model: new Backbone.Model({
            items: new Backbone.Collection([
                { title: "Thing one", description: "This is thing one." },
                { title: "Thing two", description: "This is thing two." },
                { title: "Thing three", description: "This is thing three." }
            ])
        })
    });

    container.render();

})();