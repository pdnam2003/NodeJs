class CourseUsecase {
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }
    async create(course) {
        return await this.courseRepository.create(course);
    }
    async getById(id) {
        return await this.courseRepository.findById(id);
    }
    async getAll() {
        return await this.courseRepository.findAll();
    }
    async update(id, course) {
        return await this.courseRepository.update(id, course);
    }
    async delete(id) {
        return await this.courseRepository.delete(id);
    }
}

module.exports = CourseUsecase; 