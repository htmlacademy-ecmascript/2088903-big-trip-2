import { render } from './framework/render.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import NewPointButton from './view/new-point-button.js';
import { AUTHORIZATION, END_POINT } from './const/api.js';
import PointsApiService from './api/points-api-service.js';

const tripHeaderElement = document.querySelector('.trip-main');
const filtersElement = tripHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
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
  boardPresenter.handleAddFormClose();
  newTaskButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  boardPresenter.createPoint();
  boardPresenter.handleAddFormOpen();
  newTaskButtonComponent.element.disabled = true;
}

boardPresenter.init();
filterPresenter.init();
pointsModel.init().finally(() => {
  render(newTaskButtonComponent, tripHeaderElement);
});
