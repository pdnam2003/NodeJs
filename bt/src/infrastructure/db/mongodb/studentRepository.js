const StudentRepository = require('../../../domain/repositories/studentRepository');
const StudentModel = require('../../models/student');

class StudentRepositoryMongo extends StudentRepository {
    async create(student) {
        const doc = new StudentModel(student);
        return await doc.save();
    }
    async findById(id) {
        return await StudentModel.findById(id).populate('courses');
    }
    async findAll() {
        return await StudentModel.find().populate('courses');
    }
    async update(id, student) {
        return await StudentModel.findByIdAndUpdate(id, student, { new: true });
    }
    async delete(id) {
        return await StudentModel.findByIdAndDelete(id);
    }
}

module.exports = StudentRepositoryMongo; 