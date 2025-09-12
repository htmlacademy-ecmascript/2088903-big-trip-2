import Filter from './view/filter.js';
import BoardPresenter from './presenter/board-presenter.js';
import { render } from './framework/render';
import PointsModel from './model/points-model.js';

const filtersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();

const boardPresenter = new BoardPresenter({
  container: tripEventsElement,
  pointsModel
});

render(new Filter(), filtersElement);

boardPresenter.init();
