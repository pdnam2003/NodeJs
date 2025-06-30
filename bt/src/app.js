const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

require('./config/env');
const connectMongo = require('./config/db');


const StudentRepositoryMongo = require('./infrastructure/db/mongodb/studentRepository');
const CourseRepositoryMongo = require('./infrastructure/db/mongodb/courseRepository');
const RegistrationRepositoryMongo = require('./infrastructure/db/mongodb/registrationRepository');

const StudentUsecase = require('./domain/usecases/studentUsecase');
const CourseUsecase = require('./domain/usecases/courseUsecase');
const RegistrationUsecase = require('./domain/usecases/registrationUsecase');


const StudentController = require('./delivery/http/studentController');
const CourseController = require('./delivery/http/courseController');
const RegistrationController = require('./delivery/http/registrationController');


const createRoutes = require('./delivery/http/routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, '../public')));


const studentRepo = new StudentRepositoryMongo();
const courseRepo = new CourseRepositoryMongo();
const registrationRepo = new RegistrationRepositoryMongo();

const studentUsecase = new StudentUsecase(studentRepo);
const courseUsecase = new CourseUsecase(courseRepo);
const registrationUsecase = new RegistrationUsecase(registrationRepo);

const studentController = new StudentController(studentUsecase);
const courseController = new CourseController(courseUsecase);
const registrationController = new RegistrationController(registrationUsecase);

const routes = createRoutes(studentController, courseController, registrationController);
app.use('/api', routes);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});


connectMongo().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('DB connection error:', err);
    process.exit(1);
}); 