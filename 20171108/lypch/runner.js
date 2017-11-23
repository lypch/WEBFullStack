function runner(_gen){
  return new Promise((resolve, reject)=>{
    var gen=_gen();

    _next();
    function _next(_last_res){
      var res=gen.next(_last_res);  //next返回一个generator对象
      //res是next返回的JSON实例，包含done和value两个属性

      if(!res.done){
        var obj=res.value; //value返回的是一个promise对象
        //也就是说在使用runner的时候，yield返回的必须是一个promise实例
        //$ajax对象返回的也是一个Promise实例

        if(obj.then){
          obj.then((res)=>{  //通过Promise实例的Then函数等待异步操作完成
            _next(res);
          }, (err)=>{
            reject(err);
          });
        }else if(typeof obj=='function'){
          if(obj.constructor.toString().startsWith('function GeneratorFunction()')){
            runner(obj).then(res=>_next(res), reject);
          }else{
            _next(obj());
          }
        }else{
          _next(obj);
        }
      }else{
        resolve(res.value);
      }
    }
  });
}
