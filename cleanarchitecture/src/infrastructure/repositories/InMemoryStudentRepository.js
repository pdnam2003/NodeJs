const IStudentRepository = require('../../domain/repositories/IStudentRepository');

const students = [];

class InMemoryStudentRepository extends IStudentRepository {
    add(student) {
        students.push(student);
        console.log('Students in memory:', students);
        return Promise.resolve(student); 
    }

    getById(id) {
        const student = students.find(s => s.id === id);
        return Promise.resolve(student);
    }

    getAll() {
        return Promise.resolve(students);
    }

    update(id, studentData) {
        const index = students.findIndex(s => s.id === id);
        if (index === -1) {
            return Promise.resolve(null);
        }
        students[index] = { ...students[index], ...studentData };
        return Promise.resolve(students[index]);
    }

    delete(id) {
        const index = students.findIndex(s => s.id === id);
        if (index === -1) {
            return Promise.resolve(false);
        }
        students.splice(index, 1);
        return Promise.resolve(true);
    }
}

module.exports = InMemoryStudentRepository;