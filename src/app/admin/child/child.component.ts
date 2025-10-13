import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: false,
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss',
})
export class ChildComponent {
  @Input() userName!: string;

  // 2 Step 1: Create an EventEmitter instance
  @Output() messageEvent = new EventEmitter<string>();

  // 2 Step 2: Emit the event with a message
  sendMessage() {
    this.messageEvent.emit('Hello from Child Component!');
  }
}
