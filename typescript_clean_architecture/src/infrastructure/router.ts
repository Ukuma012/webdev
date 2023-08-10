import { Express } from "express";
import Controller from "../interface/controller";
import { TCreateUserRequest } from "../interface/request/user/CreateUserRequest";
import { TFindUserRequest } from "../interface/request/user/FindUserRequest";
import { UpdateUserRequest } from "../interface/request/user/UpdateUserRequest";
import { TDeleteUserRequest } from "../interface/request/user/DeleteUserRequest";
import { MysqlConnection } from "../infrastructure/MysqlConnection";