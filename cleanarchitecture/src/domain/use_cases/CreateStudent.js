const Student = require('../entities/Student');
const { v4: uuidv4 } = require('uuid'); // Dùng uuid để tạo id duy nhất

class CreateStudent {
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
    }

    execute(name, age, email) {
        const id = uuidv4();
        const newStudent = new Student(id, name, age, email);
        return this.studentRepository.add(newStudent);
    }
}

module.exports = CreateStudent;