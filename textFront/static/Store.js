function Store(){};
Store.prototype.lib={};
Store.prototype.topics={};
Store.prototype.subscribe=function(topic, cb){
    if (!this.topics[topic]){ this.topics[topic] = { queue: [] }; };
    var idx = this.topics[topic].queue.push(cb) - 1;
};
Store.prototype.remove=function(){delete this.topics[topic].queue[idx];};
Store.prototype.publish=function(topic, info){
    if (!this.topics[topic]) return;
    var cbs = this.topics[topic].queue;
    cbs.forEach(function(cb) {
        cb(info || {});
    });
};
Store.prototype.getLib=function(){
    return this.lib;
};
Store.prototype.getList=function(){
    var word_list = [];
    for (var i in this.lib ){
        word_list.push( i );
    }
    return word_list;
};
Store.prototype.getter=function(x){
    return this.lib[x];
};
Store.prototype.setter=function(x,y){
    if(!this.lib){ lib={}; };
     this.lib[x]=y;
};
Store.prototype.out=function(x){
    console.log(x);
};

var store = new Store();


