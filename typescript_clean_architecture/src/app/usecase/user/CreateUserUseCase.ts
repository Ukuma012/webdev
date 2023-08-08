import { User } from "../../../domain/User";

class CreateUserUseCase {
    private userRepository: IUserRepository;

    public constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    public createUser(user: User): Promise<User> {
        const userDTO = toCreateUserDTO(user);
        return this.userRepository.create(userDTO);
    }
}

export { CreateUserUseCase };