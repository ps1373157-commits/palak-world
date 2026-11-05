export function createElement(tag, options = {}) {
  const element = document.createElement(tag);

  if (options.className) {
    element.className = options.className;
  }

  if (options.text !== undefined) {
    element.textContent = String(options.text);
  }

  if (options.attributes) {
    for (const [name, value] of Object.entries(options.attributes)) {
      element.setAttribute(name, String(value));
    }
  }

  return element;
}

export function clearElement(element) {
  if (!(element instanceof Element)) {
    throw new TypeError('A valid DOM element is required');
  }

  element.replaceChildren();
}
