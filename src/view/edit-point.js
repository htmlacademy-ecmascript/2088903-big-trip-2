import he from 'he';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { capitalize } from '../utils/index.js';
import { formatDateTime } from '../utils/date-time.js';
import { DateFormat } from '../const/date-format.js';

const createPointTypeTemplate = (types, current) => (
  types.map((type) => (
    `<div class="event__type-item">
      <input
        id="event-type-${type}"
        class="event__type-input  visually-hidden"
        type="radio"
        name="event-type"
        value="${type}"
        ${current === type ? 'checked' : ''}
      />
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}">
        ${capitalize(type)}
      </label>
    </div>`
  )).join('')
);

const createDestinationsTemplate = (destinations) => (
  destinations.map(({name}) => (
    `<option value="${name}"></option>`
  )).join('')
);

const createOffersTemplate = (availableOffers, selectedOfferIds) => {
  if (availableOffers.length === 0) {
    return '';
  }

  const offersListTemplate = availableOffers.map(({id, title, price}) => {
    const isChecked = selectedOfferIds.includes(id);
    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="${id}" type="checkbox" name="${id}" ${isChecked ? 'checked' : ''}>
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
  if (!description) {
    return '';
  }

  const picturesListTemplate = pictures.map((picture) => (
    `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`
  )).join('');

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">
        Destination
      </h3>
      <p class="event__destination-description">
        ${description}
      </p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${picturesListTemplate}
        </div>
      </div>
    </section>`
  );
};

const createEditPointTemplate = ({point, destinations, destination, types, availableOffers}) => {
  const {basePrice, dateFrom, dateTo, offers, type} = point;
  const {name, description, pictures} = destination;

  const pointTypeTemplate = createPointTypeTemplate(types, type);
  const destinationsTemplate = createDestinationsTemplate(destinations);
  const offersTemplate = createOffersTemplate(availableOffers, offers);
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
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

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
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(name ?? '')}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${destinationsTemplate}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDateTime(dateFrom)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDateTime(dateTo)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${he.encode(basePrice.toString())}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  ${offersTemplate}
                  ${descriptionTemplate}
                </section>
              </form>
          </li>
    `;
};

export default class EditPoint extends AbstractStatefulView {
  #destinations = [];
  #offers = [];
  #types = [];
  #handleFormSubmit = null;
  #handleCloseClick = null;
  #handleDeleteClick = null;

  #datepickerTo = null;
  #datepickerFrom = null;

  constructor({point = {}, destinations = [], offers = [], onFormSubmit, onCloseClick, onDeleteClick}) {
    super();
    this._setState(EditPoint.parsePointToState(point));
    this.#destinations = destinations ?? [];
    this.#offers = offers ?? [];
    this.#types = offers.map(({type}) => type) ?? [];
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseClick = onCloseClick;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate({
      point: this._state,
      destinations: this.#destinations,
      destination: this.#destinations.find((destination) => destination.id === this._state.destination) ?? {},
      types: this.#types,
      availableOffers: this.#offers.find((offer) => offer.type === this._state.type)?.offers ?? [],
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
      EditPoint.parsePointToState(point),
    );
  }

  _restoreHandlers() {
    this.element.querySelector('form')?.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn')?.addEventListener('click', this.#closeClickHandler);
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
    this.#handleFormSubmit(EditPoint.parseStateToPoint(this._state));
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseClick();
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
    const value = evt.target.value;
    if (!value) {
      return;
    }

    const id = this.#destinations.find((destination) => destination.name === value)?.id ?? null;
    if (!id) {
      return;
    }

    this.updateElement({
      destination: id,
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
        defaultDate: this._state.dateFrom,
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
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onClose: this.#dateToChangeHandler,
        locale: {firstDayOfWeek: 1},
      },
    );
  }

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditPoint.parseStateToPoint(this._state));
  };

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    return {...state};
  }
}
