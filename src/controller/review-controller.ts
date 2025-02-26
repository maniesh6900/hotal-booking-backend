import { asyncHandler } from "../utils/asyncHandler";
import { client } from "../prisma";
import { ApiError } from "../utils/ApiErorr";
import { ApiResponse } from "../utils/ApiResponse";
import { Request, Response } from "express";
import { ReviewSchema } from "../type";

export const createReview = asyncHandler(async(req : Request | any, res : Response)=> {
    const parsedData =  ReviewSchema.safeParse(req.body)
    const {list} = req.params
    console.log(req.userId)
    console.log(list);
    console.log(parsedData.data);
    if(!parsedData.success) {
        throw new ApiError(401, "invalid data")
    }

    const review = await client.reviews.create({
        data : {
            customerId : req.userId,
            rating : parsedData.data?.rating,
            message : parsedData.data.message,
            listingId :  list
        }
    })

    console.log(review);
    

    return res
    .status(200)
    .json(
        new ApiResponse(200, review, "Review created successfully")
    )

   
})