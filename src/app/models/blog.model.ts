export interface User {
    uid: string;
    firstname: string;
    lastname: string;
    profilDescription: string;
}

export interface Picture {
    id: number;
    url: string;
}

export interface Groupe {
    id: number;
    name: string;
}

export interface Reaction {
    id: number;
    reactionType: string;
    blog: Blog;
    reacter: User;
}

export interface Blog {
    id: number;
    title: string;
    text: string;
    creator?: User;
    pictures: Picture[];
    groupe: Groupe;
}
export interface Comment{
    id: number;
    text: string;
    commenter?: User;
    blog?: Blog
}

export interface Page<T> {
    content: T[];
    pageable: {
        pageNumber: number;
        pageSize: number;
        sort: {
            sorted: boolean;
            unsorted: boolean;
            empty: boolean;
        };
        offset: number;
        paged: boolean;
    };
    last: boolean;
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
    sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
    };
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export interface BlogVotes {
    upvotes: number;
    downvotes: number;
  }