import { LightningElement, api } from "lwc";

export default class Navigation extends LightningElement {
  @api page;
  activeTab;

  connectedCallback() {
    this.activeTab = this.page;
  }

  handleActive(event) {
    if (this.activeTab === event.target.value) return;
    window.location.href = event.target.dataset.url;
  }
} 