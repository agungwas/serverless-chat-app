module.exports = {
  success(data) {
    return {
      success: true,
      // statusCode: 200,
      data: {
        message: data?.message || 'Success',
        data: data.data,
      },
      // headers: {
      //   'Content-Type': 'application/json; charset=utf-8',
      // },
    }
  },
  error(error) {
    return {
      success: false,
      // statusCode: 400,
      data: {
        message: error.message || 'Internal server error',
      },
      // headers: {
      //   'Content-Type': 'application/json; charset=utf-8',
      // },
    }
  }
}