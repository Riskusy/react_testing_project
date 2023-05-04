// createContext создает глобальное хранилище данных
// избегая передачи от родителя к ребенку
import { createContext } from "react";


export const AuthContext = createContext(null)