"use strict";

const LettersManager = {
  drafts: [],

  initialize() {
    const section = document.getElementById("letters");
    if (!section) return;

    const panel = document.createElement("div");
    panel.className = "card letters-manager";
    panel.innerHTML = `
      <h2>Letter Composer 💌</h2>
      <p class="muted">Create a personal letter or prepare it for later.</p>

      <form id="letter-form" class="stack">
        <label class="field">
          <span>Letter title</span>
          <input name="title" maxlength="100" required
            placeholder="A little note for you">
        </label>

        <label class="field">
          <span>Message</span>
          <textarea name="message" rows="6" maxlength="5000"
            required placeholder="Write your message here..."></textarea>
        </label>

        <label class="field">
          <span>Message type</span>
          <select name="type">
            <option value="Personal">Personal</option>
            <option value="Good Morning">Good Morning</option>
            <option value="After School">After School</option>
            <option value="Good Night">Good Night</option>
          </select>
        </label>

        <label class="field">
          <span>Schedule (optional)</span>
          <input type="datetime-local" name="scheduledAt">
        </label>

        <button class="btn" type="submit">Save Draft</button>
      </form>

      <div class="letters-list">
        <h3>Prepared Letters</h3>
        <div id="letter-drafts">
          <p class="muted">No drafts created yet.</p>
        </div>
      </div>
    `;

    section.append(panel);

    const form = panel.querySelector("#letter-form");
    const list = panel.querySelector("#letter-drafts");

    form.addEventListener("submit", event => {
      event.preventDefault();

      const data = new FormData(form);
      const scheduledAt = data.get("scheduledAt");

      if (scheduledAt && new Date(scheduledAt).getTime() <= Date.now()) {
        alert("Please select a future date and time.");
        return;
      }

      this.drafts.unshift({
        id: crypto.randomUUID(),
        title: data.get("title").trim(),
        message: data.get("message").trim(),
        type: data.get("type"),
        scheduledAt,
        status: scheduledAt ? "Prepared for scheduling" : "Draft"
      });

      form.reset();
      this.render(list);
    });
  },

  render(container) {
    container.replaceChildren();

    if (!this.drafts.length) {
      const empty = document.createElement("p");
      empty.className = "muted";
      empty.textContent = "No drafts created yet.";
      container.append(empty);
      return;
    }

    this.drafts.forEach(letter => {
      const card = document.createElement("article");
      card.className = "card";

      const title = document.createElement("h3");
      title.textContent = letter.title;

      const type = document.createElement("p");
      type.textContent = `${letter.type} · ${letter.status}`;

      const message = document.createElement("p");
      message.textContent = letter.message;

      const time = document.createElement("p");
      time.className = "muted";
      time.textContent = letter.scheduledAt
        ? new Date(letter.scheduledAt).toLocaleString()
        : "Not scheduled";

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "btn";
      remove.textContent = "Delete Draft";
      remove.addEventListener("click", () => {
        this.drafts = this.drafts.filter(item => item.id !== letter.id);
        this.render(container);
      });

      card.append(title, type, message, time, remove);
      container.append(card);
    });
  }
};

export default LettersManager;
