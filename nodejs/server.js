const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(express.json());
app.use(cors());


app.post('/tong', (req, res) => {
    const { a, b } = req.body;
    const result = a + b;
    res.json({ result })
});

app.post('/hieu', (req, res) => {
    const { a, b } = req.body;
    const result = a - b;
    res.json({ result });
});

app.post('/tich', (req, res) => {
    const { a, b } = req.body;
    const result = a * b;
    res.json({ result });
});

app.post('/thuong', (req, res) => {
    const { a, b } = req.body;
    if(b == 0){
        return res.status(400).json({ message: 'Cannot divide by zero' });
    };
    const result = a / b;
    res.json({ result });
});







app.listen(port, () => {
    console.log(`server run with http://localhost:${port}`);
})
