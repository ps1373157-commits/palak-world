import { createStore } from '../../shared/scripts/store.js';
import AdminSections from './modules/sections.js';
import LettersManager from './modules/letters.js';
import GalleryManager from './modules/gallery.js';
import CalendarManager from './modules/calendar.js';
import QuizManager from './modules/quizzes.js';
import CompanionManager from './modules/companion.js';

const adminStore = createStore({
  currentSection: window.location.hash.slice(1) || 'overview',
  initialized: false
});

document.addEventListener('DOMContentLoaded', () => {
  AdminSections.initialize();
  LettersManager.initialize();
  GalleryManager.initialize();
  CalendarManager.initialize();
  QuizManager.initialize();
  CompanionManager.initialize();

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
