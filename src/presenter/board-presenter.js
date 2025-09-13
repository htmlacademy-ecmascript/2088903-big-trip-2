import { render, replace } from '../framework/render.js';
import List from '../view/list.js';
import Point from '../view/point.js';
import Sort from '../view/sort.js';
import EditPoint from '../view/edit-point.js';
import NoPoint from '../view/no-point.js';

export default class BoardPresenter {
  #container = null;
  #pointsModel = null;

  #eventListComponent = new List();

  #points = [];
  #destinations = [];
  #offers = [];

  constructor({container, pointsModel}) {
    this.#container = container;
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
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditPointToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new Point({
      point,
      destinations,
      offers,
      onEditClick: () => {
        replacePointToEditPoint();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const editPointComponent = new EditPoint({
      point,
      destinations,
      offers,
      onFormSubmit: () => {
        replaceEditPointToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onCloseClick: () => {
        replaceEditPointToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
    });

    function replacePointToEditPoint() {
      replace(editPointComponent, pointComponent);
    }

    function replaceEditPointToPoint() {
      replace(pointComponent, editPointComponent);
    }

    render(pointComponent, this.#eventListComponent.element);
  }

  #renderBoard() {
    if (!this.#points.length) {
      render(new NoPoint(), this.#container);
      return;
    }

    render(new Sort(), this.#container);
    render(this.#eventListComponent, this.#container);

    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i], this.#destinations, this.#offers);
    }
  }
}
