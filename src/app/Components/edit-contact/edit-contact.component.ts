import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IContact } from 'src/app/Models/IContact';
import { IGroup } from 'src/app/Models/IGroup';
import { ContactService } from 'src/app/Services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent {
  public contact: IContact = {} as IContact;
  public loading: boolean = false;
  public contactId: string | null = null;
  public errorMessage: string | null = null;
  public group: IGroup = {} as IGroup;
  public groups: IGroup[] = [] as IGroup[];
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private contactService: ContactService) {

  }
  public ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.paramMap.subscribe((param) => {
      this.contactId = param.get('contactId');
    })

    if (this.contactId) {
      this.contactService.getContact(this.contactId).subscribe((data) => {
        this.contact = data;
        this.loading = false;
        this.contactService.getAllGroups().subscribe((data) => {
          this.groups = data;
        }, (error) => {
          this.errorMessage = error;
        })
      }, (error) => {
        this.errorMessage = error;
        this.loading = false;

      })
    }
  }

  public submitUpdate() {
    if (this.contactId) {
      this.loading = true;
      this.contactService.updateContact(this.contact, this.contactId).subscribe((data) => {
        this.router.navigate(['/']).then();
        this.loading = false;
      }, (error) => {
        this.errorMessage = error;
        this.loading = false;
        this.router.navigate([`/contact/edit/${this.contactId}`]).then();
      })
    }
  }
}
