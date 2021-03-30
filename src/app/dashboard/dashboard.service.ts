import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    public http: HttpClient
  ) { }

  getAdvancedSearch(q){
    return this.http.get('https://api.stackexchange.com/2.2/search/advanced?q=' + q + '&order=desc&sort=activity&site=stackoverflow&filter=!b6AubN5o8Rq9VF');
  }
}
