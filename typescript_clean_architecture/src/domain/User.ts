class User {
    private _id: number;
    private _name: string;
    private _age: number;

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get age(): number {
        return this._age;
    }

    public set age(age: number) {
        this._age = age;
    }

    public get id(): number {
        return this._id;
    }

    public set id(id: number) {
        this._id = id;
    }

    public constructor(
        id: number = null,
        name: string = null,
        age: number = null
    ) {
        this._name = name;
        this._age = age;
        this._id = id;
    }
}

const UserBusinessRule = {
    // 名前は1文字以上、12文字未満
    // @param name String

    isNameLengthValid(name: string): boolean {
        return name.length > 0 && name.length < 12;
    }
};

export { User, UserBusinessRule };