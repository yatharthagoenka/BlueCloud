# BlueCloud
A crrptographic cloud-based file storage system.


## Setting up docker for `server`:

- Create a network to run all instances on: 
```
docker network ls                       ---> List all networks
docker network inspect <network_id>     ---> Inspect a network

docker network create bcloud_net
```

- To automatically update node modules to latest versions, run the following commands in root directory of project: 
```
npm install -g npm-check-updates
ncu -u
```
- <local_port> : <container_port>
- To run the containers, use the following command: 

```
docker-compose up -d
```
> Note: `-d flag` is used to run the container in background

<br>

- To stop the containers, use the following command: 

```
docker-compose stop

docker-compose down       ---> removes containers altogether
```

- Check all running containers/images:
```
docker ps -a

docker images
```

## Running docker image for nginx-lb

- This will start an Nginx container acting as a load balancer for the two NestJS app containers. The configuration maps port 3000 of the host machine to the ports 3001 and 3002 which are in turn connected to the same ports of each app instances' docker containers, so we can access the load balancer by navigating to http://<ip_address>:<port> in your web browser.

```
docker compose up
docker compose up -d        --> To run the container in background

```