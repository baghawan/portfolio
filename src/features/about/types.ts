export type TExpertise = {
  documentId: string;
  name: string;
  description: string;
  tools: {
    documentId: string;
    name: string;
  }[];
};

export type TExperiences = {
  documentId: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
};

export type TCollaborations = {
  documentId: string;
  name: string;
  logo: {
    documentId: string;
    alternativeText: string | null;
    width: number;
    height: number;
    url: string;
  };
};
