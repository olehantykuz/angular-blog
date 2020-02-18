import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../../shared/posts.service';
import {Post} from '../../shared/interfaces';
import {Subscription} from 'rxjs';

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
    private postsService: PostsService
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
