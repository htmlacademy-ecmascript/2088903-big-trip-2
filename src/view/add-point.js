import he from 'he';
import 'flatpickr/dist/flatpickr.min.css';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { capitalize } from '../utils/index.js';
import { formatDateTime } from '../utils/date-time.js';
import flatpickr from 'flatpickr';
import { DateFormat } from '../const/date-format.js';
import { INVALID_CITY_MESSAGE } from '../const/point.js';

const createPointTypeTemplate = (types, current, isDisabled) => (
  types.map((type) => (
    `<div class="event__type-item">
      <input
        id="event-type-${type}"
        class="event__type-input  visually-hidden"
        type="radio"
        name="event-type"
        value="${type}"
        ${current === type ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}
      />
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}">
        ${capitalize(type)}
      </label>
    </div>`
  )).join('')
);

const createDestinationsTemplate = (destinations, isDisabled) => (
  destinations.map(({name}) => (
    `<option value="${name}" ${isDisabled ? 'disabled' : ''}></option>`
  )).join('')
);

const createOffersTemplate = (availableOffers, selectedOfferIds, isDisabled) => {
  if (availableOffers.length === 0) {
    return '';
  }

  const offersListTemplate = availableOffers.map(({id, title, price}) => {
    const isChecked = selectedOfferIds.includes(id);
    return (
      `<div class="event__offer-selector">
        <input
          class="event__offer-checkbox  visually-hidden"
          id="${id}"
          type="checkbox"
          name="${id}"
          ${isChecked ? 'checked' : ''}
          ${isDisabled ? 'disabled' : ''}
        >
        <label class="event__offer-label" for="${id}">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
      </div>`
    );
  }).join('');

  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offersListTemplate}
      </div>
    </section>`
  );
};

const createDescriptionTemplate = ({description, pictures}) => {
  const hasPictures = pictures && pictures.length;

  if (!description && !hasPictures) {
    return '';
  }

  const picturesListTemplate = hasPictures ? pictures.map((picture) => (
    `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`
  )).join('') : '';

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">
        Destination
      </h3>

      ${description ?
      `<p class="event__destination-description">
        ${description}
      </p>` : ''}

      ${hasPictures ?
      `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${picturesListTemplate}
        </div>
      </div>` : ''}
    </section>`
  );
};

const createAddPointTemplate = ({
  point,
  destinations,
  destination,
  types,
  availableOffers,
  isDisabled,
  isSaving,
  isDeleting
}) => {
  const {basePrice, dateFrom, dateTo, offers, type} = point;
  const {name, description, pictures} = destination;

  const pointTypeTemplate = createPointTypeTemplate(types, type, isDisabled);
  const destinationsTemplate = createDestinationsTemplate(destinations, isDisabled);
  const offersTemplate = createOffersTemplate(availableOffers, offers, isDisabled);
  const descriptionTemplate = createDescriptionTemplate({description, pictures});

  return `
          <li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input
                      class="event__type-toggle  visually-hidden"
                      id="event-type-toggle-1"
                      type="checkbox"
                      ${isDisabled ? 'disabled' : ''}
                    >

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                          ${pointTypeTemplate}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${capitalize(type)}
                    </label>
                    <input
                      class="event__input  event__input--destination"
                      id="event-destination-1"
                      type="text"
                      name="event-destination"
                      value="${he.encode(name ?? '')}"
                      list="destination-list-1"
                      required
                      ${isDisabled ? 'disabled' : ''}
                    >
                    <datalist id="destination-list-1">
                      ${destinationsTemplate}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input
                      class="event__input  event__input--time"
                      id="event-start-time-1"
                      type="text"
                      name="event-start-time"
                      value="${dateFrom ? formatDateTime(dateFrom) : ''}"
                      required
                      ${isDisabled ? 'disabled' : ''}
                    >
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input
                      class="event__input  event__input--time"
                      id="event-end-time-1"
                      type="text"
                      name="event-end-time"
                      value="${dateTo ? formatDateTime(dateTo) : ''}"
                      required
                      ${isDisabled ? 'disabled' : ''}
                    >
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input
                      class="event__input  event__input--price"
                      id="event-price-1"
                      type="number"
                      name="event-price"
                      value="${he.encode(basePrice.toString())}"
                      min="1"
                      required
                      ${isDisabled ? 'disabled' : ''}
                    >
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
                  <button class="event__reset-btn" type="reset">${isDeleting ? 'Canceling...' : 'Cancel'}</button>
                </header>
                <section class="event__details">
                  ${offersTemplate}
                  ${descriptionTemplate}
                </section>
              </form>
          </li>
    `;
};

