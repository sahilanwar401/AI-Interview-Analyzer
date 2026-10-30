import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import tokenBlackListModel from "../models/blacklist.model.js";
import mongoose from "mongoose";

async function registerUserController(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Please provide username,email,password",
    });
  }
  const isUSerAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isUSerAlreadyExists) {
    return res.status(400).json({
      message: "Account already exits with this email address or username",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "user register successfully ",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

/**login user controller
 *
 */
async function loginUserController(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid emil or password  ",
    });
  }
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.cookie("token", token);
  res.status(200).json({
    message: "User loggedIn successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}



async function logoutUserController(req,res) {
    const token = req.cookies.token;

    if(token){
        await tokenBlackListModel.create({token})
    }
    res.clearCookie("token")
    res.status(200).json({
        message:"user logout successfully"
    })

    
}

/**
 * @name getMeController
 * @description get the current logged IN user details
 * @access private
 */
  async function getMeController(req,res) {
    const user = await userModel.findById(req.user.id)
     res.status(200).json({
      message:" user details fetched successfully ",
      user:{
        id : user._id,
        username:user.username,
        email:user.email
      }
      
     })

    
  }
  

export { loginUserController, registerUserController ,logoutUserController,getMeController};
