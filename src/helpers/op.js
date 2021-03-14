class Op{
    static and(obj1,obj2){
        if(obj1.query && obj2.query){
            return {query: `(${obj1.query} AND ${obj2.query})` , arr: [...obj1.arr , ...obj2.arr]}
        }
        else if(obj1.query && !obj2.query){
            return {query: `(${obj1.query} AND ?? = ?)` , arr: [...obj1.arr , ...Object.entries(obj2)[0] ]}
        }
        else if(!obj1.query && obj2.query){
            return {query: `(?? = ? AND ${obj2.query})`,arr: [...Object.entries(obj1)[0],...obj2.arr]}
        }
        else{
            return {query: `(?? = ? AND ?? = ?)`, arr: [...Object.entries(obj1)[0],...Object.entries(obj2)[0]]}
        }
    }

    static or(obj1,obj2){
        if(obj1.query && obj2.query){
            return {query: `(${obj1.query} OR ${obj2.query})` , arr: [...obj1.arr , ...obj2.arr]}
        }
        else if(obj1.query && !obj2.query){
            return {query: `(${obj1.query} OR ?? = ?)` , arr: [...obj1.arr , ...Object.entries(obj2)[0] ]}
        }
        else if(!obj1.query && obj2.query){
            return {query: `(?? = ? OR ${obj2.query})`,arr: [...Object.entries(obj1)[0],...obj2.arr]}
        }
        else{
            return {query: `(?? = ? OR ?? = ?)`, arr: [...Object.entries(obj1)[0],...Object.entries(obj2)[0]]}
        }
    }

    static not(obj){
        if(obj.query){
            return {query:`NOT ${obj.query}`, arr : obj.arr}
        }
        else{
            return {query: `NOT (?? = ?)`,arr: Object.entries(obj)[0]}
        }
    }
    
}

module.exports = Op;