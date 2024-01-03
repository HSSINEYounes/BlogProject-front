import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BlogService } from '../services/blog.service';
import { Blog, BlogVotes, Groupe, Picture, Reaction, User } from '../models/blog.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from '../services/comment.service';
import { ReactionService } from '../services/reaction.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {
  blogs: Blog[] = [];
  suggestedUsers: User[] = [];
  comments: Comment[] = [];
  upVotes: number = 0;
  currentUser?: User;
  downVotes: number = 0;
  reactions: Reaction[] = [];
  UserReaction?: Reaction;
  UserReactions?: Reaction[];
  BlogReaction?: Reaction[];
  blogsAndVotes: { [blogId: number]: { upvotes: number, downvotes: number } } = {};
  newBlog: Blog;
  selectedBlog?: Blog;
  currentPage: number = 0;
  pageSize: number = 10;
  up: number = 0;
  down: number = 0;

  defaultGroupe: Groupe = { id: 0, name: '' };
  defaultPicture: Picture[] = [];

  constructor(private blogService: BlogService, private router: Router, private commentService: CommentService, private route: ActivatedRoute, private reactionService: ReactionService, private userService: UserService) {
    this.newBlog = {
      id: 0,
      title: '',
      text: '',
      pictures: this.defaultPicture,
      groupe: this.defaultGroupe
    };
  }
  ngOnInit(): void {
    this.getUserById();
    this.getBlogPosts();
    this.getAllUsers();
    this.getAllreactions();
    this.assignVotes();

    this.upVotes = 0;
    this.downVotes = 0;
  }

  getUserById(): void {
    this.userService.findUserByUid(localStorage.getItem("uid") ?? '').subscribe(
      (response: User) => {
        this.currentUser = response;
        // console.log("this.currentUser");
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getBlogPosts(): void {
    const url = "http://localhost:8080/blogController/get-blogs/0/100";
    this.blogService.findBlogs(url).subscribe(
      (response) => {
        this.blogs = response.content;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAllUsers(): void {
    this.blogService.findAllUsers("http://localhost:8080/userController/findAll/0/100").subscribe(
      (response: User[]) => {
        this.suggestedUsers = response;
        // console.log(this.suggestedUsers);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  createBlog(blogData: { title: string; text: string; }): void {
    this.blogService.createBlog(blogData).subscribe(
      () => {
        this.getBlogPosts();
      },
      (error: HttpErrorResponse) => {
        console.error('Error creating blog:', error.message);
      }
    );
  }

  onSubmit(): void {
    const request = {
      title: this.newBlog.title,
      text: this.newBlog.text,
      creatorId: "stringTest",
      pictures: []
    };

    if (this.newBlog.title.length > 4 && this.newBlog.text.length > 4) {
      const url = "http://localhost:8080/blogController/create-blog";
      this.blogService.postRequest(url, request).subscribe({
        next: (response) => {
          alert("Blog created successfully.");
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

  updateBlog(blogData: { id: number; title: string; text: string; }): void {
    this.blogService.updateBlogInformation(blogData).subscribe(
      () => {
        this.getBlogPosts();
      },
      (error: HttpErrorResponse) => {
        console.error('Error updating blog:', error.message);
      }
    );
  }

  selectBlogForUpdate(blog: Blog): void {
    this.selectedBlog = blog;
  }

  getAllreactions(): void {
    this.reactionService.findAllReactions().subscribe(
      (response: Reaction[]) => {
        this.reactions = response;
        this.reactions.forEach(reaction => {
          // console.log("=====>"+reaction.blog.id);
        });
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  upvote(blogId: number) {
    this.findByUserBlog(blogId);
    const request = {
      reactionType: "APPROUVE",
      blogId: blogId,
      reactorId: this.currentUser?.uid,
    };
    const url = "http://localhost:8080/reactionController/create-reaction";
    this.reactionService.postRequest(url, request).subscribe({
      next: (response) => {
        alert("UPVOTE ");
        this.ngOnInit();
      },
      error: (error) => {
        alert(error);
      }

    });

  }

  downvote(blogId: number) {
    this.findByUserBlog(blogId);
    const request = {
      reactionType: "DISAPPROUVE",
      blogId: blogId,
      reactorId: this.currentUser?.uid,
    };

    const url = "http://localhost:8080/reactionController/create-reaction";
    this.reactionService.postRequest(url, request).subscribe({
      next: (response) => {
        alert("DOWNVOTE ");
        this.ngOnInit();
      },
      error: (error) => {
        alert(error);
      }
    });
  }

  findByUserBlog(blogId: number): void {
    this.reactionService.findByuserBlog("http://localhost:8080/reactionController/getreactions/" + blogId + "/" + this.currentUser?.uid).subscribe(
      (response: Reaction[]) => {
        this.UserReactions = response;
        if (this.UserReactions.length > 0) {
          for (const reaction of this.UserReactions) {
            this.deleteReactionById(reaction.id);
          }
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  findByBlog(blogId: number): void {
    this.up = 0;
    this.down = 0;
    this.reactionService.findByuserBlog("http://localhost:8080/reactionController/getreactions/" + blogId).subscribe(
      (response: Reaction[]) => {
        this.BlogReaction = response;
        if (this.BlogReaction.length > 0) {
          for (const reaction of this.BlogReaction) {
            if (reaction.reactionType === "APPROUVE"){
              this.up++;
              console.log("this.up ====> "+this.up);
            }
            else{
              this.down++;
              console.log("this.down ====> "+this.down);
            }
          }
          this.setVotesForBlog(blogId, this.up, this.down);
          console.log("=======>  "+ this.blogsAndVotes[blogId].upvotes);
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  deleteReactionById(reactionId: number) {
    this.reactionService.deleteReaction(reactionId).subscribe({
      next: (response) => {
        console.log('Reaction deleted successfully', response);
      },
      error: (error) => {
        console.error('Error deleting reaction', error);
      }
    });
  }

  setVotesForBlog(blogId: number, upvotes: number, downvotes: number): void {
    this.blogsAndVotes[blogId] = { upvotes, downvotes };
  }

  getVotesForBlog(blogId: number): { upvotes: number, downvotes: number } | undefined {
    return this.blogsAndVotes[blogId];
  }

  assignVotes(): void{
    for (const bg of this.blogs) {    
      this.findByBlog(bg.id);
    }

  }

  





}
