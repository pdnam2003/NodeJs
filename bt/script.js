const API = 'http://localhost:3000/api/cars';
const carForm = document.getElementById('carForm');
const carId = document.getElementById('carId');
const ten = document.getElementById('ten');
const hang = document.getElementById('hang');
const nam_sx = document.getElementById('nam_sx');
const bien_so = document.getElementById('bien_so');
const carTable = document.getElementById('carTable').querySelector('tbody');
const resetBtn = document.getElementById('resetBtn');

function fetchCars() {
    fetch(API)
        .then(res => res.json())
        .then(data => renderTable(data));
}

function renderTable(cars) {
    carTable.innerHTML = '';
    cars.forEach(car => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${car.id}</td>
            <td>${car.ten}</td>
            <td>${car.hang}</td>
            <td>${car.nam_sx}</td>
            <td>${car.bien_so}</td>
            <td>
                <button onclick="editCar(${car.id})">Sửa</button>
                <button onclick="deleteCar(${car.id})">Xóa</button>
            </td>
        `;
        carTable.appendChild(tr);
    });
}

carForm.onsubmit = function(e) {
    e.preventDefault();
    const car = {
        ten: ten.value,
        hang: hang.value,
        nam_sx: nam_sx.value,
        bien_so: bien_so.value
    };
    if (carId.value) {
        // Update
        fetch(`${API}/${carId.value}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(car)
        })
        .then(res => res.json())
        .then(() => {
            fetchCars();
            carForm.reset();
            carId.value = '';
            carForm.querySelector('button[type="submit"]').textContent = 'Thêm xe';
        });
    } else {
        // Create
        fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(car)
        })
        .then(res => res.json())
        .then(() => {
            fetchCars();
            carForm.reset();
        });
    }
};

function editCar(id) {
    fetch(`${API}/${id}`)
        .then(res => res.json())
        .then(car => {
            carId.value = car.id;
            ten.value = car.ten;
            hang.value = car.hang;
            nam_sx.value = car.nam_sx;
            bien_so.value = car.bien_so;
            carForm.querySelector('button[type="submit"]').textContent = 'Cập nhật';
        });
}

function deleteCar(id) {
    if (confirm('Bạn có chắc muốn xóa xe này?')) {
        fetch(`${API}/${id}`, { method: 'DELETE' })
            .then(res => res.json())
            .then(() => fetchCars());
    }
}

resetBtn.onclick = function() {
    carForm.reset();
    carId.value = '';
    carForm.querySelector('button[type="submit"]').textContent = 'Thêm xe';
};

fetchCars(); 