import { createContext, useContext } from "react";
import PropTypes from "prop-types";

const CategoryContext = createContext();

export const CategoryProvider = ({ children, categories }) => {
  return (
    <CategoryContext.Provider value={categories}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategoryContext debe usarse dentro de un CategoryProvider");
  }
  return context;
};


CategoryProvider.propTypes = {
    children: PropTypes.node.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
}