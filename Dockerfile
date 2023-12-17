FROM node:19-alpine3.18 as firstBuild

ENV APP_PATH=/app
WORKDIR $APP_PATH

COPY . .

RUN apk add yarn
RUN yarn install

FROM node:19-alpine3.18

ENV APP_PATH=/app
WORKDIR $APP_PATH

ENV APP_USER=tasks

COPY --from=firstBuild /app $APP_PATH

RUN adduser $APP_USER -D && \
    chown -R $APP_USER:$APP_USER $APP_PATH && \
    chmod 777 $APP_PATH/entrypoint.sh


RUN apk add yarn && yarn install

ENTRYPOINT $APP_PATH/entrypoint.sh
