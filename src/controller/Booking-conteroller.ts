import { asyncHandler } from "../utils/asyncHandler";
import { client } from "../prisma";
import { ApiError } from "../utils/ApiErorr";
import { ApiResponse } from "../utils/ApiResponse";
import { Request, Response } from "express";
import { BookingSchema, DeleteBookingSchema, UpdateBookingSchema } from "../type";


export const BookingaUintAsUser = asyncHandler(async (req : any, res : Response) => {
    const {unit} = req.params
    const parsedData = BookingSchema.safeParse(req.body)

    if(!parsedData.success) {
        throw new ApiError(401, "data not found")
    }

    const booking =  await client.booking.create({
        data : {
            name : parsedData.data.name,
            date : parsedData.data.date,
            slot : parsedData.data.slot,
            guests : parsedData.data.guests,
            pack : parsedData.data.pack,
            CustomerId : req.userId,
            unitid : unit
        }
    })

    return res
    .status(201)
    .json(
        new ApiResponse(201,booking, "Booked a place for You" )
    )
});

export const deleteBooking = asyncHandler(async (req : Request, res : Response) => {
    const parsedData = DeleteBookingSchema.safeParse(req.body)
    if(!parsedData.success) {
        throw new ApiError(400, "Data not Found")
    }
    const booking =  await client.booking.delete({
        where : {
            id : parsedData.data.UniqueId,
        }
    })

    return res
    .status(202)
    .json(
        new ApiResponse(202,booking, "Successfully deleted a Booking")
    )
})

export const editBooking = asyncHandler(async (req : any, res : Response)=> {
    const parsedData = UpdateBookingSchema.safeParse(req.body)

    if(!parsedData.success) {
        throw new ApiError(400, "Invalid data")
    }

    const booking = await client.booking.update({
        where: {
            id: parsedData.data.UniqueId,
            CustomerId : req.user.id
        },
        data: {
            name: parsedData.data.name,
            date: parsedData.data.date,
            slot: parsedData.data.slot,
            guests: parsedData.data.guests,
            pack: parsedData.data.pack
        }
    })

    return res
    .status(200)
    .json(
        new ApiResponse(200,booking, "Updated a Booking")
    )

    

})

export const allBooking = asyncHandler(async (req : any, res : Response) => {
    const BookedByYou = await client.booking.findMany({
        where : {
            CustomerId : req.user.id
        } 
    })
    if(!BookedByYou) {
        throw new ApiError(403, "NO bookings Found")
    }

})

export const bookAUnit = asyncHandler(async(req : Request , res : Response) => {
    const {listId} = req.params

    const list = await client.listing.findFirst({
        where : {
            id : listId
        }
    })

    return res
    .json(
        new ApiResponse(200, {list}, "fatch successfully")
    )

})

export const getAllList = asyncHandler(async(req : Request, res :Response)=> {
    const lists = await client.listing.findMany()
     
    return res
    .json(
        new ApiResponse(200, lists, "fatched successfully")
    )
})
export const getById = asyncHandler(async(req : Request, res :Response)=> {
    const {id} = req.params

    const lists = await client.listing.findUnique({
        where : {
            id : id
        }
    })

    if(!lists){
        throw new ApiError(400, "not found")
    }
     
    return res
    .json(
        new ApiResponse(200, lists, "fatched successfully")
    )
})