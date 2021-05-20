import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/domain/Customer';
import { DocumentType } from 'src/app/domain/document-type';
import { CustomerService } from 'src/app/service/customer.service';
import { DocumentTypeService } from 'src/app/service/document-type.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  custId: number;
  customer: Customer;

  documentTypes: DocumentType[];

  showMsg: boolean=false;
  messages: string[]=[""];

  constructor(public activatedRoute:ActivatedRoute, public customerService:CustomerService, public documentTypeService: DocumentTypeService) { }

  ngOnInit(): void {

    let params = this.activatedRoute.params['_value'];
    this.custId = params.custId;
    console.log(this.custId);
    this.customerService.findById(this.custId).subscribe(data=>{
      this.customer=data;
      console.table(this.customer);
    });

    this.findAllDocumentType();
  }


  findAllDocumentType():void{
    this.documentTypeService.findAll().subscribe(data =>{
      this.documentTypes=data;
    })
  }

  update():void{
    this.customerService.update(this.customer).subscribe(ok=>{
      this.showMsg=true;
      this.messages[0] = "Se modificó exitosamente!";
    }, error=>{
      this.showMsg=true;
      this.messages=error.error.error;
    });
  }

  delete():void{
    this.customerService.delete(this.customer.custId).subscribe(ok=>{
      this.showMsg=true;
      this.messages[0] = "Se eliminó exitosamente!";
    }, error=>{
      this.showMsg=true;
      this.messages=error.error.error;
    });
  }

}
