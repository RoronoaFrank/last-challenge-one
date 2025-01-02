import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import propTypes from "prop-types";

const StyledCustomSelect = styled.div`
  .custom-dropdown {
    position: relative;
    width: 100%;
    font-family: "Alegreya Sans", sans-serif;
  }

  .custom-dropdown__selected {
    background-color: #1a1410;
    color: #e8dcc4;
    padding: 0.8rem;
    border: 1px solid#8b4513;
    border-radius: 0.5rem;
    cursor: pointer;
    text-align: left;
    position: relative;

    &:hover{
      border-color: #c9a959;
    }
  }

  .custom-dropdown__selected:hover {
    background-color: #2a2018;
  }

  .custom-dropdown__selected::after {
  content: "▼";
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.8rem;
  color: #e8dcc4;
  pointer-events: none;
}

  .custom-dropdown__options {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #1a1410;
    border: 1px solid #c9a959;
    border-radius: 0.5rem;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
    list-style: none;
    margin: 0;
    padding: 0;

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

  .custom-dropdown__option {
    padding: 0.8rem;
    color: #e8dcc4;
    cursor: pointer;
  }

  .custom-dropdown__option:hover {
    background-color: #2a2018;
    color: #c9a959;
  }
`;

const CustomSelect = ({ options, value, onChange, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <StyledCustomSelect>
    <div className="custom-dropdown" ref={dropdownRef}>
      <select
        id={id}
        value={value}
        onChange={(e) => handleOptionClick(e.target.value)}
        style={{ display: "none" }}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div
        className="custom-dropdown__selected"
        onClick={handleToggleDropdown}
        tabIndex={0}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={id}
      >
        {value || "Seleccione una opción"}
      </div>
      {isOpen && (
        <ul className="custom-dropdown__options" role="listbox">
          {options.map((option) => (
            <li
              key={option}
              className="custom-dropdown__option"
              onClick={() => handleOptionClick(option)}
              role="option"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  </StyledCustomSelect>
  );
};

CustomSelect.propTypes = {
  id: propTypes.string,
  options: propTypes.array.isRequired,
  value: propTypes.string,
  onChange: propTypes.func.isRequired,
};

export default CustomSelect;  
