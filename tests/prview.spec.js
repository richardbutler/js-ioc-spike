describe( "prview", function() {

    beforeEach( function() {
        PR.registry.config({
            thing: "stuff",
            deep: {
                path: {
                    to: "value"
                }
            },
            testClass: {
                "class": Backbone.View,
                prop: "value"
            },
            testClass2: {
                "class": Backbone.Model,
                prop: "value2"
            }
        });
    });

    it( "should do simple wiring", function() {
        var View = PR.View.extend({
            wiringConfig: {
                test: "thing",
                test2: "deep.path.to"
            }
        });

        var v = new View();

        expect( v.test ).toBe( "stuff" );
        expect( v.test2 ).toBe( "value" );
    });

    it( "should create a factory", function() {
        var View = PR.View.extend({
            wiringConfig: {
                child: "testClass"
            }
        });

        var v = new View();

        expect( _.isFunction( v.child ) );
        expect( v.child() instanceof Backbone.View );
        expect( v.child().prop ).toBe( "value" );
    });

    it( "should respect array wiring", function() {
        var View = PR.View.extend({
            wiringConfig: {
                componentClasses: [
                    "testClass",
                    "testClass2"
                ]
            }
        });

        var v = new View();

        expect( v.componentClasses.length ).toBe( 2 );
        expect( _.isFunction( v.componentClasses[ 0 ] ) );
        expect( _.isFunction( v.componentClasses[ 1 ] ) );
    });

});