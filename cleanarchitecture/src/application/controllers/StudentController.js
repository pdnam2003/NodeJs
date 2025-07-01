const CreateStudent = require('../../domain/use_cases/CreateStudent');
const GetAllStudents = require('../../domain/use_cases/GetAllStudents');
// Import các use case khác ở đây...

class StudentController {
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
    }

    // POST /students
    async createStudent(req, res) {
        try {
            const { name, age, email } = req.body;
            // Khởi tạo và thực thi use case
            const createStudent = new CreateStudent(this.studentRepository);
            const student = await createStudent.execute(name, age, email);
            res.status(201).json(student);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // GET /students
    async getAllStudents(req, res) {
        try {
            const getAllStudents = new GetAllStudents(this.studentRepository);
            const students = await getAllStudents.execute();
            res.status(200).json(students);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Thêm các phương thức cho get by id, update, delete...
}

module.exports = StudentController;