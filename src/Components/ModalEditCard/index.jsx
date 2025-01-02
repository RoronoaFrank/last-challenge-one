import { useState, useEffect } from "react";
import { updateCard } from "../APIs";
import useCategoryContext from "../CustomHooks/useCategoryContext";
import styled from "styled-components";
import CustomSelect from "./CustomSelect";
import PropTypes from "prop-types";

const StylizedDialog = styled.dialog`
  width: 450px;
  height: 520px;
  border: 2px solid #8b4513;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(26, 20, 16, 0.4);
  padding: 1rem;
  background-color: #2a2018;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  margin: 0;

  &::backdrop {
    background: rgba(26, 20, 16, 0.85);
  }

  h2 {
    margin-bottom: 0.5rem;
    font-size: 1.8rem;
    text-align: center;
    color: #c9a959;
    font-family: "Cinzel", serif;
    letter-spacing: 1px;
  }

  .close {
    background-color: #8b4513;
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #e8dcc4;
    position: absolute;
    top: 10px;
    right: 10px;
    border-radius: 50%;
    border: 1px solid #c9a959;
    transition: all 0.3s ease;

    &:hover {
      background-color: #a65d3f;
      transform: rotate(90deg);
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    font-size: 0.9rem;
    font-weight: 500;
    color: #e8dcc4;
    font-family: "Alegreya", serif;
  }

  textarea {
    width: 100%;
    padding: 0.5rem;
    background-color: #1a1410;
    border: 1px solid #8b4513;
    border-radius: 4px;
    font-size: 1rem;
    font-family: "Alegreya Sans", sans-serif;
    color: #e8dcc4;
    resize: none;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: #c9a959;
      box-shadow: 0 0 5px rgba(201, 169, 89, 0.3);
    }

    &::placeholder {
      color: #a69276;
    }

    &::-webkit-scrollbar {
      width: 8px;
      background-color: rgba(42, 32, 24, 0.3);
    }

    &::-webkit-scrollbar-thumb {
      background-color: #c9a959;
      border-radius: 4px;

      &:hover {
        background-color: #e2c792;
      }
    }

    &::-webkit-scrollbar-track {
      background-color: rgba(139, 69, 19, 0.2);
      border-radius: 4px;
    }
  }

  input {
    width: 100%;
    padding: 0.5rem;
    background-color: #1a1410;
    border: 1px solid #8b4513;
    border-radius: 4px;
    font-size: 1rem;
    font-family: "Alegreya Sans", sans-serif;
    color: #e8dcc4;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: #c9a959;
      box-shadow: 0 0 5px rgba(201, 169, 89, 0.3);
    }

    &::placeholder {
      color: #a69276;
    }
  }

  .button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }

  button.save,
  button.reset {
    padding: 0.7rem;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-family: "Alegreya Sans", sans-serif;
    transition: all 0.3s ease;
    min-width: 100px;
  }

  .save {
    background-color: #4a6741;
    color: #e8dcc4;

    &:hover {
      background-color: #5b7d52;
      transform: translateY(-2px);
    }
  }

  .reset {
    background-color: #8b4513;
    color: #e8dcc4;

    &:hover {
      background-color: #a65d3f;
      transform: translateY(-2px);
    }
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
  const { categories } = useCategoryContext();
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

        <label htmlFor="category">Categoría</label>
        <CustomSelect
          id="category"
          options={
            safeCategories.length === 0
              ? ["Cargando categorías..."]
              : safeCategories
          }
          value={formData.category}
          onChange={(selectedOption) =>
            handleEdit({ target: { name: "category", value: selectedOption } })
          }
        />

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
