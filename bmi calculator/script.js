const nameEl = document.getElementById("name");
const ageEl = document.getElementById("age");
const genderEl = document.getElementById("gender");

const heightEl = document.getElementById("height");
const weightEl = document.getElementById("weight");

const resultEl = document.getElementById("result");
const goalEl = document.getElementById("goal");
const historyEl = document.getElementById("history");

const toggleMode = document.getElementById("toggle-mode");

let history = JSON.parse(localStorage.getItem("history")) || [];
let profile = JSON.parse(localStorage.getItem("profile")) || {};
let darkMode = localStorage.getItem("darkMode") === "true";

/* DARK MODE */
if (darkMode) document.body.classList.add("dark");

toggleMode.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
};

/* PROFILE */
function saveProfile() {
  profile = {
    name: nameEl.value,
    age: ageEl.value,
    gender: genderEl.value
  };

  localStorage.setItem("profile", JSON.stringify(profile));
}

/* Load profile */
if (profile.name) {
  nameEl.value = profile.name;
  ageEl.value = profile.age;
  genderEl.value = profile.gender;
}

/* BMI CALCULATION */
document.getElementById("calc-btn").onclick = () => {
  const height = heightEl.value / 100;
  const weight = weightEl.value;

  if (!height || !weight) {
    resultEl.innerText = "Enter valid values";
    return;
  }

  const bmi = (weight / (height * height)).toFixed(2);

  let category;
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal";
  else if (bmi < 30) category = "Overweight";
  else category = "Obese";

  resultEl.innerText = `${profile.name || "User"}: BMI ${bmi} (${category})`;

  /* Goal */
  const min = (18.5 * height * height).toFixed(1);
  const max = (24.9 * height * height).toFixed(1);

  goalEl.innerText = `Ideal weight: ${min}kg - ${max}kg`;

  /* Save history */
  history.push({
    bmi,
    category,
    date: new Date().toLocaleDateString()
  });

  localStorage.setItem("history", JSON.stringify(history));
  renderHistory();
};

/* Render history */
function renderHistory() {
  historyEl.innerHTML = "";

  history.slice().reverse().forEach(item => {
    const li = document.createElement("li");
    li.innerText = `${item.date} → BMI ${item.bmi} (${item.category})`;
    historyEl.appendChild(li);
  });
}

renderHistory();