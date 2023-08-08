import { User } from "../../../domain/User";
import { IUserRepository } from "../repository/user/IUserRepository";
import { IDBConnection } from "./IDBConnection";
import { toUpdateUserDTO, TCreateUserDTO } from "../repository/user/DTO";

class UserRepository extends IUserRepository {
    private connection: IDBConnection;

    public constructor(connection: IDBConnection) {
        super();
        this.connection = connection;
    }

    private convertModel(r: User): User {
        let user = new User();
        user.id = r.id;
        user.name = r.name;
        user.age = r.age;
        return user;
    }

    public async find(id: number): Promise<User> {
        let queryResults = await this.connection.execute(
            "select * from Users where id = ? limit 1",
            id
        );
        return this.convertModel(queryResults[0]);
    }


}