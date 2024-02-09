import User from './../models/User.js'
import { responder } from "./../util.js";

const postApiSignup = async (req, res) => {
    const {
       name, 
       email, 
       password, 
       address,
       mobile, 
       gender
     } = req.body;
 
     const user = new User({
        name: name,
        email: email,
        password: password,
        address: address,
        mobile: mobile,
        gender:gender
     });
 
    try{
      const savedUser = await user.save();

      return responder({
         res,
         success: true,
          data: savedUser,
          message: " User created successfully "
      })
    }
    catch(e){

        return responder({
            res,
            success: false,
            message: e.message
        })
  }}


  const postApiLogin = async (req, res ) =>{
    const {email, password} = req.body;

    if (!email || !password) {
        return res.json({
            success: false,
            message: "please provide username and password"
        })
    }

    const  user = await User.findOne({
        email:email,
        password: password
    }).select("name email mobile")
    
    if (user) {

        return responder({
             res,
             success: true,
             data: user,
             message: "Login successful"
        })
    }
    else{
        return responder({
             res,
             success: false,
             message: "Invalid credentials"
        })
    }   }

 export { postApiSignup, postApiLogin }