"use strict";

const CompanionManager = {
  character: {
    name: "Mikasa Ackerman",
    anime: "Attack on Titan",
    scene: "bedroom",
    mood: "Calm",
    thought: "Every little moment can become a beautiful memory."
  },

  scenes: [
    "bedroom",
    "garden",
    "library",
    "cafe",
    "study-room",
    "memory-room"
  ],

  initialize() {
    const section = document.getElementById("companion");
    if (!section) return;

    const panel = document.createElement("div");
    panel.className = "card companion-manager";

    panel.innerHTML = `
      <h2>Anime Companion 🧣</h2>
      <p class="muted">Configure Mikasa's world and expressions.</p>

      <div class="companion-preview">
        <div class="companion-avatar">
          <img
            src="../../assets/mikasa.png"
            alt="Mikasa Ackerman"
            id="mikasa-image"
          >
          <span id="mikasa-fallback">M</span>
        </div>

        <h3 id="preview-name">Mikasa Ackerman</h3>
        <p id="preview-anime">Attack on Titan</p>
        <span id="preview-mood">Calm</span>
        <p id="preview-thought" class="card">
          Every little moment can become a beautiful memory.
        </p>
        <p class="muted">Scene: <strong id="preview-scene">Bedroom</strong></p>
      </div>

      <form id="companion-form" class="stack">
        <label class="field">
          <span>Scene</span>
          <select name="scene">
            <option value="bedroom">Bedroom</option>
            <option value="garden">Garden</option>
            <option value="library">Library</option>
            <option value="cafe">Café</option>
            <option value="study-room">Study Room</option>
            <option value="memory-room">Memory Room</option>
          </select>
        </label>

        <label class="field">
          <span>Mood</span>
          <select name="mood">
            <option>Calm</option>
            <option>Happy</option>
            <option>Thoughtful</option>
            <option>Sleepy</option>
            <option>Focused</option>
            <option>Cheerful</option>
          </select>
        </label>

        <label class="field">
          <span>Thought bubble</span>
          <textarea
            name="thought"
            maxlength="300"
            rows="3"
            required
          >Every little moment can become a beautiful memory.</textarea>
        </label>

        <button class="btn" type="submit">Update Preview</button>
      </form>
    `;

    section.append(panel);

    const form = panel.querySelector("#companion-form");
    const image = panel.querySelector("#mikasa-image");
    const fallback = panel.querySelector("#mikasa-fallback");

    image.addEventListener("error", () => {
      image.hidden = true;
      fallback.hidden = false;
    });

    image.addEventListener("load", () => {
      image.hidden = false;
      fallback.hidden = true;
    });

    fallback.hidden = false;

    form.elements.scene.value = this.character.scene;
    form.elements.mood.value = this.character.mood;
    form.elements.thought.value = this.character.thought;

    form.addEventListener("submit", event => {
      event.preventDefault();

      this.character = {
        ...this.character,
        scene: form.elements.scene.value,
        mood: form.elements.mood.value,
        thought: form.elements.thought.value.trim()
      };

      this.render(panel);
    });

    this.render(panel);
  },

  render(panel) {
    panel.querySelector("#preview-name").textContent =
      this.character.name;

    panel.querySelector("#preview-anime").textContent =
      this.character.anime;

    panel.querySelector("#preview-mood").textContent =
      this.character.mood;

    panel.querySelector("#preview-thought").textContent =
      this.character.thought;

    panel.querySelector("#preview-scene").textContent =
      this.character.scene.replaceAll("-", " ");
  }
};

export default CompanionManager;
