var store= (function() {
    var lib={};

    for (var x in lib){console.log(x)};

    return{
        hasData: function(){ length(lib) > 0 },
        log: function(x){ console.log(x); },
        newAttr: function( x ){ lib.x },
        setter: function( x,y ){ lib.x = y; },
        setLib: function(x,y){ lib[x]=y},
        getter: function( x ){ return lib.x },
        getLib: function(){ return lib },
    };
})();

