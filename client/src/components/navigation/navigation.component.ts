import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router) { } 

  ngOnInit(): void {
  }
  irAVentas() {
    this.router.navigate(['/home/ventas']);
  }
}
