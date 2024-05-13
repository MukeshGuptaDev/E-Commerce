import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import dotenv from 'dotenv';

//dotenv config
dotenv.config();

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        console.log(name, req.body);

        //validations
        if (!name) {

            return res.send({ message: 'Name is  Required' })
        }

        if (!email) {
            return res.send({ message: 'email is Required' })
        }

        if (!password) {
            return res.send({ message: 'password is Required' })
        }

        if (!phone) {
            return res.send({ message: 'phone number is Required' })
        }

        if (!address) {
            return res.send({ message: 'address is Required' })
        }

        //existing user

        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: 'Already Register Please Login',
            })
        }
        //hash Password

        const hashedPassword = await hashPassword(password);



        //save
        const user = await new userModel({ name, email, phone, address, password: hashedPassword }).save();
        console.log("user value is " + user);

        res.status(201).send({
            success: true,
            message: 'User Register Successfully',
            //user,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        })
    }
};

//POST LOGIN

export const loginController = async (req, res) => {
    try {

        //const secretKey = 'mukeshmukku';

        const { email, password } = req.body

        console.log(email, password, req.body)
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Inalid email or psaaword'
            })
        }

        //check user 
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not register'
            })
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: true,
                message: 'Invalid Password'
            })
        }
        //token
        //const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).send({
            success: true,
            message: 'login successfully',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            token,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        })

    }
}

//test Controller

export const testConteroller = (req, res) => {
    try {
        res.send("Protected Route");
    } catch (error) {
        console.log(error);
        res.send(error);
    }

}