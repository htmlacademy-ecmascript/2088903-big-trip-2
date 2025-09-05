import Filter from './view/filter.js';
import BoardPresenter from './presenter/board-presenter.js';
import { render } from './render.js';

const filtersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const boardPresenter = new BoardPresenter({
  container: tripEventsElement,
});

render(new Filter(), filtersElement);

boardPresenter.init();