export default class AddPoint extends AbstractStatefulView {
  #destinations = [];
  #offers = [];
  #types = [];
  #handleFormSubmit = null;
  #handleDeleteClick = null;

  #datepickerTo = null;
  #datepickerFrom = null;

  constructor({point = {}, destinations = [], offers = [], onFormSubmit, onDeleteClick}) {
    super();
    this._setState(AddPoint.parsePointToState(point));
    this.#destinations = destinations ?? [];
    this.#offers = offers ?? [];
    this.#types = offers.map(({type}) => type) ?? [];
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();
  }

  get template() {
    return createAddPointTemplate({
      point: this._state,
      destinations: this.#destinations,
      destination: this.#destinations.find((destination) => destination.id === this._state.destination) ?? {},
      types: this.#types,
      availableOffers: this.#offers.find((offer) => offer.type === this._state.type)?.offers ?? [],
      isDisabled: this._state.isDisabled,
      isSaving: this._state.isSaving,
      isDeleting: this._state.isDeleting,
    });
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset(point) {
    this.updateElement(
      AddPoint.parsePointToState(point),
    );
  }

  _restoreHandlers() {
    this.element.querySelector('form')?.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__input--price')?.addEventListener('change', this.#basePriceChangeHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#selectedOffersChangeHandler);
    this.element.querySelector('.event__type-group')?.addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination')?.addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__reset-btn')?.addEventListener('click', this.#formDeleteClickHandler);

    this.#setDateFromDatepicker();
    this.#setDateToDatepicker();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(AddPoint.parseStateToPoint(this._state));
  };

  #basePriceChangeHandler = (evt) => {
    this._setState({basePrice: parseInt(evt.target.value, 10)});
  };

  #selectedOffersChangeHandler = (evt) => {
    const input = evt.target.closest('.event__offer-checkbox');
    if (!input) {
      return;
    }

    const updatedOffers = input.checked
      ? [...this._state.offers, input.id]
      : this._state.offers.filter((id) => id !== input.id);

    this._setState({offers: updatedOffers});
  };

  #typeChangeHandler = (evt) => {
    const input = evt.target.closest('.event__type-input');
    if (!input) {
      return;
    }

    this.updateElement({
      type: input.value,
      offers: [],
    });
  };

  #destinationChangeHandler = (evt) => {
    const target = evt.target;
    if (!target) {
      return;
    }

    const value = target.value;
    if (!value) {
      return;
    }

    const destinationId = this.#destinations.find((destination) => destination.name === value)?.id ?? null;
    if (!destinationId) {
      target.setCustomValidity(INVALID_CITY_MESSAGE);
      target.reportValidity();
      return;
    }

    this.updateElement({
      destination: destinationId,
    });
  };

  #dateFromChangeHandler = ([date]) => {
    this.updateElement({
      dateFrom: date
    });
  };

  #dateToChangeHandler = ([date]) => {
    this.updateElement({
      dateTo: date
    });
  };

  #setDateFromDatepicker() {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: DateFormat.FlATPICKR,
        enableTime: true,
        'time_24hr': true,
        maxDate: this._state.dateTo,
        onClose: this.#dateFromChangeHandler,
        locale: {firstDayOfWeek: 1},
      },
    );
  }

  #setDateToDatepicker() {
    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: DateFormat.FlATPICKR,
        enableTime: true,
        'time_24hr': true,
        minDate: this._state.dateFrom,
        onClose: this.#dateToChangeHandler,
        locale: {firstDayOfWeek: 1},
      },
    );
  }

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(AddPoint.parseStateToPoint(this._state));
  };

  static parsePointToState(point) {
    return {
      ...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const updatedState = {...state};

    delete updatedState.isDisabled;
    delete updatedState.isSaving;
    delete updatedState.isDeleting;

    return updatedState;
  }
}
