"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withError = exports.withSuccess = void 0;
const withSuccess = (socket) => (eventName, payload) => {
    const response = { type: "success", payload };
    socket.emit(eventName, response);
};
exports.withSuccess = withSuccess;
const withError = (socket) => (eventName, payload) => {
    const response = { type: "success", payload };
    socket.emit(eventName, response);
};
exports.withError = withError;
//# sourceMappingURL=response.js.map