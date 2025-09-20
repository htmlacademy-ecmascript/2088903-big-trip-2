import { remove, render, } from '../framework/render.js';
import List from '../view/list.js';
import Sort from '../view/sort.js';
import NoPoint from '../view/no-point.js';
import Filter from '../view/filter.js';
import PointPresenter from './point-presenter.js';
import { NoPointsMessage } from '../const/no-point-message.js';
import { generateFilter } from '../utils/filter.js';
import { updateItem } from '../utils/index.js';
import { SORT_TYPES, SortType } from '../const/sort-types.js';
import { sortByDate, sortFromMaxDuration, sortFromMaxPrice } from '../utils/sort.js';

export default class BoardPresenter {
  #filtersContainer = null;
  #tripContainer = null;
  #pointsModel = null;

  #pointListComponent = new List();
  #sortComponent = null;
  #filterComponent = null;

  #points = [];
  #destinations = [];
  #offers = [];
  #currentSortType = SortType.DEFAULT;

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

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.DEFAULT:
        this.#points.sort(sortByDate);
        break;
      case SortType.FROM_MAX_PRICE:
        this.#points.sort(sortFromMaxPrice);
        break;
      case SortType.FROM_MAX_DURATION:
        this.#points.sort(sortFromMaxDuration);
        break;
      default:
        break;
    }
    this.#currentSortType = sortType;
  }

  #renderSort() {
    this.#sortComponent = new Sort({
      sortTypes: SORT_TYPES,
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#tripContainer);
  }

  #clearSort() {
    remove(this.#sortComponent);
  }

  #renderFilters() {
    const filters = generateFilter(this.#points);
    this.#filterComponent = new Filter({filters});
    render(this.#filterComponent, this.#filtersContainer);
  }

  #clearFilters() {
    remove(this.#filterComponent);
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

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearFilters();
    this.#clearSort();
    this.#clearPointList();
    this.#renderBoard();
  };
}
