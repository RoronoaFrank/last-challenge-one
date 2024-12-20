import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FormContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #1e1e2e;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: #e2c792;

  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  form {
    display: flex;
    flex-direction: column;

    label {
      margin-top: 1rem;
    }

    input,
    textarea,
    select {
      margin-top: 0.5rem;
      padding: 0.5rem;
      border: 1px solid #e2c792;
      border-radius: 4px;
      background-color: #2a2a42;
      color: #e2c792;
    }

    .button-group {
      display: flex;
      justify-content: space-between;
      margin-top: 1.5rem;

      button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
      }

      .save {
        background-color: #e2c792;
        color: #2a2a42;

        &:hover {
          background-color: #c4a573;
        }
      }

      .cancel {
        background-color: #2a2a42;
        color: #e2c792;

        &:hover {
          background-color: #444466;
        }
      }
    }
  }
`;

const NewVideo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image: "",
    video: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías manejar el envío de datos, por ejemplo, llamando a una API.
    console.log("Nuevo video:", formData);
    navigate("/"); // Redirigir a la página principal después de guardar.
  };

  const handleCancel = () => navigate("/");

  return (
    <FormContainer>
      <h2>Agregar Nuevo Video</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Título</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Ingresa el título"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="category">Categoría</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona una categoría</option>
          <option value="Aperturas de Ajedrez">Aperturas de Ajedrez</option>
          <option value="Tácticas de Ajedrez">Tácticas de Ajedrez</option>
          <option value="Grandes Maestros y Partidas Históricas">
            Grandes Maestros y Partidas Históricas
          </option>
          <option value="Ajedrez y Entretenimiento/Curiosidades">
            Ajedrez y Entretenimiento/Curiosidades
          </option>
        </select>

        <label htmlFor="image">URL de Imagen</label>
        <input
          type="url"
          id="image"
          name="image"
          placeholder="URL de la imagen"
          value={formData.image}
          onChange={handleChange}
          required
        />

        <label htmlFor="video">URL de Video</label>
        <input
          type="url"
          id="video"
          name="video"
          placeholder="URL del video"
          value={formData.video}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          name="description"
          placeholder="Escribe una descripción"
          value={formData.description}
          onChange={handleChange}
        ></textarea>

        <div className="button-group">
          <button type="submit" className="save">
            Guardar
          </button>
          <button type="button" className="cancel" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </FormContainer>
  );
};

export default NewVideo;
