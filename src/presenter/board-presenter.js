import { render } from '../render.js';
import EventListView from '../view/event-list-view.js';
import EditEventView from '../view/edit-event-view.js';
import EventView from '../view/event-view.js';
import SortView from '../view/sort-view.js';


export default class BoardPresenter {
  eventListComponent = new EventListView();

  constructor({ container }) {
    this.container = container;
  }

  init() {
    render(new SortView(), this.container);
    render(this.eventListComponent, this.container);
    render(new EditEventView(), this.eventListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventView(), this.eventListComponent.getElement());
    }
  }
}
