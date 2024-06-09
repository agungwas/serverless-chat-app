import { APIGatewayProxyResultV2 } from 'aws-lambda'

export default {
  success(data: Record<string, string>): APIGatewayProxyResultV2<{ success: boolean }> {
    return {
      success: true,
      statusCode: 200,
      body: JSON.stringify({
        message: data?.message || 'Success',
        data: data.data,
      }),
      // headers: {
      //   'Content-Type': 'application/json; charset=utf-8',
      // },
    }
  },
  error(error: Record<string, unknown>): APIGatewayProxyResultV2<{ success: boolean }> {
    return {
      success: false,
      statusCode: 400,
      body: JSON.stringify({
        message: error?.message || 'Internal server error',
      }),
      // headers: {
      //   'Content-Type': 'application/json; charset=utf-8',
      // },
    }
  }
}