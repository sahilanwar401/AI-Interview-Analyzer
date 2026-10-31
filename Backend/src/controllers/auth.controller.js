// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import userModel from "../models/user.model.js";
// import tokenBlackListModel from "../models/blacklist.model.js";
// import mongoose from "mongoose";
// const isProd = process.env.NODE_ENV === "production";

// const cookieOptions = {
//   httpOnly: true,
//   secure: isProd,
//   sameSite: isProd ? "none" : "lax",
//   maxAge: 24 * 60 * 60 * 1000, // 1 din (JWT bhi 1d ka hai)
// };

// async function registerUserController(req, res) {
//   const { username, email, password } = req.body;

//   if (!username || !email || !password) {
//     return res.status(400).json({
//       message: "Please provide username,email,password",
//     });
//   }
//   const isUSerAlreadyExists = await userModel.findOne({
//     $or: [{ username }, { email }],
//   });
//   if (isUSerAlreadyExists) {
//     return res.status(400).json({
//       message: "Account already exits with this email address or username",
//     });
//   }

//   const hash = await bcrypt.hash(password, 10);

//   const user = await userModel.create({
//     username,
//     email,
//     password: hash,
//   });
//   const token = jwt.sign(
//     { id: user._id, username: user.username },
//     process.env.JWT_SECRET,
//     { expiresIn: "1d" }
//   );

//   res.cookie("token", token, cookieOptions);

//   res.status(201).json({
//     message: "user register successfully ",
//     user: {
//       id: user._id,
//       username: user.username,
//       email: user.email,
//     },
//   });
// }

// /**login user controller
//  *
//  */
// async function loginUserController(req, res) {
//   const { email, password } = req.body;
//     if (!email || !password) {
//     return res.status(400).json({ message: "Please provide email and password" });
//   }
//   const user = await userModel.findOne({ email });

//   if (!user) {
//     return res.status(400).json({
//       message: "Invalid email or password",
//     });
//   }
//   const isPasswordValid = await bcrypt.compare(password, user.password);
//   if (!isPasswordValid) {
//     return res.status(400).json({
//       message: "Invalid emil or password  ",
//     });
//   }
//   const token = jwt.sign(
//     { id: user._id, username: user.username },
//     process.env.JWT_SECRET,
//     { expiresIn: "1d" }
//   );
//   res.cookie("token", token, cookieOptions);
//   res.status(200).json({
//     message: "User loggedIn successfully",
//     user: {
//       id: user._id,
//       username: user.username,
//       email: user.email,
//     },
//   });
// }



// async function logoutUserController(req,res) {
//     const token = req.cookies.token;

//     if(token){
//         await tokenBlackListModel.create({token})
//     }
//     res.clearCookie("token", {
//   httpOnly: true,
//   secure: isProd,
//   sameSite: isProd ? "none" : "lax",
// });
//     res.status(200).json({
//         message:"user logout successfully"
//     })

    
// }

// /**
//  * @name getMeController
//  * @description get the current logged IN user details
//  * @access private
//  */
//   async function getMeController(req,res) {
//     const user = await userModel.findById(req.user.id)
//      res.status(200).json({
//       message:" user details fetched successfully ",
//       user:{
//         id : user._id,
//         username:user.username,
//         email:user.email
//       }
      
//      })

    
//   }
  

// export { loginUserController, registerUserController ,logoutUserController,getMeController};


import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import tokenBlackListModel from "../models/blacklist.model.js";

const isProd = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
  maxAge: 24 * 60 * 60 * 1000,
};

const signToken = (user) =>
  jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

const getTokenFromReq = (req) =>
  req.cookies?.token ||
  (req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.split(" ")[1]
    : null);

async function registerUserController(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide username, email, password" });
    }

    const exists = await userModel.findOne({ $or: [{ username }, { email }] });
    if (exists) {
      return res.status(400).json({
        message: "Account already exists with this email address or username",
      });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({ username, email, password: hash });

    const token = signToken(user);
    res.cookie("token", token, cookieOptions);

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

async function loginUserController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = signToken(user);
    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      message: "User logged in successfully",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

async function logoutUserController(req, res) {
  try {
    const token = getTokenFromReq(req);

    if (token) {
      await tokenBlackListModel.create({ token });
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
    });

    return res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

async function getMeController(req, res) {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User details fetched successfully",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("GetMe error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

export {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController,
};