const mongoose = require('mongoose')

const db=mongoose.connect(process.env.MONGODB_URL,
    )
    .then(()=>{
        console.log('Connected to MongoDB');
    })
    .catch((err)=>{
        console.log('error',err);
        console.log(`Couldn't Connect to MongoDB`,err);
});

module.exports=db;