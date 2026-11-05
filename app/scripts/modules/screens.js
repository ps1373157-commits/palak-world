"use strict";

const RecipientScreens = {
  screens: [
    "home",
    "letters",
    "gallery",
    "calendar",
    "quizzes",
    "world",
    "profile"
  ],

  initialize() {
    this.elements = new Map();

    this.screens.forEach(name => {
      const element = document.getElementById(name);

      if (element) {
        this.elements.set(name, element);
      }
    });

    this.navigate(
      window.location.hash.slice(1) || "home"
    );

    window.addEventListener("hashchange", () => {
      this.navigate(
        window.location.hash.slice(1) || "home"
      );
    });
  },

  navigate(name) {
    if (!this.screens.includes(name)) return;

    this.elements.forEach((element, id) => {
      element.hidden = id !== name;
    });

    document.querySelectorAll(".bottom-nav a").forEach(link => {
      const active = link.hash === `#${name}`;

      link.classList.toggle("active", active);

      if (active) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }
};

export default RecipientScreens;
