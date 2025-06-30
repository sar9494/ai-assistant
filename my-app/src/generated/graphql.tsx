import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: string; output: string; }
  JSON: { input: { [key: string]: unknown }; output: { [key: string]: unknown }; }
};

export type Conversation = {
  __typename?: 'Conversation';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  messages: Array<Message>;
  title: Maybe<Scalars['String']['output']>;
  user: User;
  userId: Scalars['Int']['output'];
};

export type CreateConversationInput = {
  messages: Array<CreateMessageInput>;
  title: InputMaybe<Scalars['String']['input']>;
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
  name: InputMaybe<Scalars['String']['input']>;
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

export type QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryQuery = { __typename?: 'Query', sampleQuery: string };

export type Upload_FileMutationVariables = Exact<{
  input: UploadFileInput;
}>;


export type Upload_FileMutation = { __typename?: 'Mutation', uploadFile: Response };

export type UserInformationQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type UserInformationQuery = { __typename?: 'Query', userInformation: { __typename?: 'User', id: string, email: string, messages: Array<{ __typename?: 'Message', id: string, content: string, received: boolean, answered: boolean, createdAt: string }> } };

export type UnAnsweredQuestionsQueryVariables = Exact<{ [key: string]: never; }>;


export type UnAnsweredQuestionsQuery = { __typename?: 'Query', unansweredMessages: Array<{ __typename?: 'Message', id: string, content: string, createdAt: string }> };

export type Delete_FileMutationVariables = Exact<{
  input: DeleteFileInput;
}>;


export type Delete_FileMutation = { __typename?: 'Mutation', deleteFile: Response };

export type DeleteMessageMutationVariables = Exact<{
  input: DeleteMessageInput;
}>;


export type DeleteMessageMutation = { __typename?: 'Mutation', deleteMessage: Response };

export type GetAllFilesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllFilesQuery = { __typename?: 'Query', files: Array<{ __typename?: 'File', id: string, name: string, url: string, createdAt: string }> };


export const QueryDocument = gql`
    query Query {
  sampleQuery
}
    `;

/**
 * __useQueryQuery__
 *
 * To run a query within a React component, call `useQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useQueryQuery(baseOptions?: Apollo.QueryHookOptions<QueryQuery, QueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryQuery, QueryQueryVariables>(QueryDocument, options);
      }
export function useQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryQuery, QueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryQuery, QueryQueryVariables>(QueryDocument, options);
        }
export function useQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<QueryQuery, QueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<QueryQuery, QueryQueryVariables>(QueryDocument, options);
        }
export type QueryQueryHookResult = ReturnType<typeof useQueryQuery>;
export type QueryLazyQueryHookResult = ReturnType<typeof useQueryLazyQuery>;
export type QuerySuspenseQueryHookResult = ReturnType<typeof useQuerySuspenseQuery>;
export type QueryQueryResult = Apollo.QueryResult<QueryQuery, QueryQueryVariables>;
export const Upload_FileDocument = gql`
    mutation UPLOAD_FILE($input: UploadFileInput!) {
  uploadFile(input: $input)
}
    `;
export type Upload_FileMutationFn = Apollo.MutationFunction<Upload_FileMutation, Upload_FileMutationVariables>;

/**
 * __useUpload_FileMutation__
 *
 * To run a mutation, you first call `useUpload_FileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpload_FileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadFileMutation, { data, loading, error }] = useUpload_FileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpload_FileMutation(baseOptions?: Apollo.MutationHookOptions<Upload_FileMutation, Upload_FileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Upload_FileMutation, Upload_FileMutationVariables>(Upload_FileDocument, options);
      }
export type Upload_FileMutationHookResult = ReturnType<typeof useUpload_FileMutation>;
export type Upload_FileMutationResult = Apollo.MutationResult<Upload_FileMutation>;
export type Upload_FileMutationOptions = Apollo.BaseMutationOptions<Upload_FileMutation, Upload_FileMutationVariables>;
export const UserInformationDocument = gql`
    query UserInformation($userId: Int!) {
  userInformation(userId: $userId) {
    id
    email
    messages {
      id
      content
      received
      answered
      createdAt
    }
  }
}
    `;

/**
 * __useUserInformationQuery__
 *
 * To run a query within a React component, call `useUserInformationQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserInformationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserInformationQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserInformationQuery(baseOptions: Apollo.QueryHookOptions<UserInformationQuery, UserInformationQueryVariables> & ({ variables: UserInformationQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserInformationQuery, UserInformationQueryVariables>(UserInformationDocument, options);
      }
export function useUserInformationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserInformationQuery, UserInformationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserInformationQuery, UserInformationQueryVariables>(UserInformationDocument, options);
        }
export function useUserInformationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserInformationQuery, UserInformationQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserInformationQuery, UserInformationQueryVariables>(UserInformationDocument, options);
        }
export type UserInformationQueryHookResult = ReturnType<typeof useUserInformationQuery>;
export type UserInformationLazyQueryHookResult = ReturnType<typeof useUserInformationLazyQuery>;
export type UserInformationSuspenseQueryHookResult = ReturnType<typeof useUserInformationSuspenseQuery>;
export type UserInformationQueryResult = Apollo.QueryResult<UserInformationQuery, UserInformationQueryVariables>;
export const UnAnsweredQuestionsDocument = gql`
    query unAnsweredQuestions {
  unansweredMessages {
    id
    content
    createdAt
  }
}
    `;

/**
 * __useUnAnsweredQuestionsQuery__
 *
 * To run a query within a React component, call `useUnAnsweredQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUnAnsweredQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUnAnsweredQuestionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUnAnsweredQuestionsQuery(baseOptions?: Apollo.QueryHookOptions<UnAnsweredQuestionsQuery, UnAnsweredQuestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UnAnsweredQuestionsQuery, UnAnsweredQuestionsQueryVariables>(UnAnsweredQuestionsDocument, options);
      }
export function useUnAnsweredQuestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UnAnsweredQuestionsQuery, UnAnsweredQuestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UnAnsweredQuestionsQuery, UnAnsweredQuestionsQueryVariables>(UnAnsweredQuestionsDocument, options);
        }
export function useUnAnsweredQuestionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UnAnsweredQuestionsQuery, UnAnsweredQuestionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UnAnsweredQuestionsQuery, UnAnsweredQuestionsQueryVariables>(UnAnsweredQuestionsDocument, options);
        }
export type UnAnsweredQuestionsQueryHookResult = ReturnType<typeof useUnAnsweredQuestionsQuery>;
export type UnAnsweredQuestionsLazyQueryHookResult = ReturnType<typeof useUnAnsweredQuestionsLazyQuery>;
export type UnAnsweredQuestionsSuspenseQueryHookResult = ReturnType<typeof useUnAnsweredQuestionsSuspenseQuery>;
export type UnAnsweredQuestionsQueryResult = Apollo.QueryResult<UnAnsweredQuestionsQuery, UnAnsweredQuestionsQueryVariables>;
export const Delete_FileDocument = gql`
    mutation DELETE_FILE($input: DeleteFileInput!) {
  deleteFile(input: $input)
}
    `;
export type Delete_FileMutationFn = Apollo.MutationFunction<Delete_FileMutation, Delete_FileMutationVariables>;

/**
 * __useDelete_FileMutation__
 *
 * To run a mutation, you first call `useDelete_FileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDelete_FileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFileMutation, { data, loading, error }] = useDelete_FileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDelete_FileMutation(baseOptions?: Apollo.MutationHookOptions<Delete_FileMutation, Delete_FileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Delete_FileMutation, Delete_FileMutationVariables>(Delete_FileDocument, options);
      }
export type Delete_FileMutationHookResult = ReturnType<typeof useDelete_FileMutation>;
export type Delete_FileMutationResult = Apollo.MutationResult<Delete_FileMutation>;
export type Delete_FileMutationOptions = Apollo.BaseMutationOptions<Delete_FileMutation, Delete_FileMutationVariables>;
export const DeleteMessageDocument = gql`
    mutation deleteMessage($input: DeleteMessageInput!) {
  deleteMessage(input: $input)
}
    `;
export type DeleteMessageMutationFn = Apollo.MutationFunction<DeleteMessageMutation, DeleteMessageMutationVariables>;

/**
 * __useDeleteMessageMutation__
 *
 * To run a mutation, you first call `useDeleteMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageMutation, { data, loading, error }] = useDeleteMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteMessageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMessageMutation, DeleteMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument, options);
      }
export type DeleteMessageMutationHookResult = ReturnType<typeof useDeleteMessageMutation>;
export type DeleteMessageMutationResult = Apollo.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = Apollo.BaseMutationOptions<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const GetAllFilesDocument = gql`
    query getAllFiles {
  files {
    id
    name
    url
    createdAt
  }
}
    `;

/**
 * __useGetAllFilesQuery__
 *
 * To run a query within a React component, call `useGetAllFilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllFilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllFilesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllFilesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllFilesQuery, GetAllFilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllFilesQuery, GetAllFilesQueryVariables>(GetAllFilesDocument, options);
      }
export function useGetAllFilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllFilesQuery, GetAllFilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllFilesQuery, GetAllFilesQueryVariables>(GetAllFilesDocument, options);
        }
export function useGetAllFilesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllFilesQuery, GetAllFilesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllFilesQuery, GetAllFilesQueryVariables>(GetAllFilesDocument, options);
        }
export type GetAllFilesQueryHookResult = ReturnType<typeof useGetAllFilesQuery>;
export type GetAllFilesLazyQueryHookResult = ReturnType<typeof useGetAllFilesLazyQuery>;
export type GetAllFilesSuspenseQueryHookResult = ReturnType<typeof useGetAllFilesSuspenseQuery>;
export type GetAllFilesQueryResult = Apollo.QueryResult<GetAllFilesQuery, GetAllFilesQueryVariables>;