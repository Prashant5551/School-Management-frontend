import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-events',
  imports: [DatePipe],
  templateUrl: './events.html',
  styleUrl: './events.scss'
})
export class Events {

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getEvents();
  }

  events: any = [];
  selectedEvent: any = {
    title: '',
    date: '',
    location: '',
    description: '',
    shortDescription: ''
  }
  constructor(private apiService: Api) { }

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

  showEvent(event: any) {
    this.selectedEvent = event;
  }


}
