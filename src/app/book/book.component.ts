import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

export interface Result
{
  status:string;
  msg:string;
}

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  nameControl=new FormControl();
  emailControl=new FormControl();
  nicControl=new FormControl();
  mobileControl=new FormControl();
  

  //get the session id  from the other side
  session_id:number;

  //declare for showing results-extra and the last step after designing and posting data to the dB
  result: Result;

  //going to database, going to another interface
  constructor(public http: HttpClient,  public router: Router, public route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(
      params=>{
        this.session_id=+params[this.session_id] || 0;
      }
    );

  }


 reset(){
  this.nameControl.reset();
  this.emailControl.reset();
  this.nicControl.reset();
  this.mobileControl.reset();
  
 }

 confirm(){

  //01.collect parameters-save data to dB
  let body=new HttpParams({//sending data as an object
    fromObject:{
      'name':this.nameControl.value,
      'email':this.emailControl.value,
      'nic':this.nicControl.value,
      'mobile':this.mobileControl.value,      
      'session_id':this.session_id.toString()
    }
  });


  //02. SEND to URL
  var url="http://beezzserver.com/venura/channeling/appoinment/insert.php";
  this.http.post<Result>(url, body).subscribe(
    data=>{
      this.result=data;
      alert(this.result.msg);
    }
  );
 }






}
