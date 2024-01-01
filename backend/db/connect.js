import { Mongoose, connect } from "mongoose";

export default async function connectToDatabase() {
    try {
        await connect(
            process.env.MONGODB_URL
        );
    } catch (error) {
        throw new Error(error.message);
    }
}



