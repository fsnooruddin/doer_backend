const kafka = require("kafka-node");

var topicsToCreate = [{
  topic: 'doer_messages',
  partitions: 1,
  replicationFactor: 1
},
{
  topic: 'admin_messages',
  partitions: 1,
  replicationFactor: 1
}];

const KafkaUtils = {};

function createTopics() {

    KafkaUtils.kafkaClient.createTopics(topicsToCreate, (error, result) => {
  // result is an array of any errors if a given topic could not be created
  if(error == null) {
    console.log("created kafka topics");
  }
});

}

async function init() {

    const Consumer = kafka.Consumer;
    // const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
    const client = new kafka.KafkaClient({ kafkaHost: "kafka:9092" });

    const Producer = kafka.Producer;
    const producer = new Producer(client);
    await producer.on('ready', function () {
        console.log("kafka producer is ready");
        KafkaUtils.kafkaClient = client;
        KafkaUtils.kafkaProducer = producer;
        createTopics();
        KafkaUtils.Initialized = true;
    });

}

async function sendMessage(ktopic, kmessage) {
    if( KafkaUtils.Initialized !== true ) {
        console.log("Kafka, sendMessage not initialized");
        return;
    }
    var payload = [{
        topic: ktopic,
        messages: kmessage
    }];
    console.log(JSON.stringify(payload));
     KafkaUtils.kafkaProducer.send(payload, function (err, data) {
            console.log("Send message to kafka topic = " + ktopic);
        });
}
module.exports = { init, sendMessage, KafkaUtils }