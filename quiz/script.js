checkAuth();

// Start screen elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const startBtn = document.getElementById("start-btn");

// Quiz elements
const questionEl = document.getElementById("question");
const optionsEl = document.querySelectorAll(".option");
const nextBtn = document.getElementById("next");

// Questions
const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Markup Language",
      "Hyper Text Marketing Language",
      "Hyper Tool Multi Language"
    ],
    answer: 1
  },
  {
    question: "Which tag is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<hyper>"],
    answer: 1
  },
  {
    question: "Which tag is used for image?",
    options: ["<img>", "<image>", "<pic>", "<src>"],
    answer: 0
  },
  {
    question: "Largest heading tag?",
    options: ["<h6>", "<h1>", "<head>", "<heading>"],
    answer: 1
  }
];

let current = 0;
let score = 0;

// Start quiz
startBtn.onclick = () => {
  startScreen.style.display = "none";
  quizScreen.style.display = "block";
  loadQuestion();
};

// Load question
function loadQuestion() {
  let q = questions[current];
  questionEl.innerText = q.question;

  optionsEl.forEach((btn, index) => {
    btn.innerText = q.options[index];
    btn.classList.remove("correct", "wrong");

    btn.onclick = () => checkAnswer(index);
  });
}

// Check answer
function checkAnswer(selected) {
  let correct = questions[current].answer;

  optionsEl.forEach((btn, index) => {
    if (index === correct) btn.classList.add("correct");
    else if (index === selected) btn.classList.add("wrong");
  });

  if (selected === correct) score++;
}

// Next question
nextBtn.onclick = () => {
  current++;

  if (current < questions.length) {
    loadQuestion();
  } else {
    quizScreen.innerHTML =
      `<h2>Your Score: ${score}/${questions.length}</h2>
       <button onclick="location.reload()">Restart</button>`;
  }
};