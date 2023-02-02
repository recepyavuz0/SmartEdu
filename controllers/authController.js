const User = require('../models/User');
const bcrypt = require('bcrypt')

exports.createUser = async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json({
        status: 'success',
        user,
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        error,
      });
    }
  };

  exports.loginUser = async (req, res) => {
    try {
      const {email, password} = req.body

      let user = await User.findOne({email})
      if(user){
        bcrypt.compare(password,user.password,(err,same)=>{
            if(same){
                //USER SESSİON
                res.status(200).send('You are logged in');
            }else{
                res.status(401).send('You are not logged in');
            }
        })
    }
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        error,
      });
    }
  };