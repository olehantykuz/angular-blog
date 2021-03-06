import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../../shared/posts.service';
import {Post} from '../../shared/interfaces';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';
import {LocalesService} from '../../shared/locales.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  getSubscription: Subscription;
  deleteSubscription: Subscription;
  searchStr = '';

  constructor(
    private postsService: PostsService,
    private alertService: AlertService,
    public localeService: LocalesService
  ) { }

  ngOnInit() {
    this.getSubscription = this.postsService.getAll().subscribe(posts => {
      this.posts = posts;
    });
  }

  remove(id: string) {
    this.deleteSubscription = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => {
        return post.id !== id;
      });
      this.alertService.danger('Post was deleted successfully');
    });
  }

  ngOnDestroy(): void {
    if (this.getSubscription) {
      this.getSubscription.unsubscribe();
    }

    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }

}
