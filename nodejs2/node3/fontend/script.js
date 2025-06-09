document.getElementById("studentForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const form = e.target;
  const data = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    dob: form.dob.value,
  };

  try {
    const res = await fetch("http://localhost:3001/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    alert(result.message || "Lưu thành công!");
  } catch (err) {
    alert("Có lỗi xảy ra khi lưu!");
    console.error(err);
  }
});
