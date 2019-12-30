# login to docker 
# docker login --username=yourhubusername --password=yourpassword

#create new images
docker rmi userapi -f
docker build ./user-api -t userapi
echo "userapi created successfully.."
docker rmi reviewapi -f
docker build ./review-api -t reviewapi
echo "reviewapi created successfully.."
docker rmi feedbackclient -f
docker build ./client -t feedbackclient
echo "feedbackclient created successfully.."
# push it to docker 
# docker push apigateway