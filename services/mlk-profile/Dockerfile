FROM node:11.7.0-stretch-slim

EXPOSE 3030
COPY . /home/app
WORKDIR /home/app
RUN npm i
RUN ["chmod", "+x", "./scripts/run.sh"]
RUN ["chmod", "+x", "./scripts/wait-for-it.sh"]
