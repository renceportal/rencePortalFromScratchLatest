import { Component, OnInit } from '@angular/core'; 

@Component({ 
  selector: 'app-sidebar', 
  templateUrl: './sidebar.component.html', 
  styleUrls: ['./sidebar.component.scss'] 
}) 

export class SidebarComponent implements OnInit { 
  // Role = Role; 
  // env = env; 
  menu = { 
    maintenance: 'maintenance' 
  }; 

  activeMenu: string | undefined; 

  constructor() { } 

  ngOnInit(): void { 
  } 

  toggleMenu(menu?: string): void { 
    if (menu !== undefined) { 
      this.activeMenu = menu; 
    } 
  } 

} 