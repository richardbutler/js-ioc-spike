PR.registry.config({
    Container: {
        componentClasses: [
            "ListView"
        ]
    },
    ListView: {
        "class": PR.ListView,
        itemRenderer: PR.ListViewItemRenderer
    }
});

// Test wiring a custom implementation
if ( window.location.href.indexOf( "?custom" ) >= 0 ) {
    PR.registry.config({
        Container: {
            componentClasses: [
                "ListView",
                PR.TempView
            ]
        },
        ListView: {
            "class": PR.ListView,
            itemRenderer: Custom.ListViewItemRenderer
        }
    });
}