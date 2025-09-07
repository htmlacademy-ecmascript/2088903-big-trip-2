import { render } from '../render.js';
import List from '../view/list.js';
import EditPoint from '../view/edit-point.js';
import Point from '../view/point.js';
import Sort from '../view/sort.js';


export default class BoardPresenter {
  eventListComponent = new List();

  constructor({ container, pointsModel }) {
    this.container = container;
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];
    this.destinations = [...this.pointsModel.getDestinations()];
    this.offers = [...this.pointsModel.getOffers()];

    render(new Sort(), this.container);
    render(this.eventListComponent, this.container);
    render(new EditPoint({
      point: this.points[0],
      destinations: this.destinations,
      offers: this.offers
    }), this.eventListComponent.getElement());

    for (let i = 0; i < this.points.length; i++) {
      render(new Point({
        point: this.points[i],
        destinations: this.destinations,
        offers: this.offers
      }), this.eventListComponent.getElement());
    }
  }
}
