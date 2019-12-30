#services
kubectl delete svc/mongodb-service
kubectl delete svc/redis-master
kubectl delete svc/user-api-service
kubectl delete svc/review-service
kubectl delete svc/client-service
kubectl delete svc/jaeger

# mongo 
kubectl delete deploy/mongodb
kubectl delete rs/mongodb-service

# redis
kubectl delete deploy/redis-master
kubectl delete rs/redis-master-service

#Jaeger
kubectl delete deploy/jaeger

echo "all releted services,pods,deployment and screte has been deleted successfully "