import React, { createContext, useState, useCallback } from "react";

export const UnitContext = createContext();

export const UnitProvider = ({ children }) => {
  // Initialize with localStorage or default to Celsius
  const [unit, setUnit] = useState(() => {
    const savedUnit = localStorage.getItem("temperatureUnit");
    return savedUnit || "C";
  });

  const toggleUnit = useCallback(() => {
    setUnit((prevUnit) => {
      const newUnit = prevUnit === "C" ? "F" : "C";
      localStorage.setItem("temperatureUnit", newUnit);
      return newUnit;
    });
  }, []);

  const value = { unit, toggleUnit };

  return (
    <UnitContext.Provider value={value}>{children}</UnitContext.Provider>
  );
};

export const useUnit = () => {
  const context = React.useContext(UnitContext);
  if (!context) {
    throw new Error("useUnit must be used within UnitProvider");
  }
  return context;
};
