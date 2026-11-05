"use strict";

const QuizManager = {
  quizzes: [],

  initialize() {
    const section = document.getElementById("quizzes");
    if (!section) return;

    const panel = document.createElement("div");
    panel.className = "card quiz-manager";

    panel.innerHTML = `
      <h2>Quiz Creator 🎮</h2>
      <p class="muted">Create a quiz with four answer choices.</p>

      <form id="quiz-form" class="stack">
        <label class="field">
          <span>Quiz title</span>
          <input name="title" maxlength="100" required
            placeholder="How well do you know this anime?">
        </label>

        <label class="field">
          <span>Question</span>
          <textarea name="question" maxlength="500" required
            rows="3" placeholder="Enter your question"></textarea>
        </label>

        <label class="field">
          <span>Option A</span>
          <input name="optionA" maxlength="200" required>
        </label>

        <label class="field">
          <span>Option B</span>
          <input name="optionB" maxlength="200" required>
        </label>

        <label class="field">
          <span>Option C</span>
          <input name="optionC" maxlength="200" required>
        </label>

        <label class="field">
          <span>Option D</span>
          <input name="optionD" maxlength="200" required>
        </label>

        <label class="field">
          <span>Correct answer</span>
          <select name="correctAnswer" required>
            <option value="A">Option A</option>
            <option value="B">Option B</option>
            <option value="C">Option C</option>
            <option value="D">Option D</option>
          </select>
        </label>

        <button class="btn" type="submit">Create Quiz</button>
      </form>

      <div class="quiz-list">
        <h3>Created Quizzes</h3>
        <div id="quiz-items">
          <p class="muted">No quizzes created yet.</p>
        </div>
      </div>
    `;

    section.append(panel);

    const form = panel.querySelector("#quiz-form");
    const list = panel.querySelector("#quiz-items");

    form.addEventListener("submit", event => {
      event.preventDefault();

      const data = new FormData(form);

      const quiz = {
        id: crypto.randomUUID(),
        title: data.get("title").trim(),
        question: data.get("question").trim(),
        options: {
          A: data.get("optionA").trim(),
          B: data.get("optionB").trim(),
          C: data.get("optionC").trim(),
          D: data.get("optionD").trim()
        },
        correctAnswer: data.get("correctAnswer"),
        createdAt: new Date().toISOString()
      };

      this.quizzes.push(quiz);
      form.reset();
      this.render(list);
    });
  },

  render(container) {
    container.replaceChildren();

    if (!this.quizzes.length) {
      const empty = document.createElement("p");
      empty.className = "muted";
      empty.textContent = "No quizzes created yet.";
      container.append(empty);
      return;
    }

    this.quizzes.forEach((quiz, index) => {
      const card = document.createElement("article");
      card.className = "card";

      const title = document.createElement("h3");
      title.textContent = `${index + 1}. ${quiz.title}`;

      const question = document.createElement("p");
      question.textContent = quiz.question;

      const options = document.createElement("ul");

      Object.entries(quiz.options).forEach(([key, value]) => {
        const option = document.createElement("li");
        option.textContent = `${key}. ${value}`;
        options.append(option);
      });

      const answer = document.createElement("p");
      answer.className = "muted";
      answer.textContent = `Correct answer: ${quiz.correctAnswer}`;

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "btn";
      remove.textContent = "Delete Quiz";

      remove.addEventListener("click", () => {
        this.quizzes = this.quizzes.filter(item => item.id !== quiz.id);
        this.render(container);
      });

      card.append(title, question, options, answer, remove);
      container.append(card);
    });
  }
};

export default QuizManager;
