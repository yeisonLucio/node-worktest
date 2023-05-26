import {APIGatewayProxyEventV2, APIGatewayProxyResultV2, Handler} from "aws-lambda";
import { ProductRepository } from "../common/repositories/contracts/ProductRepository";
import container from "../common/di/container";
import { TYPES } from "../common/di/types";

type ProxyHandler = Handler<APIGatewayProxyEventV2, APIGatewayProxyResultV2>;

const productRepository: ProductRepository = container.get(TYPES.productRepository)

export const handler: ProxyHandler = async (event) => {

    try {
        const id = event.pathParameters?.id
    
        if(! id){
            throw new Error('id is required')
        }

        const product = await productRepository.getById(id)

        return {
            statusCode: 200,
            body: JSON.stringify(product)
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        };
        
    }
}