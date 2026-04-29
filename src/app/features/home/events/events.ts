import { Component } from '@angular/core';
import { Api } from '../../../services/api';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-events',
  imports: [RouterModule, DatePipe],
  templateUrl: './events.html',
  styleUrl: './events.scss'
})
export class Events {
  events: any = [];
  constructor(private apiService: Api) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    this.apiService.getEvents().subscribe({
      next: (response: any) => {
        if (response && response['status'] === 'Y') {
          this.events = response.data;
          console.log(this.events, '.......');
        }
      },
      error(error: any) {
        console.log(error);
      }
    })
  }

}
