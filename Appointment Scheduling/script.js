let currentUser = null;
let selectedSlot = null;

const timeSlots = [
  "10:00 AM", "11:00 AM", "12:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM"
];

// Load slots
function loadSlots() {
  const slotsDiv = document.getElementById("slots");
  slotsDiv.innerHTML = "";

  timeSlots.forEach(time => {
    const div = document.createElement("div");
    div.classList.add("slot");
    div.innerText = time;

    div.onclick = () => {
      document.querySelectorAll(".slot").forEach(s => s.classList.remove("selected"));
      div.classList.add("selected");
      selectedSlot = time;
    };

    slotsDiv.appendChild(div);
  });
}

// Login
function login() {
  const username = document.getElementById("username").value;
  if (!username) return alert("Enter name");

  currentUser = username;
  localStorage.setItem("user", username);

  document.getElementById("auth").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");

  document.getElementById("welcome").innerText = "Welcome " + username;

  loadSlots();
  loadAppointments();
}

// Book Appointment
function bookAppointment() {
  const date = document.getElementById("date").value;

  if (!date || !selectedSlot) {
    alert("Select date and slot");
    return;
  }

  let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

  const newAppointment = {
    user: currentUser,
    date: date,
    time: selectedSlot
  };

  appointments.push(newAppointment);
  localStorage.setItem("appointments", JSON.stringify(appointments));

  showNotification("Appointment Booked!");

  loadAppointments();
}

// Load Appointments
function loadAppointments() {
  const list = document.getElementById("appointments");
  list.innerHTML = "";

  let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

  appointments
    .filter(a => a.user === currentUser)
    .forEach((a, index) => {
      const li = document.createElement("li");
      li.innerHTML = `${a.date} - ${a.time} 
        <button onclick="cancelAppointment(${index})">Cancel</button>`;
      list.appendChild(li);
    });
}

// Cancel Appointment
function cancelAppointment(index) {
  let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

  appointments.splice(index, 1);
  localStorage.setItem("appointments", JSON.stringify(appointments));

  showNotification("Appointment Cancelled");

  loadAppointments();
}

// Notification
function showNotification(msg) {
  const n = document.getElementById("notification");
  n.innerText = msg;

  setTimeout(() => n.innerText = "", 3000);
}

// Auto login if exists
window.onload = () => {
  const user = localStorage.getItem("user");
  if (user) {
    document.getElementById("username").value = user;
    login();
  }
};