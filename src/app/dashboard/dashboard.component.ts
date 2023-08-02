import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { PostEntry } from '../post.model';

let CUSTOM_DATA = {
  appId: '',
  tenantId: 1,
  authToken: ''
};

var send = window.XMLHttpRequest.prototype.send;

function sendReplacement(this: any, data: any) {
  debugger
  if (this.onreadystatechange) {
    this._onreadystatechange = this.onreadystatechange;
  }
  const url = this.__zone_symbol__xhrURL;

  if (url.indexOf('/products/add') > 0) {
    if (data) {
      const jsonData = JSON.parse(data);
      const newData = {
        ...jsonData,
        'CUSTOM_TENANT_ID': CUSTOM_DATA.tenantId
      };
      this.setRequestHeader('Authorization', CUSTOM_DATA.authToken)
      this.setRequestHeader('AppId', CUSTOM_DATA.appId)
      arguments[0] = JSON.stringify(newData);
    }
  }
  return send.apply(this, arguments as any);
}
window.XMLHttpRequest.prototype.send = sendReplacement;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  userService = inject(UserService);

  post!: PostEntry;

  productUrl = `https://dummyjson.com/products/add`;

  async ngOnInit() {
    this.getSecondPost();
  }

  async getSecondPost() {

    CUSTOM_DATA = {
      tenantId: 1,
      appId: 'DUMMY_APP_ID',
      authToken: 'DUMMY_AUTH_TOKEN'
    };

    const req = new XMLHttpRequest();
    req.addEventListener("load", (response: any) => {
      console.debug('🔥 response', response.responseText);
    });
    const updatedPost = {
      "id": 100,
      "title": "iPhone 100",
      "description": "An apple mobile which is nothing like apple",
      "price": 549,
      "discountPercentage": 12.96,
      "rating": 4.69,
      "stock": 94,
      "brand": "Apple",
      "category": "smartphones",
      "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      "images": [
        "https://i.dummyjson.com/data/products/1/1.jpg",
        "https://i.dummyjson.com/data/products/1/2.jpg",
        "https://i.dummyjson.com/data/products/1/3.jpg",
        "https://i.dummyjson.com/data/products/1/4.jpg",
        "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
      ]
    }
    req.open("POST", this.productUrl);
    req.send(JSON.stringify(updatedPost));
  }
}
