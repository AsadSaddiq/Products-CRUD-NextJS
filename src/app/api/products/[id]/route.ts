import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../utils/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id || !ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Invalid or missing id" },
      { status: 400 }
    );
  }

  const db = await connectToDatabase();
  const product = await db
    .collection("products")
    .findOne({ _id: new ObjectId(id) });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}
