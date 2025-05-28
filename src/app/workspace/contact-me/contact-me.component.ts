import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Button} from 'primeng/button';
import emailjs from 'emailjs-com';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-contact-me',
  imports: [
    Button,
    ReactiveFormsModule
  ],
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.scss'
})
export class ContactMeComponent implements OnInit{
  contactForm!: FormGroup;
  @ViewChild('mailtoLink') mailtoLink!: ElementRef;

  constructor(private fb: FormBuilder, private messageService: MessageService) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const { name, email, subject, message } = this.contactForm.value;
      const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message
      };

      emailjs.send('service_gpgz12i', 'template_6wk8t6l', templateParams, 'ii_39QnRT20x5c0px')
        .then(() => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message sent successfully' });
          this.contactForm.reset();
        }, () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to send message' });
        });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
