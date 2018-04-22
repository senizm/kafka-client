var locationSchema = {
    name: 'location',
    type: 'record',
    fields: [
        {
            name: 'lon',
            type: 'double'
        }, {
            name: 'lat',
            type: 'double'
        }]
};

var avro = require('avsc');
var type = avro.parse(locationSchema);

const zookeeperAddress = process.env.ZOOKEEPER_ADDRESS;
const zookeeperTopic = process.env.ZOOKEEPER_TOPIC;

var kafka = require('kafka-node');
var HighLevelConsumer = kafka.HighLevelConsumer;
var Client = kafka.Client;

var client = new Client(zookeeperAddress);
var topics = [{
    topic: zookeeperTopic
}];

var options = {
    autoCommit: true,
    fetchMaxWaitMs: 1000,
    fetchMaxBytes: 1024 * 1024,
    encoding: 'buffer'
};
var consumer = new HighLevelConsumer(client, topics, options);

consumer.on('message', function(message) {
    var buf = new Buffer(message.value, 'binary');
    var decodedMessage = type.fromBuffer(buf.slice(0));
    console.log(decodedMessage);
});

consumer.on('error', function(err) {
    console.log('error', err);
});

process.on('SIGINT', function() {
    consumer.close(true, function() {
        process.exit();
    });
});