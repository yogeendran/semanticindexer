const logger = require('./../../applogger');
const storeURL = require('./docSearchController').storeURL;
const config = require('./../../config');
const datapublisher = require('../serviceLogger/redisLogger');
const amqp = require('amqplib');
const highland = require('highland');

const start= function() {
    let amqpConn = amqp.connect(config.RABBITMQ.rabbitmqURL);

    amqpConn
        .then(function(conn) {
            logger.info('[*] Connected to AMQP successfully..!');
            return conn.createChannel();
        })
        .then(function(chConn) {
            logger.info('[*] Established AMQP Channel connection successfully..!');
            //making durable as false, so that .....
            chConn.assertQueue(config.OXYGEN.SEARCHER_MQ_NAME, { durable: false })
                .then(function(ok) {
                    logger.debug("What is ok: ", ok);
                    logger.debug('[*] Waiting for messages on [' + config.OXYGEN.SEARCHER_MQ_NAME +
                        '], to exit press CTRL+C ');

                    highland(function(push, next) {
                        chConn.consume(config.OXYGEN.SEARCHER_MQ_NAME, function(msg) {
                            logger.debug('[*] GOT [',
                                msg.fields.routingKey, '] [', msg.fields.consumerTag, ']');

                            const dataObj = {
                                data: msg.content.toString()
                            };

                            push(null, dataObj);
                            next();

                            logger.debug('Message picked at searcher..!');
                        }, { noAck: true });
                    })
                        .map(function(dataObj) {
                            logger.debug("Got message in pipe: ", dataObj);
                            return dataObj;
                        })
                        .each(function(dataObj) {
                            logger.debug("Consuming the data: ", dataObj);
                            storeURL(dataObj.data);

                            let redisSearch={
                                actor: 'searcher',
                                status: 'search started'
                            }
                            datapublisher.processStart(redisSearch);
                        });
                }); //end of assertQueue
        }); //end of channelConnection

}

module.exports = {
    start: start
};
