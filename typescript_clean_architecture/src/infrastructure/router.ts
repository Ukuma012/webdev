import express from "express";
import Controller from "../interface/controller";
import { TCreateUserRequest } from "../interface/request/user/CreateUserRequest";
import { TFindUserRequest } from "../interface/request/user/FindUserRequest";
import { UpdateUserRequest } from "../interface/request/user/UpdateUserRequest";
import { TDeleteUserRequest } from "../interface/request/user/DeleteUserRequest";
import { MysqlConnection } from "../infrastructure/MysqlConnection";

const con = new MysqlConnection();
const userController = new Controller.userController(con);
const router = express.Router();

// user
router.get(
    "/users",
    async (_, res: express.Response): Promise<void> => {
        let result = await userController.findAllUser();
        res.send(result);
    }
);

router.get(
    "/users/:id",
    async(req: TFindUserRequest, res: express.Response): Promise<void> => {
        let result = await userController.findUser(req); 
        res.send(result);
    }
);

router.post(
    "/users",
    async (req: TCreateUserRequest, res: express.Response): Promise<void> => {
        let result = await userController.CreateUser(req);
        res.send(result);
    }
);

router.patch(
    "/users/:id",
    async (req: UpdateUserRequest, res: express.Response): Promise<void> => {
        let result = await userController.updateUser(req);
        res.send(result);
    }
);

router.delete(
    "/users/:id",
    async (req: TDeleteUserRequest, res: express.Response): Promise<void> => {
        let result = await userController.deleteUser(req);
        res.send(result);
    }
);

export default router;