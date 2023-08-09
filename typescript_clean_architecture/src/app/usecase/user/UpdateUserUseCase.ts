import { User } from "../../../domain/User";
import { IUserRepository } from "../../../interface/database/repository/user/IUserRepository";
import { toUpdateUserDTO } from "../../../interface/database/repository/user/DTO";

class UpdateUserUseCase {
    private userRepositroy: IUserRepository;

    public constructor(userRepository: IUserRepository) {
        this.userRepositroy = userRepository;
    }

    public updateUser(user: User): Promise<User> {
        const userDTO = toUpdateUserDTO(user);
        return this.userRepositroy.update(userDTO);
    }
}

export { UpdateUserUseCase };