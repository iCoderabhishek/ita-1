// Define the types for academic data

export interface SyllabusItem {
    id: string;
    title: string;
    pdfLink: string;
  }
  
  export interface PYQItem {
    id: string;
    title: string;
    year: string;
    pdfLink: string;
  }
  
  export interface AdditionalPdf {
    id: string;
    title: string;
    pdfLink: string;
  }
  
  export interface Test {
    id: string;
    subject: string;
    testType: string;
    examDate: string;
    questions?: string;
  }
  
  export interface SemesterData {
    syllabusItems: SyllabusItem[];
    pyqItems: PYQItem[];
    additionalPdfs: AdditionalPdf[];
    tests: Test[];
    isLoading: boolean;
  }