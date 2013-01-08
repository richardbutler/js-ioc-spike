(function() {

    Custom = {};

    Custom.ListViewItemRenderer = PR.ListViewItemRenderer.extend({

        template: _.template( $( "#custom-list-item-tmpl" ).html() )

    });

})();