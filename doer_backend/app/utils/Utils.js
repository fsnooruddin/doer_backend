const db = require("../models");

module.exports = {
	add_to_nofications_queue,
	escapeJSONString,
	getTimeFromAvailability,
	getDayFromAvailability,
};

function escapeJSONString(server_return_string) {
	var data_str = JSON.stringify(server_return_string);

	// Preserve newlines, etc. - use valid JSON
	data_str = data_str
		.replace(/\\n/g, "\\n")
		.replace(/\\'/g, "\\'")
		.replace(/\\"/g, '\\"')
		.replace(/\\&/g, "\\&")
		.replace(/\\r/g, "\\r")
		.replace(/\\t/g, "\\t")
		.replace(/\\b/g, "\\b")
		.replace(/\\f/g, "\\f");
	// Remove non-printable and other non-valid JSON characters
	data_str = data_str.replace(/[\u0000-\u001F]+/g, "");

	return JSON.parse(data_str);
}

function getDayFromAvailability(availability) {
	const retArray = availability.split(":");
	return retArray[0];
}

function getTimeFromAvailability(availability) {
	const retArray = availability.split(":");
	if (retArray[1] === undefined) {
		return null;
	} else {
		return retArray[1];
	}
}

function add_to_nofications_queue(topic, entry) {
	console.log("in add to notifications queue ");

	const kafka = require("kafka-node");
	const kafka_topic = topic;
	try {
		const Producer = kafka.Producer;
		const client = new kafka.KafkaClient({
			kafkaHost: "127.0.0.1:9092",
		});
		const producer = new Producer(client);

		console.log("Producer Initialised..");

		console.log("message in queue is " + JSON.stringify(entry));

		payload = [
			{
				topic: kafka_topic,
				messages: JSON.stringify(entry),
				partition: 0,
			},
		];

		producer.on("ready", function () {
			producer.send(payload, (err, data) => {
				if (err) {
					console.log(
						"[kafka-producer -> " + kafka_topic + "]: broker update failed",
					);
				} else {
					console.log(
						"[kafka-producer -> " + kafka_topic + "]: added activity",
					);
				}
			});
		});

		producer.on("error", function (err) {
			console.log(err);
			console.log(
				"[kafka-producer -> " + kafka_topic + "]: connection errored",
			);
			throw err;
		});
	} catch (e) {
		console.log(e);
	}
}
