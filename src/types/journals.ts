import { GalleryImage } from "./gallery";
import { SeoProps } from "./seo";
import { BlocksContent } from "./strapi-blocks";

export interface JournalBase {
  id: string;
  documentId: string;
  createdAt: string | null;
  updatedAt: string | null;
  title: string;
  slug: string;
}

export interface JournalListProps extends JournalBase {
  journal_category: {
    id: string;
    documentId: string;
    name: string;
  };
  cover_picture: GalleryImage<"small" | "medium" | "thumbnail">;
}

export interface JournalData extends JournalBase {
  content: BlocksContent;
  journal_category: {
    id: string;
    documentId: string;
    name: string;
  }[];
  cover_picture: GalleryImage;
  seo: SeoProps;
}
