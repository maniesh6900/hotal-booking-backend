import express from "express"
const app = express()
import cookieParser from "cookie-parser"
import cors from "cors"

app.use(cors()) //give your frontend address here just to make backend more secure
app.use(cookieParser()) 
app.use(express.json())
app.use(express.urlencoded({extended : true, limit : "16kb"}))

import BookingRouter from "./routes/book-routes"
import UserRouter from "./routes/user-routes"
import VenderRoutes from "./routes/Vender-routes"
import ListRoutes from "./routes/list-router"

app.use("/api/v1/user",UserRouter)
app.use("/api/v1/vender",VenderRoutes)
app.use("/api/v1/list",ListRoutes)
app.use("/api/v1/book",BookingRouter)

export {app}