import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postCard } from "../APIs";
import styled from "styled-components";


const FormContainer = styled.div`
 width: 90%;
 max-width: 1200px;
 height: 100vh;
 margin: 1rem auto;
 padding: 1rem;
 background-color: #2A2018;
 border-radius: 12px;
 box-shadow: 0 4px 12px rgba(74, 103, 65, 0.5);
 color: #E8DCC4;
 border: 1px solid #8B4513;

 h2 {
   font-family: 'Cinzel', serif;
   text-align: center;
   margin-bottom: 1.5rem;
   color: #C9A959;
   font-size: 2rem;
   letter-spacing: 1px;
 }

 form {
   display: grid;
   grid-template-columns: repeat(2, 1fr);
   gap: 1rem;

   label {
     font-family: 'Alegreya', serif;
     margin-top: 0.5rem;
     color: #C9A959;
   }

   input,
   textarea,
   select {
     width: 100%;
     margin-top: 0.5rem;
     padding: 0.5rem;
     border: 1px solid #8B4513;
     border-radius: 6px;
     background-color: #1A1410;
     color: #E8DCC4;
     font-family: 'Alegreya Sans', sans-serif;
     transition: all 0.3s ease;

     &:focus {
       border-color: #C9A959;
       outline: none;
       box-shadow: 0 0 8px rgba(201, 169, 89, 0.3);
     }
   }

   textarea {
     grid-column: span 2;
     min-height: 100px;
     resize: none;

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

   .button-group {
     grid-column: span 2;
     display: flex;
     justify-content: center;
     gap: 4rem;
     margin-top: 2rem;

     button {
       padding: 0.8rem 1rem;
       border: none;
       border-radius: 6px;
       cursor: pointer;
       transition: all 0.3s ease;
       font-family: 'Alegreya Sans', sans-serif;
       font-size: 1rem;
       min-width: 150px;
     }

     .save {
       background-color: #4A6741;
       color: #E8DCC4;

       &:hover {
         background-color: #5B7D52;
         transform: translateY(-2px);
       }
     }

     .cancel {
       background-color: #8B4513;
       color: #E8DCC4;

       &:hover {
         background-color: #A65D3F;
         transform: translateY(-2px);
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
    urlImage: "",
    urlVideo: "",
    description: "",
  });
  // Manejar los cambios en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar los datos al servidor
      await postCard(formData);
      alert("Video agregado exitosamente");

      // Reiniciar el formulario
      setFormData({
        title: "",
        category: "",
        urlImage: "",
        urlVideo: "",
        description: "",
      });
    } catch (error) {
      console.error("Error al agregar el video:", error);
      alert("Hubo un error al agregar el video");
    }
    navigate("/");
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
          <option value="Origenes">Origenes</option>
          <option value="Dragones & Tierra Media">Dragones & Tierra Media</option>
          <option value="Historias individuales">Historias individuales</option>
          <option value="Razas de la Tierra Media">Razas de la Tierra Media</option>
        </select>

        <label htmlFor="urlImage">URL de Imagen</label>
        <input
          type="url"
          id="urlImage"
          name="urlImage"
          placeholder="URL de la imagen"
          value={formData.urlImage}
          onChange={handleChange}
          required
        />

        <label htmlFor="urlVideo">URL de Video</label>
        <input
          type="url"
          id="urlVideo"
          name="urlVideo"
          placeholder="URL del video"
          value={formData.urlVideo}
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
