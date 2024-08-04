import mongoose from "mongoose"


export const connectDB = async () =>{
    try {
        console.log(process.env.DB_URL)
        const {connection} = await mongoose.connect(process.env.DB_URL,{
            dbName: process.env.DB_NAME 
        });
        console.log('Database connected to ', connection.name);
    } catch (error) {
        console.log('err===>',error);
        process.exit(1);
    } 
}