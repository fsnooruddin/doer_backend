const db = require("../models");
const ScheduleEntry = db.schedule_enteries;
const Activity = db.activities;

module.exports = {
    add_to_nofications_queue,
    save_to_schedule_entry_db,
    escapeJSONString,
    getTimeFromAvailability,
    getDayFromAvailability
};

function escapeJSONString(server_return_string) {

    var data_str = JSON.stringify(server_return_string);
    
    // Preserve newlines, etc. - use valid JSON
    data_str = data_str.replace(/\\n/g, "\\n")
    .replace(/\\'/g, "\\'")
    .replace(/\\"/g, '\\"')
    .replace(/\\&/g, "\\&")
    .replace(/\\r/g, "\\r")
    .replace(/\\t/g, "\\t")
    .replace(/\\b/g, "\\b")
    .replace(/\\f/g, "\\f");
    // Remove non-printable and other non-valid JSON characters
    data_str = data_str.replace(/[\u0000-\u001F]+/g,"");
    
    return JSON.parse(data_str);

}

function getDayFromAvailability(availability) {
    const retArray = availability.split(":");
        return retArray[0];
  }

  function getTimeFromAvailability(availability) {
    const retArray = availability.split(":");
    if(retArray[1] === undefined) {
        return null;
    } else {
        return retArray[1];
    }
  }

function add_to_nofications_queue(entry) {

    console.log("in add to notifications queue + " + entry.title.toString());

    const kafka = require('kafka-node');
    const kafka_topic = 'sample';
    try {
        const Producer = kafka.Producer;
        const client = new kafka.KafkaClient({
            kafkaHost: '127.0.0.1:9092'
        });
        const producer = new Producer(client);

        console.log("Producer Initialised..");


        const msg = {
            "title": entry.title,
            "schedule": entry.schedule,
            "patient_id": "22",
            "caregiver_id": "33"
        };
        console.log("message in queue is " + JSON.stringify(msg));

        payload = [{
            topic: 'sample',
            messages: JSON.stringify(msg),
            partition: 0
        }, ];

        producer.on('ready', function() {

            producer.send(payload, (err, data) => {
                if (err) {
                    console.log('[kafka-producer -> ' + kafka_topic + ']: broker update failed');
                } else {
                    console.log('[kafka-producer -> ' + kafka_topic + ']: added activity');
                }
            });
        });

        producer.on('error', function(err) {
            console.log(err);
            console.log('[kafka-producer -> ' + kafka_topic + ']: connection errored');
            throw err;
        });
    } catch (e) {
        console.log(e);
    }
}

async function save_to_schedule_entry_db(entry) {

  console.log("in save_to_schedule_entry_db");
  console.log(entry);

    try {
        data = await ScheduleEntry.create(entry);
    } catch (err) {
        console.log("Could not create Successfully created scheduled entry");
        console.log(err);
    };
}
