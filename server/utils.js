"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        while (_) try {
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDb = void 0;
// import fs from 'fs';
// import util from 'util';
var node_fetch_1 = __importDefault(require("node-fetch"));
var unsplash_js_1 = __importDefault(require("unsplash-js"));
var dbUtils_1 = require("./dbUtils");
require('dotenv').config();
// @ts-ignore:
global.fetch = node_fetch_1.default;
// @ts-ignore:
var unsplash = new unsplash_js_1.default({ accessKey: process.env.UNSPLASH_ACCESS_KEY });
var getPictures = function (path) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedPath, response, json;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                updatedPath = path.replace(/\s/g, '-');
                return [4 /*yield*/, unsplash.search.photos(path, 1, 1, { orientation: 'landscape' })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                json = _a.sent();
                // const url = `https://api.unsplash.com/photos/?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
                // const response = await fetch(path);
                // const json = await response.json();
                return [2 /*return*/, json.results[0].urls.small];
        }
    });
}); };
exports.updateDb = function (json) { return __awaiter(void 0, void 0, void 0, function () {
    var db, dbArr, updatedData, obj;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dbUtils_1.readFile('../mock_db/stockholm.json')];
            case 1:
                db = _a.sent();
                dbArr = JSON.parse(db);
                return [4 /*yield*/, Promise.all(dbArr.response.venues.map(function (restaurant) { return __awaiter(void 0, void 0, void 0, function () {
                        var picture;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, getPictures(restaurant.categories[0].name)];
                                case 1:
                                    picture = _a.sent();
                                    console.log('PIC', picture);
                                    return [2 /*return*/, __assign(__assign({}, restaurant), { picture: picture })];
                            }
                        });
                    }); }))];
            case 2:
                updatedData = _a.sent();
                console.log(updatedData);
                obj = {
                    meta: {
                        code: 200,
                        requestId: '5f18063a5f54b45329b3543d',
                    },
                    response: {
                        venues: __spreadArrays(updatedData),
                    },
                };
                dbUtils_1.saveToFile('../mock_db/stockholm.json', JSON.stringify(obj));
                return [2 /*return*/];
        }
    });
}); };