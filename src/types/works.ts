import { GalleryImage } from "./gallery";
import { SeoProps } from "./seo";

export interface WorkBase {
  id: string;
  documentId: string;
  createdAt: string | null;
  updatedAt: string | null;
  title: string;
  slug: string;
  description: string;
  year: string;
}

export interface WorkListProps extends Omit<WorkBase, "description"> {
  gallery: GalleryImage<"medium">;
  expertise: {
    id: string;
    documentId: string;
    name: string;
  };
}

export interface WorksData extends WorkBase {
  expertise: {
    id: string;
    documentId: string;
    name: string;
  };
  tools: {
    id: string;
    documentId: string;
    name: string;
  }[];
  gallery: GalleryImage[];
  seo: SeoProps;
}
