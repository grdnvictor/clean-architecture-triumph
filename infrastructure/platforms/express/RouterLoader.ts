/*
 * Code récupéré ici : https://dev.to/dhinesh03/organizing-express-routes-with-a-route-loader-l73
 */

import { Router } from 'express';
import * as glob from 'fast-glob';
import * as fs from 'fs';
import * as path from 'path';

export default async function RouteLoader(globPattern) {
    let router = Router();
    let files = [];
    try {
        files = await glob(globPattern);
    } catch (error) {
        console.error(error);
    }

    for (const file of files) {
        if (fs.statSync(file).isFile() && path.extname(file).toLowerCase() === '.js') {
            try {
                const routeModule = await import(path.resolve(file));
                router = (routeModule.default || routeModule)(router);
            } catch (e) {
                console.error(e);
                throw new Error(`Error when loading route file: ${file} [ ${e.toString()} ]`);
            }
        }
    }

    return router;
}