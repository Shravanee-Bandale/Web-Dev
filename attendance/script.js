let students = [];

function addStudent() {
  const nameInput = document.getElementById("studentName");
  const name = nameInput.value.trim();

  if (name === "") {
    alert("Please enter a name");
    return;
  }

  students.push({
    name: name,
    present: 0,
    total: 0
  });

  nameInput.value = "";
  displayStudents();
}

function displayStudents() {
  const tbody = document.querySelector("#attendanceTable tbody");
  tbody.innerHTML = "";

  students.forEach((student, index) => {
    let row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.name}</td>
      <td><button onclick="markAttendance(${index}, true)">✔</button></td>
      <td><button onclick="markAttendance(${index}, false)">✘</button></td>
    `;

    tbody.appendChild(row);
  });
}

function markAttendance(index, isPresent) {
  students[index].total++;

  if (isPresent) {
    students[index].present++;
  }

  alert("Attendance marked!");
}

function generateReport() {
  let reportDiv = document.getElementById("report");
  reportDiv.innerHTML = "<h3>Attendance Report</h3>";

  students.forEach(student => {
    let percentage = student.total === 0 
      ? 0 
      : ((student.present / student.total) * 100).toFixed(2);

    reportDiv.innerHTML += `
      <p>
        <strong>${student.name}</strong> :
        ${student.present}/${student.total} days
        (${percentage}%)
      </p>
    `;
  });
}