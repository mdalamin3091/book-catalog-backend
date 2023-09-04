"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRelationalFieldMapper = exports.bookRelationalField = exports.bookSearchableFields = exports.bookFilterableFields = void 0;
exports.bookFilterableFields = [
    "searchTerm",
    "title",
    "minPrice",
    "maxPrice",
    "categoryId",
];
exports.bookSearchableFields = ["title", "genre", "author"];
exports.bookRelationalField = ["categoryId"];
exports.bookRelationalFieldMapper = {
    categoryId: "category",
};
