const create = (obj,feilds)=>{
    let cols,values;
    if(obj instanceof Array){
        let _colsArr ;
        let _valuesArr = [];
        for(var i=0 ; i<obj.length ; i++){
            _colsArr = Object.keys(obj[i]);
            _valuesArr.push(Object.values(obj[i]));
        }
        cols = _colsArr;
        values = _valuesArr;
    }
    else{
        cols = Object.keys(obj);
        values = Object.values(obj);
    }
    return {cols , values}
}

module.exports = create;