import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
// import FilterModel from './model/filter-model.js';

const filtersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
// const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter({
  filtersContainer: filtersElement,
  tripContainer: tripEventsElement,
  pointsModel
});

boardPresenter.init();
