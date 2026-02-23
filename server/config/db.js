import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.set("runValidators", true);

        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ MongoDB Connected Succefully");
    } catch (error) {
        console.log(error);
        console.log("❌ Error while connecting mongoDB");
        process.exit(1);
    }
}

export default connectDB;