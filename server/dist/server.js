var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// express and config
import express from 'express';
var app = express();
import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';
import cookieParser from 'cookie-parser';
//Socket
import http from 'http';
import { Server } from 'socket.io';
//Security
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
//Static
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import connectDB from './db/connect.js';
import authRoutes from './routes/authRoutes.js';
import codeBlocksRoutes from './routes/codeBlocksRoutes.js';
import errorHandlerMiddleware from './middleware/errorHandler.js';
var url = import.meta.url;
var __dirname = dirname(fileURLToPath(url));
app.use(express.static(path.resolve(__dirname, '../../client/build')));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
var server = http.createServer(app);
var io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});
io.on('connection', function (socket) {
    console.log("new connection: ".concat(socket.id));
    socket.on('send-message', function (data) {
        io.to(data.roomId).emit('receive_message', { message: data.message });
    });
    socket.on('join_room', function (roomId) {
        socket.join(roomId);
        socket.emit('room_joined', roomId);
    });
    socket.on('disconnect', function () {
        console.log("User disconnected: ".concat(socket.id));
    });
});
app.use('/api/auth', authRoutes);
app.use('/api/codeblocks', codeBlocksRoutes);
app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
});
app.use(errorHandlerMiddleware);
var port = process.env.PORT || 5000;
var start = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, connectDB(process.env.MONGO_URL)];
            case 1:
                _a.sent();
                server.listen(port, function () {
                    console.log("Server listening on port ".concat(port, "..."));
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
start();
//# sourceMappingURL=server.js.map