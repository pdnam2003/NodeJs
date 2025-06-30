class RegistrationUsecase {
    constructor(registrationRepository) {
        this.registrationRepository = registrationRepository;
    }
    async register(studentId, courseId) {
        return await this.registrationRepository.register(studentId, courseId);
    }
    async unregister(studentId, courseId) {
        return await this.registrationRepository.unregister(studentId, courseId);
    }
    async getByStudent(studentId) {
        return await this.registrationRepository.findByStudent(studentId);
    }
    async getByCourse(courseId) {
        return await this.registrationRepository.findByCourse(courseId);
    }
    async getAll() {
        return await this.registrationRepository.findAll();
    }
}

module.exports = RegistrationUsecase; 