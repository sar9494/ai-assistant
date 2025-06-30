import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '../../lib/types/index.js';
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

export type Conversation = {
  __typename?: 'Conversation';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  messages: Array<Message>;
  title?: Maybe<Scalars['String']['output']>;
  user: User;
  userId: Scalars['Int']['output'];
};

export type CreateConversationInput = {
  messages: Array<CreateMessageInput>;
  title?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['Int']['input'];
};

export type CreateMessageInput = {
  content: Scalars['String']['input'];
  conversationId: Scalars['Int']['input'];
  received: Scalars['Boolean']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type DeleteConversationInput = {
  id: Scalars['ID']['input'];
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

export type GetConversationInput = {
  userId: Scalars['Int']['input'];
};

export type Message = {
  __typename?: 'Message';
  answered: Scalars['Boolean']['output'];
  content: Scalars['String']['output'];
  conversation: Conversation;
  conversationId: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  received: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createConversation: Response;
  createMessage: Response;
  createUser: Response;
  deleteConversation: Response;
  deleteFile: Response;
  deleteMessage: Response;
  sampleMutation: Scalars['String']['output'];
  uploadFile: Response;
};


export type MutationCreateConversationArgs = {
  input: CreateConversationInput;
};


export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteConversationArgs = {
  input: DeleteConversationInput;
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
  getConversations: Array<Conversation>;
  sampleQuery: Scalars['String']['output'];
  searchByName: Array<File>;
  unansweredMessages: Array<Message>;
  userInformation: User;
};


export type QueryGetConversationsArgs = {
  input: GetConversationInput;
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
  Conversation: ResolverTypeWrapper<Conversation>;
  CreateConversationInput: CreateConversationInput;
  CreateMessageInput: CreateMessageInput;
  CreateUserInput: CreateUserInput;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DeleteConversationInput: DeleteConversationInput;
  DeleteFileInput: DeleteFileInput;
  DeleteMessageInput: DeleteMessageInput;
  File: ResolverTypeWrapper<File>;
  GetConversationInput: GetConversationInput;
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
  Conversation: Conversation;
  CreateConversationInput: CreateConversationInput;
  CreateMessageInput: CreateMessageInput;
  CreateUserInput: CreateUserInput;
  Date: Scalars['Date']['output'];
  DeleteConversationInput: DeleteConversationInput;
  DeleteFileInput: DeleteFileInput;
  DeleteMessageInput: DeleteMessageInput;
  File: File;
  GetConversationInput: GetConversationInput;
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

export type ConversationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Conversation'] = ResolversParentTypes['Conversation']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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
  conversation?: Resolver<ResolversTypes['Conversation'], ParentType, ContextType>;
  conversationId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  received?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createConversation?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationCreateConversationArgs, 'input'>>;
  createMessage?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationCreateMessageArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  deleteConversation?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationDeleteConversationArgs, 'input'>>;
  deleteFile?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationDeleteFileArgs, 'input'>>;
  deleteMessage?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationDeleteMessageArgs, 'input'>>;
  sampleMutation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uploadFile?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationUploadFileArgs, 'input'>>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  files?: Resolver<Array<ResolversTypes['File']>, ParentType, ContextType>;
  getConversations?: Resolver<Array<ResolversTypes['Conversation']>, ParentType, ContextType, RequireFields<QueryGetConversationsArgs, 'input'>>;
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
  Conversation?: ConversationResolvers<ContextType>;
  Date?: GraphQLScalarType;
  File?: FileResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

