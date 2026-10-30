  import{Router } from "express"
  import { registerUserController,loginUserController, logoutUserController,getMeController } from "../controllers/auth.controller.js" 
  import { authUser } from "../middlewares/auth.middleware.js"
  const authRouter = Router()
   authRouter.post("/register",registerUserController)

   /**login route */
   authRouter.post("/login",loginUserController)
/**logout route */
authRouter.get("/logout",logoutUserController)
/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access private
 */
authRouter.get("/get-me",authUser,getMeController)

  export default authRouter