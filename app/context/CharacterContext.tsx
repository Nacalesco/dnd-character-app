// app/context/CharacterContext.tsx
import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Character = {
  basicInfo: {
    name: string;
    class: string;
    race: string;
    level: number;
    background: string;
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
  };
  inventory?: {
    name: string;
    quantity: number;
    weight: number;
    description?: string;
  }[];
  skills: {
    [key: string]: {
      proficient: boolean;
      expertise: boolean;
    };
  };
  spells: {
    [level: number]: {
      name: string;
      level: number;
      castingTime: string;
      range: string;
      components: string;
      duration: string;
      description: string;
      prepared: boolean;
    }[];
  };
  spellSlots: {
    [level: number]: number;
  };
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
  },
  skills: {},
  spells: {},
  spellSlots: {}
};

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export function CharacterProvider({ children }: { children: React.ReactNode }) {
  const [character, setCharacter] = useState<Character>(initialCharacter);

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