import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '../types';
export type Maybe<T> = T;
export type InputMaybe<T> = T;
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
  Date: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type CreateMessageInput = {
  content: Scalars['String']['input'];
  received: Scalars['Boolean']['input'];
  userId: Scalars['Int']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type DeleteFileInput = {
  id: Scalars['ID']['input'];
};

export type DeleteMessageInput = {
  id: Scalars['ID']['input'];
};

export type File = {
  __typename?: 'File';
  createdAt: Scalars['Date']['output'];
  fileId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Message = {
  __typename?: 'Message';
  answered: Scalars['Boolean']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  received: Scalars['Boolean']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createMessage: Response;
  createUser: Response;
  deleteFile: Response;
  deleteMessage: Response;
  sampleMutation: Scalars['String']['output'];
  uploadFile: Response;
};


export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteFileArgs = {
  input: DeleteFileInput;
};


export type MutationDeleteMessageArgs = {
  input: DeleteMessageInput;
};


export type MutationUploadFileArgs = {
  input: UploadFileInput;
};

export type Query = {
  __typename?: 'Query';
  files: Array<File>;
  sampleQuery: Scalars['String']['output'];
  searchByName: Array<File>;
  unansweredMessages: Array<Message>;
  userInformation: User;
};


export type QuerySearchByNameArgs = {
  input: SearchByNameInput;
};


export type QueryUserInformationArgs = {
  userId: Scalars['Int']['input'];
};

export enum Response {
  Success = 'Success'
}

export type SearchByNameInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UploadFileInput = {
  fileId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  messages: Array<Message>;
  password: Scalars['String']['output'];
  role: UserRoleEnum;
};

export enum UserRoleEnum {
  Admin = 'ADMIN',
  Employee = 'EMPLOYEE'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

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
  CreateMessageInput: CreateMessageInput;
  CreateUserInput: CreateUserInput;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DeleteFileInput: DeleteFileInput;
  DeleteMessageInput: DeleteMessageInput;
  File: ResolverTypeWrapper<File>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Message: ResolverTypeWrapper<Message>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Response: Response;
  SearchByNameInput: SearchByNameInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UploadFileInput: UploadFileInput;
  User: ResolverTypeWrapper<User>;
  UserRoleEnum: UserRoleEnum;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  CreateMessageInput: CreateMessageInput;
  CreateUserInput: CreateUserInput;
  Date: Scalars['Date']['output'];
  DeleteFileInput: DeleteFileInput;
  DeleteMessageInput: DeleteMessageInput;
  File: File;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  Message: Message;
  Mutation: {};
  Query: {};
  SearchByNameInput: SearchByNameInput;
  String: Scalars['String']['output'];
  UploadFileInput: UploadFileInput;
  User: User;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type FileResolvers<ContextType = Context, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  fileId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MessageResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  answered?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  received?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createMessage?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationCreateMessageArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  deleteFile?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationDeleteFileArgs, 'input'>>;
  deleteMessage?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationDeleteMessageArgs, 'input'>>;
  sampleMutation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uploadFile?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationUploadFileArgs, 'input'>>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  files?: Resolver<Array<ResolversTypes['File']>, ParentType, ContextType>;
  sampleQuery?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  searchByName?: Resolver<Array<ResolversTypes['File']>, ParentType, ContextType, RequireFields<QuerySearchByNameArgs, 'input'>>;
  unansweredMessages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>;
  userInformation?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserInformationArgs, 'userId'>>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['UserRoleEnum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Date?: GraphQLScalarType;
  File?: FileResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

