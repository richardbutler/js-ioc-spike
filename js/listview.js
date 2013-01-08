(function() {

    PR.ListViewItemRenderer = PR.View.extend({

        template: _.template( $( "#list-item-tmpl" ).html() ),

        render: function() {
            var html = this.template( this.model.toJSON() );

            this.setElement( $( html ) );

            return this;
        }

    });

    PR.ListView = PR.View.extend({

        tagName: "ul",

        /**
         * Wire a full configuration object.
         */
        wiringId: "ListView",

        /**
         * Wire explicit properties from the config.
         */
        wiringConfig: {
            // Dot notation will be resolved
            itemRenderer: "ListView.itemRenderer"
        },

        initialize: function( options ) {
            this.collection = options.model.get( "items" );
        },

        render: function() {
            var self = this;

            this.$el.empty();
            this.renderers = [];

            this.collection.forEach( function( model ) {
                var renderer = new self.itemRenderer({
                    model: model
                });

                self.renderers.push( renderer );

                self.$el.append( renderer.render().$el );
            });

            return this;
        }

    });

    PR.TempView = PR.View.extend({

        render: function() {
            this.$el.css({
                "background-color": "#ff0000",
                "width": "100px",
                "height": "100px",
                "position": "absolute",
                "top": 0,
                "right": 0
            });

            return this;
        }

    });

})();