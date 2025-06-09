document.getElementById('tinh').addEventListener('click', async () => {
    const a = Number(document.getElementById('n1').value);
    const b = Number(document.getElementById('n2').value);
    const pheptinh = document.getElementById('pheptinh').value;

    let url = '';
    switch (pheptinh) {
        case '+':
            url = 'http://localhost:3000/tong';
            break;
        case '-':
            url = 'http://localhost:3000/hieu';
            break;
        case '*':
            url = 'http://localhost:3000/tich';
            break;
        case '/':
            url = 'http://localhost:3000/thuong';
            break;
        default:
            document.getElementById('ketqua').innerText = 'chon phep tinh';
            return;
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ a, b })
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('ketqua').innerText = `Kết quả: ${data.result}`;
        } else {
            document.getElementById('ketqua').innerText = `Lỗi: ${data.message}`;
        }
    } catch (error) {
        document.getElementById('ketqua').innerText = 'cant connect cserver';
        console.error(error);
    }
});
