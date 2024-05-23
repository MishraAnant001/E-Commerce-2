import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { connectdb } from "./src/db/connectdb";
import { ApiError,ErrorCodes } from "./src/utils";
import { mainRouter } from "./src/routes/main.route";
config()
const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(mainRouter)

const url = process.env.MONGO_URI;
async function start(){
    try {
        if(!url){
            throw new ApiError(ErrorCodes.internalServerError,"Please provide mongo url in .env file")
        }
        await connectdb(url);
        console.log("database connection established")
        const port = process.env.PORT || 4000
        app.listen(port,()=>{
            console.log(`server is running on port ${port}`)
        })
    } catch (error:any) {
        console.log("Error while database connection !",error.message)
    }
}
start()

