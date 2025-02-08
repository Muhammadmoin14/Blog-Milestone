import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) { // GET , PUSH, PUT, DELETE, PATCH
  try {
    const { searchParams } = new URL(req.url);

    const today = new Date();
    const yesterday = new Date();

    // Ensure `from` is within the allowed range (e.g., 30 days back)
    yesterday.setDate(today.getDate() - 1);

    // Convert to YYYY-MM-DD format
    // const todayStr = today.toISOString().split('T')[0];
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    // console.log(todayStr, yesterdayStr);
    
    const q = searchParams.get('q') || 'apple';
    const from = searchParams.get('from') || yesterdayStr;
    const to = searchParams.get('to') || yesterdayStr;
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
