import asyncHandler from "express-async-handler";
import { Response, Request } from "express";

// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req: Request, res: Response) => {
    res.json({
        message: "Ok"
    })
});

export {authUser};