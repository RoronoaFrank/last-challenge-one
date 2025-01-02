import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postCard } from "../APIs";
import CustomSelect from "../ModalEditCard/CustomSelect";
import useCategoryContext from "../CustomHooks/useCategoryContext";
import styled from "styled-components";

const FormContainer = styled.div`
  width: min(90%, 1800px);
  margin: 1rem auto;
  padding: clamp(0.5rem, 3vw, 1rem);
  background-color: #2a2018;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(74, 103, 65, 0.3);
  color: #e8dcc4;
  border: 1px solid #8b4513;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: clamp(0.75rem, 4vw, 1rem);
  font-family: "Cinzel Decorative", serif;
  color: #c9a959;
  font-size: clamp(1.5rem, 5vw, 2rem);
  letter-spacing: 1px;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1rem, 3vw, 1.5rem);

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(0.75rem, 2vw, 1rem);
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(0.2rem, 1vw, 0.3rem);
  flex: 1;
  height: 100%;
`;

const Label = styled.label`
  font-family: "Cinzel", serif;
  color: #c9a959;
  font-size: clamp(0.875rem, 2.5vw, 1rem);
`;

const Input = styled.input`
  padding: clamp(0.6rem, 2vw, 0.8rem);
  border: 1px solid #8b4513;
  border-radius: 6px;
  background-color: #1a1410;
  color: #e8dcc4;
  font-family: "Alegreya", serif;
  width: 100%;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #c9a959;
    box-shadow: 0 0 8px rgba(201, 169, 89, 0.3);
  }
`;

const TextArea = styled.textarea`
  flex: 1;
  min-height: 200px;
  height: 100%;
  padding: clamp(0.75rem, 2vw, 1rem);
  border: 1px solid #8b4513;
  border-radius: 6px;
  background-color: #1a1410;
  color: #e8dcc4;
  font-family: "Alegreya", serif;
  width: 100%;
  resize: none;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #c9a959;
    box-shadow: 0 0 8px rgba(201, 169, 89, 0.3);
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
`;

const ButtonGroup = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: clamp(1rem, 4vw, 4rem);
  margin-top: clamp(1rem, 3vw, 2rem);
`;

const Button = styled.button`
  padding: clamp(0.6rem, 2vw, 0.8rem) clamp(1.5rem, 4vw, 2.5rem);
  border: none;
  border-radius: 6px;
  font-family: "Alegreya Sans", sans-serif;
  font-size: clamp(0.875rem, 2.5vw, 1rem);
  cursor: pointer;
  transition: all 0.3s ease;
  width: clamp(120px, 40%, 200px);

  &.save {
    background-color: #4a6741;
    color: #e8dcc4;

    &:hover {
      background-color: #5b7d52;
      transform: translateY(-2px);
    }
  }

  &.cancel {
    background-color: #8b4513;
    color: #e8dcc4;

    &:hover {
      background-color: #a65d3f;
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
  const categoryNames = categories.map((category) => category.name);
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
  // Manejar el cambio del CustomSelect
  const handleCategoryChange = (selectedOption) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      category: selectedOption,
    }));
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
            <CustomSelect
              options={
                categoryNames.length === 0
                  ? ["Cargando categorías..."]
                  : categoryNames
              }
              value={formData.category}
              onChange={handleCategoryChange}
            />
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
