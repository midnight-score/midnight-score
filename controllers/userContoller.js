const UserSchema = require('../model/user');
const constM = require('../config/constants')
module.exports.signup = function(req, res){
  
    const bodyData = req.body;
    var user = new UserSchema();
    console.log(bodyData);
    UserSchema.findOne({'phone_number':12563625 }).then(function(user){
        console.log('user', user)
        if (!user) {
            return res.json({ code: 401, status: "Failed", message: 'Server error while fetching user details', });
        }
        if (bodyData.fullname) 
            user.fullname = bodyData.fullname;
        else 
            return res.json({status: constM.not_found.status, message: constM.not_found.message});

        if (bodyData.gender)
             user.gender = bodyData.gender;
        else 
        return res.json({status: constM.not_found.status, message: constM.not_found.message});

        
        if(bodyData.phone_number)
             user.phone_number = bodyData.phone_number;
        else
            return res.json({status: constM.not_found.status, message: constM.not_found.message});

        if(bodyData.current_location)
             user.current_location = bodyData.current_location;
        else
            return res.json({status: constM.not_found.status, message: constM.not_found.message});
        
    })
  

    //signup here
}

module.exports.login = function(req, res){
    var user = new UserSchema({'phone_number': 12563625});
    user.save();
    //login here
}

//homepage
module.exports.homepage = function(req, res){

}