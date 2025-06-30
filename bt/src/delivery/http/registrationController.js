class RegistrationController {
    constructor(registrationUsecase) {
        this.registrationUsecase = registrationUsecase;
    }
    register = async (req, res) => {
        try {
            const { studentId, courseId } = req.body;
            const reg = await this.registrationUsecase.register(studentId, courseId);
            res.status(201).json(reg);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    unregister = async (req, res) => {
        try {
            const { studentId, courseId } = req.body;
            const reg = await this.registrationUsecase.unregister(studentId, courseId);
            if (!reg) return res.status(404).json({ error: 'Not found' });
            res.json(reg);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    getByStudent = async (req, res) => {
        try {
            const regs = await this.registrationUsecase.getByStudent(req.params.studentId);
            res.json(regs);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    getByCourse = async (req, res) => {
        try {
            const regs = await this.registrationUsecase.getByCourse(req.params.courseId);
            res.json(regs);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    getAll = async (req, res) => {
        try {
            const regs = await this.registrationUsecase.getAll();
            res.json(regs);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = RegistrationController; 