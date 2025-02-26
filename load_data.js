const fs = require('fs');
const { Client } = require('pg');
const csvParser = require('csv-parser');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'verusen',
    password: 'postgres',
    port: 5432,
});


async function insertRow(row, manufacturersMap) { 
    try {
        // Insert manufacturer if not exists
        let manufacturerId = manufacturersMap.get(row.manufacturer_name);
        if (!manufacturerId) {
            const res = await client.query(
                'INSERT INTO manufacturers (name) VALUES ($1) ON CONFLICT (name) DO NOTHING RETURNING id',
                [row.manufacturer_name]
            );
            manufacturerId = res.rows[0]?.id;
            if (manufacturerId) manufacturersMap.set(row.manufacturer_name, manufacturerId);
            else {
                const manufacturerRes = await client.query(
                    'SELECT id FROM manufacturers WHERE name = $1',
                    [row.manufacturer_name]
                );
                manufacturerId = manufacturerRes.rows[0].id;
            }
        }

        // Insert material
        const materialRes = await client.query(
            'INSERT INTO materials (name, description, long_description, customer_part_id, category, manufacturer_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
            [row.name, row.description, row.long_description, row.customer_part_id, row.category, manufacturerId]
        );
        const materialId = materialRes.rows[0].id;

        // Insert price
        await client.query(
            'INSERT INTO prices (material_id, requested_unit_price) VALUES ($1, $2)',
            [materialId, row.requested_unit_price]
        );

        // Insert competitor
        if (row.competitor_name) {
            await client.query(
                'INSERT INTO competitors (name, part_name, part_id) VALUES ($1, $2, $3)',
                [row.competitor_name, row.competitor_part_name, row.competitor_part_id]
            );
        }

        // Insert unit details
        await client.query(
            'INSERT INTO units (material_id, unit_of_measure, unit_quantity, requested_quantity) VALUES ($1, $2, $3, $4)',
            [materialId, row.unit_of_measure || null, row.unit_quantity || null, row.requested_quantity || null]
        );
    } catch (err) {
        console.error('Error inserting data:', err);
    }
}

async function insertData() {
    await client.connect();
    const manufacturersMap = new Map();
    const insertPromises = [];

    fs.createReadStream('materials.csv')
        .pipe(csvParser())
        .on('data', async (row) => {
            insertPromises.push(insertRow(row, manufacturersMap));
        })
        .on('end', async () => {
            await Promise.all(insertPromises);
            console.log('CSV file successfully processed');
            await client.end();
        });
}

insertData();
