import { Component } from '@angular/core';
import { Api } from '../../../services/api';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gallery',
  imports: [DatePipe, RouterModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss'
})
export class Gallery {
  gallery: any = [];

  constructor(private apiService: Api) { }

  ngOnInit() {
    this.getGalleries();
  }

  getGalleries() {
    this.apiService.getGallary().subscribe({
      next: (response: any) => {
        if (response && response['status'] === 'Y') {
          this.gallery = response.data;
        }
        console.log(this.gallery);
      },
      error(error: any) {
        console.log(error);
      }
    })
  }

}
