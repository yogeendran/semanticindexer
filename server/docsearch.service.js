const mongoose = require('mongoose');
const path = require('path');
const logger = require('../applogger');
// const searcherEngine = require('./searcher/docSearcherEngine');
const docSearchPipeline = require('./docSearcher/docSearchPipeline');
const config = require('../config');

function setupMongooseConnections() {
  mongoose.connect(config.MONGO.mongoURL);

  mongoose.connection.on('connected', function() {
    logger.debug('Mongoose is now connected to ', config.MONGO.mongoURL);
  });

  mongoose.connection.on('error', function(err) {
    logger.error('Error in Mongoose connection: ', err);
  });

  mongoose.connection.on('disconnected', function() {
    logger.debug('Mongoose is now disconnected..!');
  });

  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      logger.info(
        'Mongoose disconnected on process termination'
      );
      process.exit(0);
    });
  });
}

function welcome() {
  let motdFile = path.resolve(__dirname, '.search.motd');
  const fs = require('fs');
  if (fs.existsSync(motdFile)) {
    let msg = fs.readFileSync(motdFile, 'utf-8');
    process.stdout.write('\n' + msg + '\n');
  } else {
    process.stdout.write('\n=========== Oxygen Searcher ===========\n');
  }
}

let startDocSearcherEngine = function() {
  try {
    welcome();

    //  Any pre-requisites for running the engine
    setupMongooseConnections();

    logger.info('Starting doc search engine..!');

    docSearchPipeline.startSearcher();
    // searcherEngine.startSearcher();
  } catch (err) {
    logger.error('Caught error in running doc searcher engine: ', err);
  }
};

startDocSearcherEngine();
