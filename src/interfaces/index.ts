export interface ISearchResult {
  id: string;
  alt_description: string;
  links: { self: string; html: string };
  urls: {
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
}

export interface ISearchPhotoResponse {
  results: ISearchResult[];
  total: number;
  total_pages: number;
}
