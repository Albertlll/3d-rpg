import { MeshStandardMaterial } from "three";

// Металлический материал для крана
export const craneMaterial = new MeshStandardMaterial({
  color: "#e74c3c", // красный цвет
  metalness: 0.9,   // высокая металличность
  roughness: 0.1,   // низкая шероховатость
  emissive: "#000000" // нет свечения
});

// Улучшенный стеклянный материал
export const glassMaterial = new MeshStandardMaterial({
  color: "#3498db",     // голубой оттенок
  transparent: true,
  opacity: 0.2,         // более прозрачный
  roughness: 0.05,      // почти гладкий
  metalness: 0.1,       // немного металличности для бликов
  envMapIntensity: 1.0  // интенсивность отражения окружающей среды
});

// Материал для основного корпуса
export const bodyMaterial = new MeshStandardMaterial({
  color: "#2c3e50",     // темно-синий
  metalness: 0.3,       // средняя металличность
  roughness: 0.4        // средняя шероховатость
});

// Материал для панели управления
export const controlPanelMaterial = new MeshStandardMaterial({
  color: "#34495e",     // серо-синий
  metalness: 0.2,       // низкая металличность
  roughness: 0.6        // более шероховатая поверхность
});