// import jwt from "jsonwebtoken"
// import tokenBlackListModel from "../models/blacklist.model.js"




//  async function authUser(req,res,next){
//     const token = req.cookies.token
//      if (!token){
//         return res.status(401).json({
//             message:"Token not provided"
//         })
//      }
//       const isTokenBlackListed = await tokenBlackListModel.findOne({token})
       
//       if(isTokenBlackListed){
//         return res.status(401).json({
//             message:"Token is invalid"
//         })
//       }


//     try {
//         const decoded = jwt.verify(token,process.env.JWT_SECRET)
//         req.user = decoded
//         next()
        
//     } catch (error) {
//         return res.status(401).json({
//             message:"Invalid User"
//         })
        
//     }
// }
//  export {authUser}


import jwt from "jsonwebtoken";
import tokenBlackListModel from "../models/blacklist.model.js";

async function authUser(req, res, next) {
  const token =
    req.cookies?.token ||
    (req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null);

  if (!token) {
    return res.status(401).json({
      message: "Token not provided",
    });
  }

  try {
    const isTokenBlackListed = await tokenBlackListModel.findOne({ token });

    if (isTokenBlackListed) {
      return res.status(401).json({
        message: "Token is invalid",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid User",
    });
  }
}

export { authUser };