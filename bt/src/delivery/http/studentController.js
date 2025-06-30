class StudentController {
    constructor(studentUsecase) {
        this.studentUsecase = studentUsecase;
    }
    create = async (req, res) => {
        try {
            const student = await this.studentUsecase.create(req.body);
            res.status(201).json(student);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    getAll = async (req, res) => {
        try {
            const students = await this.studentUsecase.getAll();
            res.json(students);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    getById = async (req, res) => {
        try {
            const student = await this.studentUsecase.getById(req.params.id);
            if (!student) return res.status(404).json({ error: 'Not found' });
            res.json(student);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    update = async (req, res) => {
        try {
            const student = await this.studentUsecase.update(req.params.id, req.body);
            if (!student) return res.status(404).json({ error: 'Not found' });
            res.json(student);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    delete = async (req, res) => {
        try {
            const student = await this.studentUsecase.delete(req.params.id);
            if (!student) return res.status(404).json({ error: 'Not found' });
            res.json(student);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = StudentController; 