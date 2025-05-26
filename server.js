const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post("/sum", (req, res) => {
  const { n1, n2 } = req.body;
  if (typeof n1 !== "number" || typeof n2 !== "number") {
    return res.status(400).json({ err: "so khong hop le" });
  }
  const result = n1 + n2;
  res.json({ result });
});

app.post("/minus", (req, res) => {
  const { n1, n2 } = req.body;
  if (typeof n1 !== "number" || typeof n2 !== "number") {
    return res.status(400).json({ err: "so khong hop le" });
  }
  const result = n1 - n2;
  res.json({ result });
});

app.listen(port, () => {
  console.log(`server chay tai http://localhost:${port}`);
});
