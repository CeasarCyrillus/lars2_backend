"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const error_1 = require("../error");
const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).send({ result: "failure", error: error_1.unknownError });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map