const save = (obj)=>{
    let arr = []
    for (const [key,value] of Object.entries(obj)){
        arr.push(key,value);
    }
    return arr;
}

module.exports = save;