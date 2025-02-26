import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken"
import { client } from "../prisma";
import { ApiError } from "../utils/ApiErorr";

export const userMiddlerware = async(req : Request |any, res: Response, next : NextFunction)=>{
    const header = req.headers["authorization"];
    const token = header?.split(" ")[1] ||  req.cookies["token"];
    if(!token){
        throw new ApiError(409, "cookie is not valid")
    }   
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {role : string , id : string};
       const user = await client.user.findFirst({
            where : {
                id : decoded.id,
            }
        })

        if(!user) {
            throw new ApiError(409, "user is not valied")
        }
        req.userId = user.id
        next()
        
    } catch (error) {
        console.error(error)
          throw new ApiError(405, `middlerware failed with the error ${error} `)
    }

}