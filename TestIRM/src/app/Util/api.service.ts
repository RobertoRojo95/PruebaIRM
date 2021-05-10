import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders,HttpResponse } from "@angular/common/http";
import { Observable,of } from "rxjs";

const endpoint = 'https://localhost:44335/api/contacto/';
const masivo = 'https://localhost:44335/api/masivo/';


@Injectable ({
    providedIn: 'root'
})
export class ApiService {
    constructor (private http: HttpClient) {}

    getAll(): Observable<any> {
        return this.http.get(endpoint);
    }

    addContacto(contacto: any): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
          }
        return this.http.post<any>(endpoint, JSON.stringify(contacto),httpOptions)
    }

    updateContacto(id: any, contacto: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
          }
        return this.http.put(endpoint + id, JSON.stringify(contacto),httpOptions);
    }

    deleteContacto(id: any): Observable<any>{
      
        return this.http.delete(endpoint + id)

    }

    addMultipleContacto(contacto: any[]): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
          }
        return this.http.post<any>(masivo, JSON.stringify(contacto),httpOptions)
    }
}