import { Component } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { LocalstorageService } from './services/localstorage.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'IceCreamMir4';
  subscription: Subscription;
  isLogin: boolean = false;
  constructor(
    private _localstorage: LocalstorageService,
    private _user: UsersService
  ) {

    this.sendMessage()
    this.subscription = this._localstorage.getMessage().subscribe(message => {
      if (Object.keys(JSON.parse(localStorage.getItem('usuario') || '{}')).length === 0) {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
    });
    this.sendMessage()

  }

  sendMessage(): void {
    // send message to subscribers via observable subject
    this._localstorage.sendMessage('Message from Home Component to App Component!');
  }

  test() {
    const message$ = fromEvent<StorageEvent>(window, "storage").pipe(

      // filter(event => event.storageArea === sessionStorage),
      // filter(event => event.key === "message"),
      // map(event => event.newValue)
    );
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
