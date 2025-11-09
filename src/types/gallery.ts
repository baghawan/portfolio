export interface ImageBase {
  name: string;
  url: string;
  width: number;
  height: number;
}

export interface GalleryImage<
  TFormats extends string = "small" | "medium" | "thumbnail"
> extends ImageBase {
  id: string;
  documentId: string;
  alternativeText: string;
  formats?: Partial<Record<TFormats, ImageBase>>;
}
