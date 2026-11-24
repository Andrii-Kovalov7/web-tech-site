const themeButton = document.getElementById("themeButton");

function applyTheme(dark) {
  document.body.classList.toggle("dark", dark);
  if (themeButton) {
    themeButton.textContent = dark ? "Світла тема" : "Темна тема";
  }
}

if (themeButton) {
  const saved = localStorage.getItem("theme");
  applyTheme(saved ? saved === "dark" : false);
  themeButton.addEventListener("click", function () {
    const dark = !document.body.classList.contains("dark");
    applyTheme(dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  });
}

const moreButton = document.getElementById("moreButton");
const moreText = document.getElementById("moreText");

if (moreButton && moreText) {
  moreButton.addEventListener("click", function () {
    moreText.classList.toggle("show");
    moreButton.textContent = moreText.classList.contains("show")
      ? "Приховати"
      : "Детальніше про проєкт";
  });
}

const form = document.getElementById("feedbackForm");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const messageInput = document.getElementById("messageInput");
const formMessage = document.getElementById("formMessage");

if (form && formMessage) {
  function showFormMessage(text, type) {
    formMessage.textContent = text;
    formMessage.classList.remove("error", "success");
    formMessage.classList.add(type);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (name === "" || email === "" || message === "") {
      showFormMessage("Заповніть усі три поля форми.", "error");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      showFormMessage("Перевірте формат електронної пошти.", "error");
      return;
    }

    showFormMessage("Дякуємо, " + name + "! Повідомлення збережено локально.", "success");
    form.reset();
  });
}

const quizForm = document.getElementById("quizForm");
const quizResult = document.getElementById("quizResult");
const quizReset = document.getElementById("quizReset");

if (quizForm && quizResult) {
  const answers = { q1: "b", q2: "c", q3: "a", q4: "b" };

  quizForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let score = 0;
    let empty = false;
    for (const key of Object.keys(answers)) {
      const chosen = quizForm.querySelector('input[name="' + key + '"]:checked');
      if (!chosen) {
        empty = true;
        continue;
      }
      if (chosen.value === answers[key]) {
        score++;
      }
    }
    if (empty) {
      quizResult.textContent = "Відповідайте на всі запитання, а потім натисніть Перевірити.";
      quizResult.classList.remove("success");
      quizResult.classList.add("error");
      return;
    }
    quizResult.textContent = "Ваш результат: " + score + " з " + Object.keys(answers).length + ".";
    quizResult.classList.remove("error");
    quizResult.classList.add("success");
  });

  if (quizReset) {
    quizReset.addEventListener("click", function () {
      quizForm.reset();
      quizResult.textContent = "";
      quizResult.classList.remove("error", "success");
    });
  }
}
