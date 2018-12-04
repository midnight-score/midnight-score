const UserSchema = require('../model/user');
const constM = require('../config/constants')
const ProviderSchema = require('../model/provider');
const CilentSchema = require('../model/client');

module.exports.signup = function (req, res, next) {

    const bodyData = req.body;
    var user = new UserSchema();
    // console.log(bodyData);
    // UserSchema.findOne().then(function(user){
    //     console.log('user', user)
    // if (!user) {
    //     return res.json({ code: 401, status: "Failed", message: 'Server error while fetching user details', });
    // }
    if (bodyData.full_name)
        user.full_name = bodyData.full_name;
    else
        return res.json({ status: constM.not_found.status, message: constM.not_found.message });

    if (bodyData.rating)
        user.rating = bodyData.rating;
    // else 
    //     return res.json({status: constM.not_found.status, message: constM.not_found.message});


    if (bodyData.gender)
        user.gender = bodyData.gender;
    else
        return res.json({ status: constM.not_found.status, message: constM.not_found.message });


    if (bodyData.phone_number)
        user.phone_number = bodyData.phone_number;
    else
        return res.json({ status: constM.not_found.status, message: constM.not_found.message });

    if (bodyData.current_location)
        user.current_location = bodyData.current_location;
    else
        return res.json({ status: constM.not_found.status, message: constM.not_found.message });

    if (bodyData.age)
        user.age = bodyData.age;
    else
        return res.json({ status: constM.not_found.status, message: constM.not_found.message });

    if (bodyData.email)
        user.email = bodyData.email;
    else
        return res.json({ status: constM.not_found.status, message: constM.not_found.message });

    if (bodyData.profession)
        user.profession = bodyData.profession;
    else
        return res.json({ status: constM.not_found.status, message: constM.not_found.message });

    user.save().then(async function (user) {
        console.log(user);
        if (bodyData.userType === 'provider') {
            console.log("*************************")
            var provider = new ProviderSchema();
            provider.full_info = user;
            await provider.save();
            UserSchema.findById(user._id).update({ service_generator: provider })
                .then(function (user) {
                    if (user) {
                        console.log("------------------------", provider);
                        return res.json({ status: 200, message: 'successfully' })
                    }
                }).catch(next)

        } else if (body.userType === 'client') {
            var client = new CilentSchema();
            client.full_info = user;
            await client.save();
            UserSchema.findById(user._id).update({ service_consumer: client })
                .then(function (user) {
                    if (user) {
                        return res.json({ status: 200, message: 'successfully' })
                    }
                }).catch(next)
        }
    }).catch(next);

}

module.exports.login = function (req, res) {

    //login here
}

//homepage
module.exports.homepage = async function (req, res) {
    var popularINarea = [];
    await UserSchema.find({ current_location: 'Kathmandu' })
        .populate('provider')
        .sort({ rating: -1 })
        .limit(5)
        .then(function (results) {
            results.map(user => {
                console.log("popular in ares", user._id);
                popularINarea.push(user.toProfileJSON(user._id));
            })
        });
    console.log("///////////////////", popularINarea);
    var overallTOP = [];
    await UserSchema.find({})
        .populate('provider')
        .sort({ rating: -1 })
        .limit(10)
        .then(function (results) {
            results.map(user => {
                overallTOP.push(user.toProfileJSON(user._id));
                // return user.toProfileJSON(user.id);
            })
        });
    return res.json({ ovarallTOP: overallTOP, popularINarea: popularINarea });
}

//profile page
module.exports.profile = function (req, res, next) {
    UserSchema.find(req.param.id).then(function (user) {
        return user.toProfileJSONFOR;
    })
}

//preloading id params

module.exports.getIdParam = function (req, res, next, id) {
    UserSchema.findById(id).then(function (user) {
        if (!user) { return res.sendStatus(404) }
        req.user = user;
        return next();

    }).catch(next);
}

//profile page edit options
module.exports.editProfileOptions = function (req, res, next) {
    UserSchema.findById(req.user.id)
        .populate('service_generator')
        .then(function (user) {
            console.log(user)
            var s = user.service_generator;
            return res.json({
                full_name: user.full_name,
                current_location: user.current_location,
                gender: user.gender,
                age: user.age,
                phone_number: user.phone_number,
                avilable_status: user.avilable_status,
                service_rate: s.service_rate,
                avilable_times: s.avilable_times,
                image: s.image.map(img => { return img })
            });
        });
} 
