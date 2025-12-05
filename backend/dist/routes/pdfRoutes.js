"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    try {
        let fileUrl = "";
        if (req.query.url !== undefined) {
            fileUrl = decodeURIComponent(req.query.url);
        }
        //console.log(new Date().toString());
        //const safeName: string = (!req.params.name || req.params.name.length === 0) ? 'document.pdf' : req.params.name;
        //console.log('Name:', safeName);
        //const safeName: string = req.params.name;
        const filePath = node_path_1.default.join(process.cwd(), fileUrl);
        const safeName = getLastSegment(filePath);
        //console.log('filePath', filePath);
        //res.json(filePath);
        node_fs_1.default.stat(filePath, (err, stat) => {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `inline; filename="${encodeURIComponent(safeName)}"`);
            res.setHeader('Content-Length', stat.size.toString());
            res.setHeader('Accept-Ranges', 'bytes');
            res.set({
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
                'Surrogate-Control': 'no-store'
            });
            const stream = node_fs_1.default.createReadStream(filePath);
            stream.on('error', () => res.status(500).end('Read error'));
            stream.pipe(res);
        });
    }
    catch (err) {
        const error = err;
        console.log(error.message);
    }
});
const getLastSegment = (url) => {
    // Split the URL by "/" and filter out any empty strings
    const segments = url.split('/').filter(segment => segment);
    // Return the last segment
    return segments[segments.length - 1];
};
exports.default = router;
