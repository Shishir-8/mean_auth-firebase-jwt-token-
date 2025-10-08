import express from "express"
import { google, loginUser, logout, registerUser } from "../controllers/authController.js"


const router = express.Router()


router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/google", google)
router.post("/logout", logout)

export default router