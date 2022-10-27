const mqtt = require('mqtt');
let url = 'mqtt://mqtt3.thingspeak.com' 
let options = {
    clientId:"Fj03BQYSBx8ABgw2GCAkPC4",
    username:"Fj03BQYSBx8ABgw2GCAkPC4",
    password:"OdH6j3y3ZfZwHfSPZO6SyGkd",
    clean:true
}
// 連接 MQTT server
let client = mqtt.connect(url, options)
client.on("error",function(error){
    console.log("Can't connect" + error);
    process.exit(1)
})
// 訂閱訊息
let topic_list = ["channels/1898172/subscribe/fields/field2","channels/1898172/subscribe/fields/field3"] 
client.subscribe(topic_list, {qos:0})
client.on('message', function(topic, message){
	console.log(topic, ": "+ message.toString())
})
// 發佈訊息
let publish_topic = "channels/1898172/publish/fields/field1"
let i = 0
setInterval(function(){
    if (i == 0) i = 1
    else i = 0 
    client.publish(publish_topic, i.toString())
    console.log("Published Topic: " + publish_topic + ", message: "+ i.toString())
},30000)
console.log('waiting message from my ThingSpeak channel...')