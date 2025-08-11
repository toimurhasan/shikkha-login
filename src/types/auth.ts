/**
 * SignInPayload
 *
 * Represents the data structure required to authenticate a user
 * during the sign-in process.
 *
 * @property {string} email - The user's email address.
 *   Must be a valid email format and is used to identify the user.
 *
 * @property {string} password - The user's password.
 *   Should meet minimum security criteria as defined by the backend (e.g., length).
 */
export interface SignInPayload {
  email: string;
  password: string;
}

/**
 * SignInResponse
 *
 * Represents the response returned from the sign-in API endpoint.
 * Provides information on whether the sign-in was successful and
 * any associated data or error messages.
 *
 * @property {boolean} ok - Indicates the success status of the sign-in request.
 *   `true` means the authentication was successful; `false` otherwise.
 *
 * @property {string} [token] - An optional authentication token (e.g., JWT)
 *   returned when sign-in is successful. This token is typically used for
 *   authorizing subsequent requests.
 *
 * @property {string} [message] - An optional message providing additional
 *   information about the sign-in attempt. Can contain error details or
 *   confirmation messages.
 */
export interface SignInResponse {
  ok: boolean;
  token?: string;
  message?: string;
}
