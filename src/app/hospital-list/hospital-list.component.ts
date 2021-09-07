import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

//01

export interface Hospital{
  id: string;
  name: string;
  place: string;
}

@Component({
  selector: 'app-hospital-list',
  templateUrl: './hospital-list.component.html',
  styleUrls: ['./hospital-list.component.css']
})
export class HospitalListComponent implements OnInit {

  //02.
  hospitals: Hospital[]=[];

  //03
  constructor(public http: HttpClient) { }

  ngOnInit(): void {
  //04
    let url='http://www.beezzserver.com/venura/channeling/hospital/';
    this.http.get<Hospital[]>(url).subscribe(data=>{
      this.hospitals=data;
      });
  }

}
