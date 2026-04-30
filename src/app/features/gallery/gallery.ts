import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule, DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-gallery',
  imports: [DatePipe, CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery {

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getGalleries();
  }

  gallery: any = [];

  constructor(private apiService: Api, private sanitizer: DomSanitizer) { }

  sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getGalleries() {
    this.apiService.getGallary().subscribe({
      next: (response: any) => {
        if (response && response['status'] === 'Y') {
          response.data.map((obj: any) => {
            obj['images'] = obj.imagesUrl.split(',');
          })
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
