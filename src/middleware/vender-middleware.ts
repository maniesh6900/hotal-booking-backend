import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiErorr"
import { NextFunction, Request, Response } from "express"
import { client } from "../prisma";



export const venderMiddleware = async(req: Request | any, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    const token = header?.split(" ")[1] ||  req.cookies["token"];

    if (!token) {
        res.status(403).json({message: "token  Unauthorized"})
        return
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { userId: any, id: string }
        
        const user = await client.user.findUnique({
            where : {
                id : decoded.id
            }
        })
       if(user?.role != "Vender") {
        throw new ApiError(409, "User is not Verify for this function")
       }
        req.userId = user.id
        next()
    } catch(e) {
        res.status(401).json({message: "function Unauthorized"})
        return
    }
}