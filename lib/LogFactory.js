var logger=require("log4js");

logger.configure({
	appenders: [
    {
      type: 'dateFile',
      absolute: true,
      filename: __dirname + '/../logs/info/info.log',
      //filename: "blah.log",
      pattern: "-yyyy-MM-dd",

      maxLogSize: 1024,
        // "pattern": "-yyyy-MM-dd",
      alwaysIncludePattern: false,

      backups: 4,
      category: 'proLog'
    },
    {
      type: 'dateFile',
      absolute: true,
      filename: __dirname + '/../logs/debug/debug.log',
      //filename: "blah.log",
      pattern: "-yyyy-MM-dd",

      maxLogSize: 1024,
        // "pattern": "-yyyy-MM-dd",
      alwaysIncludePattern: false,

      backups: 4,
      category: 'debugLog'
    }
  ],
  "levels":{"proLog":"INFO","debugLog":"DEBUG"}
});

exports.log4js=logger;

