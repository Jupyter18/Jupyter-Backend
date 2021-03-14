const example ={
    getList : `SELECT * FROM job_title`,
    getOne : (id)=> {return `SELECT * FROM job_title WHERE id= ${id}`},

}

module.exports = example;