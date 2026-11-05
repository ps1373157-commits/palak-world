"use strict";

const MikasaWorld = {
  state: {
    scene: "bedroom",
    mood: "Calm",
    thought: "Every little moment can become a beautiful memory."
  },

  scenes: [
    { id: "bedroom", label: "Bedroom", emoji: "🛏️" },
    { id: "garden", label: "Garden", emoji: "🌿" },
    { id: "library", label: "Library", emoji: "📚" },
    { id: "cafe", label: "Café", emoji: "☕" },
    { id: "study-room", label: "Study Room", emoji: "📖" },
    { id: "memory-room", label: "Memory Room", emoji: "✨" }
  ],

  initialize() {
    const screen = document.getElementById("world");
    if (!screen) return;

    screen.replaceChildren();

    const heading = document.createElement("h1");
    heading.textContent = "Mikasa's World 🧣";

    const subtitle = document.createElement("p");
    subtitle.className = "muted";
    subtitle.textContent = "A little world filled with memories.";

    const character = document.createElement("div");
    character.className = "card mikasa-world-character";

    const image = document.createElement("img");
    image.src = "../../assets/mikasa.png";
    image.alt = "Mikasa Ackerman";
    image.className = "mikasa-world-image";
    image.loading = "lazy";

    const fallback = document.createElement("div");
    fallback.className = "mikasa-world-fallback";
    fallback.textContent = "🧣 Mikasa";

    image.addEventListener("error", () => {
      image.hidden = true;
      fallback.hidden = false;
    });

    const name = document.createElement("h2");
    name.textContent = "Mikasa Ackerman";

    const anime = document.createElement("p");
    anime.className = "muted";
    anime.textContent = "Attack on Titan";

    const mood = document.createElement("span");
    mood.className = "badge";
    mood.id = "world-mood";

    const thought = document.createElement("p");
    thought.className = "card mikasa-thought";
    thought.id = "world-thought";

    character.append(image, fallback, name, anime, mood, thought);

    const sceneHeading = document.createElement("h2");
    sceneHeading.textContent = "Explore Scenes";

    const sceneGrid = document.createElement("div");
    sceneGrid.className = "mikasa-scene-grid";

    this.scenes.forEach(scene => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "card mikasa-scene";
      button.dataset.scene = scene.id;
      button.textContent = `${scene.emoji} ${scene.label}`;

      button.addEventListener("click", () => {
        this.state.scene = scene.id;
        this.render(screen);
      });

      sceneGrid.append(button);
    });

    const currentScene = document.createElement("p");
    currentScene.className = "muted";
    currentScene.id = "world-current-scene";

    screen.append(
      heading,
      subtitle,
      character,
      sceneHeading,
      sceneGrid,
      currentScene
    );

    this.render(screen);
  },

  render(screen) {
    const mood = screen.querySelector("#world-mood");
    const thought = screen.querySelector("#world-thought");
    const currentScene = screen.querySelector("#world-current-scene");

    if (!mood || !thought || !currentScene) return;

    mood.textContent = `Mood: ${this.state.mood}`;
    thought.textContent = this.state.thought;

    const selected = this.scenes.find(
      scene => scene.id === this.state.scene
    );

    currentScene.textContent =
      `Currently exploring: ${selected.label}`;

    screen.querySelectorAll(".mikasa-scene").forEach(button => {
      const active = button.dataset.scene === this.state.scene;

      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }
};

export default MikasaWorld;
