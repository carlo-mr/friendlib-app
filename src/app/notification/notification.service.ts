import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private BASE_URL = 'https://39bar3qgc1.execute-api.eu-central-1.amazonaws.com/latest';

  constructor(private httpClient: HttpClient) {
  }

  loadNotifications() {
    return this.httpClient.get(`${this.BASE_URL}/notifications`);
  }
}
