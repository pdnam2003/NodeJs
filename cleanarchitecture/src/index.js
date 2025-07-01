const createServer = require('./infrastructure/webserver/server');
const createStudentRouter = require('./infrastructure/webserver/routes');

const PORT = process.env.PORT || 3000;

// Khởi tạo routes
const studentRoutes = createStudentRouter();

// Khởi tạo server với routes đã tạo
const app = createServer(studentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});