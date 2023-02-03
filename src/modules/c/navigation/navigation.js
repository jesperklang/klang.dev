import { LightningElement } from "lwc";

export default class Navigation extends LightningElement {
  handleClick(event) {
    console.log(`You clicked the "${event.target.label}" button`);
    // Perform an action here
  }
}