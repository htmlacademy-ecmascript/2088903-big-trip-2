import { render, } from '../framework/render.js';
import List from '../view/list.js';
import Sort from '../view/sort.js';
import NoPoint from '../view/no-point.js';
import Filter from '../view/filter.js';
import PointPresenter from './point-presenter.js';
import { NoPointsMessage } from '../const/no-point-message.js';
import { generateFilter } from '../utils/filter.js';
import { updateItem } from '../utils/index.js';

export default class BoardPresenter {
  #filtersContainer = null;
  #tripContainer = null;
  #pointsModel = null;

  #pointListComponent = new List();
  #sortComponent = new Sort();

  #points = [];
  #destinations = [];
  #offers = [];

  #pointPresenters = new Map();

  constructor({tripContainer, filtersContainer, pointsModel}) {
    this.#tripContainer = tripContainer;
    this.#filtersContainer = filtersContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    this.#renderBoard();
  }

  #renderSort() {
    render(this.#sortComponent, this.#tripContainer);
  }

  #renderFilters() {
    const filters = generateFilter(this.#points);
    render(new Filter({filters}), this.#filtersContainer);
  }

  #renderPoint(point, destinations, offers) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point, destinations, offers);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    this.#points.forEach((point) => this.#renderPoint(point, this.#destinations, this.#offers));
  }

  #renderNoPoints() {
    render(new NoPoint({text: NoPointsMessage.EVERYTHING}), this.#tripContainer);
  }

  #renderBoard() {
    this.#renderFilters();

    if (!this.#points.length) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    render(this.#pointListComponent, this.#tripContainer);

    this.#renderPoints();
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.#destinations, this.#offers);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };
}
