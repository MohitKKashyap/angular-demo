import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IContact } from 'src/app/Models/IContact';
import { IGroup } from 'src/app/Models/IGroup';
import { ContactService } from 'src/app/Services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {
  public contact: IContact = {} as IContact;
  public loading: boolean = false;
  public contactId: string | null = null;
  public errorMessage: string | null = null;
  public group: IGroup = {} as IGroup;

  constructor(private activatedRoute: ActivatedRoute, private contectSerivice: ContactService) {

  }
  public ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.contactId = param.get('contactId');
    })

    if (this.contactId) {
      this.loading = true;
      this.contectSerivice.getContact(this.contactId).subscribe((data) => {
        this.contact = data;
        this.loading = false;
        this.contectSerivice.getGroup(data).subscribe((data) => {
          this.group = data;
        })
      }, (error) => {
        this.errorMessage = error;
        this.loading = false;

      })
    }
  }

  public isNotEmpty() {
    return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0;
  }
}