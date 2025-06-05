export interface Faculty {
    name: string;
    designation: string;
    qualification: string;
    specialization: string;
  }
  
  export interface Lab {
    name: string;
    image: string;
    description: string;
  }
  
  export interface Department {
    id: string;
    name: string;
    shortName: string;
    hod: string;
    image: string;
    description: string;
    faculty: Faculty[];
    labs: Lab[];
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface Material {
    type: "pdf" | "video";
    title: string;
    description: string;
    link: string;
    semester: string;
  }