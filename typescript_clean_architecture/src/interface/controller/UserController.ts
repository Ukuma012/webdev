import { CreateUserRequest, TCreateUserRequest } from "../request/user/CreateUserRequest";
import { UserSerializer, UserResponse } from "../serializer/UserSerializer";
import { UserRepository } from "../database/MySQL/UserRepositoryImpl";
import UserUseCase from "../../app/usecase/user";
import { UpdateUserRequest } from "../request/user/UpdateUserRequest";
import { IDBConnection } from "../database/MySQL/IDBConnection";
import user from "../../app/usecase/user";
import { TFindUserRequest, FindUserRequest } from "../request/user/FindUserRequest";
import { TResponse } from "../serializer/ApplicationSerializer";
import { TDeleteUserRequest } from "../request/user/DeleteUserRequest";
import { User } from "src/domain/User";

class UserController {
    private userSerializer: UserSerializer;
    private userRepository: UserRepository;

    public constructor(dbConnection: IDBConnection) {
        this.userSerializer = new UserSerializer();
        this.userRepository = new UserRepository();
    }

    public async findUser(
        req: TFindUserRequest
    ): Promise<TResponse<UserResponse> | TResponse<{}>> {
        try {
            const reqBody = new FindUserRequest(req.body);
            const useCase = new UserUseCase.FindUserUseCase(this.userRepository);
            let result = await useCase.getUser(reqBody.id);
            return this.userSerializer.user(result);
        } catch (error) {
            return this.userSerializer.error(error);
        }
    }

    public async findAllUser(): Promise < TResponse<UserResponse[]> | TResponse<{}>> {
        const useCase = new UserUseCase.FindUserUseCase(this.userRepository);
        let result = await useCase.getAllUsers();
        return this.userSerializer.users(result);
    }

    public async createUser(
        req: TCreateUserRequest
    ): Promise<TResponse<UserResponse> | TResponse<{}>> {
        try {
            const userParams = new CreateUserRequest(req.body);
            const useCase = new UserUseCase.CreateUserUseCase(this.userRepository);
            const user = new User(null, userParams.name, userParams.age);
            let result = await useCase.createUser(user);
            return this.userSerializer.user(result);
        } catch (error) {
            return this.userSerializer.error(error);
        }
    }

    public async updateUser(
        req: UpdateUserRequest
    ): Promise<TResponse<UserResponse> | TResponse<{}>> {
        try {
            const id = Number(req.params.id);
            const body = req.body;
            const useCase = new UserUseCase.UpdateUserUseCase(this.userRepository);
            const user = new User(id, body.name, body.age);
            let result = await useCase.updateUser(user);
            return this.userSerializer.user(resutl);
        } catch (error) {
            return this.userSerializer.error(error);
        }
    }

    public async DeleteUser(
        req: TDeleteUserRequest
    ): Promise<TResponse<Record<string, null>> | TResponse<{}>> {
        try {
            const id = Number(req.params.id);
            const useCase = new UserUseCase.DeleteUserUseCase(this.userRepository);
            await useCase.deleteUser(id);
            return this.userSerializer.delete();
        } catch (error) {
            return this.userSerializer.error(error);
        }
    }
}

export { UserController };