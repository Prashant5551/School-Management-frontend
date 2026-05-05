import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule, DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-gallery-dashboard',
  imports: [CommonModule, DatePipe, ReactiveFormsModule],
  templateUrl: './gallery-dashboard.html',
  styleUrl: './gallery-dashboard.scss'
})
export class GalleryDashboard {
  galleries: any = [];
  selectedGallery: any = null;
  id: any = '';
  isEdit: boolean = false;

  constructor(private apiService: Api, private sanitizer: DomSanitizer, private fb: FormBuilder) {
    this.selectedGallery = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      imagesUrl: ['', Validators.required]
    })
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getGallery();
  }

  sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getGallery() {
    this.apiService.getGallary().subscribe({
      next: (response: any) => {
        if (response && response['status'] === 'Y') {
          response.data.map((obj: any) => {
            obj['images'] = obj.imagesUrl.split(',');
          })
          this.galleries = response.data;
        }
        console.log(this.galleries);
      },
      error(error: any) {
        console.log(error);
      }
    })
  }

  onSubmit() {
    console.log(this.selectedGallery.value);
    if (this.isEdit) {
      this.apiService.updateGallery(this.id, this.selectedGallery.value).subscribe({
        next: (response: any) => {
          if (response && response['status'] === 'Y') {
            alert('Record updated Successfully');
            this.getGallery();
            this.selectedGallery.reset();
          }
        },
        error(error: any) {
          console.log(error);
        }
      })
    } else {
      this.apiService.addGallery(this.selectedGallery.value).subscribe({
        next: (response: any) => {
          if (response && response['status'] === 'Y') {
            alert('Record added Successfully');
            this.getGallery();
          }
        },
        error(error: any) {
          console.log(error);
        }
      })
    }
  }

  edit(gallery: any) {
    this.isEdit = true;
    this.selectedGallery.patchValue({
      date: this.formatDateForInput(gallery.date),
      imagesUrl: gallery.imagesUrl,
      title: gallery.title
    })
    this.id = gallery._id;
  }

  formatDateForInput(date: any) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`
  }

  delete(Gallery: any) {
    console.log(Gallery);
    this.apiService.deleteGallery(Gallery._id).subscribe({
      next: (response: any) => {
        if (response && response['status'] === 'Y') {
          alert('Record deleted Successfully');
          this.getGallery();
        }
      },
      error(error: any) {
        console.log(error);
      }
    })
  }

}
