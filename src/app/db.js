const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGO_URI || 'mongodb+srv://Brian:753118>@cluster0.rd8tw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const connectDB = async () => {
    try{
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected");
    } catch(error){
        console.error("Failed", error);
        process.exit(1);
    }
}

module.exports = connectDB;



