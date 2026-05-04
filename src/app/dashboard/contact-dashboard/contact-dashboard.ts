import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-dashboard',
  imports: [CommonModule],
  templateUrl: './contact-dashboard.html',
  styleUrl: './contact-dashboard.scss'
})
export class ContactDashboard {
  ngOnInit() {
    window.scrollTo(0, 0);
    this.getContacts();
  }

  contacts: any = [];
  selectedContact = {
    email: '',
    name: '',
    phone: '',
    subject: '',
    message: ''
  };

  constructor(private apiService: Api) { }

  getContacts() {
    this.apiService.getContacts().subscribe({
      next: (response: any) => {
        if (response && response['status'] === 'Y') {
          this.contacts = response.data;
        }
        console.log(this.contacts);
      },
      error(error: any) {
        console.log(error);
      }
    })
  }

  viewContact(contact: any) {
    this.selectedContact = contact;
  }

  deleteContact(contact: any) {
    console.log(contact);
    this.apiService.deleteContact(contact._id).subscribe({
      next: (response: any) => {
        if (response && response['status'] === 'Y') {
          alert('Record deleted Successfully');
          this.getContacts();
        }
      },
      error(error: any) {
        console.log(error);
      }
    })
  }
}
