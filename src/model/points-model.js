import { getRandomPoint } from '../../mocks/points.js';
import { offers } from '../../mocks/offers.js';
import { destinations } from '../../mocks/destinations.js';

const POINT_COUNT = 4;

export default class PointsModel {
  #mockPoints = Array.from({length: POINT_COUNT}, getRandomPoint);
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
