"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploaderService = void 0;
const fs = __importStar(require("fs")); // Import fs module
const imagekit_1 = __importDefault(require("imagekit"));
const multer_1 = __importDefault(require("multer"));
const path = __importStar(require("path")); // Import path module
const config_1 = __importDefault(require("../config"));
const imagekit = new imagekit_1.default({
    publicKey: config_1.default.imgKit.publicKey,
    privateKey: config_1.default.imgKit.privateKey,
    urlEndpoint: config_1.default.imgKit.urlEndpoint,
});
const storage = multer_1.default.diskStorage({
    // The directory where the file will be uploaded to.
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    // The name of the file.
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
const fileUploadToImageKit = (file) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const normalizedPath = path.normalize(file.path).replace(/\\/g, '/');
        // Normalize and replace backslashes
        // Read the file content
        const fileContent = fs.readFileSync(normalizedPath);
        imagekit.upload({
            file: fileContent, // Pass the file content
            fileName: file.originalname, // required
            tags: ['tag1', 'tag2'],
        }, (error, result) => {
            fs.unlinkSync(normalizedPath); // Ensure we use the normalized path here as well
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        });
    });
});
exports.FileUploaderService = {
    fileUploadToImageKit,
    upload,
};
