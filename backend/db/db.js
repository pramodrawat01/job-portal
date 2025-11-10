import mongoose, { connect } from "mongoose";

const dbConnect = async()=>{
    try {
        await connect(process.env.MONGO_URI)
        console.log("db connected !")
    } catch (error) {
        console.log(error)
        process.exit(1)

    }
}

export default dbConnect