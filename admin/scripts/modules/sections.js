"use strict";

const AdminSections = {
  sections: [
    "overview",
    "letters",
    "gallery",
    "calendar",
    "quizzes",
    "companion",
    "deliveries",
    "settings"
  ],

  initialize() {
    this.elements = new Map();

    this.sections.forEach(name => {
      const element = document.getElementById(name);
      if (element) this.elements.set(name, element);
    });

    document.querySelectorAll(".admin-nav a").forEach(link => {
      link.addEventListener("click", event => {
        const name = link.hash.slice(1);
        if (!this.sections.includes(name)) return;

        event.preventDefault();
        this.navigate(name);
        history.replaceState(null, "", `#${name}`);
      });
    });

    this.navigate(location.hash.slice(1) || "overview");
  },

  navigate(name) {
    if (!this.sections.includes(name)) return;

    this.elements.forEach((element, id) => {
      element.hidden = id !== name;
    });

    document.querySelectorAll(".admin-nav a").forEach(link => {
      const active = link.hash === `#${name}`;
      link.classList.toggle("active", active);

      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }
};

export default AdminSections;
