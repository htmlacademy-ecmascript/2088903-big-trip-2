import AbstractView from '../framework/view/abstract-view.js';

const createSortList = ({type, name, sortType, disabled}, current) => (
  `<div class="trip-sort__item  trip-sort__item--${type}">
    <input
      id="sort-${type}"
      class="trip-sort__input  visually-hidden"
      type="radio"
      name="trip-sort"
      value="sort-${type}"
      data-sort-type="${sortType}"
      ${disabled ? 'disabled' : ''}
      ${current === sortType ? 'checked' : ''}
      />
    <label class="trip-sort__btn" for="sort-${type}">${name}</label>
  </div>`
);

const createSortTemplate = ({sortTypes, currentSortType}) => {
  const sortList = sortTypes
    .map((item) => createSortList(item, currentSortType))
    .join('');

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        ${sortList}
    </form>`
  );
};

export default class Sort extends AbstractView {
  #sortTypes = [];
  #currentSortType = null;
  #handleSortTypeChange = null;

  constructor({sortTypes = [], currentSortType, onSortTypeChange}) {
    super();
    this.#sortTypes = sortTypes;
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate({sortTypes: this.#sortTypes, currentSortType: this.#currentSortType});
  }

  #sortTypeChangeHandler = (evt) => {
    if (!evt.target.closest('input[data-sort-type]')) {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
