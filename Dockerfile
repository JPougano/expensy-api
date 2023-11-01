FROM node:18

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN curl --compressed -o- -L https://yarnpkg.com/install.sh | bash && \
    export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"

RUN yarn install

COPY . .

EXPOSE 8080

CMD ["yarn", "start"]
