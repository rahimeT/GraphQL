const { ApolloServer, gql} = require('apollo-server');
const {users,posts,comments} = require('./data');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require( 'apollo-server-core');
const { v4: uuidv4 } = require('uuid');
const typeDefs = gql `
#user
type User{
    id: ID!
    fullname: String!
    age: Int!
    post(id: ID!): [Post!]!
    posts: [Post]
    comments: [Comment]
}
input CreateUserInput{
    fullname: String!
    age: Int!
}
input UpdateUser{
    fullname: String
    age: Int
}

type Post{
    id: ID!
    title: String!
    user_id: ID!
    user: User!
    comments: [Comment!]!
}
input CreatePostInput{
    title: String!
    user_id: ID!
    }
type Comment{
    id: ID!
    text: String
    post_id: ID!
    user: User!
    post: Post!
}
input CreateCommentInput{
    text: String!
    post_id: ID!
    user_id: ID!
}
type Query{
    users: [User!]!
    user(id: ID!): User!
    posts: [Post!]!
    post(id: ID!): Post!
    comments: [Comment!]!
    comment(id: ID!): Comment!
}

type Mutation{
    #user
    createUser(data: CreateUserInput!): User!
    updateUser(id:ID!, data: UpdateUser! ): User!

    #post
    createPost(data: CreatePostInput!): Post!
    
    #comment
    createComment(data: CreateCommentInput!): Comment!
}
`;

const resolvers  ={
    Mutation: {
        createUser: (parent, {data}) => {
            const user = {
                id: uuidv4(), 
                ...data,
            };
            users.push(user);
            return user;
        },
        updateUser: (parent, {id, data}) => {
            const user_index = users.findIndex(user => user.id === id);
                console.log(user_index)
            
        },
        createPost: (parent, {data}) => {
            const post = {
                id: uuidv4(),
                ...data,
            }
            posts.push(post)
            return post;
        },
        createComment: (parent, {data}) =>{
            const comment = {
                id: uuidv4(),
                ...data,
            }
            comments.push(comment)
            return comment
        }
        
    },
    Query: {
        // User
        users: () => users,
        user: (parent, args) => {
            const user = users.find((user) => user.id === args.id);
            if(!user){
                return new Error("user not found");
            }
            return user;
        },

        //post
        posts: () => posts,
        post: (parent, args) => {
            const post = posts.find((post) => post.id === args.id)
            if(!post){
                return new Error("posts not found")
            }
            return post
        },

        //comment
        comments: () => comments,
        comment: (parent, args) => {
            const comment = comments.find((comment) => comment.id === args.id);
            if(!comment){
                return new Error("comments not found")
            }
            return comment;  
        }
    },
    User: {
        post: (parent,args) => posts.filter((post) => post.id === parent.id),
        comments: (parent,args) => comments.filter((comment) => comment.user_id === parent.id)
    },
    Post: {
        user: (parent, args) => users.find((user) => user.id === parent.user_id),
        comments: (parent, args) => comments.filter((comment) => comment.post_id === parent.id),
    },
    Comment: {
        user: (parent) => users.find((user) => user.id === parent.user_id),
        post: (parent) => posts.find((post) => post.id === parent.post_id)
    }
    

};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground({}),
      ],
});

server.listen().then(({url})=> {
    console.log(`Server ready at ${url}`);
});