describe( "registry", function() {

    beforeEach( function() {
        PR.registry.config({
            thing: "stuff",
            deep: {
                path: {
                    to: "value"
                }
            }
        });
    });

    it( "should register a config", function() {
        expect( PR.registry.get( "thing" ) ).toBe( "stuff" );
    });

    it( "should read a deep path", function() {
        expect( PR.registry.get( "deep.path.to" ) ).toBe( "value" );
    });

});