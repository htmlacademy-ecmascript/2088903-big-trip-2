import { render, replace } from '../framework/render.js';
import List from '../view/list.js';
import Point from '../view/point.js';
import Sort from '../view/sort.js';
import EditPoint from '../view/edit-point.js';
import NoPoint from '../view/no-point.js';
import Filter from '../view/filter.js';
import { NoPointsMessage } from '../const/no-point-message.js';
import { generateFilter } from '../utils/filter.js';
import { isEscapeKey } from '../utils/index.js';

export default class BoardPresenter {
  #filtersContainer = null;
  #tripContainer = null;
  #pointsModel = null;

  #eventListComponent = new List();

  #points = [];
  #destinations = [];
  #offers = [];

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

  #renderPoint(point, destinations, offers) {
    const escKeyDownHandler = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new Point({
      point,
      destinations,
      offers,
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const editPointComponent = new EditPoint({
      point,
      destinations,
      offers,
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onCloseClick: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
    });

    function replacePointToForm() {
      replace(editPointComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, editPointComponent);
    }

    render(pointComponent, this.#eventListComponent.element);
  }

  #renderBoard() {
    const filters = generateFilter(this.#points);
    render(new Filter({filters}), this.#filtersContainer);

    if (!this.#points.length) {
      render(new NoPoint({text: NoPointsMessage.EVERYTHING}), this.#tripContainer);
      return;
    }

    render(new Sort(), this.#tripContainer);
    render(this.#eventListComponent, this.#tripContainer);

    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i], this.#destinations, this.#offers);
    }
  }
}
