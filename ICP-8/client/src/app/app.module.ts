import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { ToasterModule } from 'angular2-toaster';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user/user.component';
import { UsergroupComponent } from './components/user/usergroup/usergroup.component';
import { MachineComponent } from './components/machine/machine/machine.component';
import { SidemenuComponent } from './components/common/sidemenu/sidemenu.component';
import { MachinegroupComponent } from './components/machine/machinegroup/machinegroup.component';
import { AreaComponent } from './components/machine/area/area.component';
import { LineComponent } from './components/machine/line/line.component';
import { ReasonsComponent } from './components/machine/reasons/reasons.component';
import { LabelComponent } from './components/common/label/label.component';
import { TablelistComponent } from './components/common/tablelist/tablelist.component';

import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/common/auth.service';
import { UserService } from './services/user/user.service';

const appRoutes : Routes = [
  {path : '', component: LoginComponent, canActivate:[AuthGuard] },
  {path : 'home', component: HomeComponent, canActivate:[AuthGuard] },
  {path : 'user', component: UserComponent, canActivate:[AuthGuard] },
  {path : 'usergroup', component: UsergroupComponent, canActivate:[AuthGuard] },
  {path : 'machine', component: MachineComponent, canActivate:[AuthGuard] },
  {path : 'machinegroup', component: MachinegroupComponent, canActivate:[AuthGuard] },
  {path : 'area', component: AreaComponent, canActivate:[AuthGuard] },
  {path : 'line', component: LineComponent, canActivate:[AuthGuard] },
  {path : 'reasons', component: ReasonsComponent, canActivate:[AuthGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    UsergroupComponent,
    MachineComponent,
    SidemenuComponent,
    MachinegroupComponent,
    AreaComponent,
    LineComponent,
    ReasonsComponent,
    LabelComponent,
    TablelistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgxQRCodeModule,
    BrowserAnimationsModule,
    ToasterModule.forRoot(),
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
