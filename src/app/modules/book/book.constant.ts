export const bookFilterableFields = [
  "searchTerm",
  "title",
  "minPrice",
  "maxPrice",
  "categoryId",
];

export const bookSearchableFields = ["title", "genre", "author"];

export const bookRelationalField = ["categoryId"];
export const bookRelationalFieldMapper: { [key: string]: string } = {
  categoryId: "category",
};
