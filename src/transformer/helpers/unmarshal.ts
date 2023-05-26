import { plainToClass } from "class-transformer"
import { validate } from "class-validator";

export const unMarshal = <T>(object: Object, dto: new () => T): Promise<T> => {
    return new Promise(async (resolve, reject) => {
        const request: any = plainToClass(dto, object);
        const result = await validate(request, { skipMissingProperties: true })

        if (result.length > 0) {
            reject(result);
        }

        resolve(request)
    })
}