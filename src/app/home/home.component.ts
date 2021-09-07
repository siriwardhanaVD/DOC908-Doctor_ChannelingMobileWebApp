import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith} from 'rxjs/operators';



//1
export interface Speciality{
  id: string;
  name: string;
}
export interface Hospital
{
  id: string;
  name: string;
  place: string;
}
export interface Doctor
{
  id: string;
  name: string;
  place: string;
  speciality_name:string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //02
  specialities:Speciality[]=[];
  hospitals:Hospital[]=[];
  doctors: Doctor[]=[];

  //a-filter- create FormControl object for editable input | after that import the reactive form module to app.module.ts
  specialityControl=new FormControl();//get the whole list from this
  hospitalControl=new FormControl();
  doctorControl=new FormControl();

  //b-filter- create array variable for filtered  data
  filteredSpecialities: Observable<Speciality[]>;
  filteredHospitals: Observable<Hospital[]>;
  filteredDoctors: Observable<Doctor[]>;
  

  //03
  constructor(public http:HttpClient, public router:Router) { }

  ngOnInit(): void {

    //04
    /************Speciality*************/
    let urlSp='http://www.beezzserver.com/venura/channeling/speciality/';
    this.http.get<Speciality[]>(urlSp).subscribe(data=>
      {
        this.specialities=data;
      });

     /*************Hospital**************/
     let urlHo='http://www.beezzserver.com/venura/channeling/hospital/';
     this.http.get<Hospital[]>(urlHo).subscribe(data=>
       {
         this.hospitals=data;
       });

        /*************Doctor**************/
     let urlDoc='http://www.beezzserver.com/venura/channeling/doctor/';
     this.http.get<Doctor[]>(urlDoc).subscribe(data=>
       {
         this.doctors=data;
       });





       /***************speciality************/
      //c-filter
      this.filteredSpecialities=this.specialityControl.valueChanges.pipe(
          startWith<string | Speciality>(''),
          map(value=> typeof value ==='string'? value: value.name),
          map(name=>name? this._filter1(name):this.specialities.slice())
                );

      /****************Hospital******************/
      this.filteredHospitals=this.hospitalControl.valueChanges.pipe(
        startWith<string | Hospital>(''),
        map(value=> typeof value ==='string'? value: value.name),
        map(name=>name? this._filter2(name):this.hospitals.slice())
              );

       /****************Doctor******************/
       this.filteredDoctors=this.doctorControl.valueChanges.pipe(
        startWith<string | Doctor>(''),
        map(value=> typeof value ==='string'? value: value.name),
        map(name=>name? this._filter3(name):this.doctors.slice())
              );


  

       }
       /********************speciality******************/
       private _filter1(name: string): Speciality[]
       {
         const filterValue=name.toLocaleLowerCase();
         return this.specialities.filter(option=>option.name.toLocaleLowerCase().indexOf(filterValue)===0);
       }

       
        /******************Hospital******************/
        private _filter2(name: string): Hospital[]
        {
          const filterValue=name.toLocaleLowerCase();
          return this.hospitals.filter(option=>option.name.toLocaleLowerCase().indexOf(filterValue)===0);
        }

        /******************Doctor******************/
        private _filter3(name: string): Doctor[]
        {
          const filterValue=name.toLocaleLowerCase();
          return this.doctors.filter(option=>option.name.toLocaleLowerCase().indexOf(filterValue)===0);
        }



         /********************speciality******************/
       //displaying the objects in the list when selecting(Display name override)
       displayFn1(speciality?:Speciality): string | undefined{
         return speciality?speciality.name:undefined}
       

 
        /******************Hospital******************/
        //displaying the objects in the list when selecting(Display name override)
        displayFn2(hospital?:Hospital): string | undefined{
          return hospital?hospital.name:undefined}


            /******************Doctor******************/
        //displaying the objects in the list when selecting(Display name override)
        displayFn3(doctor?:Doctor): string | undefined{
          return doctor?doctor.name:undefined}
        


          reset()
          {
            /****************speciality****************/
            this.specialityControl.reset();
            /****************Hospital****************/
            this.hospitalControl.reset();
            /****************Doctor****************/
            this.doctorControl.reset();

          }

          search()
          {
            /****************speciality****************/
            var sid=(this.specialityControl.value)?this.specialityControl.value.id:0;
            /****************Hospital****************/
            var hid=(this.hospitalControl.value)?this.hospitalControl.value.id:0;
            /****************Doctor****************/
            var did=(this.doctorControl.value)?this.doctorControl.value.id:0;

            //dynamically navigate from 1st screen to the 2nd screen
            this.router.navigate(['/session-list'],
            { queryParams:{sid: sid,did: did,hid:hid}});
          }
        
}
