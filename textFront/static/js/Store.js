var Store = {
    lib: {},
    topics: {},
    subscribe: function (topic, cb) {
        if (!this.topics[topic]) { this.topics[topic] = { queue: [] }; }
        var idx = this.topics[topic].queue.push(cb) - 1;
    },
    remove: function(topic, idx){ delete this.topics[topic].queue[idx]; },
    publish: function(topic, info){
        if (!this.topics[topic]) return;
        var cbs = this.topics[topic].queue;
        cbs.forEach(function(cb) { cb(info || {}); });
    },
    getLib: function(){ return this.lib; },
    getList: function(){
        var word_list = [];
        for (var i in this.lib ){
            word_list.push( i );
          }
        return word_list;
    },
    getter: function(x){ return this.lib[x]; },
    setter: function(x,y){
            if(typeof(lib)==="undefined"){ lib={}; }
         this.lib[x]=y;
    },
};

var store = Object.create(Store);

