import { render } from '../render.js';
import List from '../view/list.js';
import EditPoint from '../view/edit-point.js';
import Point from '../view/point.js';
import Sort from '../view/sort.js';


export default class BoardPresenter {
  eventListComponent = new List();

  constructor({ container }) {
    this.container = container;
  }

  init() {
    render(new Sort(), this.container);
    render(this.eventListComponent, this.container);
    render(new EditPoint(), this.eventListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new Point(), this.eventListComponent.getElement());
    }
  }
}
