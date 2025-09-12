import AbstractView from '../framework/view/abstract-view.js';

const createListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class List extends AbstractView {
  get template() {
    return createListTemplate();
  }
}
