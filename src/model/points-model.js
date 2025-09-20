import { points } from '../../mocks/points.js';
import { offers } from '../../mocks/offers.js';
import { destinations } from '../../mocks/destinations.js';

export default class PointsModel {
  #mockPoints = points;
  #mockOffers = offers;
  #mockDestination = destinations;

  get points() {
    return this.#mockPoints;
  }

  get offers() {
    return this.#mockOffers;
  }

  get destinations() {
    return this.#mockDestination;
  }
}
