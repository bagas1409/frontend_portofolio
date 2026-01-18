const http = require('http');

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/projects',
    method: 'GET',
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk.toString()}`);
    });
});

req.on('error', (e) => {
    console.error(`PROBLEM: ${e.message}`);
});

req.end();
