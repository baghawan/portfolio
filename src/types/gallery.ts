export interface Image {
  name: string;
  url: string;
  width: number;
  height: number;
}

export interface GalleryImage<
  TFormats extends string = "small" | "medium" | "thumbnail"
> extends Image {
  id: string;
  documentId: string;
  alternativeText: string;
  formats?: Partial<Record<TFormats, Image>>;
}
