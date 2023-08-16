import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { CustomRequest } from '../types/customTypes';


const protect = asyncHandler(async (req: CustomRequest, res: Response, next) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET) as {userId: string};

            req.user = await UserModel.findById(decoded.userId).select('-password');

            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, invalid token');
        } 
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
})

export {protect};