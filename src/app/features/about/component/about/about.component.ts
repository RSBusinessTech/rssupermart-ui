import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  owners = [
   {
     name: 'Vijay Kumar',
     branch: 'RS SuperMart - Dharamkot Bagga',
     ownerImage: '/assets/images/Owner1.jpeg',
     branchImage: '/assets/images/grocery-banner.jpg',
     description: 'Owner at RS SuperMart (Dharamkot Bagga), committed to quality and customer satisfaction.',
     embedMap: 'https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d12428.934516078805!2d101.74099514999999!3d3.1214416999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x391be97c1434a877%3A0x7642acb9f21e32dc!2sGovt.%20High.%20School%20Dharamkot%20Bagga%2C%20Dharamkot%20Bagga%2C%20Punjab%20143511%2C%20India!3m2!1d31.8707565!2d75.184292!5e1!3m2!1sen!2smy!4v1776605379265!5m2!1sen!2smy'
   }
 ];

  constructor() { }

  ngOnInit() {
  }

}
