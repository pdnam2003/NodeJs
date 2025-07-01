const express = require('express');
const StudentController = require('../../application/controllers/StudentController');
const InMemoryStudentRepository = require('../repositories/InMemoryStudentRepository');

function createStudentRouter() {
    const router = express.Router();

    // Đây là nơi Dependency Injection xảy ra
    // Controller được "tiêm" một repository cụ thể
    const studentRepository = new InMemoryStudentRepository();
    const studentController = new StudentController(studentRepository);

    // Định nghĩa các routes
    router.post('/', (req, res) => studentController.createStudent(req, res));
    router.get('/', (req, res) => studentController.getAllStudents(req, res));
    
    // Thêm các routes cho các hành động khác...
    // router.get('/:id', ...);
    // router.put('/:id', ...);
    // router.delete('/:id', ...);

    return router;
}

module.exports = createStudentRouter;