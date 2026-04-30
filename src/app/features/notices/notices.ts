import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notices',
  imports: [DatePipe],
  templateUrl: './notices.html',
  styleUrl: './notices.scss'
})
export class Notices {
  notices: any = [];
  selectedNotice: any = {
    category: '',
    date: '',
    description: '',
    title: ''
  }

  constructor(private apiService: Api) { }

  ngOnInit() {
    this.getNotices();
  }

  getNotices() {
    this.apiService.getNotices().subscribe({
      next: (response: any) => {
        if (response && response['status'] === 'Y') {
          this.notices = response.data;
          console.log(this.notices, '.....');
        }
      },
      error(error: any) {
        console.log(error);
      }
    })
  }

  showNotice(notice: any) {
    this.selectedNotice = notice;
  }

}
