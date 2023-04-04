import { Router } from 'express';
import { __dirname } from '../path.js';

import { routerProduct } from './products.routes.js';
import { routerViews } from './views.routes.js';
import { routerUpload } from './upload.routes.js';
import { routerCarts } from './carts.routes.js';
import { routerUser } from './user.routes.js';
import { routerSession } from './sessions.routes.js';
import { routerGithub } from "./github.routes.js";

const router = Router()


//Routes
router.use('/', routerViews);
router.use('/upload', routerUpload);
router.use('/api/products', routerProduct);
router.use('/api/carts', routerCarts);
router.use('/api/user', routerUser);
router.use('/api/session', routerSession);
router.use('/auth/github', routerGithub);

export default router;