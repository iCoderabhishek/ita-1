"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ResourceSection from "./ResourceSection";
import EditableTestTable from "./EditableTestTable";
import { Skeleton } from "@/components/ui/skeleton";
import { SemesterData } from "@/types/academic";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Academic sessions data
const academicSessions = ["2024-25", "2023-24", "2022-23"];

// Mock initial data structure updated for sessions
const initialSemesterData: Record<string, Record<string, SemesterData>> = {
  "2024-25": {
    "3rd": {
      syllabusItems: [],
      pyqItems: [],
      additionalPdfs: [],
      tests: [],
      isLoading: false,
    },
    "4th": {
      syllabusItems: [],
      pyqItems: [],
      additionalPdfs: [],
      tests: [],
      isLoading: false,
    },
    "5th": {
      syllabusItems: [],
      pyqItems: [],
      additionalPdfs: [],
      tests: [],
      isLoading: false,
    },
    "6th": {
      syllabusItems: [],
      pyqItems: [],
      additionalPdfs: [],
      tests: [],
      isLoading: false,
    },
  },
  "2023-24": {
    "3rd": {
      syllabusItems: [],
      pyqItems: [],
      additionalPdfs: [],
      tests: [],
      isLoading: false,
    },
    "4th": {
      syllabusItems: [],
      pyqItems: [],
      additionalPdfs: [],
      tests: [],
      isLoading: false,
    },
    "5th": {
      syllabusItems: [],
      pyqItems: [],
      additionalPdfs: [],
      tests: [],
      isLoading: false,
    },
    "6th": {
      syllabusItems: [],
      pyqItems: [],
      additionalPdfs: [],
      tests: [],
      isLoading: false,
    },
  },
  "2022-23": {
    "3rd": {
      syllabusItems: [],
      pyqItems: [],
      additionalPdfs: [],
      tests: [],
      isLoading: false,
    },
    "4th": {
      syllabusItems: [],
      pyqItems: [],
      additionalPdfs: [],
      tests: [],
      isLoading: false,
    },
    "5th": {
      syllabusItems: [],
      pyqItems: [],
      additionalPdfs: [],
      tests: [],
      isLoading: false,
    },
    "6th": {
      syllabusItems: [],
      pyqItems: [],
      additionalPdfs: [],
      tests: [],
      isLoading: false,
    },
  },
};

