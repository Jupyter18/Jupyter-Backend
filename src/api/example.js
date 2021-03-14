const ApiError = require('../helpers/ApiError');
const {getList} = require('../services/example_services');

class ExampleController{
    static async getList(req,res,next){
        const data = await getList(req.dbconnection);
        if(data instanceof ApiError){
            next(data);
        }
        res.status(200).json(data);
    }

    static async postList(req,res,next){
        
    }
}

module.exports = ExampleController;