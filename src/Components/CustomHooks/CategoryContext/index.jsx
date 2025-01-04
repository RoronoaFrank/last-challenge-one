import { createContext, useState } from "react";
import PropTypes from "prop-types";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([
    {
      name: "Origenes",
      description: "Desde la Música de los Ainur hasta la forja de los Silmarils: descubre los mitos que dieron vida a Arda y los eventos que forjaron el destino de la Tierra Media.",
      image: "/assets/origenes.png"
    },
    {
      name: "Dragones & Tierra Media",
      description: "Contempla el poder y terror de Glaurung, Ancalagon y las antiguas serpientes de Morgoth. Historias de las bestias más temibles que jamás surcaron los cielos de Arda.",
      image: "/assets/dragones.png"
    },
    {
      name: "Historias individuales",
      description: "Desde la sabiduría de Gandalf hasta el legado de Aragorn, pasando por el terror de Morgoth: descubre las historias de los personajes que moldearon el destino de la Tierra Media.",
      image: "/assets/morgoth.png"
    },
    {
      name: "Razas de la Tierra Media",
      description: "Explora la majestuosidad de los Elfos, la resistencia de los Enanos, el valor de los Hombres y la singular naturaleza de cada pueblo que habitó estas tierras legendarias.",
      image: "/assets/razas.png"
    }
  ]);

  const value = { categories, setCategories };
  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

CategoryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CategoryContext;
