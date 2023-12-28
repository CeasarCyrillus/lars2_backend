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
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAuthorization = exports.isAuthorized = exports.getAuthorizedUser = exports.jwtSecretKey = void 0;
const jwt_simple_1 = require("jwt-simple");
const error_1 = require("./error");
const response_1 = require("./response");
exports.jwtSecretKey = "secret-key";
const getAuthorizedUser = (authHeader) => {
    try {
        return (0, jwt_simple_1.decode)(authHeader.token, exports.jwtSecretKey, false);
    }
    catch (e) {
        return false;
    }
};
exports.getAuthorizedUser = getAuthorizedUser;
const isAuthorized = (authHeader) => {
    try {
        (0, jwt_simple_1.decode)(authHeader.token, exports.jwtSecretKey, false);
        return true;
    }
    catch (e) {
        return false;
    }
};
exports.isAuthorized = isAuthorized;
const withAuthorization = (socket) => (messageType, getResponse) => {
    const failure = (0, response_1.withError)(socket);
    const success = (0, response_1.withSuccess)(socket);
    socket.on(messageType, () => __awaiter(void 0, void 0, void 0, function* () {
        const user = (0, exports.getAuthorizedUser)(socket.data.auth);
        if (user) {
            const response = yield getResponse(user);
            success(messageType, response);
        }
        else {
            failure(messageType, error_1.authenticationError);
        }
    }));
};
exports.withAuthorization = withAuthorization;
//# sourceMappingURL=jwt.js.map