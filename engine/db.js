'use strict';

var _db = null

const _getDB = () => {
    if(_db === null) {
        _initDB();
    }
    return _db
}

const _initDB = async () => {
    const mms = require('mongodb-memory-server');
    const dbObj = await mms.MongoMemoryServer.create({
        instance: {
            dbName: "boo",
            port: 12345,
            dbPath: './db',
            storageEngine: 'wiredTiger',
        }
    });
    _db = dbObj.getUri();
    console.log("DB Uri", _db);
    return _db
}

module.exports = {
    getDB: _getDB,
    initDB: _initDB,
};