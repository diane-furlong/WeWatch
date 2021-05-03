import jwt, { decode } from 'jsonwebtoken'
import { secretOrKey } from '../config/keys2';

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, secretOrKey);

            req.userId = decodedData?.id
        } else {
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub;
        }

        next()


    } catch (error) {
        console.log(error)
    }

}

export default auth;