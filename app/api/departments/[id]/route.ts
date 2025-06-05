// File: app/api/departments/[id]/route.ts
import { db } from "@/firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// [GET] Get a single department by ID
export async function GET(_: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  try {
    const docRef = doc(db, "departments", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Department not found" }, { status: 404 });
    }

    return NextResponse.json({ id: docSnap.id, ...docSnap.data() });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch department" }, { status: 500 });
  }
}

// [PUT] Update a department by ID
export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const body = await req.json();

  try {
    await updateDoc(doc(db, "departments", id), {
      ...body,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ body, message: "Department updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update department" }, { status: 500 });
  }
}



// [DELETE] Delete a department by ID
export async function DELETE(_: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  try {
    await deleteDoc(doc(db, "departments", id));
    return NextResponse.json({ message: "Department deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete department" }, { status: 500 });
  }
}
