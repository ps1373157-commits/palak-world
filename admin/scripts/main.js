import { createStore } from '../../shared/scripts/store.js';
import AdminSections from './modules/sections.js';

const adminStore = createStore({
  currentSection: window.location.hash.slice(1) || 'overview',
  initialized: false
});

document.addEventListener('DOMContentLoaded', () => {
  AdminSections.initialize();

  adminStore.setState({
    initialized: true
  });

  window.addEventListener('hashchange', () => {
    adminStore.setState({
      currentSection: window.location.hash.slice(1) || 'overview'
    });
  });

  console.info('Admin dashboard ready.');
});
