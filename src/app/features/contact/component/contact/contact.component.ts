import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { ContactRequest } from '../../models/ContactRequest';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  //Dependency Injection (Constrcutor DI).
  constructor(private fb: FormBuilder, private contactService: ContactService) {
    //validating the inputs fields.
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  //Method to be called while clicked on "Send Email".
   onSubmit() {
    console.log("Submit button clicked!");
   if (this.contactForm.valid) {
      //typecasting of form data into ContactRequest.
       const contactRequest: ContactRequest = this.contactForm.value;
 
       //calling the service's method to send email.
       this.contactService.sendEmail(contactRequest).subscribe({
        next: (response) => {
            console.log("Email sent successfully", response);
            this.contactForm.reset();
         },
         error: (error) => {
           console.error("Failed to send email")
         }
       });
    }
     alert('Message sent successfully!');
  }

  ngOnInit() {
  }

}
