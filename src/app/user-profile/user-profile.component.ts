import { Component } from '@angular/core';
import { Blog, Groupe, Picture, User } from '../models/blog.model';
import { UserService } from '../services/user.service';
import { Page } from '../models/page.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  user?: User;
  profile?: User;
  blogs?: Blog[];
  newBlog: Blog;
  defaultGroupe: Groupe = { id: 0, name: '' };
  defaultPicture: Picture[] = [];
  currentPage: number = 0;
  pageSize: number = 10;
  profileId?: String;
  constructor(private httpService: UserService, private route: ActivatedRoute) {

    this.newBlog = {
      id: 0,
      title: '',
      text: '',
      pictures: this.defaultPicture,
      groupe: this.defaultGroupe
    };
    this.profile = {
      uid: '',
      firstname: '',
      lastname: '',
      profilDescription: '',
    };

  }

  ngOnInit(): void {
    this.profileId = "" + this.route.snapshot.paramMap.get('id');
    this.getUserByuid();
    this.loadUserProfile();
    this.loadUserBlogs();
  }

  private loadUserProfile(): void {
    const userId = localStorage.getItem('uid');
    if (userId) {
      this.user = {
        uid: userId,
        firstname: localStorage.getItem('firstname') ?? '',
        lastname: localStorage.getItem('lastname') ?? '',
        profilDescription: localStorage.getItem('profilDescription') ?? ''
      };
    }
  }

  getUserByuid(): void {
    this.httpService.findUserByUid("" + this.profileId).subscribe(
      (response: User) => {
        this.profile = response;
        this.loadUserBlogs();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  private loadUserBlogs(): void {
    if (this.profile?.uid) {
      this.httpService.getUserBlogs(this.profile.uid).subscribe(
        (page: Page<Blog>) => {
          this.blogs = page.content;
        },
        (error) => {
          console.error('Error fetching user blogs:', error);
        }
      );
    }
  }

  onSubmit(): void {
    const request = {
      title: this.newBlog.title,
      text: this.newBlog.text,
      creatorId: this.route.snapshot.paramMap.get('id'),
      pictures: []
    };

    if (this.newBlog.title.length > 4 && this.newBlog.text.length > 4) {
      const url = "http://localhost:8080/blogController/create-blog";
      this.httpService.postRequest(url, request).subscribe({
        next: (response) => {
          alert("Blog created successfully.");
          this.loadUserBlogs();
          this.currentPage = 0;
          this.newBlog.title = "";
          this.newBlog.text = "";
          this.ngOnInit();
        },
        error: (error) => {
          alert(error);
        }
      });
    }
  }

  upvote(blogId: number) {
    alert(`Upvoted blog with ID: ${blogId}`);
  }

  downvote(blogId: number) {
    alert(`Downvoted blog with ID: ${blogId}`);
  }

}