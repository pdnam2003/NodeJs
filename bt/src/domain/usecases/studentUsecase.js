class StudentUsecase {
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
    }
    async create(student) {
        return await this.studentRepository.create(student);
    }
    async getById(id) {
        return await this.studentRepository.findById(id);
    }
    async getAll() {
        return await this.studentRepository.findAll();
    }
    async update(id, student) {
        return await this.studentRepository.update(id, student);
    }
    async delete(id) {
        return await this.studentRepository.delete(id);
    }
}

module.exports = StudentUsecase; 