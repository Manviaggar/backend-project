import {Router} from "express";
import { LogoutUser, registerUser , refreshAccessToken} from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js";
import { LoginUser } from "../controllers/user.controller.js"
//import { LogoutUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar", //name should be same in frontend and backend
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)

router.route("/login").post(LoginUser)

//secured routes
router.route("/logout").post(verifyJWT ,LogoutUser)
router.route("/refresh-token").post(refreshAccessToken)
export default router