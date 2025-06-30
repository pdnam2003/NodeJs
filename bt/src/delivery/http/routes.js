const express = require('express');

function createRoutes(studentController, courseController, registrationController) {
    const router = express.Router();

    // Student
    router.post('/students', studentController.create);
    router.get('/students', studentController.getAll);
    router.get('/students/:id', studentController.getById);
    router.put('/students/:id', studentController.update);
    router.delete('/students/:id', studentController.delete);

    // Course
    router.post('/courses', courseController.create);
    router.get('/courses', courseController.getAll);
    router.get('/courses/:id', courseController.getById);
    router.put('/courses/:id', courseController.update);
    router.delete('/courses/:id', courseController.delete);

    // Registration
    router.post('/registrations', registrationController.register);
    router.delete('/registrations', registrationController.unregister);
    router.get('/registrations', registrationController.getAll);
    router.get('/registrations/student/:studentId', registrationController.getByStudent);
    router.get('/registrations/course/:courseId', registrationController.getByCourse);

    return router;
}

module.exports = createRoutes; 