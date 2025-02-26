import dotenv from "dotenv"
import {app} from './app'
dotenv.config({
    path : './.env'
})


const port = process.env.PORT

app.listen(port, ()=>{
    console.log('server is up on POST :', port); 
})