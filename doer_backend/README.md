
<h2>To Test:</h2>

```
scripts/run.sh
```

This will run a number of scripts to create categories, create doers, create jobs etc. 
and exercise other APIs ( like accept job).

The server logs to:
```
/var/log/doer/doer.log
```

Grep this file to see if the tests API calls produced any errors or not.

<h2>Kafka Integration</h2>

The Server will produce messages to different kafka topics for different events.

See <a href="KafkaUtil.html"> Kafka Utils</a> for more information.



<h2>Kafka Integration</h2>

<li>getDoerHistory API</li>
<li>cancelJob API</li>
<li>Finish Qa for this. User can store multiple addresses in their profile</li>
<li>Support for Doer Badges, associate badges with doer / user object</li>
<li>Support for Doer licenses, associate badges with doer / user object</li>
<li>Support for marketing messages</li>
<li>Refactor job, doer_trip controller</li>
