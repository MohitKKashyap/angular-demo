import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/Models/IContact';
import { ContactService } from 'src/app/Services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {
  public loading: boolean = false;
  public contacts: IContact[] = [];
  public errorMessage: string | null = null;
  public searchText: string = "";
  constructor(private contactService: ContactService) {

  }
  ngOnInit(): void {
    this.getAllContacts();
  }
  public getAllContacts() {
    this.loading = true;
    this.contactService.getAllContacts().subscribe((data) => {
      this.contacts = data;
      this.loading = false;
    }, (error) => {
      this.errorMessage = error;
      this.loading = false;
    });
  }
  public clickDeleteContact(contactId: string | undefined) {
    if (contactId) {
      this.contactService.deleteContact(contactId).subscribe((data: {}) => {
        this.getAllContacts();
      }, (error) => {
        this.errorMessage = error;
      })
    }
  }
}
