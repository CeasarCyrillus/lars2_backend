"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_http_1 = require("node:http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const jwt_simple_1 = require("jwt-simple");
const jwt_1 = require("./lib/jwt");
const response_1 = require("./lib/response");
const fakeData_1 = require("./fakeData");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const server = (0, node_http_1.createServer)(app);
const io = new socket_io_1.Server(server, { cors: {
        origin: "http://localhost:3000"
    } });
const userEvent = "user";
const validateAuthenticationEvent = "validateAuthentication";
const reportsEvent = "reports";
const loginEvent = "login";
const teamsEvent = "teams";
io.on("connection", (socket) => {
    console.log("CONNECTION!");
    const success = (0, response_1.withSuccess)(socket);
    const failure = (0, response_1.withError)(socket);
    const authorized = (0, jwt_1.withAuthorization)(socket);
    authorized(userEvent, (user) => {
        return { email: "email.com", name: user.name };
    });
    authorized(reportsEvent, () => {
        return [fakeData_1.fakeReportDto1, fakeData_1.fakeReportDto2, fakeData_1.fakeReportDto3, fakeData_1.fakeReportDto4];
    });
    authorized(teamsEvent, () => {
        return [fakeData_1.team];
    });
    socket.on(validateAuthenticationEvent, (authHeader) => {
        const authorized = (0, jwt_1.isAuthorized)(authHeader);
        if (authorized) {
            socket.data.auth = authHeader;
        }
        success(validateAuthenticationEvent, authorized);
    });
    socket.on(loginEvent, (message) => {
        const user = { email: message.username + "@email.com", name: message.username };
        const token = (0, jwt_simple_1.encode)(user, jwt_1.jwtSecretKey);
        const authHeader = { token };
        socket.data.auth = authHeader;
        success(loginEvent, authHeader);
    });
});
const port = 3001;
server.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map