import { Router } from "express";
import RegisterUser from "../controllers/user.controlller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router=Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverimage",
            maxCount:1
        }
    ]),
    RegisterUser)
// router.route("/login").post(login)

export default router