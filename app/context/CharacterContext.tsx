// app/context/CharacterContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definir tipos para características del personaje
type Feature = {
  name: string;
  description: string;
  level?: number; // Para características de clase que se obtienen en ciertos niveles
  source?: 'race' | 'class' | 'background' | 'subrace' | 'custom'; // Fuente de la característica
};

type Character = {
  basicInfo: {
    name: string;
    class: string;
    race: string;
    subrace?: string;
    level: number;
    background: string;
    alignment?: string;
    experience?: number;
  };
  attributes: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  combat: {
    hitPoints: number;
    armorClass: number;
    initiative: number;
    speed: number;
    temporaryHitPoints?: number;
    hitDice?: string;
    deathSaves?: {
      successes: number;
      failures: number;
    };
  };
  inventory?: Array<{
    name: string;
    quantity: number;
    weight: number;
    description?: string;
  }>;
  skills: {
    [key: string]: {
      proficient: boolean;
      expertise: boolean;
    };
  };
  spells: {
    [level: number]: Array<{
      name: string;
      level: number;
      castingTime: string;
      range: string;
      components: string;
      duration: string;
      description: string;
      prepared: boolean;
    }>;
  };
  spellSlots: {
    [level: number]: number;
  };
  features: Feature[]; // Nueva propiedad para almacenar características
  proficiencies?: {
    armor?: string[];
    weapons?: string[];
    tools?: string[];
    savingThrows?: string[];
    languages?: string[];
  };
  notes?: string; // Notas del personaje
};

type CharacterContextType = {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
  saveCharacter: (char: Character) => Promise<void>;
  loadCharacter: () => Promise<void>;
};

const initialCharacter: Character = {
  basicInfo: {
    name: '',
    class: '',
    race: '',
    level: 1,
    background: '',
    alignment: '',
    experience: 0,
  },
  attributes: {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
  },
  combat: {
    hitPoints: 0,
    armorClass: 10,
    initiative: 0,
    speed: 30,
    temporaryHitPoints: 0,
    hitDice: '',
    deathSaves: {
      successes: 0,
      failures: 0,
    },
  },
  skills: {},
  spells: {},
  spellSlots: {},
  features: [], // Inicializamos el array de características vacío
  proficiencies: {
    armor: [],
    weapons: [],
    tools: [],
    savingThrows: [],
    languages: ['Común'],
  },
  notes: '',
};

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export function CharacterProvider({ children }: { children: React.ReactNode }) {
  const [character, setCharacter] = useState<Character>(initialCharacter);

  // Cargar el personaje al inicio
  useEffect(() => {
    loadCharacter();
  }, []);

  const saveCharacter = async (char: Character) => {
    try {
      await AsyncStorage.setItem('currentCharacter', JSON.stringify(char));
    } catch (error) {
      console.error('Error saving character:', error);
    }
  };

  const loadCharacter = async () => {
    try {
      const savedCharacter = await AsyncStorage.getItem('currentCharacter');
      if (savedCharacter) {
        setCharacter(JSON.parse(savedCharacter));
      }
    } catch (error) {
      console.error('Error loading character:', error);
    }
  };

  return (
    <CharacterContext.Provider value={{ character, setCharacter, saveCharacter, loadCharacter }}>
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacter() {
  const context = useContext(CharacterContext);
  if (context === undefined) {
    throw new Error('useCharacter must be used within a CharacterProvider');
  }
  return context;
}