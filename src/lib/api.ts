import { SignInPayload, SignInResponse } from 'src/types/auth';

/**
 * Calls the sign-in API route.
 * @param payload - User credentials
 * @returns API response with status and optional token
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
