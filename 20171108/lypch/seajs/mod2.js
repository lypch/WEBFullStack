define(function(require,exports,module){
    //在Node Js中，如果不用"./"的话，引入的应该是系统的模块。
    //虽然在这里可以不用"./"，但是还是建议加上
    //扩展名".js"省略的话，默认是读取扩展名为 “.js”的模块
    let moda=require("./a.js");
    let modb=require("./b.js");
    exports.res=moda.num1 + modb.num2;
});
