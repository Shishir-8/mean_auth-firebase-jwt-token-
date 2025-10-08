import User from "../models/User.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import admin from "firebase-admin"
import fs from "fs"
import path from "path"
import crypto from "node:crypto"

const servicesAccountPath = path.resolve("./firebase.json")
const servicesAccount = JSON.parse(fs.readFileSync(servicesAccountPath))





if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(servicesAccount)
    })
}



export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields required" })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exist" })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = new User({
            username,
            email,
            password: hashPassword,
            authType: "local"
        })

        await user.save()
        return res.status(201).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields required" })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.cookie("access_token", token, {
            httpOnly: true
        })

        res.status(200).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })



    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}


export const google = async (req, res) => {
    try {
        const firebaseToken = req.headers.authorization?.split(" ")[1];
        if (!firebaseToken) {
            return res.status(401).json({ message: "No token" })
        }
        const decoded = await admin.auth().verifyIdToken(firebaseToken)
        console.log(decoded)
        const {email, name, picture, uid} = decoded
        let user = await User.findOne({ email: decoded.email })
        if (!user) {
            const randomPassword = crypto.randomBytes(16).toString("hex")
            const hashPassword = await bcrypt.hash(randomPassword, 10)
            try {
                user = await User.create({
                username: name,
                email,
                avatar: picture,
                authType: "google",
                firebaseUid: uid,
                password: hashPassword
            })
                
            } catch (error) {
               console.log("Mongoose create error", error) 
               return res.status(500).json({message: "Failed to create user"})
            }
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.cookie("access_token", token, {
            httpOnly: true
        })
        res.json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar
            }
        })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("access_token", {
            httpOnly: true
        })
        res.status(200).json({message: "Logged out succesfully"})
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}