const Op =require('../../helpers/op'); 

const find = (obj,table)=>{
    let con = {};
    let arr = [];
    if(obj.attributes){
        con['attributes'] = obj.attributes;
        arr.push(obj.attributes);
    }
    arr.push(table);

    if(obj.where){
        if(obj.where.query){
            con['where'] = obj.where;
        }
        else{
            con['where'] = {query: ` ?? = ? ` , arr: Object.entries(obj.where)[0]}
        }
        arr.push(...con.where.arr)
    }
    
    if(obj.like){
        con['like'] = obj.like;
        arr.push(...Object.keys(obj.like));
        arr.push(...Object.values(obj.like));   
    }

    if(obj.limit){
        con['limit'] = obj.limit;
        arr.push(obj.limit);
    }

    if(obj.orderBy){
        con['orderBy'] = obj.orderBy;
        arr.push(obj.orderBy);
    }

    if(obj.orderByDESC){
        con['orderByDESC'] = obj.orderByDESC;
        arr.push(obj.orderByDESC);
    }
    con['arr'] = arr;
    return con;
    
}

module.exports = find;