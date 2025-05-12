import { Router } from "express";
import { addComment, getCommentaries, deleteCommentary } from "./commentary.controller.js";

const router = Router();

router.post("/addCommentary/:publicationId/", addComment);
router.get("/getComentaries/:publicationId", getCommentaries);
router.delete("/deleteCommentary/:id", deleteCommentary);

export default router;