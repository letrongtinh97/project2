import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from './share/data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  posts = [];
  data = 'tinhle';
  id1: any;
  constructor(public service: DataService) { }
  getPost2() {
    this.service.getData(this.id1).subscribe((rs) => {
        console.log(rs);
    });
  }



}
