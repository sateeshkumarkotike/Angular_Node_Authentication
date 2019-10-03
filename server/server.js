
const express = require('express') 
const bodyParser = require('body-parser')
const cors = require('cors')

const api = require('./routes/api')

const PORT = 3000 
const app = express() 
 
 app.use(bodyParser.json())
//  app.use(cors)

 app.use('/api' ,api)

 app.get('/' ,(req ,res ) =>{
   res.send("Hello from server")
 })

 app.listen(PORT ,function(){
     console.log("Hello express server"+PORT);
     
 })