import z from "zod"

export const UserSchema = z.object({
    password : z.string(),
    email : z.string().email(),
    name : z.string(),
    role : z.enum(["Customer", "Admin", "Vender"])
})

export const UserSigninSchema = z.object({
    email : z.string(),
    password : z.string()
})

export const BookingSchema = z.object({
    name : z.string(),
    date : z.string(),
    guests : z.number(),
    price : z.number(),
    slot : z.enum([ "Morning", "Afternoon", "Evening", "Night"]),
    pack : z.enum(["Gold", "Platinum"])
}) 

export const DeleteBookingSchema = z.object({
    UniqueId : z.string(), 
    name : z.string()
})

export const UpdateBookingSchema = z.object({
    UniqueId : z.string(), 
    name : z.string(),
    date : z.string(),
    guests : z.number(),
    price : z.number(),
    slot : z.enum([ "Morning", "Afternoon", "Evening", "Night"]),
    pack : z.enum(["Gold", "Platinum"])
}) 

export const CreateListSchema = z.object({
    name : z.string(),
    address : z.string(),
    description : z.string(),
    price : z.number(),
    facilities : z.string(),
    image : z.string().url(),
    type : z.enum(["Hotal", "Restaurant", "Both"])
    
})
export const UpdateListSchema = z.object({
    name : z.string(),
    address : z.string(),
    description : z.string(),
    price : z.number(),
    Facilities : z.string(),
    Image : z.string().url(),
    type : z.enum(["Hotal", "Restaurant", "Both"])
})

export const Deletelist = z.object({
    uniqueId : z.string(),
})

export const CreateUnitSchema = z.object({
    booking_type : z.enum(["Single", "Double", "Triple", "Family"]),
    price: z.number(),
    status: z.enum(["Available", "Occupied", "Maintenance"])
})

export const ConformBookingSchema = z.object({
    uniqueId : z.string()
})

export const ReviewSchema = z.object({
    rating : z.enum(["1", "2", "3", "4", "5"]),
    message : z.string()
})