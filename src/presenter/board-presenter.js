import { remove, render, } from '../framework/render.js';
import List from '../view/list.js';
import Sort from '../view/sort.js';
import NoPoint from '../view/no-point.js';
import Filter from '../view/filter.js';
import PointPresenter from './point-presenter.js';
import { NoPointsMessage } from '../const/no-point-message.js';
import { generateFilter } from '../utils/filter.js';
import { SORT_TYPES, SortType } from '../const/sort-types.js';
import { sortByDate, sortFromMaxDuration, sortFromMaxPrice } from '../utils/sort.js';
import { UserAction } from '../const/user-action.js';
import { UpdateType } from '../const/update-type.js';

export default class BoardPresenter {
  #filtersContainer = null;
  #tripContainer = null;
  #pointsModel = null;

  #pointListComponent = new List();
  #sortComponent = null;
  #filterComponent = null;
  #noPointsComponent = new NoPoint({ text: NoPointsMessage.EVERYTHING });

  #destinations = [];
  #offers = [];
  #currentSortType = SortType.DEFAULT;

  #pointPresenters = new Map();

  constructor({ tripContainer, filtersContainer, pointsModel }) {
    this.#tripContainer = tripContainer;
    this.#filtersContainer = filtersContainer;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.DEFAULT:
        return this.#pointsModel.points.sort(sortByDate);
      case SortType.FROM_MAX_PRICE:
        return this.#pointsModel.points.sort(sortFromMaxPrice);
      case SortType.FROM_MAX_DURATION:
        return this.#pointsModel.points.sort(sortFromMaxDuration);
      default:
        return this.#pointsModel.points;
    }
  }

  init() {
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    this.#renderBoard();
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
    const filters = generateFilter(this.points);
    this.#filterComponent = new Filter({ filters });
    render(this.#filterComponent, this.#filtersContainer);
  }

  #clearFilters() {
    remove(this.#filterComponent);
  }

  #renderPoint(point, destinations, offers) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point, destinations, offers);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    this.points.forEach((point) => this.#renderPoint(point, this.#destinations, this.#offers));
  }

  #renderNoPoints() {
    render(this.#noPointsComponent, this.#tripContainer);
  }

  #clearNoPoints() {
    remove(this.#noPointsComponent);
  }

  #renderBoard() {
    this.#renderFilters();

    if (!this.points.length) {
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

  #clearBoard({ resetSortType = false } = {}) {
    this.#clearPointList();
    this.#clearSort();
    this.#clearFilters();
    this.#clearNoPoints();

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updateTask(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this.#pointsModel.addTask(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this.#pointsModel.deleteTask(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard();
        break;
    }
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };
}
