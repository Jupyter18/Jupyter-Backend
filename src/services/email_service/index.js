const config = require('../../config');
const EMAIL = config.email;
const url = config.react_url;
const transporter = require('./transporter');

const sendMail = async (email,emp_id,password) => {
    const transport = await transporter();
    
    const mailOptions = {
        from: `Jupiter <${EMAIL}>`,
        to : email,
        subject : 'User registration',
        //text: `Your employee ID : ${emp_id}, Your password : ${password}`,
        //html:,
        template : "register",
        context : {emp_id,password,url},
    };
  
    try{
        const result = await transport.sendMail(mailOptions);
        return result;
    }
    catch(error){
        console.log(error)
        return {error} 
    }
}

module.exports = sendMail;