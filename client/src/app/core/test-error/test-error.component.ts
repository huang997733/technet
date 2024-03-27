import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-error.component.html',
  styleUrl: './test-error.component.scss'
})
export class TestErrorComponent {
  baseUrl = environment.apiUrl;
  validationErrors: string[] = [];

  constructor(private http: HttpClient) { }

  get404Error() {
    this.http.get(this.baseUrl + 'products/42').subscribe({
      next: response => {
        console.log(response);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  get500Error() {
    this.http.get(this.baseUrl + 'buggy/servererror').subscribe({
      next: response => {
        console.log(response);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  get400Error() {
    this.http.get(this.baseUrl + 'buggy/badrequest').subscribe({
      next: response => {
        console.log(response);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  get400ValidationError() {
    this.http.get(this.baseUrl + 'products/fortytwo').subscribe({
      next: response => {
        console.log(response);
      },
      error: err => {
        console.log(err);
        this.validationErrors = err.errors;
      }
    });
  }
}
