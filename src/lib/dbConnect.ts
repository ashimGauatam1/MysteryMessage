import mongoose, { connection } from "mongoose";

type ConnectionObject={
    isConnected?:number
}

const Connection:ConnectionObject ={}

async function dbConnect():Promise<void> {
    if (Connection.isConnected) {
        console.log("Already connected to database")
        return
    }
    try {
       const db = await mongoose.connect(process.env.MONGO_URI || '')
       Connection.isConnected=db.connections[0].readyState
       console.log("db connected successfully")
    } catch (error) {
        
        console.log("connection failed ",error)
        process.exit()
    }
}

export default dbConnect