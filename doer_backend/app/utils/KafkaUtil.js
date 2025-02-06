const kafka = require("kafka-node");
const logger = require("./Logger.js");

var topicsToCreate = [
	{
		topic: "job-messages",
		partitions: 1,
		replicationFactor: 1,
	},
	{
		topic: "admin-messages",
		partitions: 1,
		replicationFactor: 1,
	},
];

const KafkaUtils = {};

function sendJobRequestedMessage(job_id, user_id, time, location, services) {
	var jobMessage = {
		type: "jobRequested",
		job_id: job_id,
		user_id: user_id,
		time_requested: time,
		location: location,
		services_requested: services,
	};

	sendMessage("job-messages", JSON.stringify(jobMessage));
}

function sendJobCompletedMessage(job_id, doer_id, user_id, time, location, services, duration) {

	var jobMessage = {
		type: "jobCompleted",
		job_id: job_id,
		user_id: user_id,
		time_requested: time,
		location: location,
		services: services,
		duration: duration,
	};

	sendMessage("job-messages", JSON.stringify(jobMessage));
}

function createTopics() {
	KafkaUtils.kafkaClient.createTopics(topicsToCreate, (error, result) => {
		// result is an array of any errors if a given topic could not be created
		if (error == null) {
			logger.info("created kafka topics");
		}
	});
}

async function init() {
	logger.info("kafka util...");
	const Consumer = kafka.Consumer;
	const client =  new kafka.KafkaClient({ kafkaHost: "127.0.0.1:9092" });

	var producer = await new kafka.Producer(client);
	await producer.on("ready", function () {
		logger.info("kafka producer is ready");
		KafkaUtils.kafkaClient = client;
		KafkaUtils.kafkaProducer = producer;
		createTopics();
		KafkaUtils.Initialized = true;
		return;
	});
}

async function sendMessage(ktopic, kmessage) {

	if (KafkaUtils.Initialized !== true) {
		logger.info("Kafka, sendMessage not initialized");
		return;
	}
	const payload =
		[{
			topic: ktopic,
			messages: kmessage,
			attributes: 0
		}];

logger.info("send message for topic = " + ktopic + " payload = " + JSON.stringify(payload));
	const result = KafkaUtils.kafkaProducer.send(payload, function (error, result) {
		if (error) {
			logger.error("Sending payload to kafka topic job-messages failed:" + error);
		} else {
			logger.info("Successfully sent payload to kafka topic job-messages:" + result);
		}
	});
}
module.exports = { init, sendMessage, KafkaUtils, sendJobRequestedMessage, sendJobCompletedMessage };
