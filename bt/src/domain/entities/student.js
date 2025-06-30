class Student {
    constructor({_id, name, email, dob, courses = []}) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.dob = dob;
        this.courses = courses; 
    }
}

module.exports = Student; 