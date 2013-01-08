var PR = (function() {

    var PR = {};

    PR.View = function() {
        Backbone.View.apply( this, arguments );

        this._setupWiring();
    };

    PR.View.extend = Backbone.View.extend;

    // Just extend Backbone.View.prototype?
    _.extend( PR.View.prototype, Backbone.View.prototype, {

        /**
         * Wire all properties of an entire config object.
         */
        wiringId: null,

        /**
         * Explicit properties to wire.
         */
        wiringConfig: null,

        /**
         * Set up pre-defined wiring.
         *
         * @private
         */
        _setupWiring: function() {

            // We need to wire by ID. This will point to an object registered
            // with PR.registry.config({ wiringId: {} });
            if ( this.wiringId ) {
                var config = PR.registry.get( this.wiringId );
                this.wire( config );
            }

            else if ( _.isObject( this.wiringConfig ) ) {
                this.wire( this.wiringConfig );
            }
        },

        /**
         * Wire a config explicitly - can be done at any time, including after
         * the object has been created.
         *
         * @param config
         */
        wire: function( config ) {
            var proxy = new PR.registry.proxy( this );
            proxy.wire( config );
        }

    });

    return PR;

})();