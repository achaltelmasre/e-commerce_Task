import User from  "./../model/User.js";
import { responder } from "./../util.js";

const postApiSignup = async (req, res) => {
    const {
       name, 
       email, 
       username,
       password, 
       address,
       mobile, 
       gender
     } = req.body;
 
     const user = new User({
        name: name,
        email: email,
        username: username,
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
    const {username, password} = req.body;

    if (!username || !password) {
        return res.json({
            success: false,
            message: "please provide username and password"
        })
    }

    const  user = await User.findOne({
        username:username,
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