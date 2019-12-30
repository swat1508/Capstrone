#user api
kubectl apply -f user-api/k8s/user-api-service.yml
kubectl apply -f user-api/k8s/user-api-deployment.yml
echo "user-api service and deployment  done successfully.."

#search admin api
kubectl apply -f review-api/k8s/review-api-service.yml
kubectl apply -f review-api/k8s/review-api-deployment.yml
echo "review-api service and deployment  done successfully.."

#user api
kubectl apply -f client/k8s/client-service.yml
kubectl apply -f client/k8s/client-deployment.yml
echo "client service and deployment  done successfully.."

echo "please wait we are configring the micro services"
echo "all releted services,pods,deployment and screte has been created successfully "