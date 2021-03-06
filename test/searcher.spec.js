const logger = require('./../applogger');
const config = require('./../config');
const amqp = require('amqplib');

describe('Testing searcher for avoiding recent searches', function() {

        beforeEach(function() {
            let msg = {
                domain: '',
                concept: '',
                start: '',
                nbrOfResults: ''
            };
            sendToQueue(config.RABBITMQ.rabbitmqURL, config.OXYGEN.SEARCHER_MQ_NAME, msg);

        });

        it('Check if the search happens or not', function(done) {
            logger.debug('Write something inside the test cases');

            done();
        });
    }) //end of test plan

function sendToQueue(qURL, qName, qMsg, callback) {
    amqp.connect(qURL).then(function(conn) {
        logger.debug('Connected successfully...!')
        return conn.createChannel().then(function(ch) {
            let ok = ch.assertQueue(qName, { durable: false });

            let qMsgBuffer = new Buffer('');
            if (qMsg instanceof Object) {
                qMsgBuffer = new Buffer(JSON.stringify(qMsg));
            } else {
                qMsgBuffer = new Buffer(qMsg);
            }

            return ok.then(function(_qok) {
                ch.sendToQueue(qName, qMsgBuffer);
                logger.info(" [x] Message Sent ", qMsg);
                return ch.close();
            });
        }).finally(function() { conn.close(); });
    }).catch(function(err) {
        logger.error(err);
    });
}
