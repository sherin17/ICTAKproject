import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlumniApiService {

  constructor(private http:HttpClient) { }

  getJob(data:any){
    return this.http.get('http://localhost:3000/getjob')
  }
}
