const pg = require('pg')
const fs = require('fs')
const path = require('path')
// pg setting type parsing
const { types } = pg
const timestampOID = 1114
const timestamptzOID = 1184
const dateOID = 1082
types.setTypeParser(timestampOID, (v) => v)
types.setTypeParser(timestamptzOID, (v) => v)
types.setTypeParser(dateOID, (v) => v)
pg.defaults.ssl = true;
const config = {
    host: 'ec2-174-129-238-192.compute-1.amazonaws.com',
    user: 'pzukwjkekomcdj',
    database: 'da06suabogtfqo',
    password: '2e6b170e2fe5f0a79b3b8f0dafcc834f72ca102c84c55aa8a7a793ba187c3afb',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 10000,
    ssl: true,
};


const postgre = {
    run(query) {
        const pool = new pg.Pool(config)
        let poolClient = null
        let result = null
        let error = null
        return pool
            .connect()
            .then((pc) => (poolClient = pc))
            .then(() => poolClient.query(query))
            .then((rs) => (result = rs))
            .catch((e) => (error = e))
            .then(() => {
                if (poolClient !== null)
                    poolClient.release((err) => {
                        if (err) {
                            // cant not release PoolClient
                        }
                    })
                if (error !== null) {
                    // query fail
                    throw error
                }


                return result
            })
    },
}



module.exports = {
    postgre,
    config
}