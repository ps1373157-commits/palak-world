"use strict";

const GalleryManager = {
  photos: [],

  initialize() {
    const section = document.getElementById("gallery");
    if (!section) return;

    const panel = document.createElement("div");
    panel.className = "card gallery-manager";

    panel.innerHTML = `
      <h2>Memory Gallery 🖼️</h2>
      <p class="muted">Manage photos intended for the private gallery.</p>

      <div class="field">
        <label for="gallery-upload">Choose photos</label>
        <input
          id="gallery-upload"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
        >
      </div>

      <p class="muted">
        Only upload photos you have permission to share.
        Recipient downloads will be disabled by default.
      </p>

      <div id="gallery-grid" class="gallery-grid"></div>
    `;

    section.append(panel);

    panel.querySelector("#gallery-upload").addEventListener(
      "change",
      event => this.addPhotos(event.target.files, panel)
    );
  },

  addPhotos(files, panel) {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 8 * 1024 * 1024;

    for (const file of files) {
      if (!allowedTypes.includes(file.type) || file.size > maxSize) {
        alert(`${file.name}: unsupported format or larger than 8 MB.`);
        continue;
      }

      this.photos.push({
        id: crypto.randomUUID(),
        name: file.name,
        url: URL.createObjectURL(file)
      });
    }

    panel.querySelector("#gallery-upload").value = "";
    this.render(panel.querySelector("#gallery-grid"));
  },

  render(container) {
    container.replaceChildren();

    if (!this.photos.length) {
      const empty = document.createElement("p");
      empty.className = "muted";
      empty.textContent = "No photos selected yet.";
      container.append(empty);
      return;
    }

    this.photos.forEach(photo => {
      const card = document.createElement("article");
      card.className = "card";

      const image = document.createElement("img");
      image.src = photo.url;
      image.alt = "Selected gallery photo";
      image.loading = "lazy";

      const name = document.createElement("p");
      name.textContent = photo.name;

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "btn";
      remove.textContent = "Remove";
      remove.addEventListener("click", () => {
        URL.revokeObjectURL(photo.url);
        this.photos = this.photos.filter(item => item.id !== photo.id);
        this.render(container);
      });

      card.append(image, name, remove);
      container.append(card);
    });
  }
};

export default GalleryManager;
