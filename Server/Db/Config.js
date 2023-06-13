const mongoose = require('mongoose')


const connectDB = async () => {
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/ReactApp', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to database');
    } catch (error) {
      console.error('Error connecting to database:', error.message,"-----------",error);
    }
  };
  
  connectDB();