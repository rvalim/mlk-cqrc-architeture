# $DOCKER_REPO mlk-cqrc
docker login -u=lim0nes -p=$PUBLICPASSWORD
cd ../services/mlk-auth
docker build -t auth .
docker tag auth $DOCKER_REPO/mlk-auth:stable
docker push $DOCKER_REPO/mlk-auth
cd ../mlk-calendar
docker build -t calendar .
docker tag calendar $DOCKER_REPO/mlk-calendar:stable
docker push $DOCKER_REPO/mlk-calendar
cd ../mlk-file
docker build -t file .
docker tag file $DOCKER_REPO/mlk-file:stable
docker push $DOCKER_REPO/mlk-file
cd ../mlk-profile
docker build -t profile .
docker tag profile $DOCKER_REPO/mlk-profile:stable
docker push $DOCKER_REPO/mlk-profile
cd ../mlk-timesheet
docker build -t timesheet .
docker tag timesheet $DOCKER_REPO/mlk-timesheet:stable
docker push $DOCKER_REPO/mlk-timesheet
cd ../mlk-vacation
docker build -t file .
docker tag file $DOCKER_REPO/mlk-vacation:stable
docker push $DOCKER_REPO/mlk-vacation
cd ../mlk-vacation-handler
docker build -t file .
docker tag file $DOCKER_REPO/mlk-vacation-handler:stable
docker push $DOCKER_REPO/mlk-vacation-handler
cd ../gateway
docker build -t gateway .
docker tag gateway $DOCKER_REPO/mlk-gateway:stable
docker push $DOCKER_REPO/mlk-gateway