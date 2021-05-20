import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../domain/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

url: string= `${environment.apiUrl}/api/v1/customers`

  constructor(public httpCliente: HttpClient) { }

  findAll(): Observable<Customer[]>{
    return this.httpCliente.get<Customer[]>(this.url);
  }

  findById(id:number): Observable<Customer>{
    return this.httpCliente.get<Customer>(`${this.url}/${id}`);
  }

  save(customer: Customer): Observable<Customer>{
    return this.httpCliente.post<Customer>(this.url,customer);
  }

  update(customer: Customer): Observable<Customer>{
    return this.httpCliente.put<Customer>(this.url,customer);
  }

  delete(id:number): Observable<any>{
    return this.httpCliente.delete<any>(`${this.url}/${id}`);
  }

}
