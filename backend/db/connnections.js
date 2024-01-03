import { connect,disconnect } from 'mongoose'

async function connectToDatabase() {
    try {
        await connect("mongodb+srv://Parth2:Parth20@cluster0.nlyt64i.mongodb.net/?retryWrites=true&w=majority");
    } catch (error) {
        throw new Error("cannot connect to DB");
    }
}

async function disconnectFromDatabase() {
    try {
        await disconnect();
    } catch (error) {
        throw new Error("cannot disconnect db");
    }
}

export { connectToDatabase, disconnect }

