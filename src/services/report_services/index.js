const {executeProcedure} = require('../../database');
const ApiError = require('../../helpers/ApiError');


const DeptLeaves = async (para,user)=>{
    if(!user) throw ApiError.unauthorized();
    
    try{
        const data = await executeProcedure(user,'DeptLeaves',para);
        return data;
    }
    catch(e){
        console.log(e);
        throw ApiError.serverError('Error occured in DeptLeaves procedure');
    }
   
}

const EmpFetchDept = async (para,user)=>{
    if(!user) throw ApiError.unauthorized();
    
    try{
        const data = await executeProcedure(user,'EmpFetchDept',para);
        return data;
    }
    catch(e){
        console.log(e);
        throw ApiError.serverError('Error occured in EmpFetchDept procedure');
    }
   
}

const EmpFetchTitle = async (para,user)=>{
    if(!user) throw ApiError.unauthorized();
    
    try{
        const data = await executeProcedure(user,'EmpFetchTitle',para);
        return data;
    }
    catch(e){
        console.log(e);
        throw ApiError.serverError('Error occured in EmpFetchTitle procedure');
    }
   
}

const EmpFetchGrade= async (para,user)=>{
    if(!user) throw ApiError.unauthorized();
    
    try{
        const data = await executeProcedure(user,'EmpFetchGrade',para);
        return data;
    }
    catch(e){
        console.log(e);
        throw ApiError.serverError('Error occured in EmpFetchGrade procedure');
    }
   
}

const EmpFetchNation = async (para,user)=>{
    if(!user) throw ApiError.unauthorized();
    
    try{
        const data = await executeProcedure(user,'EmpFetchNationality',para);
        return data;
    }
    catch(e){
        console.log(e);
        throw ApiError.serverError('Error occured in EmpFetchNationaity procedure');
    }
   
}

const EmpFetchQualification = async (para,user)=>{
    if(!user) throw ApiError.unauthorized();
    
    try{
        const data = await executeProcedure(user,'EmpFetchQualification',para);
        return data;
    }
    catch(e){
        console.log(e);
        throw ApiError.serverError('Error occured in EmpFetchQualification procedure');
    }
   
}

const EmpFetchReligion = async (para,user)=>{
    if(!user) throw ApiError.unauthorized();
    
    try{
        const data = await executeProcedure(user,'EmpFetchReligion',para);
        return data;
    }
    catch(e){
        console.log(e);
        throw ApiError.serverError('Error occured in EmpFetchReligion procedure');
    }
   
}

const EmpFetchServed = async (para,user)=>{
    if(!user) throw ApiError.unauthorized();
    
    try{
        const data = await executeProcedure(user,'EmpFetchService',para);
        return data;
    }
    catch(e){
        console.log(e);
        throw ApiError.serverError('Error occured in EmpFetchService procedure');
    }
   
}

module.exports = {
    DeptLeaves,
    EmpFetchDept,
    EmpFetchTitle,
    EmpFetchGrade,
    EmpFetchNation,
    EmpFetchQualification,
    EmpFetchReligion,
    EmpFetchServed
};