import mongoose from "mongoose";


export async function connectdb(url:string){
    return mongoose.connect(url)
}