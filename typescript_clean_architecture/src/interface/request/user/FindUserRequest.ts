import { TypedRequest } from "../ExpressRequest";
import { StatusCode } from "../../../constant/ErrorCode";

interface Params {
    id: string;
}

export class FindUserRequest {
    private _id: number;

    public get id(): number {
        return this._id;
    }

    public constructor(params: Params) {
        const validID = this.validRequest(params);
        this._id = validID;
    }

    private validRequest(params: Params): number {
        console.log(params);
        const id = params.id;
        const numberID = Number(id);
        if (typeof numberID !== "number") {
            throw new Error(
                JSON.stringify({
                    code: StatusCode.invalid,
                    message: "不正なrequest idです"
                })
            );
        }
        return numberID;
    }
}

export type TFindUserRequest = TypedRequest<Params>