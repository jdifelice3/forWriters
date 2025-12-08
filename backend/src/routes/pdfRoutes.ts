import express from "express";
import { Request, Response } from 'express';
import fs from 'node:fs';
import path from 'node:path';

const router = express.Router();

router.get('/', (req: Request<{ name: string}>, res: Response<{}, {}>) => {
    try {
        let fileUrl:string = "";
        if(req.query.url !== undefined){
            fileUrl = decodeURIComponent(req.query.url as string);
        }

        const filePath: string = path.join(process.cwd(), fileUrl);
        const safeName = getLastSegment(filePath);
        fs.stat(filePath, (err, stat) => {

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

            const stream = fs.createReadStream(filePath);

            stream.on('error', () => res.status(500).end('Read error'));
            stream.pipe(res);
        });
    } catch (err: unknown) {
        const error = err as Error;
        console.error(error.message);
    }
});

const getLastSegment = (url: string) => {
    // Split the URL by "/" and filter out any empty strings
    const segments = url.split('/').filter(segment => segment);
    // Return the last segment
    return segments[segments.length - 1];
}

export default router;