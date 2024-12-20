import { useContext } from "react";
import CategoryContext from "../CategoryContext";

const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error(
      "useCategoryContext debe usarse dentro de un CategoryProvider"
    );
  }
  return context;
};

export default useCategoryContext;
