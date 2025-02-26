import { asyncHandler } from "../utils/asyncHandler";
import { client } from "../prisma";
import { ApiError } from "../utils/ApiErorr";
import { ApiResponse } from "../utils/ApiResponse";
import {  json, Request, Response } from "express";
import { ConformBookingSchema, CreateListSchema, CreateUnitSchema, Deletelist, UpdateListSchema } from "../type";


export const CreateList = asyncHandler( async (req : Request | any, res: any) => {
    
    const parsedData = CreateListSchema.safeParse(req.body);
    if(!parsedData.success) {
        throw new ApiError(400, parsedData.error.message)
    }
    const list = await client.listing.create({
        data : {
            name : parsedData.data?.name,
            address : parsedData.data?.address,
            description : parsedData.data?.description,
            price : parsedData.data?.price,
            Facilities : parsedData.data?.facilities,
            images : parsedData.data?.image,
            type : parsedData.data?.type,
            VenderId : req.userId
        }
    })

    if(!list) {
        throw new ApiError(500, "server is not able to create new List")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(201, list, "new List created Successfully")
    )

}) 

export const UpdateList = asyncHandler( async (req : Request | any , res : Response)=> {
    const parsedData = UpdateListSchema.safeParse(req.body)
    if(!parsedData.success) {
        throw new ApiError(200, "data not fount")
    }
    const list = await client.listing.update({
        where :  {
           name : parsedData.data.name,
           VenderId : req.vender.id
        },
        data : {
            name : parsedData.data.name,
            address : parsedData.data.address,
            description : parsedData.data.description,
            price : parsedData.data.price,
            Facilities : parsedData.data.Facilities,
            images : parsedData.data.Image,
            type : parsedData.data.type
        }
    })
    if(!list) {
        throw new ApiError(500, "server is not able to update List")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, list, "List updated Successfully")
    )

})

export const DeleteList = asyncHandler( async (req : any, res : Response) => {
    const parsedData = Deletelist.safeParse(req.body)
    if(!parsedData.success) {
        throw new ApiError(400, "Data not found")
    }

    const list = await client.listing.delete({
        where : {
            id : parsedData.data.uniqueId
        }
    })

    return res
    .status(200)
    .json(
        new ApiResponse(200, list, "List deleted successfully")
    )
})

export const CreateUnit = asyncHandler(async (req : Request | any , res : Response) => {
    const {unit} = req.params
    console.log(unit);
    
    const venderId = req.userId
    console.log("venderId");
    console.log(venderId);
    
    const parsedData = CreateUnitSchema.safeParse(req.body)
    
    console.log(parsedData?.data)
    if(!parsedData.success) {
        throw new ApiError(409, "data not found")
    }

    const unint = await client.units.create({
        data : {
            price : parsedData.data?.price,   
            status : parsedData.data?.status,
            booking_type : parsedData.data?.booking_type,
            ListingId : unit,
            venderId : venderId
        }
    })

    if(!unint) {
        throw new ApiError(500, "server is not able to create new List")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(201, unint, "Booked successfully ")
    )
})

export const ComformBookings = asyncHandler(async (req : any, res : Response)=> {
    const parsedData = ConformBookingSchema.safeParse(req.body)
    if(!parsedData.success) {
        throw new ApiError(400, "Invalid data")
    }

    const booking = await client.booking.update({
        where: {
            id: parsedData.data.uniqueId
        },
        data: {
            status: "confirmed"
        }
    })

    if (!booking) {
        throw new ApiError(500, "Unable to confirm booking")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, booking, "Booking confirmed successfully"
        )
    )
}) 

export const allBooking = asyncHandler(async (req : any, res : Response) => {
    const allBooking = await client.booking.findMany()

    if (!allBooking) {
        throw new ApiError(404, "No bookings found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, allBooking, "All bookings fatched successfully")
        );
})

export const allUnits = asyncHandler(async (req : any, res : Response) => {
    const allUnits = await client.booking.findMany()

    if (!allUnits) {
        throw new ApiError(404, "No bookings found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, allUnits, "All units fatched successfully")
        );
})