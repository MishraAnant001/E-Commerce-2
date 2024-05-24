import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import morgan from "morgan"
import fs from "fs"
import path from "path"
import { connectdb } from "./src/db/connectdb";
import { ApiError,databaseError,databaseSuccess,ErrorCodes, serverSuccess, urlNotProvided } from "./src/utils";
import { mainRouter } from "./src/routes/main.route";
config()
const app = express();
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

app.use(express.json())
app.use(cookieParser())
app.use(mainRouter)

const url = process.env.MONGO_URI;
async function start(){
    try {
        if(!url){
            throw new ApiError(ErrorCodes.internalServerError,urlNotProvided)
        }
        await connectdb(url);
        console.log(databaseSuccess)
        const port = process.env.PORT || 4000
        app.listen(port,()=>{
            console.log(`${serverSuccess} ${port}`)
        })
    } catch (error:any) {
        console.log(databaseError,error.message)
    }
}
start()

