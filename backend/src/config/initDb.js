const fs = require('fs');
const path = require('path');
const pool = require('./db');

async function initDb() {
    const sqlPath = path.join(__dirname, 'db_init.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    // Split by semicolon, but handle potential issues with triggers or procedures if any
    const queries = sql.split(';').filter(query => query.trim() !== '');

    console.log('Starting DB Initialization...');
    
    for (const query of queries) {
        try {
            await pool.query(query);
            // console.log('Successfully executed query');
        } catch (err) {
            console.error('Error executing query:', query);
            console.error(err);
            process.exit(1);
        }
    }

    console.log('DB Initialization completed successfully.');
    process.exit(0);
}

initDb();
