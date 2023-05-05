## Build image
docker build -t flask-srv:latest .


## Create volume for store
```
docker volume create store-vol --opt type=none --opt device=/path/to/store --opt o=bind
----------
docker volume create store-vol --opt type=none --opt device=/home/yatharthagoenka/Desktop/BlueCloud/server/store --opt o=bind
```

## Run container
docker run -p 5000:80 -v store-vol:/app/store --name flask-service flask-srv

