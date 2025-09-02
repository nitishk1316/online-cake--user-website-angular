import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiService {
  apiUrl: string = environment.API_URL;

  /**
   * Api Service
   * @param http
   */
  constructor(
    private http: HttpClient
  ) {
  }

  /**
   * GET request
   * @param url - url
   * @param params -- request parameters
   */
  public get(url: string, params = {}): Observable<any> {
    return this.http.get(this.apiUrl + url, { params: params });
  }

  /**
   * POST request
   * @param url - url
   * @param payload -- request body(payload)
   */
  public save(url: string, payload: Object): Observable<any> {
    return this.http.post(this.apiUrl + url, payload);
  }

  /**
   * PUT request
   * @param url - url
   * @param payload -- request body(payload)
   */
  public update(url: string, payload: Object): Observable<any> {
    return this.http.put(this.apiUrl + url, payload);
  }

  /**
   * DELETE request
   * @param url - url
   */
  public delete(url: string): Observable<any> {
    return this.http.delete(this.apiUrl + url);
  }
}
