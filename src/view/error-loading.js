import AbstractView from '../framework/view/abstract-view.js';

const createTemplate = () =>
  `<p class="trip-events__msg">
      Failed to load latest route information
  </p>`;

export default class ErrorLoading extends AbstractView {
  get template() {
    return createTemplate();
  }
}
