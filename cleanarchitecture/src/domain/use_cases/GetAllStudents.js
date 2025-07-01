class GetAllStudents {
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
    }

    execute() {
        return this.studentRepository.getAll();
    }
}

module.exports = GetAllStudents;