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

const ModalEditCard = ({ isOpen, onClose }) => {
  const categories = useCategoryContext();
  return (
    <StylizedDialog open={isOpen}>
      <button type="button" className="close" onClick={onClose}>
        &times;
      </button>
      <h2>Editar Card</h2>

      <form>
        <label htmlFor="title">Título</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Ingresa el título"
          required
        />

        <label htmlFor="category">Categoría</label>
        <select id="category" name="category" required>
          <option value="">Selecciona una categoría</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label htmlFor="image">URL de Imagen</label>
        <input
          type="url"
          id="image"
          name="image"
          placeholder="URL de la imagen"
          required
        />

        <label htmlFor="video">URL de Video</label>
        <input
          type="url"
          id="video"
          name="video"
          placeholder="URL del video"
          required
        />

        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          name="description"
          placeholder="Escribe una descripción"
        ></textarea>

        <div className="button-group">
          <button type="submit" className="save">
            Guardar
          </button>
          <button type="reset" className="reset">
            Limpiar
          </button>
        </div>
      </form>
    </StylizedDialog>
  );
};

ModalEditCard.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalEditCard;
