const RegistrationRepository = require('../../../domain/repositories/registrationRepository');
const RegistrationModel = require('../../models/registration');

class RegistrationRepositoryMongo extends RegistrationRepository {
    async register(studentId, courseId) {
        const reg = new RegistrationModel({ studentId, courseId });
        return await reg.save();
    }
    async unregister(studentId, courseId) {
        return await RegistrationModel.findOneAndDelete({ studentId, courseId });
    }
    async findByStudent(studentId) {
        return await RegistrationModel.find({ studentId }).populate('courseId');
    }
    async findByCourse(courseId) {
        return await RegistrationModel.find({ courseId }).populate('studentId');
    }
    async findAll() {
        return await RegistrationModel.find().populate('studentId').populate('courseId');
    }
}

module.exports = RegistrationRepositoryMongo; 