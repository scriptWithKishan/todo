import mongoose from "mongoose"

const mongo_url: string = process.env.MONGO_URI || ""

const connect = async () => {
  try {
    await mongoose.connect(mongo_url);
    console.log("MongoDB server connected successfully")
  } catch (err: any) {
    console.error(`Mongo error: ${err.message}`)
  }
}

export default connect