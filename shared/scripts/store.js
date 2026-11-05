export function createStore(initialState = {}) {
  let state = Object.freeze({ ...initialState });
  const listeners = new Set();

  function getState() {
    return state;
  }

  function setState(updates) {
    state = Object.freeze({
      ...state,
      ...updates
    });

    listeners.forEach(listener => listener(state));
  }

  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }

    listeners.add(listener);

    return () => listeners.delete(listener);
  }

  return Object.freeze({
    getState,
    setState,
    subscribe
  });
}
