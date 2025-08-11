import { SignInPayload, SignInResponse } from 'src/types/auth';

/**
 * signInApi
 *
 * Sends a POST request to the `/api/auth/signin` endpoint to authenticate a user
 * with the provided credentials.
 *
 * The function serializes the user credentials as JSON and includes appropriate
 * headers for content type. It handles the response by parsing JSON and
 * returns a structured object indicating success or failure.
 *
 * On failure (non-OK HTTP status), it attempts to extract and return an error message
 * from the response. On success, it returns the authentication token along with
 * any message from the server.
 *
 * @param {SignInPayload} payload - An object containing user credentials
 *   necessary for sign-in, typically including fields like `email` and `password`.
 *
 * @returns {Promise<SignInResponse>} A promise that resolves to an object representing
 *   the API response:
 *   - `ok` (boolean): Indicates whether the sign-in was successful.
 *   - `token` (string | undefined): The authentication token if sign-in succeeded.
 *   - `message` (string | undefined): Additional message from the server, such as error details.
 *
 * @throws Will not throw on HTTP errors; instead returns `{ ok: false }` with error message.
 *
 * @example
 * ```ts
 * const payload = { email: 'user@shikkha.dev', password: 'password123' };
 * const response = await signInApi(payload);
 * if (response.ok) {
 *   console.log('Token:', response.token);
 * } else {
 *   console.error('Error:', response.message);
 * }
 * ```
 */

export async function signInApi(payload: SignInPayload): Promise<SignInResponse> {
  const response = await fetch('/api/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    return { ok: false, message: errorData.message || 'Sign-in failed' };
  }

  const data = await response.json();
  return { ok: true, token: data.token, message: data.message };
}
