import { Router } from 'express';
import { createPublication, getAllPublication, getPublicationById, getCoursePublication, deletePublication } from './publication.controller.js';

const router = Router();

router.post('/createPublication', createPublication);
router.get('/publications', getAllPublication);
router.get('/course/:course', getCoursePublication);
router.get('/publication/:publicationId', getPublicationById);
router.delete('/deletePublication/:publicationId', deletePublication);

export default router;