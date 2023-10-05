import { NextResponse } from "next/server";

export async function GET(req) {
  return NextResponse.json({
    message: `Oops, no access this way!`,
  });
}

export async function POST(req) {
  try {
    let body = await req.json();
    let getData = await fetch(body.url, {
      method: "GET",
    });
    let response = await getData.json();

    return NextResponse.json(
      {
        data: response,
      },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ error: JSON.stringify(e) }, { status: 500 });
  }
}
