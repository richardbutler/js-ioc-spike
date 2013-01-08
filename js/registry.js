(function() {

    var WiringProxy = function( target ) {
        this.target = target;
    };

    _.extend( WiringProxy.prototype, {

        /**
         * Wire a configuration object into this class. Uses property values to
         * resolve object references on object creation.
         *
         *      PR.registry.config({
         *          "StoreView": PR.StoreView,
         *          "ListView": {
         *              "class": PR.ListView
         *              "itemRenderer": PR.ListItemRenderer
         *          }
         *      });
         *
         *      PR.StoreView = PR.View.extend({
         *          wiringConfig: {
         *              componentClasses: [ "ListView" ]
         *          }
         *      });
         *
         * @param config
         */
        wire: function( config ) {
            var key, lookupKey, i, value;

            for ( key in config ) {
                if ( config.hasOwnProperty( key ) ) { // Safeguard
                    lookupKey = config[ key ];

                    if ( _.isArray( lookupKey ) ) {
                        value = [];

                        for ( i = 0; i < lookupKey.length; i++ ) {
                            value.push( this.resolveWiring( lookupKey[ i ] ) );
                        }
                    }

                    else {
                        value = this.resolveWiring( lookupKey );
                    }

                    this.target[ key ] = value;
                }
            }
        },

        /**
         * Resolve a lookup from within the config registry.
         *
         *      PR.registry.config({
         *          "ListView": PR.ListView
         *      });
         *
         *      proxy.resolveWiring( "ListView" ) => PR.ListView
         *
         * @param lookupKey
         * @return {*}
         */
        resolveWiring: function( lookupKey ) {
            var value = _.isString( lookupKey ) ? PR.registry.get( lookupKey ) : lookupKey;

            if ( _.isObject( value ) && value.hasOwnProperty( "class" ) ) {
                value = this.createFactory( value[ "class" ], value );
            } else if ( _.isFunction( value ) ) {
                value = this.createFactory( value );
            }

            return value;
        },

        /**
         * Create a factory function for creation of referenced classes.
         *
         * @param clazz
         * @param params
         *
         * @return {Function}
         */
        createFactory: function( clazz, params ) {
            return function( options ) {
                var inst = new clazz( options );

                if ( params ) {
                    _.extend( inst, params );
                }

                return inst;
            }
        }

    });

    /**
     * Acts as a config registry for component instances.
     */

    PR.registry = {

        table: {},

        register: function( id, object ) {
            this.table[ id ] = object;
        },

        get: function( id ) {
            var chain = id.split( "." ),
                value = this.table;

            while ( chain.length ) {
                id = chain.shift();
                value = value[ id ];
            }

            return value;
        },

        config: function( config ) {
            for ( var key in config ) {
                this.register( key, config[ key ] );
            }
        },

        proxy: WiringProxy

    };

})();