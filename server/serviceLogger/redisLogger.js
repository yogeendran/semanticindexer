const redis = require('redis');
const config = require('./../../config');

const client = redis.createClient(config.REDIS.port, config.REDIS.host);
let dataStr;

const publishLog = function(channelname, data) {
    dataStr = JSON.stringify(data);
    client.publish(channelname, dataStr);
}

const processStart = function(data) {
    let channelName = 'oxygen:onServiceUpdate';
    publishLog(channelName, data);
}

const processFinished = function(data) {
    let channelName = 'oxygen:onServiceUpdate';
    publishLog(channelName, data);
}

const updateData = function(data) {
    let channelName = 'oxygen:onServiceUpdate';
    publishLog(channelName, data);
}

const editData = function(data) {
    let channelName = 'oxygen:onDataEdit';
    publishLog(channelName, data);
}


module.exports = {
    processStart: processStart,
    processFinished: processFinished,
    updateData: updateData,
    editData:  editData 

}
