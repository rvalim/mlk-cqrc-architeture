#  mlk-cqrc
sudo docker login -u=lim0nes -p=publicpassword@
cd ../services/mlk-auth
sudo docker build -t auth .
sudo docker tag auth $DOCKER_REPO/mlk-auth:stable
sudo docker push $DOCKER_REPO/mlk-auth
cd ../mlk-calendar
sudo docker build -t calendar .
sudo docker tag calendar $DOCKER_REPO/mlk-calendar:stable
sudo docker push $DOCKER_REPO/mlk-calendar
cd ../mlk-file
sudo docker build -t file .
sudo docker tag file $DOCKER_REPO/mlk-file:stable
sudo docker push $DOCKER_REPO/mlk-file
cd ../mlk-profile
sudo docker build -t profile .
sudo docker tag profile $DOCKER_REPO/mlk-profile:stable
sudo docker push $DOCKER_REPO/mlk-profile
cd ../mlk-timesheet
sudo docker build -t timesheet .
sudo docker tag timesheet $DOCKER_REPO/mlk-timesheet:stable
sudo docker push $DOCKER_REPO/mlk-timesheet
cd ../mlk-vacation
sudo docker build -t file .
sudo docker tag file $DOCKER_REPO/mlk-vacation:stable
sudo docker push $DOCKER_REPO/mlk-vacation
cd ../mlk-vacation-handler
sudo docker build -t file .
sudo docker tag file $DOCKER_REPO/mlk-vacation-handler:stable
sudo docker push $DOCKER_REPO/mlk-vacation-handler
cd ../gateway
sudo docker build -t gateway .
sudo docker tag gateway $DOCKER_REPO/mlk-gateway:stable
sudo docker push $DOCKER_REPO/mlk-gateway