const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')



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


module.exports = {
    registerUserController
}