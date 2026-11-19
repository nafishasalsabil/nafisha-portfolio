import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import emailjs from 'emailjs-com';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contact-me',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.scss'
})
export class ContactMeComponent implements OnInit {
  contactForm!: FormGroup;
  submitting = false;
  /** Errors are shown only after the user attempts to submit. */
  submitted = false;
  @ViewChild('mailtoLink') mailtoLink!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    return !!(this.submitted && control && control.invalid);
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.contactForm.invalid) {
      return;
    }

    if (this.submitting) {
      return;
    }

    const { name, email, subject, message } = this.contactForm.value;
    const templateParams = {
      from_name: name,
      from_email: email,
      subject,
      message
    };

    this.submitting = true;

    emailjs
      .send('service_e77u1h2', 'template_6wk8t6l', templateParams, 'ii_39QnRT20x5c0px')
      .then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Message sent successfully'
        });
        this.contactForm.reset();
        this.submitted = false;
      })
      .catch(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to send message'
        });
      })
      .finally(() => {
        this.submitting = false;
      });
  }
}
