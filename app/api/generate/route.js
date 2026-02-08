export async function POST(req) {
  try {
    const body = await req.json();
    const text = body.text;

    return new Response(
      JSON.stringify({ message: "Received successfully", text }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Something went wrong" }),
      { status: 500 }
    );
  }
}
