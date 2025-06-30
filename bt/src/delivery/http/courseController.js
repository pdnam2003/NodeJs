class CourseController {
    constructor(courseUsecase) {
        this.courseUsecase = courseUsecase;
    }
    create = async (req, res) => {
        try {
            const course = await this.courseUsecase.create(req.body);
            res.status(201).json(course);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    getAll = async (req, res) => {
        try {
            const courses = await this.courseUsecase.getAll();
            res.json(courses);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    getById = async (req, res) => {
        try {
            const course = await this.courseUsecase.getById(req.params.id);
            if (!course) return res.status(404).json({ error: 'Not found' });
            res.json(course);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    update = async (req, res) => {
        try {
            const course = await this.courseUsecase.update(req.params.id, req.body);
            if (!course) return res.status(404).json({ error: 'Not found' });
            res.json(course);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    delete = async (req, res) => {
        try {
            const course = await this.courseUsecase.delete(req.params.id);
            if (!course) return res.status(404).json({ error: 'Not found' });
            res.json(course);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = CourseController; 