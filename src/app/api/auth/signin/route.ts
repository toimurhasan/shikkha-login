import { NextResponse } from 'next/server';

/**
 * Mock sign-in API route.
 */
export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Mock credentials
  if (email === 'user@shikkha.dev' && password === 'password123') {
    return NextResponse.json({
      ok: true,
      token: 'sample-jwt-token',
    });
  }

  return NextResponse.json({ ok: false, message: 'পরিচয় সনাক্ত করা যায় নি' }, { status: 401 });
}
