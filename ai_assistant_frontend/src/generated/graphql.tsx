import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  sampleMutation: Scalars['String']['output'];
  uploadFile: Response;
};


export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
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

export type QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryQuery = { __typename?: 'Query', sampleQuery: string };

export type Upload_FileMutationVariables = Exact<{
  input: UploadFileInput;
}>;


export type Upload_FileMutation = { __typename?: 'Mutation', uploadFile: Response };

export type UserInformationQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type UserInformationQuery = { __typename?: 'Query', userInformation: { __typename?: 'User', id: string, email: string, messages: Array<{ __typename?: 'Message', id: string, content: string, received: boolean, answered: boolean, createdAt: any }> } };


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