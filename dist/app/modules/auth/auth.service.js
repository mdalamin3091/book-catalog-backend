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
exports.authService = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const prisma_1 = require("../../../utils/prisma");
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const jwtHelper_1 = require("../../../utils/jwtHelper");
const signupUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistUser = yield prisma_1.prisma.user.findFirst({
        where: {
            email: data.email,
        },
    });
    if (isExistUser) {
        throw new http_errors_1.default.Conflict("user already exist! try with another email");
    }
    const hashPassword = bcrypt_1.default.hashSync(data.password, Number(config_1.default.bcrypt_solt_round));
    data.password = hashPassword;
    const createdUser = yield prisma_1.prisma.user.create({
        data,
        select: {
            name: true,
            email: true,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true,
        },
    });
    return createdUser;
});
const signinUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistUser = yield prisma_1.prisma.user.findFirst({
        where: {
            email: data.email,
        },
    });
    if (!isExistUser) {
        throw new http_errors_1.default.NotFound("User does not exist");
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(data.password, isExistUser.password);
    if (!isPasswordMatched) {
        throw (0, http_errors_1.default)(http_status_1.default.UNAUTHORIZED, "crediential wrongs");
    }
    const accessToken = (0, jwtHelper_1.createToken)({ userId: isExistUser.id, role: isExistUser.role }, config_1.default.jwt.jwt_secret, config_1.default.jwt.jwt_expire_time);
    return accessToken;
});
exports.authService = {
    signupUser,
    signinUser,
};
