console.log(1)

setTimeout(()=>{
  console.log('delayedSetTimeout')
}, 0)

let promise = new Promise(function(resolve, reject){
  resolve('promise output');
})

promise.then(
    function(val){console.log(val)} 
)

console.log(2);