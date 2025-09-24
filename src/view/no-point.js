import AbstractView from '../framework/view/abstract-view.js';
import { NoPointsMessage } from '../const/no-point-message.js';

const createNoPointTemplate = ({filterType}) => {
  const noPointText = NoPointsMessage[filterType];

  return `<p class="trip-events__msg">${noPointText}</p>`;
};

export default class NoPoint extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointTemplate({
      filterType: this.#filterType,
    });
  }
}
