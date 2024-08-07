// import { NextResponse } from "next/server";
// import Product from "../../../models/Product";
// import { connectToDatabase } from "../../../utils/mongodb";

// export async function GET() {
//   const db = await connectToDatabase();
//   const products = await db.collection("products").find().toArray();
//   return NextResponse.json(products);
// }

// export async function POST(request: Request) {
//   const { name, description, price, active } = await request.json();

//   const db = await connectToDatabase();
//   const result = await db
//     .collection("products")
//     .insertOne({ name, description, price, active });

//   return NextResponse.json(result);
// }

// export async function DELETE(request: Request) {
//   const { id } = await request.json();

//   const db = await connectToDatabase();
//   const result = await db
//     .collection("products")
//     .deleteOne({ _id: new MongoDB.ObjectId(id) });

//   return NextResponse.json(result);
// }

// export async function PUT(request: Request) {
//   const { _id, ...updates } = await request.json();

//   const db = await connectToDatabase();
//   const result = await db
//     .collection("products")
//     .updateOne({ _id: new MongoDB.ObjectId(_id) }, { $set: updates });

//   return NextResponse.json(result);
// }
import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../utils/mongodb";
export async function GET() {
  const db = await connectToDatabase();
  const products = await db.collection("products").find({}).toArray();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const db = await connectToDatabase();
  const { name, description, price, active } = await request.json();
  const result = await db
    .collection("products")
    .insertOne({ name, description, price, active });
  return NextResponse.json(result);
}

export async function PUT(request: Request) {
  const db = await connectToDatabase();
  const { _id, name, description, price, active } = await request.json();
  const result = await db
    .collection("products")
    .updateOne({ _id }, { $set: { name, description, price, active } });
  return NextResponse.json(result);
}

export async function DELETE(request: Request) {
  const db = await connectToDatabase();
  const { id } = await request.json();
  const result = await db.collection("products").deleteOne({ _id: id });
  return NextResponse.json(result);
}
