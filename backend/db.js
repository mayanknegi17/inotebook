const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb"

const connectToMongo = async () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connecting to mongo successfully")
    });
}

module.exports = connectToMongo