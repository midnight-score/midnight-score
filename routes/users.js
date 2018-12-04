var express = require('express');
var router = express.Router();
var userController = require('../controllers/userContoller');


//TODO: auth require
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/homepage', userController.homepage);
router.get('/profile/:id',  userController.profile);
router.param('id', userController.getIdParam);
router.get('/edit/:id', userController.editProfileOptions);




//mongoose validation errors 
router.use(function(err, req, res, next){
  console.log(err )
  if(err.name === 'ValidationError'){
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function(errors, key){
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }
  return next(err);
});

module.exports = router;
