import { Component } from '@angular/core';

import { Http } from "@angular/http";
import { Observable, Observer, ReplaySubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  attrib: string;

  isLoading: boolean = false;
  duplicates: any[];
  dupscount: number;

  constructor(private http: Http) { }

  getDuplicates(evt) {
    if (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    }
    this.isLoading = true;
    this.http.get(`/${this.attrib}/duplicates`)
      .map(result => result.json())
      .catch(error => {console.error(error); return error; })
      .subscribe((result: any) => {
        if (result.dupscount) { this.dupscount = result.dupscount; }
        if (result.duplicates) { this.duplicates = result.duplicates; }
        this.isLoading = false;
      });
  }
}
