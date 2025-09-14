import AbstractView from '../framework/view/abstract-view.js';

const createNoPointTemplate = ({text}) => `<p class="trip-events__msg">${text}</p>`;

export default class NoPoint extends AbstractView {
  #text = '';

  constructor({text}) {
    super();
    this.#text = text;
  }

  get template() {
    return createNoPointTemplate({
      text: this.#text
    });
  }
}
