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
     ownerImage: '/assets/images/Pic1.jpeg',
     branchImage: '/assets/images/grocery-banner.jpg',
     description: 'Owner at Dharamkot Bagga Branch of RS SuperMart, committed to quality and customer satisfaction.'
   }
 ];

  constructor() { }

  ngOnInit() {
  }

}
