import { Component, AfterViewInit , ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from 'rxjs/operators';

import { Profile } from '../_models/profile';
import { BackendService } from '../_services/backend/backend.service';
import { DarkThemeService } from '../_services/dark-theme/dark-theme.service';
import { CacheService } from '../_services/cache/cache.service';

declare const _: any;

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements AfterViewInit  {
    @ViewChild('searchInput', { static: false }) searchInput: ElementRef;
    profiles: Profile[] = [];
    hashtags: [] = [];
    loading = false;
    isDark: boolean;

    constructor(
        private backend: BackendService,
        private cd: ChangeDetectorRef,
        private dark: DarkThemeService,
        private cache: CacheService
    ) {}

    ngAfterViewInit() {
        // Set search focus with change detection
        this.cd.detectChanges();
        this.searchInput.nativeElement.focus();
        this.cd.detectChanges();
        // On user input do pipe
        fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
            // Get input
            map((event: any) => {
                return event.target.value;
            }),
            // Filter input, at least 2 characters
            filter((res) => {
                return res.length > 1;
            }),
            // Wait 1 second after user finished
            debounceTime(800),
            // Don't requery unless input changes
            distinctUntilChanged()
        // After pass through pipe do search
        ).subscribe((search: string) => {
            // Set query as loading
            this.loading = true;

            // Get profile results
            this.backend.search(search).subscribe(
                (result: any) => {
                    this.cache.store(`search-${search}`, result);
                    // Reference results
                    this.profiles = result.users;
                    // Order hashtags as shortest (closest match) first
                    this.hashtags = _.orderBy(
                        result.hashtags,
                        (hashtag: string) => {
                            return hashtag.length;
                        }, ['asc']
                    );
                    console.log(result);
                }, (error: any) => {
                    console.warn(error);
                }, () => {
                    // Set loading complete
                    this.loading = false;
                }
            );
        });

        this.dark.isDarkMode()
        .subscribe((mode: boolean) => {
            this.isDark = mode;
        });
    }
}
