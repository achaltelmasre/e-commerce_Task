import { responder } from "./../util.js";

const getApiHealth = async (req, res) =>{
   
    return res.status(201).json({
        succes: true,
        Message: "All good"
    })
}

export { getApiHealth };