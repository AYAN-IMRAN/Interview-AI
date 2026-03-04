const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const tokenBlacklistModel = require('../models/blacklist.model');



/**
 * @name registerUserController
 * @description register a new user, expects username, email and password in the request body
 * @access Public
 */


async function registerUserController(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            mssg: "Please provide require details username password or email"
        })
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { password }]
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            mssg: "Account already Exists with this email or username"
        })


    }


    const hash = await bcrypt.hash(password, 10)



    const user = await userModel.create({
        username,
        email,
        password: hash
    })


    const token = jwt.sign({
        id: user._id, username: user.username
    },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
    )


    res.cookie("token",token)

       res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

/**
 * @name loginUserController
 * @description login a user, expects email and password in the request body
 * @access Public
 */


async function loginUserController(req,res) {
    const {email,password}= req.body


    const user = await userModel.findOne({email})


    if(!user){
        return res.status(400).json({
            mssg:"Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            mssg:"Invalid email or password"
        })
    }



        const token = jwt.sign({
        id: user._id, username: user.username
    },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
    )


    res.cookie("token",token)

       res.status(201).json({
        message: "User login successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

    


    
}















/**
 * @name logoutUserController
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */

async function logoutUserController(req, res) {
    const token = req.cookies.token

    if(token){
        await tokenBlacklistModel.create({token})
    }

    res.clearCookie("token")
     res.status(200).json({
        message: "User logged out successfully"
    })
    
}


/**
 * @name Get-ME-Controller
 * @description Get the details 
 * @access public
 */


async function getMeController(req,res) {
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
         message: "User details fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
    
}







module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}