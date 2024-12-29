import { useState, useEffect } from "react";
import { updateCard } from "../APIs";
import useCategoryContext from "../CustomHooks/useCategoryContext";
import styled from "styled-components";
import PropTypes from "prop-types";

const StylizedDialog = styled.dialog`
  width: 400px;
  height: 500px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  background-color: #ffffff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  margin: 0;

  h2 {
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
    text-align: center;
    color: #2a2a42;
  }

  .close {
    background-color: #ff4c4c;
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    position: fixed;
    top: 10px;
    right: 10px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    font-size: 0.9rem;
    font-weight: bold;
    color: #555;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    resize: none;
  }

  button {
    padding: 0.7rem;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .save {
    background-color: #2a2a42;
    color: white;
  }

  .reset {
    background-color: #f5f5f5;
    color: #555;
  }

  .button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }
`;

const ModalEditCard = ({
  isOpen,
  onClose,
  id,
  title,
  category,
  image,
  video,
  description,
  onEditSuccess,
}) => {
  const { categories}  = useCategoryContext();
  const categoryNames = categories.map((category) => category.name);

  const safeCategories = Array.isArray(categoryNames) ? categoryNames : [];

  // Estado del formulario inicializado con una función para mayor eficiencia
  const [formData, setFormData] = useState(() => ({
    title: title || "",
    category: category || "",
    image: image || "",
    video: video || "",
    description: description || "",
  }));

  useEffect(() => {
    if (isOpen) {
      // Restaurar valores al abrir el modal
      setFormData({
        title: title || "",
        category: category || "",
        image: image || "",
        video: video || "",
        description: description || "",
      });
    }
  }, [isOpen, title, category, image, video, description]);

  const handleEdit = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData({
      title: title || "",
      category: category || "",
      image: image || "",
      video: video || "",
      description: description || "",
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const updatedCard = { ...formData, id };
      await updateCard(id, updatedCard); 
      onEditSuccess(updatedCard);
      onClose();
    } catch (error) {
      console.error("Error updating video:", error);
    }
  };

  return (
    <StylizedDialog open={isOpen}>
      <button
        type="button"
        className="close"
        onClick={() => {
          onClose();
          handleReset();
        }}
      >
        ×
      </button>
      <h2>Editar Card</h2>

      <form onSubmit={handleSave}>
        <label htmlFor="title">Titulo</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleEdit}
          required
        />

        <label htmlFor="category">Categoria</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleEdit}
          required
        >
          {safeCategories.length === 0 ? (
    <option value="">Cargando categorías...</option>
  ) : (
    safeCategories.map((safeCategories) => (
      <option key={safeCategories} value={safeCategories}>
        {safeCategories}
      </option>
    ))
  )}
        </select>

        <label htmlFor="image">URL de Imagen</label>
        <input
          type="url"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleEdit}
          required
        />

        <label htmlFor="video">URL de Video</label>
        <input
          type="url"
          id="video"
          name="video"
          value={formData.video}
          onChange={handleEdit}
          required
        />

        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleEdit}
        ></textarea>

        <div className="button-group">
          <button type="submit" className="save">
            Guardar
          </button>
          <button type="button" className="reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </StylizedDialog>
  );
};

ModalEditCard.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  video: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onEditSuccess: PropTypes.func.isRequired,
};

export default ModalEditCard;
