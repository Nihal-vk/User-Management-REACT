const express = require('express')
const app = express();
const Cors=require('cors')
require("./Db/Config");



app.use(express.json());
app.use(Cors());

const adminRoutes =require('./routes/admin')
const userRoutes=require('./routes/user')



app.use('/admin',adminRoutes)
app.use('/',userRoutes)


app.listen(3001, () => {
    console.log("Server is listening on port 5000");
  });