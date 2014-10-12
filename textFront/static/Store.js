var store= (function() {
    var lib={};
    var topics={};

    return{

        // pub/sub methods 
        subscribe: function(topic, cb ){
            if (!topics[topic]){ topics[topic] = { queue: [] }; };
            var idx = topics[topic].queue.push(cb) - 1;
        },

        remove: function(){
            delete topics[topic].queue[idx];
        },
        publish: function(topic, info){
            if (!topics[topic]) return;
            var cbs = topics[topic].queue;
            cbs.forEach(function(cb) {
                cb(info || {});
            });
        },

        hasData: function(){ length(lib) > 0 },
        log: function(x){ console.log(x); },
        newAttr: function( x ){ lib.x },
        setter: function( x,y ){ lib.x = y; },
        setLib: function(x,y){ lib[x]=y; },
        getter: function( x ){ return lib.x },
        getLib: function(){ return lib },

    };
})();

