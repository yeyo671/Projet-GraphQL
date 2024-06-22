import { GraphQLResolveInfo } from 'graphql';
import { Context } from './context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Comment = {
  __typename?: 'Comment';
  authorId: Scalars['ID']['output'];
  authorName: Scalars['String']['output'];
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  postId: Scalars['ID']['output'];
};

export type ConnectionResponse = {
  __typename?: 'ConnectionResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type CreateCommentResponse = {
  __typename?: 'CreateCommentResponse';
  code: Scalars['Int']['output'];
  comment?: Maybe<Comment>;
  message: Scalars['String']['output'];
  post?: Maybe<Post>;
  success: Scalars['Boolean']['output'];
};

export type CreatePostResponse = {
  __typename?: 'CreatePostResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  post?: Maybe<Post>;
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  connection: ConnectionResponse;
  createComment: CreateCommentResponse;
  createPost: CreatePostResponse;
  deletePost: CreatePostResponse;
  editPost: CreatePostResponse;
  likePost: CreatePostResponse;
  registration: RegistrationResponse;
};


export type MutationConnectionArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationCreateCommentArgs = {
  content: Scalars['String']['input'];
  postId: Scalars['ID']['input'];
  token: Scalars['String']['input'];
};


export type MutationCreatePostArgs = {
  content: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['ID']['input'];
  token: Scalars['String']['input'];
};


export type MutationEditPostArgs = {
  newContent: Scalars['String']['input'];
  postId: Scalars['ID']['input'];
  token: Scalars['String']['input'];
};


export type MutationLikePostArgs = {
  postId: Scalars['ID']['input'];
  token: Scalars['String']['input'];
};


export type MutationRegistrationArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Post = {
  __typename?: 'Post';
  authorId: Scalars['ID']['output'];
  authorName: Scalars['String']['output'];
  comments: Array<Maybe<Comment>>;
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  likes: Array<Maybe<User>>;
};

export type Query = {
  __typename?: 'Query';
  getPost: Post;
  getPosts: Array<Maybe<Post>>;
  getUser: Array<Maybe<User>>;
};


export type QueryGetPostArgs = {
  postId: Scalars['ID']['input'];
};

export type RegistrationResponse = {
  __typename?: 'RegistrationResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Comment: ResolverTypeWrapper<Comment>;
  ConnectionResponse: ResolverTypeWrapper<ConnectionResponse>;
  CreateCommentResponse: ResolverTypeWrapper<CreateCommentResponse>;
  CreatePostResponse: ResolverTypeWrapper<CreatePostResponse>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<Post>;
  Query: ResolverTypeWrapper<{}>;
  RegistrationResponse: ResolverTypeWrapper<RegistrationResponse>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Comment: Comment;
  ConnectionResponse: ConnectionResponse;
  CreateCommentResponse: CreateCommentResponse;
  CreatePostResponse: CreatePostResponse;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Post: Post;
  Query: {};
  RegistrationResponse: RegistrationResponse;
  String: Scalars['String']['output'];
  User: User;
};

export type CommentResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  authorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  authorName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConnectionResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ConnectionResponse'] = ResolversParentTypes['ConnectionResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateCommentResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CreateCommentResponse'] = ResolversParentTypes['CreateCommentResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  comment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatePostResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CreatePostResponse'] = ResolversParentTypes['CreatePostResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  connection?: Resolver<ResolversTypes['ConnectionResponse'], ParentType, ContextType, RequireFields<MutationConnectionArgs, 'password' | 'username'>>;
  createComment?: Resolver<ResolversTypes['CreateCommentResponse'], ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'content' | 'postId' | 'token'>>;
  createPost?: Resolver<ResolversTypes['CreatePostResponse'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'content' | 'token'>>;
  deletePost?: Resolver<ResolversTypes['CreatePostResponse'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'postId' | 'token'>>;
  editPost?: Resolver<ResolversTypes['CreatePostResponse'], ParentType, ContextType, RequireFields<MutationEditPostArgs, 'newContent' | 'postId' | 'token'>>;
  likePost?: Resolver<ResolversTypes['CreatePostResponse'], ParentType, ContextType, RequireFields<MutationLikePostArgs, 'postId' | 'token'>>;
  registration?: Resolver<ResolversTypes['RegistrationResponse'], ParentType, ContextType, RequireFields<MutationRegistrationArgs, 'password' | 'username'>>;
};

export type PostResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  authorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  authorName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  comments?: Resolver<Array<Maybe<ResolversTypes['Comment']>>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  likes?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<QueryGetPostArgs, 'postId'>>;
  getPosts?: Resolver<Array<Maybe<ResolversTypes['Post']>>, ParentType, ContextType>;
  getUser?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
};

export type RegistrationResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RegistrationResponse'] = ResolversParentTypes['RegistrationResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Comment?: CommentResolvers<ContextType>;
  ConnectionResponse?: ConnectionResponseResolvers<ContextType>;
  CreateCommentResponse?: CreateCommentResponseResolvers<ContextType>;
  CreatePostResponse?: CreatePostResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RegistrationResponse?: RegistrationResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

