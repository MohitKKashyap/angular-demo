import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IContact } from 'src/app/Models/IContact';
import { IGroup } from 'src/app/Models/IGroup';
import { ContactService } from 'src/app/Services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  public loading: boolean = false;
  public contact: IContact = {} as IContact;
  public errorMessage: string | null = null;
  public groups: IGroup[] = [] as IGroup[];

  constructor(private contactService: ContactService, private router: Router) {

  }
  public ngOnInit(): void {
    this.contactService.getAllGroups().subscribe((data) => {
      this.groups = data;
    }, (error) => {
      this.errorMessage = error;
    })
  }
  public createSubmit() {
    this.loading = true;
    this.contactService.createContact(this.contact).subscribe((data) => {
      this.router.navigate(['/']).then();
      this.loading = false;
    }, (error) => {
      this.errorMessage = error;
      this.loading = false;
      this.router.navigate(['/contact/add']).then();
    })
  }
}
