"use strict";

const CalendarManager = {
  events: [],

  initialize() {
    const section = document.getElementById("calendar");
    if (!section) return;

    const panel = document.createElement("div");
    panel.className = "card calendar-manager";

    panel.innerHTML = `
      <h2>Special Moments 📅</h2>
      <p class="muted">Create and manage important dates.</p>

      <form id="event-form" class="stack">
        <label class="field">
          <span>Event title</span>
          <input name="title" maxlength="100" required
            placeholder="A special day">
        </label>

        <label class="field">
          <span>Description</span>
          <textarea name="description" maxlength="1000"
            rows="3" placeholder="Add a little detail..."></textarea>
        </label>

        <label class="field">
          <span>Date</span>
          <input name="date" type="date" required>
        </label>

        <label class="field">
          <span>Category</span>
          <select name="category">
            <option value="Special">Special</option>
            <option value="Birthday">Birthday</option>
            <option value="Memory">Memory</option>
            <option value="Reminder">Reminder</option>
          </select>
        </label>

        <button class="btn" type="submit">Add Event</button>
      </form>

      <div class="calendar-events">
        <h3>Upcoming Events</h3>
        <div id="calendar-event-list">
          <p class="muted">No events added yet.</p>
        </div>
      </div>
    `;

    section.append(panel);

    const form = panel.querySelector("#event-form");
    const list = panel.querySelector("#calendar-event-list");

    form.addEventListener("submit", event => {
      event.preventDefault();

      const data = new FormData(form);
      const date = data.get("date");

      this.events.push({
        id: crypto.randomUUID(),
        title: data.get("title").trim(),
        description: data.get("description").trim(),
        date,
        category: data.get("category")
      });

      this.events.sort((a, b) => a.date.localeCompare(b.date));

      form.reset();
      this.render(list);
    });
  },

  render(container) {
    container.replaceChildren();

    if (!this.events.length) {
      const empty = document.createElement("p");
      empty.className = "muted";
      empty.textContent = "No events added yet.";
      container.append(empty);
      return;
    }

    this.events.forEach(item => {
      const card = document.createElement("article");
      card.className = "card";

      const title = document.createElement("h3");
      title.textContent = item.title;

      const date = document.createElement("p");
      date.textContent = new Date(`${item.date}T00:00:00`).toLocaleDateString();

      const category = document.createElement("p");
      category.className = "muted";
      category.textContent = item.category;

      const description = document.createElement("p");
      description.textContent = item.description;

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "btn";
      remove.textContent = "Delete Event";

      remove.addEventListener("click", () => {
        this.events = this.events.filter(event => event.id !== item.id);
        this.render(container);
      });

      card.append(title, date, category, description, remove);
      container.append(card);
    });
  }
};

export default CalendarManager;
