"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pick = void 0;
const pick = (query, fields) => {
    const finalObj = {};
    for (const field of fields) {
        if (query && query.hasOwnProperty.call(query, field)) {
            finalObj[field] = query[field];
        }
    }
    return finalObj;
};
exports.pick = pick;
