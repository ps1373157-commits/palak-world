import { createStore } from '../../shared/scripts/store.js';
import RecipientScreens from './modules/screens.js';

const appStore = createStore({
  currentScreen: window.location.hash.slice(1) || 'home',
  initialized: false
});

document.addEventListener('DOMContentLoaded', () => {
  RecipientScreens.initialize();

  appStore.setState({
    initialized: true
  });

  window.addEventListener('hashchange', () => {
    appStore.setState({
      currentScreen: window.location.hash.slice(1) || 'home'
    });
  });

  console.info('Palak World recipient app ready.');
});
