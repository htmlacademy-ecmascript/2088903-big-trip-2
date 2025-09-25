import { remove, render, RenderPosition } from '../framework/render.js';
import { nanoid } from 'nanoid';
import AddPoint from '../view/add-point.js';
import { UpdateType } from '../const/update-type.js';
import { UserAction } from '../const/user-action.js';
import { isEscapeKey } from '../utils/index.js';

export default class NewPointPresenter {
  #pointsListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #pointComponent = null;

  constructor({pointsListContainer, onDataChange, onDestroy}) {
    this.#pointsListContainer = pointsListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init(point, destinations, offers) {
    if (this.#pointComponent !== null) {
      return;
    }

    this.#pointComponent = new AddPoint({
      point,
      destinations,
      offers,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      onCloseClick: this.#handleCloseClick,
    });

    render(this.#pointComponent, this.#pointsListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointComponent);
    this.#pointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: nanoid(), ...point},
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #handleCloseClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };
}
