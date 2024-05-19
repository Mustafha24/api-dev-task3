import mongoose from "mongoose";

const connectToMongoDb =async() => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI)
    console.log("Connected to MongoDB")
  } catch (error) {
    console.log("Error while connecting to mongodb: ",error.message)
  }
}

export default connectToMongoDb