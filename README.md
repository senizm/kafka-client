

## App Info

kafka-client is the client for location services. Reads location info from Kafka and logs results to console. 

## Startup
 
Commands to start kafka-client application:

1. `npm install`
2. `ZOOKEEPER_ADDRESS=localhost:2181 ZOOKEEPER_TOPIC=node-test3 npm start`

Commands to start in docker environment:

1. `docker build -t client:1.0.0 .`
2. `docker-compose up`
