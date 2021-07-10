import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {
  // Observable boolean sources 
  private sideBarCollapsedSource = new Subject<boolean>(); 

  // Observable boolean streams 
  sideBarCollapsed = this.sideBarCollapsedSource.asObservable(); 

  // Toggle side bar command 
  collapseSideBar(toggle: boolean): void { 
    this.sideBarCollapsedSource.next(toggle); 
  } 
}
