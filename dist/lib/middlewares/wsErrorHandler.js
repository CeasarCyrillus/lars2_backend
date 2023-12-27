"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wsErrorHandler = void 0;
const error_1 = require("../error");
const wsErrorHandler = (socket, message) => (handler) => {
    const handleError = (err) => {
        console.error(err);
        socket.emit(message, { result: "failure", error: error_1.unknownError });
    };
    return (...args) => {
        try {
            const ret = handler.apply(this, args);
            if (ret && typeof ret.catch === "function") {
                ret.catch(handleError);
            }
        }
        catch (e) {
            handleError(e);
        }
    };
};
exports.wsErrorHandler = wsErrorHandler;
//# sourceMappingURL=wsErrorHandler.js.map