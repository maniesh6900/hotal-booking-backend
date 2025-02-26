import { asyncHandler } from "../utils/asyncHandler";
import { client } from "../prisma/index";
import { ApiError } from "../utils/ApiErorr";
import { ApiResponse } from "../utils/ApiResponse";
import jwt  from "jsonwebtoken";
import { UserSchema, UserSigninSchema } from "../type";
import bcrypt from "bcrypt"
import { Request, Response } from "express";


export const UserSignup = asyncHandler(async (req : Request , res : Response)=> {
 
    const parsdeData = UserSchema.safeParse(req.body)
    if(!parsdeData.success) {
        throw new ApiError(400, "Not found Data ")
    }
    
    const exiesteduser = await client.user.findFirst({
        where : {
            name: parsdeData.data?.name
        }
    })
    if(exiesteduser) {
        throw new ApiError(400, "User Already Existed")
    }


    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(parsdeData.data.password, salt)

    
    const user = await client.user.create({
        data : {
            email : parsdeData.data.email,
            password : hashedPassword,
            name : parsdeData.data.name,
            role : parsdeData.data.role
        }
    })

    return res
    .status(201)
    .json(
        new ApiResponse(201, user, "new User Created successfully")
    )

})

export const UserSignin = asyncHandler(async (req : Request, res : Response)=> {
    const parsedData = UserSigninSchema.safeParse(req.body);
    if(!parsedData.success){
        throw new ApiError(400, "Data not found")
    }
    const user = await client.user.findFirst({
        where:{
            email : parsedData.data.email
        }
    })

    if(!user) {
        throw new ApiError(401, "User with this name is not found or exists")
    }

    const password = bcrypt.compare(parsedData.data.password, user.password)
    if(!password) {
        throw new ApiError(401, "Password is incorrect")
    }

    const token = jwt.sign({ 
        id: user.id, 
        email : user.email
    }, 
        process.env.ACCESS_TOKEN_SECRET!);

        

    return res
        .status(200)
        .cookie("token",  token, { httpOnly: true, secure: true})
        .json(
            new ApiResponse(200 ,{...user, token : token } ,"User signed in successfully")
        );
  
})




