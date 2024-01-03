import { Component } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { Blog, Comment, Groupe, Picture, User } from '../models/blog.model';
import { CommentService } from '../services/comment.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent {
  blogId?: string;
  blog?: Blog;
  defaultGroupe: Groupe = { id: 0, name: '' };
  defaultBlog: Blog = {id:0, title: 'string', text: 'string', pictures: [] = [], groupe: this.defaultGroupe};
  defaultPicture: Picture[] = [];
  comments: Comment[] = [];
  newComment?: Comment;
  profile?: User;
  profileId?: String;
  constructor(private httpService: BlogService, private route: ActivatedRoute, private commentService: CommentService, private userService: UserService) {
    this.profile = {
      uid: '',
      firstname: '',
      lastname: '',
      profilDescription: '',
    };
    this.newComment = {
      id: 0,
      text: '',      
      commenter:  this.profile,
      blog: this.defaultBlog
    };
    
  }

  ngOnInit():void{
    this.newComment = {
      id: 0,
      text: '',      
      commenter:  this.profile,
      blog: this.defaultBlog
    };
    this.profileId = ''+localStorage.getItem("uid");
    this.blogId = "" + this.route.snapshot.paramMap.get('id');
    this.getBlogById();
    this.getAllComments();
    this.getUserByuid();
    this.getCommentByBlog();
  }

  getBlogById(): void {
    const url = "http://localhost:8080/blogController/";
    this.httpService.findBlogById(url+this.blogId).subscribe(
      (response: Blog) => {
        this.blog = response;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getUserByuid(): void {
    this.userService.findUserByUid(""+this.profileId).subscribe(
      (response: User) => {
        this.profile = response;
      },
      (error) => {
        console.log(error);
      }
    )
  }
  getAllComments(): void {
    this.commentService.getAllComments().subscribe(
      (response: Comment[]) => {
        // this.comments = response;
        console.log("this.comments");
        console.log(this.comments);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getCommentByBlog(): void {
    this.commentService.getCommentsByBlog(""+this.route.snapshot.paramMap.get('id')).subscribe(
      (response: Comment[]) => {
        this.comments = response;
        console.log("this.comments");
        console.log(this.comments);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  onSubmit(): void {
    
    const request = {
        id: 4,
        text: this.newComment?.text ?? '',
        commenterId: this.profile?.uid,
        blogId: this.blogId
    };
    
    if (this.newComment && this.newComment.text.length > 0) {
      const url = "http://localhost:8080/commentController/create-comment";
      this.commentService.postRequest(url, request).subscribe({
        next: (response) => {
          alert("Comment created successfully.");
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
