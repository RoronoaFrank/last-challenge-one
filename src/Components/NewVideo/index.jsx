import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postCard } from "../APIs";
import useCategoryContext from "../CustomHooks/useCategoryContext";
import styled from "styled-components";


const FormContainer = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 1rem auto;
  padding: 1rem;
  background-color: #2A2018;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(74, 103, 65, 0.3);
  color: #E8DCC4;
  border: 1px solid #8B4513;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
  font-family: 'Cinzel Decorative', serif;
  color: #C9A959;
  font-size: 2rem;
  letter-spacing: 1px;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const Label = styled.label`
  font-family: 'Cinzel', serif;
  color: #C9A959;
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #8B4513;
  border-radius: 6px;
  background-color: #1A1410;
  color: #E8DCC4;
  font-family: 'Alegreya', serif;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #C9A959;
    box-shadow: 0 0 8px rgba(201, 169, 89, 0.3);
  }
`;

const Select = styled.select`
  padding: 0.8rem;
  border: 1px solid #8B4513;
  border-radius: 6px;
  background-color: #1A1410;
  color: #E8DCC4;
  font-family: 'Alegreya', serif;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #C9A959;
  }

  option {
    background-color: #2A2018;
  }
`;

const TextArea = styled.textarea`
  height: 300px;
  padding: 1rem;
  border: 1px solid #8B4513;
  border-radius: 6px;
  background-color: #1A1410;
  color: #E8DCC4;
  font-family: 'Alegreya', serif;
  resize: none;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #C9A959;
    box-shadow: 0 0 8px rgba(201, 169, 89, 0.3);
  }

  &::-webkit-scrollbar {
    width: 8px;
    background-color: rgba(42, 32, 24, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: #C9A959;
    border-radius: 4px;
    
    &:hover {
      background-color: #E2C792;
    }
  }
`;

const ButtonGroup = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.8rem 2.5rem;
  border: none;
  border-radius: 6px;
  font-family: 'Alegreya Sans', sans-serif;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &.save {
    background-color: #4A6741;
    color: #E8DCC4;

    &:hover {
      background-color: #5B7D52;
      transform: translateY(-2px);
    }
  }

  &.cancel {
    background-color: #8B4513;
    color: #E8DCC4;

    &:hover {
      background-color: #A65D3F;
      transform: translateY(-2px);
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

const NewVideo = () => {
  const navigate = useNavigate();
  const { categories } = useCategoryContext();
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
  <FormTitle>Agregar Nuevo Video</FormTitle>
  <Form onSubmit={handleSubmit}>
    <LeftColumn>
      <FormGroup>
        <Label htmlFor="title">Título</Label>
        <Input
          type="text"
          id="title"
          name="title"
          placeholder="Ingresa el título"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="category">Categoría</Label>
        <Select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona una categoría</option>
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
        </Select>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="urlImage">URL de Imagen</Label>
        <Input
          type="url"
          id="urlImage"
          name="urlImage"
          placeholder="URL de la imagen"
          value={formData.urlImage}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="urlVideo">URL de Video</Label>
        <Input
          type="url"
          id="urlVideo"
          name="urlVideo"
          placeholder="URL del video"
          value={formData.urlVideo}
          onChange={handleChange}
          required
        />
      </FormGroup>
    </LeftColumn>

    <RightColumn>
      <FormGroup>
        <Label htmlFor="description">Descripción</Label>
        <TextArea
          id="description"
          name="description"
          placeholder="Escribe una descripción"
          value={formData.description}
          onChange={handleChange}
        />
      </FormGroup>
    </RightColumn>

    <ButtonGroup>
      <Button type="submit" className="save">
        Guardar
      </Button>
      <Button type="button" className="cancel" onClick={handleCancel}>
        Cancelar
      </Button>
    </ButtonGroup>
  </Form>
</FormContainer>
  );
};

export default NewVideo;
