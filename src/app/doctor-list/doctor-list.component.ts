import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

//01
export interface Doctor{
  id: string;
  name:string;
  speciality_name: string;

}
@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {

  //02
  doctors: Doctor[]=[];
 // 03
  constructor(public http: HttpClient) { }

  ngOnInit(): void {
    let url='http://www.beezzserver.com/venura/channeling/doctor/';
    this.http.get<Doctor[]>(url).subscribe(data=>{
      this.doctors=data;
    });
  }

}
