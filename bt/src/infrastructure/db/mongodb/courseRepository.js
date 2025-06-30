const CourseRepository = require('../../../domain/repositories/courseRepository');
const CourseModel = require('../../models/course');

class CourseRepositoryMongo extends CourseRepository {
    async create(course) {
        const doc = new CourseModel(course);
        return await doc.save();
    }
    async findById(id) {
        return await CourseModel.findById(id);
    }
    async findAll() {
        return await CourseModel.find();
    }
    async update(id, course) {
        return await CourseModel.findByIdAndUpdate(id, course, { new: true });
    }
    async delete(id) {
        return await CourseModel.findByIdAndDelete(id);
    }
}

module.exports = CourseRepositoryMongo; 