import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NavbarService {
    private isCollapsedSubject = new BehaviorSubject<boolean>(true);
    isCollapsed$ = this.isCollapsedSubject.asObservable();

    setCollapsedState(isCollapsed: boolean): void {
        this.isCollapsedSubject.next(isCollapsed);
    }
}
