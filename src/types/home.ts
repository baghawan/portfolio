export type HomeIntro = Readonly<{
  title: string;
  description: string;
}>;

export type HomeExpertise = Readonly<string[]>;

export type Home = Readonly<{
  intro: HomeIntro;
  expertise: HomeExpertise;
}>;

// Homepage API response types
export interface HomepageWorkGallery {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  url: string;
  width: number;
  height: number;
}

export interface HomepageWork {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  year: string;
  expertise: {
    id: number;
    documentId: string;
    name: string;
  };
  gallery: HomepageWorkGallery[];
}

export interface HomepageData {
  id: number;
  documentId: string;
  works: HomepageWork[];
}
