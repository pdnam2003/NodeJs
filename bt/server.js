const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const LOG_FILE = path.join(__dirname, 'logs.txt');

app.use(cors());
app.use(bodyParser.json());


function writeLog(info) {
    const now = new Date();
    const dateStr = now.toLocaleString('vi-VN', { hour12: false });
    const log = `[${dateStr}] ${JSON.stringify(info)}\n`;
    fs.appendFileSync(LOG_FILE, log);
}


app.use((req, res, next) => {
    const logInfo = {
        type: 'request',
        method: req.method,
        url: req.originalUrl,
        body: req.body,
        query: req.query,
        headers: req.headers
    };
    writeLog(logInfo);
    next();
});


let cars = [];
let nextId = 1;


function validateCar(car) {
    const required = ['ten', 'hang', 'nam_sx', 'bien_so'];
    const missing = required.filter(f => !(f in car));
    return missing;
}


app.post('/api/cars', (req, res) => {
    const missing = validateCar(req.body);
    if (missing.length > 0) {
        const logInfo = {
            type: 'error',
            action: 'create',
            error: 'Thiếu cột',
            missing,
            body: req.body
        };
        writeLog(logInfo);
        return res.status(400).json({ error: 'Thiếu cột', missing });
    }
    const car = { id: nextId++, ...req.body };
    cars.push(car);
    writeLog({ type: 'success', action: 'create', car });
    res.json(car);
});


app.get('/api/cars', (req, res) => {
    writeLog({ type: 'success', action: 'read_all', count: cars.length });
    res.json(cars);
});


app.get('/api/cars/:id', (req, res) => {
    const car = cars.find(c => c.id == req.params.id);
    if (!car) {
        writeLog({ type: 'error', action: 'read_one', error: 'Không tìm thấy', id: req.params.id });
        return res.status(404).json({ error: 'Không tìm thấy' });
    }
    writeLog({ type: 'success', action: 'read_one', car });
    res.json(car);
});


app.put('/api/cars/:id', (req, res) => {
    const idx = cars.findIndex(c => c.id == req.params.id);
    if (idx === -1) {
        writeLog({ type: 'error', action: 'update', error: 'Không tìm thấy', id: req.params.id });
        return res.status(404).json({ error: 'Không tìm thấy' });
    }
    const missing = validateCar(req.body);
    if (missing.length > 0) {
        writeLog({ type: 'error', action: 'update', error: 'Thiếu cột', missing, body: req.body });
        return res.status(400).json({ error: 'Thiếu cột', missing });
    }
    cars[idx] = { id: cars[idx].id, ...req.body };
    writeLog({ type: 'success', action: 'update', car: cars[idx] });
    res.json(cars[idx]);
});


app.delete('/api/cars/:id', (req, res) => {
    const idx = cars.findIndex(c => c.id == req.params.id);
    if (idx === -1) {
        writeLog({ type: 'error', action: 'delete', error: 'Không tìm thấy', id: req.params.id });
        return res.status(404).json({ error: 'Không tìm thấy' });
    }
    const deleted = cars.splice(idx, 1)[0];
    writeLog({ type: 'success', action: 'delete', car: deleted });
    res.json(deleted);
});


app.use((err, req, res, next) => {
    writeLog({ type: 'error', action: 'exception', error: err.message, stack: err.stack });
    res.status(500).json({ error: 'Lỗi server' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    writeLog({ type: 'info', action: 'server_start', port: PORT });
}); 