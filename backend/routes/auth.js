const express = require('express');
const User = require('../models/User');
const router = express.Router();
const fetchuser=require('../middleware/fetchuser');

//for validation like name,email:
const { body, validationResult } = require('express-validator');

//for encryption of data (hashing):
const bcrypt = require('bcryptjs');

//To Create JWT token:
var jwt = require('jsonwebtoken')
const JWT_SECRET = "ParikhisGood$oy";

//Route1: Create user using POST:
router.post('/createUser', [
  body('name', "Enter a valid name").isLength({ min: 3 }),
  body('email', "Enter a valid email").isEmail(),
  body('password', "Enter a valid password").isLength({ min: 3 }),
], async (req, res) => {
  let success=false;
  //if there are errors,return bad request:
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success,errors: errors.array() });
  }

  //Check if user already exist:
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success,error: "User already exist" });
    }

    //to create salt:
    const salt = await bcrypt.genSalt(10);

    //to encrypt password:
    const secPass = await bcrypt.hash(req.body.password, salt);

    //create user and it to database using validator:
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })

    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    success=true;
    res.json({success, authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured")
  }
});


//Route2: To verify Login User:
router.post('/loginUser', [
  body('email', "Enter a valid email").isEmail(),
  body('password', "Enter a valid password").isLength({ min: 3 }),
], async (req, res) => {
  let success=false;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "This email doesn't exist" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success=false;
      return res.status(400).json({ success,error: "This Password is invalid" });
    }
    //if verified send user id:
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    success=true;
    res.json({success, authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured")
  }
});


//Route3: Get User details:
router.post('/getUser', fetchuser, async (req, res) => {
  try{
      user_Id=req.user.id;
      const user=await User.findById(user_Id).select("-password");
      res.send(user);
  }catch(error){
    console.error(error.message);
    res.status(500).send("Some error occured")
  }
});  


module.exports = router;