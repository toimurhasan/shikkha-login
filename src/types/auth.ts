/**
 * payload for signin request
 */

export interface SignInPayload {
  email: string;
  password: string;
  rememberMe?: boolean; // Optional field for "remember me" functionality
}

/**
 * response from signin request
 */

export interface SignInResponse {
  ok: boolean;
  token?: string; // Optional token if the sign-in is successful
  message?: string; // Optional message for errors or confirmations
}
