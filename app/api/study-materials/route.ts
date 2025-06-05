export const dynamic = "force-dynamic";

import { db } from "@/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// [GET] Fetch all study materials
export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "study-materials"));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ studyMaterials: data });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch study materials" }, { status: 500 });
  }
}

// [POST] Add new study material
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      date,
      important,
      category,
      content,
      department,
      semester,
      publisher,
      link,
    } = body;

    if (!title || !category || !content || !department || !semester || !publisher || !link) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const docRef = await addDoc(collection(db, "study-materials"), {
      title,
      date,
      important,
      category,
      content,
      department,
      semester,
      publisher,
      link,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ message: "Study material added", id: docRef.id });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: "Failed to add study material" }, { status: 500 });
  }
}

// [PUT] Update existing study material
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Study material ID is required" }, { status: 400 });
    }

    const ref = doc(db, "study-materials", id);
    await updateDoc(ref, updates);

    return NextResponse.json({ message: "Study material updated" });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ error: "Failed to update study material" }, { status: 500 });
  }
}

// [DELETE] Remove a study material
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Study material ID is required" }, { status: 400 });
    }

    const ref = doc(db, "study-materials", id);
    await deleteDoc(ref);

    return NextResponse.json({ message: "Study material deleted" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete study material" }, { status: 500 });
  }
}
