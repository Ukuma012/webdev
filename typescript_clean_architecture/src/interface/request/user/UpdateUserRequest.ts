import { TypedRequest } from "../ExpressRequest";
import { StatusCode } from "../../../constant/ErrorCode";

interface Params {
    name: string;
    age: number;
}

export type TUpdateUserRequest = TypedRequest<Params>;

export class UpdateUserRequest {
    private _name: string;
    private _age: number;

    public get name(): string {
        return this._name;
    }

    public get age(): number {
        return this._age;
    }

    public constructor(params: Params) {
        this.valid(params);
        this._name = params.name;
        this._age = params.age;
    }

    private valid(params: Params): void {
        if (params.name.length < 4) {
            throw new Error(
                JSON.stringify({
                    code: StatusCode.invalid,
                    message: "4文字以上の名前"
                })
            );
        }
        if (params.age < 12) {
            throw new Error(
                JSON.stringify({
                    code: StatusCode.invalid,
                    message: "登録は１２歳から"
                })
            );
        }
    }
}