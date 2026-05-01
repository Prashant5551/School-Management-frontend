import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss'
})
export class ContactForm {
  contactForm: FormGroup;
  constructor(private apiService: Api, private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.getContact();
  }

  getContact() {
    this.apiService.getTeachers().subscribe({
      next: (response: any) => {
        if (response && response['status'] === 'Y') {
          // this.teachers = response.data;
        }
        // console.log(this.teachers);
      },
      error(error: any) {
        console.log(error);
      }
    })
  }

}
