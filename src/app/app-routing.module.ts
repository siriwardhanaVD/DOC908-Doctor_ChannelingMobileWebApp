import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { HospitalListComponent } from './hospital-list/hospital-list.component';
import { PastAppoinmentsComponent } from './past-appoinments/past-appoinments.component';
import { SpecialityListComponent } from './speciality-list/speciality-list.component';
import { HomeComponent } from './home/home.component';
import { SessionListComponent } from './session-list/session-list.component';
import { BookComponent } from './book/book.component';
const routes: Routes = [

  {path:'past_appoinments',component: PastAppoinmentsComponent},
  {path:'speciality_list',component: SpecialityListComponent},
  {path:'doctor_list',component: DoctorListComponent},
  {path:'hospital_list',component: HospitalListComponent},
  {path:'', component: HomeComponent},
  {path:'session-list', component: SessionListComponent},
  {path:'book', component: BookComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
