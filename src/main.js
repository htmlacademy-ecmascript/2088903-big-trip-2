import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import NewPointButton from './view/new-point-button.js';
import { render } from './framework/render.js';

const tripHeaderElement = document.querySelector('.trip-main');
const filtersElement = tripHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter({
  filtersContainer: filtersElement,
  tripContainer: tripEventsElement,
  pointsModel,
  filterModel,
  onNewTaskDestroy: handleNewPointFormClose,
});

const filterPresenter = new FilterPresenter({
  filterContainer: filtersElement,
  filterModel,
  pointsModel,
});

const newTaskButtonComponent = new NewPointButton({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newTaskButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  boardPresenter.createPoint();
  newTaskButtonComponent.element.disabled = true;
}

render(newTaskButtonComponent, tripHeaderElement);

boardPresenter.init();
filterPresenter.init();
