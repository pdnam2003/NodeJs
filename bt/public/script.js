const API = '/api';

// --- Sinh viên ---
const studentForm = document.getElementById('studentForm');
const studentId = document.getElementById('studentId');
const studentName = document.getElementById('studentName');
const studentEmail = document.getElementById('studentEmail');
const studentDob = document.getElementById('studentDob');
const studentTable = document.getElementById('studentTable').querySelector('tbody');
const resetStudentBtn = document.getElementById('resetStudentBtn');

// --- Khóa học ---
const courseForm = document.getElementById('courseForm');
const courseId = document.getElementById('courseId');
const courseName = document.getElementById('courseName');
const courseDesc = document.getElementById('courseDesc');
const courseTable = document.getElementById('courseTable').querySelector('tbody');
const resetCourseBtn = document.getElementById('resetCourseBtn');

// --- Đăng ký ---
const registerForm = document.getElementById('registerForm');
const registerStudent = document.getElementById('registerStudent');
const registerCourse = document.getElementById('registerCourse');
const registrationResult = document.getElementById('registrationResult');

// --- Load dữ liệu ---
async function fetchStudents() {
    const res = await fetch(`${API}/students`);
    const data = await res.json();
    renderStudentTable(data);
    renderStudentSelect(data);
}

async function fetchCourses() {
    const res = await fetch(`${API}/courses`);
    const data = await res.json();
    renderCourseTable(data);
    renderCourseSelect(data);
}

function renderStudentTable(students) {
    studentTable.innerHTML = '';
    students.forEach(s => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${s._id}</td>
            <td>${s.name}</td>
            <td>${s.email}</td>
            <td>${s.dob ? new Date(s.dob).toLocaleDateString() : ''}</td>
            <td>${(s.courses||[]).map(c => c.name).join(', ')}</td>
            <td>
                <button onclick="editStudent('${s._id}')">Sửa</button>
                <button onclick="deleteStudent('${s._id}')">Xóa</button>
            </td>
        `;
        studentTable.appendChild(tr);
    });
}

function renderCourseTable(courses) {
    courseTable.innerHTML = '';
    courses.forEach(c => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${c._id}</td>
            <td>${c.name}</td>
            <td>${c.description||''}</td>
            <td>
                <button onclick="editCourse('${c._id}')">Sửa</button>
                <button onclick="deleteCourse('${c._id}')">Xóa</button>
            </td>
        `;
        courseTable.appendChild(tr);
    });
}

function renderStudentSelect(students) {
    registerStudent.innerHTML = '';
    students.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s._id;
        opt.textContent = s.name + ' (' + s.email + ')';
        registerStudent.appendChild(opt);
    });
}

function renderCourseSelect(courses) {
    registerCourse.innerHTML = '';
    courses.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c._id;
        opt.textContent = c.name;
        registerCourse.appendChild(opt);
    });
}

// --- CRUD Sinh viên ---
studentForm.onsubmit = async function(e) {
    e.preventDefault();
    const student = {
        name: studentName.value,
        email: studentEmail.value,
        dob: studentDob.value
    };
    if (studentId.value) {
        await fetch(`${API}/students/${studentId.value}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(student)
        });
    } else {
        await fetch(`${API}/students`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(student)
        });
    }
    studentForm.reset();
    studentId.value = '';
    fetchStudents();
};

window.editStudent = async function(id) {
    const res = await fetch(`${API}/students/${id}`);
    const s = await res.json();
    studentId.value = s._id;
    studentName.value = s.name;
    studentEmail.value = s.email;
    studentDob.value = s.dob ? s.dob.substr(0,10) : '';
    studentForm.querySelector('button[type="submit"]').textContent = 'Cập nhật';
};

window.deleteStudent = async function(id) {
    if (confirm('Bạn có chắc muốn xóa sinh viên này?')) {
        await fetch(`${API}/students/${id}`, { method: 'DELETE' });
        fetchStudents();
    }
};

resetStudentBtn.onclick = function() {
    studentForm.reset();
    studentId.value = '';
    studentForm.querySelector('button[type="submit"]').textContent = 'Thêm sinh viên';
};

// --- CRUD Khóa học ---
courseForm.onsubmit = async function(e) {
    e.preventDefault();
    const course = {
        name: courseName.value,
        description: courseDesc.value
    };
    if (courseId.value) {
        await fetch(`${API}/courses/${courseId.value}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(course)
        });
    } else {
        await fetch(`${API}/courses`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(course)
        });
    }
    courseForm.reset();
    courseId.value = '';
    fetchCourses();
};

window.editCourse = async function(id) {
    const res = await fetch(`${API}/courses/${id}`);
    const c = await res.json();
    courseId.value = c._id;
    courseName.value = c.name;
    courseDesc.value = c.description;
    courseForm.querySelector('button[type="submit"]').textContent = 'Cập nhật';
};

window.deleteCourse = async function(id) {
    if (confirm('Bạn có chắc muốn xóa khóa học này?')) {
        await fetch(`${API}/courses/${id}`, { method: 'DELETE' });
        fetchCourses();
    }
};

resetCourseBtn.onclick = function() {
    courseForm.reset();
    courseId.value = '';
    courseForm.querySelector('button[type="submit"]').textContent = 'Thêm khóa học';
};

// --- Đăng ký khóa học ---
registerForm.onsubmit = async function(e) {
    e.preventDefault();
    const studentId = registerStudent.value;
    const courseIds = Array.from(registerCourse.selectedOptions).map(opt => opt.value);
    let results = [];
    for (let courseId of courseIds) {
        const res = await fetch(`${API}/registrations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentId, courseId })
        });
        const data = await res.json();
        results.push(data);
    }
    registrationResult.textContent = 'Đăng ký thành công!';
    fetchStudents();
};

// --- Load ban đầu ---
fetchStudents();
fetchCourses(); 