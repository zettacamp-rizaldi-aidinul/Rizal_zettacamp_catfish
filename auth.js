// import jwt
const jwt = require('jsonwebtoken');

// import user model
const UserModel = require('../user/user.model');

// make auth
const authenticationUser = async function (resolver, parent, args, context) {
    // check if there is input or not
    // console.log(args);

    // get token from header
    const token = context.req.get('Authorization');
    // console.log(token);

    // check if token is empty or not
    if (!token) {
        throw new Error(`Token is required`);
    } else {
        // check if token is valid or not
        const decode = jwt.verify(token, 'nico');
        // console.log(decode);

        // get user data from token
        const getUser = await UserModel.find({
            email: decode.email
        });
        // console.log(getUser);

        // save data into context
        context.user = getUser;
        context.token = token;
        // console.log(context);
    };

    return resolver();
};

