import { remove, render, RenderPosition, } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import List from '../view/list.js';
import Sort from '../view/sort.js';
import NoPoint from '../view/no-point.js';
import Loading from '../view/loading.js';
import ErrorLoading from '../view/error-loading.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import { filter } from '../utils/filter.js';
import { sortByDate, sortFromMaxDuration, sortFromMaxPrice } from '../utils/sort.js';
import { SORT_TYPES, SortType } from '../const/sort-types.js';
import { UserAction } from '../const/user-action.js';
import { UpdateType } from '../const/update-type.js';
import { FilterType } from '../const/filter-type.js';
import { BLANK_POINT } from '../const/blank-point.js';
import { TimeLimit } from '../const/api.js';

export default class BoardPresenter {
  #tripContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #pointListComponent = new List();
  #sortComponent = null;
  #noPointsComponent = null;
  #loadingComponent = new Loading();
  #errorLoadingComponent = new ErrorLoading();

  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

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

  get destinations() {
    return this.#pointsModel.destinations;
  }

  get offers() {
    return this.#pointsModel.offers;
  }

  init() {
    this.#renderBoard();
  }

  createPoint() {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init(BLANK_POINT, this.destinations, this.offers);
  }

  handleAddFormOpen() {
    if (this.points.length === 0) {
      remove(this.#noPointsComponent);
      this.#noPointsComponent = null;
    }
  }

  handleAddFormClose() {
    if (this.points.length === 0) {
      this.#renderNoPoints();
    }
  }

  #renderSort() {
    this.#sortComponent = new Sort({
      sortTypes: SORT_TYPES,
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
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
    this.points.forEach((point) => this.#renderPoint(point, this.destinations, this.offers));
  }

  #renderNoPoints() {
    this.#noPointsComponent = new NoPoint({
      filterType: this.#filterType
    });

    render(this.#noPointsComponent, this.#tripContainer);
  }

  #renderBoard() {
    render(this.#pointListComponent, this.#tripContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (!this.points.length) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPoints();
  }

  #clearBoard({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy();

    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#tripContainer);
  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch (err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch (err) {
          this.#newPointPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch (err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
      case UpdateType.ERROR:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        render(this.#errorLoadingComponent, this.#tripContainer);
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
