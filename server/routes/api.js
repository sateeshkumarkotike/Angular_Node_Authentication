
const express = require("express")
const jwt = require('jsonwebtoken')
const mongoose = require("mongoose") 
const User = require('../model/user')

mongoose.connect('mongodb://127.0.0.1:27017/Authetication', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
} ,(err ) => {
    if(err){
        console.log("error")
    } else{
        console.log("connected to mongodb")
    }
})


function verifyToken(req,res,next){
  if(!req.headers.authorization){
    return res.status(401).send("unauthorized request")
  }
  
  let token = req.headers.authorization.split(' ')[1]
   if(token === 'null'){
     return res.status(401).send("unauthorized request")
   } 

   let payload = jwt.verify(token ,'secretkey')
   if(!payload){
     return res.status(401).send("unauthorized request")
   } 

   console.log(payload.subject)
   req.userId = payload.subject ;
   next()
}


const router = express.Router();

router.get('/' ,(req,res) =>{
    res.send("api router")
}) 

router.post('/register' ,(req,res) => {
  console.log(req.body)
  let userData = req.body ;
  let user = new User(userData);

  user.save((error ,registerUser) => {
       if(error) {
        res.send(error)
       } else {
           let payload = { subject:registerUser._id }
           let token = jwt.sign(payload ,"secretkey")
           res.send({token})
       }
  })

//    user.save().then(user2 => res.send(user2)).catch(err => res.send(err))

})

router.post('/login' ,(req,res) => {

    let userData = req.body

    User.findOne({email:userData.email} ,(error ,user) => {
        if(error) {
            res.send(error)
        } else {
            if(!user) {
                res.send("Invalid email")
            } else {
                if(user.password !== userData.password){
                    res.send("invalid password")
                } else {
                  let payload = { subject:userData._id }
                  let token = jwt.sign(payload ,"secretkey")
                  res.send({token})
                    // res.send(user)
                }
            }
        }
    })
})

router.get('/events' ,(req,res) => { 
   let events = [
    {
      "_id": "1",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },

    {
      "_id": "3",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ]

  res.json(events)
})

router.get('/special',verifyToken ,(req,res) => { 
    let events = [
     {
       "_id": "1",
       "name": "Auto Expo",
       "description": "lorem ipsum",
       "date": "2012-04-23T18:25:43.511Z"
     },
     {
       "_id": "2",
       "name": "Auto Expo",
       "description": "lorem ipsum",
       "date": "2012-04-23T18:25:43.511Z"
     },
 
     {
       "_id": "3",
       "name": "Auto Expo",
       "description": "lorem ipsum",
       "date": "2012-04-23T18:25:43.511Z"
     },
     {
       "_id": "4",
       "name": "Auto Expo",
       "description": "lorem ipsum",
       "date": "2012-04-23T18:25:43.511Z"
     },
     {
       "_id": "5",
       "name": "Auto Expo",
       "description": "lorem ipsum",
       "date": "2012-04-23T18:25:43.511Z"
     },
     {
       "_id": "6",
       "name": "Auto Expo",
       "description": "lorem ipsum",
       "date": "2012-04-23T18:25:43.511Z"
     }
   ]
   
   res.json(events)
 })

module.exports = router 