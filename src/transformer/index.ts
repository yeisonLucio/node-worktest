import {APIGatewayProxyEventV2, APIGatewayProxyResultV2, Handler} from "aws-lambda";
import container from "./di/container";
import { StarWarsRepository } from "./repositories/contracts/StartWarsRepository";
import { TYPES } from "./di/types";
import { validateRequest } from "../common/helpers/ValidateRequest";
import { TransformerRequestDTO } from "./dtos/transformerRequestDTO";
import { loadTranslations, translateObjectKeys } from "./helpers/Translation";

type ProxyHandler = Handler<APIGatewayProxyEventV2, APIGatewayProxyResultV2>;

const starWarsRepository: StarWarsRepository = container.get(TYPES.starWarsRepository)

export const handler: ProxyHandler = async (event) => {

    try {
        const request = await validateRequest(event.queryStringParameters!, TransformerRequestDTO)

        const translator = loadTranslations(request.language)

        let result: Object;
        
        if (request.modelId) {
            result = await starWarsRepository.getByIdAndModel(Number(request.modelId), request.model)
        }else{
            result = await starWarsRepository.getRecordsByModel(request.model)
        }

        let response = translateObjectKeys(result, translator)
        
        return {
            statusCode: 200,
            body: JSON.stringify(response)
        };
        
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        };
    }
}