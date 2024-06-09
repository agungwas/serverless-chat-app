FROM amazon/aws-lambda-nodejs:20

COPY . ${LAMBDA_TASK_ROOT}

RUN npm ci

RUN npm run build

RUN rm -rf src Dockerfile tsconfig.json
