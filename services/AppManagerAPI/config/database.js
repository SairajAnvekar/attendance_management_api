module.exports = (mongoose, config) => {
  const database = mongoose.connection;
  mongoose.Promise = Promise;
  mongoose.connect(config.database, {
    promiseLibrary: global.Promise
  });
  database.on('error', error => console.log(`Connection to Inventory Manager database failed: ${error}`));
  database.on('connected', () => console.log('Connected to Inventory Manager database'));
  database.on('disconnected', () => console.log('Disconnected from Inventory Manager database'));
  process.on('SIGINT', () => {
    database.close(() => {
      console.log('Inventory Manager terminated, connection closed');
      process.exit(0);
    })
  });
};