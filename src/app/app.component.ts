import { Component, HostBinding, HostListener, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService, NavBarService } from '@rence/core/services';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { filter, map, mergeMap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  // tslint:disable-next-line
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit, OnDestroy {

  compactMenu = false;
  isEnlarged = false;
  isForced = false;
  noGutters = false;

  @HostBinding('class') classes = 'widescreen fixed-left';

  // @HostListener('window:resize', [ '$event' ])

  constructor(
    private authService: AuthService,
    private ngZone: NgZone,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private navBarService: NavBarService,
    private titleService: Title) {

    window.onresize = (e) => {
      if (e.isTrusted) {
        this.getWindowSize();
        ngZone.run(() => {
          this.isForced = false;
          this.isEnlarged = this.compactMenu;
        });
      }
    };

    this.activatedRoute.url
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.getWindowSize();
        ngZone.run(() => {
          this.isEnlarged = this.compactMenu;
        });
      });

    // Toggle menu
    navBarService.sideBarCollapsed
      .pipe(untilDestroyed(this)).subscribe(
        (collapse: boolean) => {
        const screen = window.innerWidth <= 1024 ? 'smallscreen' : 'widescreen';
        const sidebar = collapse ? 'fixed-left' : 'fixed-left';
        this.classes = `${screen} ${sidebar}`;
        this.isForced = true;
        this.isEnlarged = collapse;
      });
  }

  private getWindowSize(): void {
    if (window.innerWidth <= 991) {
      this.compactMenu = true;
      this.navBarService.collapseSideBar(true);
    } else {
      this.compactMenu = false;
      this.navBarService.collapseSideBar(false);
    }
  }

  ngOnInit(): void {
    this.authService.autoLogin();
  }

  ngOnDestroy(): void {
  }
}
