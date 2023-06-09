import { plainToClass } from "class-transformer"
import { validate } from "class-validator";

export const validateRequest = <T>(object: Object, dto: new () => T): Promise<T> => {
    return new Promise(async (resolve, reject) => {
        const request: any = plainToClass(dto, object);
        const result = await validate(request)

        if (result.length > 0) {
            reject(result);
        }

        resolve(request)
    })
}