import { remove, render, } from '../framework/render.js';
import List from '../view/list.js';
import Sort from '../view/sort.js';
import PointPresenter from './point-presenter.js';
import { filter } from '../utils/filter.js';
import { SORT_TYPES, SortType } from '../const/sort-types.js';
import { sortByDate, sortFromMaxDuration, sortFromMaxPrice } from '../utils/sort.js';
import { UserAction } from '../const/user-action.js';
import { UpdateType } from '../const/update-type.js';
import { FilterType } from '../const/filter-type.js';
import NoPoint from '../view/no-point.js';
import NewPointPresenter from './new-point-presenter.js';
import { BLANK_POINT } from '../const/blank-point.js';

export default class BoardPresenter {
  #tripContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #pointListComponent = new List();
  #sortComponent = null;
  #noPointsComponent = null;

  #destinations = [];
  #offers = [];
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;

  #pointPresenters = new Map();
  #newPointPresenter = null;

  constructor({tripContainer, pointsModel, filterModel, onNewTaskDestroy}) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#newPointPresenter = new NewPointPresenter({
      pointsListContainer: this.#pointListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewTaskDestroy
    });

  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DEFAULT:
        return filteredPoints.sort(sortByDate);
      case SortType.FROM_MAX_PRICE:
        return filteredPoints.sort(sortFromMaxPrice);
      case SortType.FROM_MAX_DURATION:
        return filteredPoints.sort(sortFromMaxDuration);
      default:
        return filteredPoints;
    }
  }

  init() {
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    this.#renderBoard();
  }

  createPoint() {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init(BLANK_POINT, this.#destinations, this.#offers);
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
    this.#noPointsComponent = new NoPoint({
      filterType: this.#filterType
    });

    render(this.#noPointsComponent, this.#tripContainer);
  }

  #clearNoPoints() {
    remove(this.#noPointsComponent);
  }

  #renderBoard() {
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

  #clearBoard({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy();
    this.#clearPointList();
    this.#clearSort();
    this.#clearNoPoints();

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
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
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
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
