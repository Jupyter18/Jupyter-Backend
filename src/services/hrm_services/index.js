const {executeProcedure} = require('../../database');
const ApiError = require('../../helpers/ApiError');
const CustomAttribute = require('../../models/customAttribute');

/*  const customDataService = async (user, emp_id, body) => {
    if (!user) throw ApiError.unauthorized();

    const cst = new CustomAttribute(user);
    await cst.findOne({
        pk:{emp_id}
    });
    Object.keys(body).map(k => {
        cst.fields[k] = body[k];
    });
    
    const res = await cst.save();

    if(res.error) throw ApiError.badRequest('Can not add data custom fields');
}
*/

const customDataService = async (user, emp_id, body) => {
    if (!user) throw ApiError.unauthorized();

    const cst = new CustomAttribute(user);
    await cst.findOne({
        pk:{emp_id}
    });
    const attName = body.attributeName;
    const attValue = body.attributeValue ;

    cst.fields[attName] = attValue;
    
    const res = await cst.save();

    if(res.error) throw ApiError.badRequest('Can not add data custom fields');
}

module.exports = {customDataService};