import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  standalone: false,
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
})
export class ParentComponent {
  // Step 1: Define a property to send to the child
  user = 'Datta Sai';

  messageFromChild = '';

  // 2 Step 4: Handle the event from child
  receiveMessage(msg: string) {
    this.messageFromChild = msg;
  }
}
