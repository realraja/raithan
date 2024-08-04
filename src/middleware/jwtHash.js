import jwt from 'jsonwebtoken';

export const createJWT = (data) =>{
    const hashed = jwt.sign(data,process.env.JWT_SECRET)
    return hashed;
}

export const getJWT = (data) =>{
    const unhashed = jwt.verify(data,process.env.JWT_SECRET)
    return unhashed;
}