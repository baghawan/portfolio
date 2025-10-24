import { GalleryImage } from "./gallery";

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
