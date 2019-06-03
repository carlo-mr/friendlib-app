import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-collapsible-panel',
  templateUrl: './collapsible-panel.component.html',
  styleUrls: ['./collapsible-panel.component.scss'],
})
export class CollapsiblePanelComponent implements OnInit {

  @Input()
  title: string;

  expanded = false;

  constructor() {
  }

  ngOnInit() {
  }

  onToggleBtnClicked(event) {
    this.expanded = !this.expanded;
  }

}
