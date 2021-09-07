import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


//step 01-create an interface for object type with variable

export interface Speciality{
  id: string;
  name: string;
}

@Component({
  selector: 'app-speciality-list',
  templateUrl: './speciality-list.component.html',
  styleUrls: ['./speciality-list.component.css']
})
export class SpecialityListComponent implements OnInit {


  //step 02 create an empty array
  specialities: Speciality[]=[];
  
  
  // Step 03- there are two things to do in this step
  //a) import HttpclietModule in app.module.ts 
  //b) create constructor argument for http variable (automatically injects the object)
  constructor(public http: HttpClient) { }

  ngOnInit(): void {
    //step 04- Load objects fromo WS/API
    let url="http://www.beezzserver.com/venura/channeling/speciality/";
    this.http.get<Speciality[]>(url).subscribe(data=> {
      this.specialities=data;
    });
  }

}
