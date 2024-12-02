import { Component } from '@angular/core';
import { Router, NavigationEnd, UrlTree } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  show = true; // Controla la visibilidad del navbar y header
  private availableRoutes: string[] = [];

  constructor(private router: Router) {
    // Extrae todas las rutas disponibles desde el AppRoutingModule
    this.availableRoutes = this.extractRoutes(router.config);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const urlTree: UrlTree = this.router.parseUrl(event.urlAfterRedirects || event.url);
        const currentPath = urlTree.root.children['primary']?.segments.map(segment => segment.path).join('/') || '';

        // Verifica si el path actual coincide con una ruta definida
        this.show = this.availableRoutes.includes(currentPath) &&  !(event.url === '/login' || event.url === '/register' || event.url === '/welcome-start');
      }
    });
  }

  private extractRoutes(routes: any[], prefix = ''): string[] {
    const paths: string[] = [];
    routes.forEach(route => {
      const routePath = prefix + (route.path || '');
      if (routePath) {
        paths.push(routePath);
      }
      if (route.children) {
        paths.push(...this.extractRoutes(route.children, routePath + '/'));
      }
    });
    return paths;
  }
}
