import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-collapsible-panel',
  templateUrl: './collapsible-panel.component.html',
  styleUrls: ['./collapsible-panel.component.scss'],
})
export class CollapsiblePanelComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  badge: number;

  @Input() expanded = false;

  @Output() toggle = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  onToggleBtnClicked(event) {
    this.expanded = !this.expanded;

    this.toggle.emit(this.expanded);
  }

}
