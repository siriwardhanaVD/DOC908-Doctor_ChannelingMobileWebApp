import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


//1
export interface Session
{
  id: string;
  doctor_id:string;
  hospital_id:string;
  date_time:string;
  count: string;
  hospital_name:string;
  doctor_name:string;
  speciality_name:string;
  hospital_place:string;
  next:string;
}
@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit {

  //retreive data from the other slides
  sid: number;
  hid: number;
  did: number;


  //2. Array
  sessions: Session[]=[];

  //3.http construction injection
  
  //saving the data to the above declared variables(router-go to the BOOK NOW)
  //GET THE route of the data by activated router
  constructor(public http: HttpClient, public router: Router, public route:ActivatedRoute) { }

  ngOnInit(): void {

    //getting the parameters from the homepage to session page
    this.route.queryParams.subscribe(params=>
      {
        this.sid=params['sid'] || 0;
        this.did=params['did'] || 0;
        this.hid=params['hid'] || 0;
      });

        //load data
        var url="http://www.beezzserver.com/venura/channeling/session/index.php?sid="+
        this.sid+"&hid="+this.hid+"&did="+this.did;
        this.http.get<Session[]>(url).subscribe(data=>
          {
            this.sessions=data;
          });

     }


     book(id)
     {
       this.router.navigate(['/book'],
       {
         queryParams: { session_id:id } 
       });
   
       
     }
   
}
