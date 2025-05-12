import Commentary from './commentary.model.js';
import Publication from '../publication/publication.model.js';

export const addComment = async (req, res) => {
  try {
    const { publicationId } = req.params;
    const { author, content } = req.body;

    const publication = await Publication.findById(publicationId);
    if (!publication) {
      return res.status(404).json({
        success: false,
        message: "Publicación no encontrada",
      });
    }

    const commentary = new Commentary({ author, content, publication: publicationId });
    await commentary.save();

    res.status(201).json({
      success: true,
      message: "Comentario agregado exitosamente",
      commentary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al agregar el comentario",
      error: error.message,
    });
  }
};

export const getCommentaries = async (req, res) => {
  try {
    const { publicationId } = req.params;

    const publication = await Publication.findById(publicationId);
    if (!publication) {
      return res.status(404).json({
        success: false,
        message: "Publicación no encontrada",
      });
    }

    const comments = await Commentary.find({ publication: publicationId })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener los comentarios",
      error: error.message,
    });
  }
};

export const deleteCommentary = async (req, res) => {
  try {
    const { id } = req.params;

    const commentary = await Commentary.findByIdAndDelete(id);
    if (!commentary) {
      return res.status(404).json({
        success: false,
        message: "Comentario no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      message: "Comentario eliminado exitosamente",
      deletedCommentary: {
        id: commentary._id,
        author: commentary.author,
        content: commentary.content,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al eliminar el comentario",
      error: error.message,
    });
  }
};