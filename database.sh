# create voulune 
kubectl apply -f mongo/mongodata-persistentvolumeclaim.yml
echo "persistentvolumeclaim created successfully.."
#create pod, deployment and services-------aplly will create new model or update it
#mongo
kubectl apply -f mongo/mongodb-service.yml
kubectl apply -f mongo/mongodb-deployment.yml
echo "mongo service and deployment  done successfully.."
#jaeger
kubectl apply -f jaeger/jaeger-service.yml
kubectl apply -f jaeger/jaeger-deployment.yml
echo "jaeger service and deployment  done successfully.."
#redis
kubectl apply -f redis/redis-service.yml
kubectl apply -f redis/redis-deployment.yml
echo "redis service and deployment  done successfully.."