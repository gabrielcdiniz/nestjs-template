FROM node:14

ENV HOME=/home/node
ENV APP=${HOME}/app
USER root
WORKDIR ${HOME}
RUN yarn add @nestjs/cli

WORKDIR ${APP}

COPY package.json .

RUN yarn

COPY src ./src
COPY test ./test
COPY .eslintrc.js .
COPY jest.config.ts .
COPY tsconfig.json .
COPY tsconfig.build.json .
COPY tsconfig.paths.json .

RUN yarn build

ENV NODE_ENV production

CMD [ "yarn", "run", "start:prod"]