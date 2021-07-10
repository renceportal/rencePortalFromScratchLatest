import { Component, OnInit } from '@angular/core'; 
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'; 
import { AuthService, NavBarService } from '@rence/core/services';

@UntilDestroy() 
@Component({ 
  selector: 'app-header', 
  templateUrl: './header.component.html', 
  styleUrls: ['./header.component.scss'] 

}) 

export class HeaderComponent implements OnInit { 

  

  collapse = false; 

  public username = ''; 

  

  constructor(private authService: AuthService, 
              private ns: NavBarService) { 

// this.collapse = window.innerWidth <= 991; 

  // this.ns.sideBarCollapsed 
    //   .pipe(untilDestroyed(this)) 
    //   .subscribe(collapse => { 
    //     (this.collapse = collapse); 
    //   }); 
  } 

  ngOnInit(): void { 
      this.authService.isLoggedIn$.subscribe((results) => { 
        this.username = results?.email; 
    })
  }

  logout(): void { 
    this.authService.logout(); 
  } 

  toggle(): void { 
    this.collapse = !this.collapse; 
    this.ns.collapseSideBar(this.collapse); 
    setTimeout(() => { 
      window.dispatchEvent(new Event('resize')); 
    }, 50); 
  } 

  ngOnDestroy(): void { 
  } 

} 