export default function AdminAcademicData() {
  const [semesterData, setSemesterData] =
    useState<Record<string, Record<string, SemesterData>>>(initialSemesterData);
  const [activeSession, setActiveSession] = useState(academicSessions[0]);
  const [activeSemester, setActiveSemester] = useState("3rd");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading
  useState(() => {
    setTimeout(() => {
      const loadedData = {
        ...initialSemesterData,
        "2024-25": {
          ...initialSemesterData["2024-25"],
          "3rd": {
            syllabusItems: [
              {
                id: "1",
                title: "Computer Science Syllabus",
                pdfLink: "https://example.com/cs-syllabus.pdf",
              },
            ],
            pyqItems: [
              {
                id: "1",
                title: "Database Management Systems",
                year: "2023",
                pdfLink: "https://example.com/dbms-pyq.pdf",
              },
            ],
            additionalPdfs: [
              {
                id: "1",
                title: "Programming Reference",
                pdfLink: "https://example.com/programming-ref.pdf",
              },
            ],
            tests: [
              {
                id: "1",
                subject: "Data Structures",
                testType: "Mid-term",
                examDate: "2024-05-15",
                questions: "https://example.com/ds-midterm.pdf",
              },
            ],
            isLoading: false,
          },
        },
      };
      setSemesterData(loadedData);
      setIsLoading(false);
    }, 1500);
  });

  const handleSessionChange = (session: string) => {
    setActiveSession(session);

    // Reset semester selection when changing session
    setActiveSemester("3rd");

    // Simulate loading when changing to a new session
    if (!semesterData[session]["3rd"].syllabusItems.length) {
      setSemesterData((prev) => ({
        ...prev,
        [session]: {
          ...prev[session],
          "3rd": { ...prev[session]["3rd"], isLoading: true },
        },
      }));

      // Simulate API fetch delay
      setTimeout(() => {
        setSemesterData((prev) => ({
          ...prev,
          [session]: {
            ...prev[session],
            "3rd": { ...prev[session]["3rd"], isLoading: false },
          },
        }));
      }, 1000);
    }
  };

  const handleSemesterChange = (semester: string) => {
    setActiveSemester(semester);

    // Simulate loading when changing to an empty semester
    if (
      semesterData[activeSession][semester].syllabusItems.length === 0 &&
      !semesterData[activeSession][semester].isLoading
    ) {
      setSemesterData((prev) => ({
        ...prev,
        [activeSession]: {
          ...prev[activeSession],
          [semester]: { ...prev[activeSession][semester], isLoading: true },
        },
      }));

      // Simulate API fetch delay
      setTimeout(() => {
        setSemesterData((prev) => ({
          ...prev,
          [activeSession]: {
            ...prev[activeSession],
            [semester]: { ...prev[activeSession][semester], isLoading: false },
          },
        }));
      }, 1000);
    }
  };

  // Update functions for each section
  const updateSyllabusItems = (items: any[]) => {
    setSemesterData((prev) => ({
      ...prev,
      [activeSession]: {
        ...prev[activeSession],
        [activeSemester]: {
          ...prev[activeSession][activeSemester],
          syllabusItems: items,
        },
      },
    }));
  };

  const updatePyqItems = (items: any[]) => {
    setSemesterData((prev) => ({
      ...prev,
      [activeSession]: {
        ...prev[activeSession],
        [activeSemester]: {
          ...prev[activeSession][activeSemester],
          pyqItems: items,
        },
      },
    }));
  };

  const updateAdditionalPdfs = (items: any[]) => {
    setSemesterData((prev) => ({
      ...prev,
      [activeSession]: {
        ...prev[activeSession],
        [activeSemester]: {
          ...prev[activeSession][activeSemester],
          additionalPdfs: items,
        },
      },
    }));
  };

  const updateTests = (tests: any[]) => {
    setSemesterData((prev) => ({
      ...prev,
      [activeSession]: {
        ...prev[activeSession],
        [activeSemester]: {
          ...prev[activeSession][activeSemester],
          tests,
        },
      },
    }));
  };

  if (isLoading) {
    return <LoadingState />;
  }

  const currentData = semesterData[activeSession][activeSemester];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold mb-6">Academic Data Management</h1>
        <div className="flex items-center">
          <a
            href="/admin/departments"
            className="mr-4 flex mb-2 text-xl hover:text-primary"
          >
            <ArrowLeft className="h-6 w-6 " />
            Go to All Department
          </a>
        </div>

        {/* Academic Session Tabs */}
        <Tabs
          defaultValue={academicSessions[0]}
          onValueChange={handleSessionChange}
          className="mb-6"
        >
          <TabsList className="grid w-full grid-cols-3">
            {academicSessions.map((session) => (
              <TabsTrigger key={session} value={session}>
                {session}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Semester Tabs */}
        <Tabs defaultValue="3rd" onValueChange={handleSemesterChange}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="3rd">3rd Semester</TabsTrigger>
            <TabsTrigger value="4th">4th Semester</TabsTrigger>
            <TabsTrigger value="5th">5th Semester</TabsTrigger>
            <TabsTrigger value="6th">6th Semester</TabsTrigger>
          </TabsList>

          {["3rd", "4th", "5th", "6th"].map((semester) => (
            <TabsContent key={semester} value={semester}>
              <div className="space-y-8">
                {currentData.isLoading ? (
                  <SectionLoadingState />
                ) : (
                  <>
                    <ResourceSection
                      title="Syllabus"
                      items={currentData.syllabusItems}
                      onUpdate={updateSyllabusItems}
                      emptyMessage="No syllabus documents available"
                      resourceType="syllabus"
                    />

                    <ResourceSection
                      title="Previous Year Questions (PYQs)"
                      items={currentData.pyqItems}
                      onUpdate={updatePyqItems}
                      emptyMessage="No previous year questions available"
                      resourceType="pyq"
                      showYear
                    />

                    <ResourceSection
                      title="Additional PDFs"
                      items={currentData.additionalPdfs}
                      onUpdate={updateAdditionalPdfs}
                      emptyMessage="No additional documents available"
                      resourceType="additional"
                    />

                    <EditableTestTable
                      tests={currentData.tests}
                      onUpdate={updateTests}
                    />
                  </>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

// Loading states
function LoadingState() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <Skeleton className="h-8 w-3/4 mb-6" />
        <Skeleton className="h-10 w-full mb-8" />
        <div className="space-y-8">
          <div>
            <Skeleton className="h-6 w-1/4 mb-4" />
            <Skeleton className="h-24 w-full mb-2" />
          </div>
          <div>
            <Skeleton className="h-6 w-1/4 mb-4" />
            <Skeleton className="h-24 w-full mb-2" />
          </div>
          <div>
            <Skeleton className="h-6 w-1/4 mb-4" />
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionLoadingState() {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-6 w-1/4 mb-4" />
        <Skeleton className="h-24 w-full" />
      </div>
      <div>
        <Skeleton className="h-6 w-1/3 mb-4" />
        <Skeleton className="h-24 w-full" />
      </div>
      <div>
        <Skeleton className="h-6 w-1/4 mb-4" />
        <Skeleton className="h-24 w-full" />
      </div>
      <div>
        <Skeleton className="h-6 w-1/3 mb-4" />
        <Skeleton className="h-48 w-full" />
      </div>
    </div>
  );
}
