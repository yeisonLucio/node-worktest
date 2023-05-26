import { APIGatewayProxyEventV2, APIGatewayProxyResultV2, Handler } from "aws-lambda";
import { ProductRepository } from "../common/repositories/contracts/ProductRepository";
import container from "../common/di/container";
import { TYPES } from "../common/di/types";
import { validateRequest } from "../../common/helpers/ValidateRequest";
import { NewProductRequestDTO } from "./dtos/NewProductRequestDTO";
import { Product } from "../common/models/Product"
import { v4 as uuidv4 } from "uuid";

type ProxyHandler = Handler<APIGatewayProxyEventV2, APIGatewayProxyResultV2>;

const productRepository: ProductRepository = container.get(TYPES.productRepository)

export const handler: ProxyHandler = async (event) => {
    try {
        const request = await validateRequest(JSON.parse(event.body!), NewProductRequestDTO)

        let product: Product = {
            id: request.id ?? uuidv4(),
            name: request.name,
            price: request.price,
            quantity: request.quantity,
            reference: request.reference
        };
        
        const result = await productRepository.create(product)

        return {
            statusCode: 200,
            body: JSON.stringify(result)
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        };
    }



}