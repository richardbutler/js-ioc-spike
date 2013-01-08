(function() {

    PR.Container = PR.View.extend({

        wiringId: "Container",

        render: function() {
            var self = this;

            this.componentClasses.forEach( function( componentFactory ) {
                var instance = componentFactory({
                    model: self.model
                });
                self.$el.append( instance.render().$el );
            });
        }

    });

})();