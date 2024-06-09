FROM amazon/aws-lambda-nodejs:20

# Copy function code
COPY . ${LAMBDA_TASK_ROOT}

RUN npm ci

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "./auth/login.handler" ]