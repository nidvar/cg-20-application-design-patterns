const timeoutDelayFunction = (any_func, delay)=>{
    let timeoutId;
    return (...params)=>{
        if(timeoutId){
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(()=>{
            any_func.apply(null, params)
        },delay)
    }
}