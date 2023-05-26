import {APIGatewayProxyEventV2, APIGatewayProxyResultV2, Handler} from "aws-lambda";

type ProxyHandler = Handler<APIGatewayProxyEventV2, APIGatewayProxyResultV2>;

export const handler: ProxyHandler = async (event, context) => {
    return {
        statusCode: 200,
        body: JSON.stringify("hola mundo")
    };
}