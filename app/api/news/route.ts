import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q') || 'apple';
    const from = searchParams.get('from') || '';
    const to = searchParams.get('to') || '';
    const sortBy = searchParams.get('sortBy') || 'popularity';

    const url = `https://newsapi.org/v2/everything?q=${q}&from=${from}&to=${to}&sortBy=${sortBy}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching NewsAPI:', error);
    return NextResponse.json({ error: 'Failed to fetch news.' }, { status: 500 });
  }
}
