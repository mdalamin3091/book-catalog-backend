"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const jwtHelper_1 = require("../../utils/jwtHelper");
const auth = (...roles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            next((0, http_errors_1.default)(http_status_1.default.UNAUTHORIZED, "your are unauthorized user"));
        }
        let verifiedUserToken;
        verifiedUserToken = (0, jwtHelper_1.verifyJwtToken)(token, config_1.default.jwt.jwt_secret);
        req.user = verifiedUserToken; // userId, role;
        if (roles.length > 0 && !roles.includes(verifiedUserToken.role)) {
            next((0, http_errors_1.default)(http_status_1.default.FORBIDDEN, "your are forbidden user"));
        }
        next();
    }
    catch (err) {
        next((0, http_errors_1.default)(http_status_1.default.BAD_REQUEST, "invalid token"));
    }
});
exports.auth = auth;
