const express = require('express');

function createServer(studentRoutes) {
    const app = express();

    app.use(express.json()); 

    app.use('/api/students', studentRoutes);

    return app;
}

module.exports = createServer;