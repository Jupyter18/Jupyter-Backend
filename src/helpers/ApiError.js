const react_url = require('../config').react_url;
/** This class handle all the errors
 * @class ApiError
 */
class ApiError{
    /**
     * @constructs ApiError
     * @param {number} code status code
     * @param {string} msg error message
     */
    constructor(code,msg){
        this.code = code;
        this.msg = msg;
    }
    static badRequest(e){
        return new ApiError(400,e ||'Bad request');
    }
    static unauthorized(e){
        return new ApiError(401,e ||'Unauthorized');
    }
    static forbidden(e){
        return new ApiError(403, e || 'Forbidden');
    }
    static notfound(e){
        return new ApiError(404, e ||'Not found');
    }
    static unprocessableEntity(e){
        return new ApiError(422,e);
    }
    static serverError(e){
        return new ApiError(500,e ||'Internel server error');
    }
    static conflicted(e){
        return new ApiError(409 ,e ||'Conflicted');
    }
    static redirect(url){
        return new ApiError(301,react_url+url);
    }
    //Add more error status codes according to the requirement
}

module.exports = ApiError;