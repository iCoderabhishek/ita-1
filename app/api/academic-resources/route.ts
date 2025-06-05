// File: app/api/academic-resources/route.ts
export const dynamic = "force-dynamic";

import { db } from "@/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// [GET] Fetch resources by session, semester, type
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const session = searchParams.get("session");
  const semester = searchParams.get("semester");
  const type = searchParams.get("type");

  if (!session || !semester || !type) {
    return NextResponse.json(
      { error: "Missing session, semester, or type" },
      { status: 400 }
    );
  }

  try {
    const q = query(
      collection(db, "academic-resources"),
      where("session", "==", session),
      where("semester", "==", semester),
      where("type", "==", type)
    );

    const snapshot = await getDocs(q);
    const resources = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json({ resources });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 });
  }
}

// [POST] Add a new academic resource
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      pdfLink,
      type,
      session,
      semester,
      year,
      testType,
      examDate,
    } = body;

    if (!title || !pdfLink || !type || !session || !semester) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newDoc = await addDoc(collection(db, "academic-resources"), {
      title,
      pdfLink,
      type,
      session,
      semester,
      year: year || null,
      testType: testType || null,
      examDate: examDate || null,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ message: "Resource added", id: newDoc.id });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add resource" }, { status: 500 });
  }
}
