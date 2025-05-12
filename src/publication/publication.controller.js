import Publication from './publication.model.js';
import mongoose from "mongoose";

export const createPublication = async (req, res) =>{
    try{
        const data = req.body;
        const publication = new Publication({
            ...data
        });

        await publication.save();

        res.status(200).json({
            success: true,
            publication,
            message: "Publicación creada exitosamente"
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Error al crear la publicación",
            error: error.message
        })
    }
}

export const getAllPublication = async (req, res) => {
    try {
        const publications = await Publication.find({}, { __v: 0, status: 0 }).sort({ createdAt: -1 }).lean();
        if (!publications.length) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron publicaciones",
      });
    }
        res.status(200).json({
        success: true,
        count: publications.length, 
        publications,
    });
        } catch (error) {
        res.status(500).json({
        success: false,
        message: "Error al obtener las publicaciones",
        error: error.message,
    });
  }
};

export const getPublicationById = async (req, res) => {
    try {
        const { publicationId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(publicationId)) {
            return res.status(400).json({
                success: false,
                message: "El ID proporcionado no es válido",
            });
        }

        const publication = await Publication.findById(publicationId);

        if (!publication) {
            return res.status(404).json({ 
                success: false,
                message: "Publicación no encontrada" 
            });
        }

        res.status(200).json({ 
            success: true,
            data: {
                publication
            }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Error al obtener la publicación",
            error: error.message
        });
    }
};

export const getCoursePublication = async (req, res) =>{
    try{
        const { course } = req.params;

        const publications = await Publication.find({course}).sort({dateCreated: -1});

        res.status(200).json({
            success: true,
            publications
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Error getting publications",
            error: error.message
        })
    }
};

export const deletePublication = async (req, res) => {
  try {
    const { publicationId } = req.params;

    // Validar si el ID es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(publicationId)) {
      return res.status(400).json({
        success: false,
        message: "El ID proporcionado no es válido",
      });
    }

    // Buscar y eliminar la publicación
    const publication = await Publication.findByIdAndDelete(publicationId);

    if (!publication) {
      return res.status(404).json({
        success: false,
        message: "Publicación no encontrada",
      });
    }

    res.status(200).json({
      success: true,
      message: "Publicación eliminada exitosamente",
      deletedPublication: {
        id: publication._id,
        title: publication.title,
        course: publication.course,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al eliminar la publicación",
      error: error.message,
    });
  }
};




