import { createContext } from "react";
import PropTypes from "prop-types";

const CategoryContext = createContext();

export const CategoryProvider = ({ children, categories }) => {
  return (
    <CategoryContext.Provider value={categories}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;

CategoryProvider.propTypes = {
  children: PropTypes.node.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};
