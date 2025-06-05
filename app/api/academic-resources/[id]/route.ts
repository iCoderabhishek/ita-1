import { db } from "@/firebase";
import { doc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// Next.js expects context.params to be awaited before usage,
// so destructure it like this:

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { id } = await context.params; // <-- await here

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const docRef = doc(db, "academic-resources", id);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      return NextResponse.json({ error: "Resource not found" }, { status: 404 });
    }

    return NextResponse.json({ id: snapshot.id, ...snapshot.data() });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch resource" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const body = await req.json();

  try {
    const docRef = doc(db, "academic-resources", id);
    await updateDoc(docRef, {
      ...body,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ message: "Resource updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update resource" }, { status: 500 });
  }
}

import { setDoc } from "firebase/firestore";

import { arrayUnion} from "firebase/firestore";

export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const body = await req.json();

    const docRef = doc(db, "academic-resources", id);

    // Append new resource to 'data' array instead of replacing it
    await updateDoc(docRef, {
      data: arrayUnion(body),
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ body, message: "Resource appended successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to append resource" }, { status: 500 });
  }
}



export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const docRef = doc(db, "academic-resources", id);
    await deleteDoc(docRef);

    return NextResponse.json({ message: "Resource deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete resource" }, { status: 500 });
  }
}
