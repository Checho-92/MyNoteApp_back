// routes/noteRoutes.ts
import { Router } from 'express';
import { getAllNotes, getNoteById, createNote, updateNote, deleteNote, getInProcessNotes } from '../controllers/noteControllers'

const router = Router();

router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.get('/inprocess', getInProcessNotes); 
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;
