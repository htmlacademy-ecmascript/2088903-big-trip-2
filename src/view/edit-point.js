import { capitalize } from '../utils/index.js';
import { formatDateTime } from '../utils/date-time.js';
import AbstractView from '../framework/view/abstract-view.js';

const createPointTypeTemplate = (types) => (
  types.map((type) => (
    `<div class="event__type-item">
      <input id="event-type-${type}" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${type}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}">
        ${capitalize(type)}
      </label>
    </div>`
  )).join('')
);

const createDestinationsTemplate = (destinations) => (
  destinations.map(({name}) => (
    `<option value=${name}></option>`
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
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}" type="checkbox" name="event-offer-${id}" ${isChecked ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-${id}">
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
    `<img class="event__photo" src=${picture.src} alt=${picture.description}>`
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

const createEditPointTemplate = ({point, allDestinations, destinations, allTypes, availableOffers}) => {
  const {base_price: basePrice, date_from: dateFrom, date_to: dateTo, offers, type} = point;
  const {name, description, pictures} = destinations;

  const pointTypeTemplate = createPointTypeTemplate(allTypes);
  const destinationsTemplate = createDestinationsTemplate(allDestinations);
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
                      Flight
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${name} list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${destinationsTemplate}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value=${formatDateTime(dateFrom)}>
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=${formatDateTime(dateTo)}>
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${basePrice}>
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

export default class EditPoint extends AbstractView {
  #point = {};
  #allDestinations = [];
  #destinations = {};
  #allTypes = [];
  #offersByType = [];
  #handleFormSubmit = null;
  #handleCloseClick = null;

  constructor({point = {}, destinations = [], offers = [], onFormSubmit, onCloseClick}) {
    super();
    this.#point = point;
    this.#allDestinations = destinations ?? [];
    this.#destinations = this.#allDestinations.find((destination) => destination.id === point.destination) ?? {};
    this.#allTypes = offers.map(({type}) => type) ?? [];
    this.#offersByType = offers.find((offer) => offer.type === point.type)?.offers ?? [];
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseClick = onCloseClick;

    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#closeClickHandler);
  }

  get template() {
    return createEditPointTemplate({
      point: this.#point,
      allDestinations: this.#allDestinations,
      destinations: this.#destinations,
      allTypes: this.#allTypes,
      availableOffers: this.#offersByType
    });
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseClick();
  };
}
