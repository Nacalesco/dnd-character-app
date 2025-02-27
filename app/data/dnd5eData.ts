// app/data/dnd5eData.ts

// RAZAS
export const races = [
    {
      id: 'dragonborn',
      name: 'Dracónido',
      abilityScores: { strength: 2, charisma: 1 },
      features: [
        { name: 'Linaje Dracónico', description: 'Tienes ascendencia dracónica. Elige un tipo de dragón de la tabla Ascendencia Dracónica.' },
        { name: 'Aliento de Dragón', description: 'Puedes usar tu acción para exhalar energía destructiva. Tu linaje dracónico determina el tamaño, la forma y el tipo de daño que causa tu arma de aliento.' },
        { name: 'Resistencia al Daño', description: 'Tienes resistencia al tipo de daño asociado con tu linaje dracónico.' }
      ],
      speed: 30,
      languages: ['Común', 'Dracónico']
    },
    {
      id: 'dwarf',
      name: 'Enano',
      abilityScores: { constitution: 2 },
      features: [
        { name: 'Visión en la Oscuridad', description: 'Puedes ver en la oscuridad hasta una distancia de 60 pies.' },
        { name: 'Resistencia Enana', description: 'Tienes ventaja en las tiradas de salvación contra venenos y tienes resistencia al daño por veneno.' },
        { name: 'Entrenamiento de Combate Enano', description: 'Tienes competencia con el hacha de batalla, hacha de mano, martillo de guerra y martillo ligero.' },
        { name: 'Competencia con Herramientas', description: 'Adquieres competencia con las herramientas de artesano de tu elección: herramientas de herrero, suministros de cervecero o herramientas de albañil.' },
        { name: 'Afinidad con la Piedra', description: 'Siempre que hagas una prueba de Inteligencia (Historia) relacionada con el origen de una obra de albañilería, se considera que tienes competencia con la habilidad de Historia y añades el doble de tu bonificador por competencia a la prueba, en lugar de tu bonificador por competencia normal.' }
      ],
      subraces: [
        {
          id: 'hill_dwarf',
          name: 'Enano de las Colinas',
          abilityScores: { wisdom: 1 },
          features: [
            { name: 'Dureza Enana', description: 'Tu máximo de puntos de golpe aumenta en 1, y aumenta en 1 cada vez que ganas un nivel.' }
          ]
        },
        {
          id: 'mountain_dwarf',
          name: 'Enano de las Montañas',
          abilityScores: { strength: 2 },
          features: [
            { name: 'Entrenamiento con Armadura Enana', description: 'Tienes competencia con las armaduras ligeras y medianas.' }
          ]
        }
      ],
      speed: 25,
      languages: ['Común', 'Enano']
    },
    {
      id: 'elf',
      name: 'Elfo',
      abilityScores: { dexterity: 2 },
      features: [
        { name: 'Visión en la Oscuridad', description: 'Puedes ver en la oscuridad hasta una distancia de 60 pies.' },
        { name: 'Sentidos Agudos', description: 'Tienes competencia en la habilidad de Percepción.' },
        { name: 'Linaje Feérico', description: 'Tienes ventaja en las tiradas de salvación contra el encantamiento y la magia no puede dormirte.' },
        { name: 'Trance', description: 'Los elfos no necesitan dormir. En vez de eso, meditan profundamente durante 4 horas al día.' }
      ],
      subraces: [
        {
          id: 'high_elf',
          name: 'Alto Elfo',
          abilityScores: { intelligence: 1 },
          features: [
            { name: 'Entrenamiento con Armas Élficas', description: 'Tienes competencia con la espada larga, espada corta, arco corto y arco largo.' },
            { name: 'Truco', description: 'Conoces un truco de tu elección de la lista de hechizos del mago. La Inteligencia es tu característica de lanzamiento de conjuros para este truco.' },
            { name: 'Idioma Adicional', description: 'Puedes hablar, leer y escribir un idioma adicional de tu elección.' }
          ]
        },
        {
          id: 'wood_elf',
          name: 'Elfo del Bosque',
          abilityScores: { wisdom: 1 },
          features: [
            { name: 'Entrenamiento con Armas Élficas', description: 'Tienes competencia con la espada larga, espada corta, arco corto y arco largo.' },
            { name: 'Pies Ligeros', description: 'Tu velocidad base a pie es de 35 pies.' },
            { name: 'Máscara de la Naturaleza', description: 'Puedes intentar esconderte incluso cuando estás sólo ligeramente oscurecido por el follaje, la lluvia intensa, la nieve que cae, la niebla u otros fenómenos naturales.' }
          ],
          speed: 35
        },
        {
          id: 'drow',
          name: 'Elfo Oscuro (Drow)',
          abilityScores: { charisma: 1 },
          features: [
            { name: 'Visión en la Oscuridad Superior', description: 'Tu visión en la oscuridad tiene un alcance de 120 pies.' },
            { name: 'Sensibilidad a la Luz Solar', description: 'Tienes desventaja en las tiradas de ataque y en las pruebas de Sabiduría (Percepción) que se basan en la vista cuando tú, el objetivo de tu ataque o lo que estás intentando percibir están bajo la luz solar directa.' },
            { name: 'Magia Drow', description: 'Conoces el truco prestidigitación. Cuando alcanzas el nivel 3, puedes lanzar el conjuro hechizar una vez, y recuperas la capacidad de hacerlo cuando completas un descanso prolongado. Cuando alcanzas el nivel 5, puedes lanzar el conjuro oscuridad una vez, y recuperas la capacidad de hacerlo cuando completas un descanso prolongado. La Carisma es tu característica de lanzamiento de conjuros para estos hechizos.' },
            { name: 'Entrenamiento con Armas Drow', description: 'Tienes competencia con las ballestas de mano, espadas cortas y espadas largas.' }
          ]
        }
      ],
      speed: 30,
      languages: ['Común', 'Élfico']
    },
    {
      id: 'gnome',
      name: 'Gnomo',
      abilityScores: { intelligence: 2 },
      features: [
        { name: 'Visión en la Oscuridad', description: 'Puedes ver en la oscuridad hasta una distancia de 60 pies.' },
        { name: 'Astucia Gnoma', description: 'Tienes ventaja en todas las tiradas de salvación de Inteligencia, Sabiduría y Carisma contra la magia.' }
      ],
      subraces: [
        {
          id: 'forest_gnome',
          name: 'Gnomo del Bosque',
          abilityScores: { dexterity: 1 },
          features: [
            { name: 'Ilusionista Natural', description: 'Conoces el truco ilusión menor. La Inteligencia es tu característica de lanzamiento de conjuros para este truco.' },
            { name: 'Hablar con las Bestias Pequeñas', description: 'A través de sonidos y gestos, puedes comunicar ideas simples a animales pequeños o más pequeños.' }
          ]
        },
        {
          id: 'rock_gnome',
          name: 'Gnomo de la Roca',
          abilityScores: { constitution: 1 },
          features: [
            { name: 'Conocimiento de Artificiero', description: 'Siempre que hagas una prueba de Inteligencia (Historia) relacionada con objetos mágicos, alquímicos o tecnológicos, añades el doble de tu bonificador por competencia, en lugar de cualquier bonificador por competencia que normalmente apliques.' },
            { name: 'Manitas', description: 'Tienes competencia con las herramientas de artesano (herramientas de chapucero). Usando esas herramientas, puedes dedicar 1 hora y 10 po en materiales para construir un mecanismo Diminuto (CA 5, 1 pg).' }
          ]
        }
      ],
      speed: 25,
      languages: ['Común', 'Gnomo']
    },
    {
      id: 'half-elf',
      name: 'Semielfo',
      abilityScores: { charisma: 2, choice: { count: 2, amount: 1 } }, // Permite elegir 2 habilidades para aumentar en 1
      features: [
        { name: 'Visión en la Oscuridad', description: 'Puedes ver en la oscuridad hasta una distancia de 60 pies.' },
        { name: 'Linaje Feérico', description: 'Tienes ventaja en las tiradas de salvación contra ser encantado y la magia no puede dormirte.' },
        { name: 'Versatilidad en Habilidades', description: 'Obtienes competencia en dos habilidades de tu elección.' }
      ],
      speed: 30,
      languages: ['Común', 'Élfico', 'Uno a elección']
    },
    {
      id: 'halfling',
      name: 'Mediano',
      abilityScores: { dexterity: 2 },
      features: [
        { name: 'Suerte', description: 'Cuando obtienes un 1 en el dado de un d20 para una tirada de ataque, prueba de característica o tirada de salvación, puedes volver a tirar el dado y debes usar el nuevo resultado.' },
        { name: 'Valiente', description: 'Tienes ventaja en las tiradas de salvación contra el miedo.' },
        { name: 'Agilidad de Mediano', description: 'Puedes moverte a través del espacio de cualquier criatura que tenga un tamaño mayor que el tuyo.' }
      ],
      subraces: [
        {
          id: 'lightfoot_halfling',
          name: 'Mediano Piesligeros',
          abilityScores: { charisma: 1 },
          features: [
            { name: 'Sigiloso por Naturaleza', description: 'Puedes intentar esconderte incluso cuando solo estás oculto por una criatura que sea al menos una talla más grande que tú.' }
          ]
        },
        {
          id: 'stout_halfling',
          name: 'Mediano Fornido',
          abilityScores: { constitution: 1 },
          features: [
            { name: 'Resistencia de los Fornidos', description: 'Tienes ventaja en las tiradas de salvación contra veneno y tienes resistencia al daño por veneno.' }
          ]
        }
      ],
      speed: 25,
      languages: ['Común', 'Mediano']
    },
    {
      id: 'half-orc',
      name: 'Semiorco',
      abilityScores: { strength: 2, constitution: 1 },
      features: [
        { name: 'Visión en la Oscuridad', description: 'Puedes ver en la oscuridad hasta una distancia de 60 pies.' },
        { name: 'Amenazador', description: 'Tienes competencia en la habilidad de Intimidación.' },
        { name: 'Resistencia Implacable', description: 'Cuando te reducen a 0 puntos de golpe pero no te matan, puedes caer a 1 punto de golpe en su lugar. No puedes volver a usar este rasgo hasta que completes un descanso prolongado.' },
        { name: 'Ataques Salvajes', description: 'Cuando haces un golpe crítico con un ataque de arma cuerpo a cuerpo, puedes tirar uno de los dados de daño del arma una vez más y añadirlo al daño adicional causado por el golpe crítico.' }
      ],
      speed: 30,
      languages: ['Común', 'Orco']
    },
    {
      id: 'human',
      name: 'Humano',
      abilityScores: { strength: 1, dexterity: 1, constitution: 1, intelligence: 1, wisdom: 1, charisma: 1 },
      features: [],
      speed: 30,
      languages: ['Común', 'Uno a elección']
    },
    {
      id: 'tiefling',
      name: 'Tiefling',
      abilityScores: { charisma: 2, intelligence: 1 },
      features: [
        { name: 'Visión en la Oscuridad', description: 'Puedes ver en la oscuridad hasta una distancia de 60 pies.' },
        { name: 'Resistencia Infernal', description: 'Tienes resistencia al daño por fuego.' },
        { name: 'Herencia Infernal', description: 'Conoces el truco taumaturgia. Cuando alcanzas el nivel 3, puedes lanzar el conjuro reprensión infernal como un hechizo de nivel 2 una vez con este rasgo y recuperas la capacidad de hacerlo cuando completas un descanso prolongado. Cuando alcanzas el nivel 5, puedes lanzar el conjuro oscuridad una vez con este rasgo y recuperas la capacidad de hacerlo cuando completas un descanso prolongado. La Carisma es tu característica de lanzamiento de conjuros para estos hechizos.' }
      ],
      speed: 30,
      languages: ['Común', 'Infernal']
    }
  ];
  
  // CLASES
  export const classes = [
    {
      id: 'barbarian',
      name: 'Bárbaro',
      primaryAbility: 'strength',
      hitDie: 'd12',
      savingThrows: ['strength', 'constitution'],
      armorProficiencies: ['light', 'medium', 'shields'],
      weaponProficiencies: ['simple', 'martial'],
      skillChoices: {
        count: 2,
        options: ['Atletismo', 'Intimidación', 'Naturaleza', 'Percepción', 'Supervivencia', 'Trato con Animales']
      },
      equipment: [
        { choice: ['Hacha de guerra grande', 'Cualquier arma marcial cuerpo a cuerpo'] },
        { choice: ['Dos hachas de mano', 'Cualquier arma simple'] },
        'Una mochila de explorador y cuatro jabalinas'
      ],
      features: [
        {
          name: 'Furia',
          level: 1,
          description: 'En combate, luchas con una ferocidad primitiva. En tu turno, puedes entrar en furia como una acción adicional.'
        },
        {
          name: 'Defensa sin Armadura',
          level: 1,
          description: 'Mientras no llevas armadura, tu CA es 10 + tu modificador de Destreza + tu modificador de Constitución. Puedes usar un escudo y seguir obteniendo este beneficio.'
        }
      ],
      startingGold: '2d4 × 10',
      startingStats: {
        hitPoints: {
          base: 12,
          perLevel: '1d12'
        }
      }
    },
    {
      id: 'bard',
      name: 'Bardo',
      primaryAbility: 'charisma',
      hitDie: 'd8',
      savingThrows: ['dexterity', 'charisma'],
      armorProficiencies: ['light'],
      weaponProficiencies: ['simple', 'espada corta', 'espada larga', 'estoque', 'ballesta de mano'],
      skillChoices: {
        count: 3,
        options: 'any'
      },
      equipment: [
        { choice: ['Estoque', 'Espada larga', 'Cualquier arma simple'] },
        { choice: ['Un equipo de diplomático', 'Un equipo de entertainero'] },
        { choice: ['Un laúd', 'Cualquier otro instrumento musical'] },
        'Armadura de cuero y una daga'
      ],
      features: [
        {
          name: 'Lanzamiento de Conjuros',
          level: 1,
          description: 'Tienes la capacidad de lanzar conjuros. Carisma es tu característica para lanzar conjuros.'
        },
        {
          name: 'Inspiración Bárdica',
          level: 1,
          description: 'Puedes inspirar a otros a través de palabras estimulantes o música. Para hacerlo, utilizas una acción adicional en tu turno para elegir una criatura distinta a ti mismo dentro del alcance de 60 pies que pueda oírte. Esa criatura obtiene un dado de Inspiración Bárdica, que es un d6.'
        }
      ],
      startingGold: '5d4 × 10',
      startingStats: {
        hitPoints: {
          base: 8,
          perLevel: '1d8'
        }
      }
    },
    {
      id: 'cleric',
      name: 'Clérigo',
      primaryAbility: 'wisdom',
      hitDie: 'd8',
      savingThrows: ['wisdom', 'charisma'],
      armorProficiencies: ['light', 'medium', 'shields'],
      weaponProficiencies: ['simple'],
      skillChoices: {
        count: 2,
        options: ['Historia', 'Intuición', 'Medicina', 'Persuasión', 'Religión']
      },
      equipment: [
        { choice: ['Maza', 'Martillo de guerra (si es competente)'] },
        { choice: ['Cota de escamas', 'Armadura de cuero', 'Cota de malla (si es competente)'] },
        { choice: ['Ballesta ligera y 20 virotes', 'Cualquier arma simple'] },
        { choice: ['Un equipo de sacerdote', 'Un equipo de explorador'] },
        'Un escudo y un símbolo sagrado'
      ],
      features: [
        {
          name: 'Lanzamiento de Conjuros',
          level: 1,
          description: 'Como conducto para el poder divino, puedes lanzar conjuros de clérigo.'
        },
        {
          name: 'Dominio Divino',
          level: 1,
          description: 'Eliges un dominio que está relacionado con tu deidad: Conocimiento, Engaño, Guerra, Luz, Naturaleza, Tempestad o Vida. Tu elección te otorga características de dominio a ciertos niveles.'
        }
      ],
      startingGold: '5d4 × 10',
      startingStats: {
        hitPoints: {
          base: 8,
          perLevel: '1d8'
        }
      }
    },
    {
      id: 'druid',
      name: 'Druida',
      primaryAbility: 'wisdom',
      hitDie: 'd8',
      savingThrows: ['intelligence', 'wisdom'],
      armorProficiencies: ['light', 'medium', 'shields'],
      armorRestrictions: 'no puedes llevar armadura o usar escudos de metal',
      weaponProficiencies: ['clavas', 'dagas', 'dardos', 'jabalinas', 'mazas', 'bastones', 'cimitarras', 'hoces', 'hondas', 'lanzas'],
      toolProficiencies: ['kit de herboristería'],
      skillChoices: {
        count: 2,
        options: ['Arcanos', 'Medicina', 'Naturaleza', 'Percepción', 'Intuición', 'Supervivencia', 'Trato con Animales']
      },
      equipment: [
        { choice: ['Un escudo de madera', 'Cualquier arma simple'] },
        { choice: ['Una cimitarra', 'Cualquier arma cuerpo a cuerpo simple'] },
        'Armadura de cuero, un equipo de explorador y un foco druídico'
      ],
      features: [
        {
          name: 'Druídico',
          level: 1,
          description: 'Conoces Druídico, el idioma secreto de los druidas. Puedes hablar este idioma y usarlo para dejar mensajes ocultos.'
        },
        {
          name: 'Lanzamiento de Conjuros',
          level: 1,
          description: 'Aprovechando la esencia divina de la naturaleza, puedes lanzar conjuros para moldear esa esencia a tu voluntad.'
        }
      ],
      startingGold: '2d4 × 10',
      startingStats: {
        hitPoints: {
          base: 8,
          perLevel: '1d8'
        }
      }
    },
    {
      id: 'fighter',
      name: 'Guerrero',
      primaryAbility: 'strength, dexterity',
      hitDie: 'd10',
      savingThrows: ['strength', 'constitution'],
      armorProficiencies: ['all', 'shields'],
      weaponProficiencies: ['simple', 'martial'],
      skillChoices: {
        count: 2,
        options: ['Acrobacias', 'Atletismo', 'Historia', 'Intimidación', 'Intuición', 'Percepción', 'Supervivencia', 'Trato con Animales']
      },
      equipment: [
        { choice: ['Cota de malla', 'Armadura de cuero, arco largo y 20 flechas'] },
        { choice: ['Un arma marcial y un escudo', 'Dos armas marciales'] },
        { choice: ['Una ballesta ligera y 20 virotes', 'Dos hachas de mano'] },
        { choice: ['Un equipo de explorador', 'Un equipo de aventurero'] }
      ],
      features: [
        {
          name: 'Estilo de Combate',
          level: 1,
          description: 'Adoptas un estilo particular de combate como especialidad. Elige una de las siguientes opciones: Arquería, Defensa, Duelo o Lucha con Dos Armas.'
        },
        {
          name: 'Recuperación',
          level: 1,
          description: 'Tienes una reserva limitada de resistencia física en la que puedes recurrir para protegerte del daño. En tu turno, puedes usar una acción adicional para recuperar un número de puntos de golpe igual a 1d10 + tu nivel de guerrero.'
        }
      ],
      startingGold: '5d4 × 10',
      startingStats: {
        hitPoints: {
          base: 10,
          perLevel: '1d10'
        }
      }
    },
    {
      id: 'monk',
      name: 'Monje',
      primaryAbility: 'dexterity, wisdom',
      hitDie: 'd8',
      savingThrows: ['strength', 'dexterity'],
      weaponProficiencies: ['simple', 'espada corta'],
      toolProficiencies: ['elige un tipo de herramienta de artesano o un instrumento musical'],
      skillChoices: {
        count: 2,
        options: ['Acrobacias', 'Atletismo', 'Historia', 'Intuición', 'Religión', 'Sigilo']
      },
      equipment: [
        { choice: ['Una espada corta', 'Cualquier arma simple'] },
        { choice: ['Un equipo de explorador', 'Un equipo de aventurero'] },
        '10 dardos'
      ],
      features: [
        {
          name: 'Defensa sin Armadura',
          level: 1,
          description: 'Mientras no llevas armadura ni escudo, tu CA es igual a 10 + tu modificador de Destreza + tu modificador de Sabiduría.'
        },
        {
          name: 'Artes Marciales',
          level: 1,
          description: 'Tu entrenamiento en artes marciales te permite usar tu destreza en lugar de fuerza para los ataques y daño con armas de monje, y puedes tirar un d4 en lugar del daño normal para tus ataques sin armas.'
        }
      ],
      startingGold: '5d4',
      startingStats: {
        hitPoints: {
          base: 8,
          perLevel: '1d8'
        }
      }
    },
    {
      id: 'paladin',
      name: 'Paladín',
      primaryAbility: 'strength, charisma',
      hitDie: 'd10',
      savingThrows: ['wisdom', 'charisma'],
      armorProficiencies: ['all', 'shields'],
      weaponProficiencies: ['simple', 'martial'],
      skillChoices: {
        count: 2,
        options: ['Atletismo', 'Intimidación', 'Intuición', 'Medicina', 'Persuasión', 'Religión']
      },
      equipment: [
        { choice: ['Un arma marcial y un escudo', 'Dos armas marciales'] },
        { choice: ['Cinco jabalinas', 'Cualquier arma simple cuerpo a cuerpo'] },
        { choice: ['Un equipo de sacerdote', 'Un equipo de explorador'] },
        'Cota de malla y un símbolo sagrado'
      ],
      features: [
        {
          name: 'Sentido Divino',
          level: 1,
          description: 'La presencia de un mal poderoso se registra en tus sentidos como un olor nauseabundo, y un bien poderoso suena como música celestial en tus oídos.'
        },
        {
          name: 'Imposición de Manos',
          level: 1,
          description: 'Tu toque bendito puede curar heridas. Tienes una reserva de poder curativo que se repone cuando tomas un descanso prolongado. Con esa reserva, puedes restaurar un número total de puntos de golpe igual a tu nivel de paladín × 5.'
        }
      ],
      startingGold: '5d4 × 10',
      startingStats: {
        hitPoints: {
          base: 10,
          perLevel: '1d10'
        }
      }
    },
    {
      id: 'ranger',
      name: 'Explorador',
      primaryAbility: 'dexterity, wisdom',
      hitDie: 'd10',
      savingThrows: ['strength', 'dexterity'],
      armorProficiencies: ['light', 'medium', 'shields'],
      weaponProficiencies: ['simple', 'martial'],
      skillChoices: {
        count: 3,
        options: ['Atletismo', 'Intuición', 'Investigación', 'Naturaleza', 'Percepción', 'Sigilo', 'Supervivencia', 'Trato con Animales']
      },
      equipment: [
        { choice: ['Cota de escamas', 'Armadura de cuero'] },
        { choice: ['Dos espadas cortas', 'Dos armas simples cuerpo a cuerpo'] },
        { choice: ['Un equipo de explorador', 'Un equipo de aventurero'] },
        'Un arco largo y un carcaj con 20 flechas'
      ],
      features: [
        {
          name: 'Enemigo Favorito',
          level: 1,
          description: 'Tienes experiencia estudiando, rastreando, cazando e incluso hablando con cierto tipo de enemigo.'
        },
        {
          name: 'Explorador Natural',
          level: 1,
          description: 'Estás particularmente familiarizado con un tipo de entorno natural y eres capaz de viajar y sobrevivir en tales regiones.'
        }
      ],
      startingGold: '5d4 × 10',
      startingStats: {
        hitPoints: {
          base: 10,
          perLevel: '1d10'
        }
      }
    },
    {
      id: 'rogue',
      name: 'Pícaro',
      primaryAbility: 'dexterity',
      hitDie: 'd8',
      savingThrows: ['dexterity', 'intelligence'],
      armorProficiencies: ['light'],
      weaponProficiencies: ['simple', 'ballestas de mano', 'espadas largas', 'estoques', 'espadas cortas'],
      toolProficiencies: ['herramientas de ladrón'],
      skillChoices: {
        count: 4,
        options: ['Acrobacias', 'Atletismo', 'Engaño', 'Intimidación', 'Investigación', 'Juego de Manos', 'Percepción', 'Persuasión', 'Sigilo', 'Interpretación'
    ]},
    equipment: [
      { choice: ['Estoque', 'Espada corta'] },
      { choice: ['Arco corto y carcaj con 20 flechas', 'Espada corta'] },
      { choice: ['Un equipo de ladrón', 'Un equipo de aventurero', 'Un equipo de explorador'] },
      'Armadura de cuero, dos dagas y herramientas de ladrón'
    ],
    features: [
      {
        name: 'Pericia',
        level: 1,
        description: 'Eliges dos de tus habilidades en las que tengas competencia, o una de esas habilidades y tu competencia con las herramientas de ladrón. Tu bonificador por competencia se duplica para cualquier prueba de característica que hagas usando cualquiera de las habilidades elegidas.'
      },
      {
        name: 'Ataque Furtivo',
        level: 1,
        description: 'Una vez por turno, puedes infligir 1d6 de daño adicional a una criatura que impactes con un ataque si tienes ventaja en la tirada de ataque. El ataque debe usar un arma sutil o a distancia.'
      },
      {
        name: 'Jerga de Ladrones',
        level: 1,
        description: 'Durante tu entrenamiento aprendiste la jerga de ladrones, una mezcla secreta de dialecto, jerga y código que te permite ocultar mensajes en una conversación aparentemente normal.'
      }
    ],
    startingGold: '4d4 × 10',
    startingStats: {
      hitPoints: {
        base: 8,
        perLevel: '1d8'
      }
    }
  },
  {
    id: 'sorcerer',
    name: 'Hechicero',
    primaryAbility: 'charisma',
    hitDie: 'd6',
    savingThrows: ['constitution', 'charisma'],
    armorProficiencies: [],
    weaponProficiencies: ['dagas', 'dardos', 'hondas', 'bastones', 'ballestas ligeras'],
    skillChoices: {
      count: 2,
      options: ['Arcanos', 'Engaño', 'Intimidación', 'Intuición', 'Persuasión', 'Religión']
    },
    equipment: [
      { choice: ['Ballesta ligera y 20 virotes', 'Cualquier arma simple'] },
      { choice: ['Una bolsa de componentes', 'Un foco arcano'] },
      { choice: ['Un equipo de explorador', 'Un equipo de aventurero'] },
      'Dos dagas'
    ],
    features: [
      {
        name: 'Lanzamiento de Conjuros',
        level: 1,
        description: 'Un evento en tu pasado, o en la vida de un padre o antepasado, dejó una marca indeleble en ti, infundiéndote con magia arcana. Esta fuente de magia, sea cual sea su origen, alimenta tus conjuros.'
      },
      {
        name: 'Origen de Hechicería',
        level: 1,
        description: 'Eliges un origen de hechicería, que describe la fuente de tu poder mágico innato. Tu elección te otorga características cuando la eliges en el nivel 1 y nuevamente en los niveles 6, 14 y 18.'
      }
    ],
    startingGold: '3d4 × 10',
    startingStats: {
      hitPoints: {
        base: 6,
        perLevel: '1d6'
      }
    }
  },
  {
    id: 'warlock',
    name: 'Brujo',
    primaryAbility: 'charisma',
    hitDie: 'd8',
    savingThrows: ['wisdom', 'charisma'],
    armorProficiencies: ['light'],
    weaponProficiencies: ['simple'],
    skillChoices: {
      count: 2,
      options: ['Arcanos', 'Engaño', 'Historia', 'Intimidación', 'Investigación', 'Naturaleza', 'Religión']
    },
    equipment: [
      { choice: ['Ballesta ligera y 20 virotes', 'Cualquier arma simple'] },
      { choice: ['Una bolsa de componentes', 'Un foco arcano'] },
      { choice: ['Un equipo de erudito', 'Un equipo de explorador'] },
      'Armadura de cuero, cualquier arma simple y dos dagas'
    ],
    features: [
      {
        name: 'Patrón Sobrenatural',
        level: 1,
        description: 'Has cerrado un pacto con un ser sobrenatural de tu elección: el Archihada, el Demoníaco o el Gran Antiguo, cada uno detallado al final de la descripción de clase. Tu elección te otorga características en el nivel 1 y nuevamente en los niveles 6, 10 y 14.'
      },
      {
        name: 'Magia de Pacto',
        level: 1,
        description: 'Tu investigación arcana y la magia otorgada por tu patrón te han dado facilidad con los conjuros.'
      }
    ],
    startingGold: '4d4 × 10',
    startingStats: {
      hitPoints: {
        base: 8,
        perLevel: '1d8'
      }
    }
  },
  {
    id: 'wizard',
    name: 'Mago',
    primaryAbility: 'intelligence',
    hitDie: 'd6',
    savingThrows: ['intelligence', 'wisdom'],
    armorProficiencies: [],
    weaponProficiencies: ['dagas', 'dardos', 'hondas', 'bastones', 'ballestas ligeras'],
    skillChoices: {
      count: 2,
      options: ['Arcanos', 'Historia', 'Investigación', 'Intuición', 'Medicina', 'Religión']
    },
    equipment: [
      { choice: ['Un bastón', 'Una daga'] },
      { choice: ['Una bolsa de componentes', 'Un foco arcano'] },
      { choice: ['Un equipo de erudito', 'Un equipo de explorador'] },
      'Un libro de conjuros'
    ],
    features: [
      {
        name: 'Lanzamiento de Conjuros',
        level: 1,
        description: 'Como estudiante de magia arcana, tienes un libro de conjuros que contiene conjuros que muestran los primeros destellos de tu verdadero poder.'
      },
      {
        name: 'Recuperación Arcana',
        level: 1,
        description: 'Has aprendido a recuperar algo de tu energía mágica estudiando tu libro de conjuros. Una vez al día cuando terminas un descanso corto, puedes elegir espacios de conjuro gastados para recuperar. Los espacios de conjuro pueden tener un nivel combinado igual o menor que la mitad de tu nivel de mago (redondeando hacia arriba), y ninguno de los espacios puede ser de nivel 6 o superior.'
      }
    ],
    startingGold: '4d4 × 10',
    startingStats: {
      hitPoints: {
        base: 6,
        perLevel: '1d6'
      }
    }
  }
];

// TRASFONDOS
export const backgrounds = [
  {
    id: 'acolyte',
    name: 'Acólito',
    skillProficiencies: ['Intuición', 'Religión'],
    toolProficiencies: [],
    languages: { count: 2 },
    equipment: [
      'Un símbolo sagrado (un regalo para cuando entraste al sacerdocio)',
      'Un libro de oraciones o rueda de oraciones',
      '5 varitas de incienso',
      'Vestimentas',
      'Un conjunto de ropa común',
      'Una bolsa con 15 po'
    ],
    feature: {
      name: 'Refugio de los Fieles',
      description: 'Como acólito, mereces el respeto de aquellos que comparten tu fe, y puedes realizar las ceremonias religiosas de tu deidad. Tú y tus compañeros aventureros podéis recibir curación y cuidados gratuitos en un templo, santuario u otra presencia establecida de tu fe, aunque debáis proporcionar cualquier componente material necesario para los conjuros. Aquellos que comparten tu religión te apoyarán (pero solo a ti) en un estilo de vida modesto. También podrías tener vínculos con un templo específico dedicado a tu deidad o panteón, y tener una residencia allí.'
    },
    suggestedCharacteristics: {
      personalityTraits: [
        'Idolatro a un héroe particular de mi fe y constantemente me refiero a las acciones y ejemplo de esa persona.',
        'Puedo encontrar puntos en común entre los enemigos más fieros, empatía en medio de la adversidad.',
        'Veo presagios en cada evento y acción. Los dioses intentan hablarnos, solo tenemos que escuchar.',
        'Nada puede sacudir mi actitud optimista.',
        'Cito (o malinterpreto) textos sagrados y proverbios en casi cualquier situación.',
        'Soy tolerante (o intolerante) con otras religiones y respeto (o condeno) la adoración de otros dioses.',
        'He disfrutado de comida refinada, bebida y alta sociedad entre la élite de mi templo. La rudeza me irrita.',
        'He pasado tanto tiempo en el templo que tengo poca experiencia práctica tratando con gente en el mundo exterior.'
      ],
      ideals: [
        'Tradición. Las antiguas tradiciones de culto y sacrificio deben ser preservadas y mantenidas. (Legal)',
        'Caridad. Siempre trato de ayudar a los necesitados, sin importar el costo personal. (Bueno)',
        'Cambio. Debemos ayudar a traer los cambios que los dioses constantemente trabajan en el mundo. (Caótico)',
        'Poder. Espero algún día ascender a la cima de la jerarquía religiosa de mi fe. (Legal)',
        'Fe. Confío en que mi deidad guiará mis acciones. Tengo fe en que si trabajo duro, las cosas saldrán bien. (Legal)',
        'Aspiración. Busco ser digno de la gracia de mi dios mejorando mis conocimientos y haciendo buenas obras. (Cualquiera)'
      ],
      bonds: [
        'Daría mi vida por recuperar una antigua reliquia de mi fe que se perdió hace mucho tiempo.',
        'Algún día me vengaré de la jerarquía corrupta del templo que me acusó de herejía.',
        'Le debo mi vida al sacerdote que me acogió cuando mis padres murieron.',
        'Todo lo que hago es por la gente común.',
        'Haré cualquier cosa para proteger el templo donde serví.',
        'Busco preservar un texto sagrado que mis enemigos consideran herético y buscan destruir.'
      ],
      flaws: [
        'Juzgo a otros duramente, y a mí mismo aún más.',
        'Confío demasiado en aquellos que ejercen poder dentro de la jerarquía de mi templo.',
        'Mi piedad a veces me lleva a confiar ciegamente en aquellos que profesan la fe de mi dios.',
        'Soy inflexible en mi pensamiento.',
        'Soy suspicaz de extraños y espero lo peor de ellos.',
        'Una vez que elijo un objetivo, me obsesiono con él a costa de todo lo demás en mi vida.'
      ]
    },
    variants: [] // Para posibles variantes del trasfondo
  },
  {
    id: 'charlatan',
    name: 'Charlatán',
    skillProficiencies: ['Engaño', 'Juego de Manos'],
    toolProficiencies: ['Kit de disfraz', 'Kit de falsificación'],
    equipment: [
      'Un conjunto de ropa fina',
      'Un kit de disfraz',
      'Herramientas de estafador elegidas por ti (diez botellas selladas llenas de líquidos de colores, un juego de dados trucados, un juego de cartas marcadas, o un anillo del sello de un duque imaginario)',
      'Una bolsa con 15 po'
    ],
    feature: {
      name: 'Identidad Falsa',
      description: 'Has creado una segunda identidad que incluye documentación, contactos establecidos y disfraces que te permiten asumir esa persona. Además, puedes falsificar documentos incluyendo documentación oficial y cartas personales, siempre y cuando hayas visto un ejemplo de dicho documento o letra.'
    },
    suggestedCharacteristics: {
      personalityTraits: [
        'Me enamoro fácilmente y siempre estoy persiguiendo a alguien.',
        'Tengo un chiste para cada ocasión, especialmente ocasiones donde el humor es inapropiado.',
        'El halago es mi truco preferido para conseguir lo que quiero.',
        'Soy un jugador nato que no puede resistir un riesgo si hay dinero en juego.',
        'Miento sobre casi todo, incluso cuando no hay necesidad.',
        'El sarcasmo y los insultos son mis armas preferidas.',
        'Guardo todo lo que puedo. Nunca se sabe cuándo algo puede ser útil.',
        'Soy demasiado codicioso. No puedo resistir un trato si hay beneficio.'
      ],
      ideals: [
        'Independencia. Soy un espíritu libre, nadie me dice qué hacer. (Caótico)',
        'Equidad. Nunca robo de gente que no puede permitírselo. (Legal)',
        'Caridad. Distribuyo el dinero que adquiero con aquellos que lo necesitan. (Bueno)',
        'Creatividad. Nunca repito un truco dos veces. (Caótico)',
        'Amistad. Los bienes materiales vienen y van. Los lazos de amistad duran para siempre. (Bueno)',
        'Aspiración. Estoy decidido a hacer algo de mí mismo. (Cualquiera)'
      ],
      bonds: [
        'Estafé a la persona equivocada y ahora tengo una gran deuda para compensarlo.',
        'Todo lo que hago es por mi familia.',
        'Alguien tan inteligente como peligroso me engañó. Pronto tendré mi venganza.',
        'Estafé a una persona importante, y ahora esa persona me quiere muerto.',
        'Me enamoré de alguien a quien estafé.',
        'Estoy tratando de pagar una deuda que no debería tener que pagar.'
      ],
      flaws: [
        'No puedo resistir una cara bonita.',
        'Siempre estoy en deuda. Gasto mi mal adquirido dinero tan rápido como llega.',
        'Siempre estoy convencido de que la gente está tratando de estafarme.',
        'Soy demasiado codicioso. No puedo resistirme a tomar riesgos si hay dinero involucrado.',
        'No puedo resistir estafar a aquellos más poderosos que yo.',
        'Odio admitirlo, y me odiaré a mí mismo por ello, pero huiré si las cosas se ponen difíciles.'
      ]
    },
    variants: []
  },
  {
    id: 'criminal',
    name: 'Criminal',
    skillProficiencies: ['Engaño', 'Sigilo'],
    toolProficiencies: ['Un tipo de juego', 'Herramientas de ladrón'],
    equipment: [
      'Una palanca',
      'Un conjunto de ropas oscuras comunes con capucha',
      'Una bolsa con 15 po'
    ],
    feature: {
      name: 'Contacto Criminal',
      description: 'Tienes un contacto de confianza que actúa como tu enlace con una red de otros criminales. Sabes cómo enviar y recibir mensajes de tu contacto, incluso en grandes distancias; conoces específicamente a los mensajeros locales, comerciantes corruptos y marineros abyectos que pueden entregar mensajes por ti.'
    },
    suggestedCharacteristics: {
      personalityTraits: [
        'Siempre tengo un plan para cuando las cosas van mal.',
        'Siempre estoy calmado, sin importar la situación. Nunca levanto la voz ni dejo que mis emociones me controlen.',
        'La primera cosa que hago en un nuevo lugar es anotar la ubicación de todo lo valioso, o en dónde podría estar escondido.',
        'Prefiero saber las probabilidades antes de hacer una apuesta.',
        'Estoy siempre encorvado, mis ojos moviéndose constantemente entre las personas que me rodean.',
        'Nunca confío realmente en nadie. Es mejor que miren por sí mismos.',
        'Prefiero vestir bien y parecer exitoso, aun cuando no lo sea.'
      ],
      ideals: [
        'Honor. No robo a otros de mi oficio. (Legal)',
        'Libertad. Cadenas son para ser rotas, así como los que las forjan. (Caótico)',
        'Caridad. Robo a los ricos para poder ayudar a los necesitados. (Bueno)',
        'Codicia. Haré lo que sea necesario para ser rico. (Malo)',
        'Personas. Soy leal a mis amigos, no a ideales. Todos los demás pueden ahogarse en sus propias lágrimas. (Neutral)',
        'Redención. Hay una chispa de bondad en todos. (Bueno)'
      ],
      bonds: [
        'Estoy tratando de pagar una deuda que tengo con un generoso benefactor.',
        'Mis ganancias mal habidas van a apoyar a mi familia.',
        'Algo importante me fue robado, y lo recuperaré.',
        'Me convertiré en el mayor ladrón que haya existido.',
        'Soy culpable de un terrible crimen. Espero poder redimirme.',
        'Alguien a quien quería murió por un error que cometí. Eso nunca volverá a suceder.'
      ],
      flaws: [
        'Cuando veo algo valioso, no puedo pensar en otra cosa que en cómo robarlo.',
        'Cuando me enfrento a una opción entre dinero y amistad, suelo elegir el dinero.',
        'Si hay un plan, lo olvidaré. Si no lo olvido, lo ignoraré.',
        'Tengo un "tic" o señal que revela cuándo estoy mintiendo.',
        'Huyo ante el primer signo de peligro.',
        'Cuando me siento insultado, respondo con violencia inmediata.'
      ]
    },
    variants: [
      {
        id: 'spy',
        name: 'Espía',
        feature: {
          name: 'Contacto Espía',
          description: 'Tienes un contacto de confianza que actúa como tu enlace con una red de otros espías. Sabes cómo enviar y recibir mensajes de tu contacto, incluso en grandes distancias; conoces específicamente a los mensajeros locales, comerciantes corruptos y marineros abyectos que pueden entregar mensajes por ti.'
        }
      }
    ]
  },
  {
    id: 'entertainer',
    name: 'Artista',
    skillProficiencies: ['Acrobacias', 'Interpretación'],
    toolProficiencies: ['Kit de disfraz', 'Un tipo de instrumento musical'],
    equipment: [
      'Un instrumento musical (de tu elección)',
      'El favor de un admirador (carta de amor, mechón de pelo, o baratija)',
      'Un disfraz',
      'Una bolsa con 15 po'
    ],
    feature: {
      name: 'Por Aclamación Popular',
      description: 'Siempre puedes encontrar un lugar para actuar, generalmente en una taberna o posada pero posiblemente en un circo, teatro o incluso en la corte noble. En tal lugar, recibes alojamiento y comida modesta o confortable gratuitos (dependiendo de la calidad del establecimiento), siempre y cuando actúes cada noche. Además, tu actuación te hace algo conocido localmente. Cuando personas adineradas y con poder en el área reconocen tu nombre, suelen estar favorablemente dispuestas hacia ti.'
    },
    suggestedCharacteristics: {
      personalityTraits: [
        'Conozco una historia relevante para casi cualquier situación.',
        'Siempre que llego a un nuevo lugar, recopilo los chismes locales y esparzo rumores.',
        'Soy un romántico empedernido, siempre buscando ese "alguien especial".',
        'Nadie se enoja conmigo ni permanece enfadado mucho tiempo porque puedo disculpar cualquier transgresión.',
        'Me encanta un buen insulto, incluso cuando va dirigido a mí.',
        'Me encanta un desafío y siempre busco la mejor forma de lograrlo.',
        'Me cuesta ocultar mis verdaderos sentimientos. Mi lenguaje corporal revela lo que estoy pensando y sintiendo.',
        'Adoro sorprender a la gente con cosas nuevas: una nueva canción, una nueva historia, un nuevo truco con cartas.'
      ],
      ideals: [
        'Belleza. Cuando actúo, hago que el mundo sea mejor de lo que es. (Bueno)',
        'Tradición. Las historias, leyendas y canciones del pasado nunca deberían ser olvidadas. (Legal)',
        'Creatividad. El mundo necesita nuevas ideas y acciones atrevidas. (Caótico)',
        'Codicia. Solo estoy aquí por el dinero y la fama. (Malo)',
        'Personas. Me gusta ver las sonrisas que traigo a la cara de la gente con mi música. (Neutral)',
        'Honestidad. El arte debe reflejar el alma; debe venir de dentro y revelar quién realmente somos. (Cualquiera)'
      ],
      bonds: [
        'Mi instrumento es mi posesión más valiosa, y me recuerda a alguien a quien amo.',
        'Alguien robó mi preciada posesión, y algún día la recuperaré.',
        'Quiero ser famoso, cueste lo que cueste.',
        'Me encanta hacer sonreír a los demás, especialmente si están tristes.',
        'Éxito o fracaso, mi compañía lo es todo para mí.',
        'Haría cualquier cosa por los otros miembros de mi antigua tropa.'
      ],
      flaws: [
        'Haré casi cualquier cosa por ganarme la fama y la notoriedad.',
        'Odio admitirlo, pero soy propenso a huir de una pelea.',
        'Me pongo celoso cuando otros tienen éxito.',
        'Nunca estoy satisfecho con lo que tengo; siempre quiero más.',
        'Haría cualquier cosa por conservar mi aspecto.',
        'El mundo me debe la fama. Claramente, no aprecian mi talento.'
      ]
    },
    variants: [
      {
        id: 'gladiator',
        name: 'Gladiador',
        equipment: [
          'Un arma inusual (elegida por ti)',
          'Un escudo de gladiador o emblema de tu compañía',
          'Un favor de un admirador',
          'Una bolsa con 15 po'
        ],
        feature: {
          name: 'Por Aclamación Popular',
          description: 'Puedes encontrar un lugar donde actuar, generalmente en una arena o coliseo. En tal lugar, recibes alojamiento y comida modesta o confortable gratuitos (dependiendo de la calidad del establecimiento), siempre y cuando actúes cada noche. Además, tu actuación te hace conocido localmente. Cuando personas adineradas y con poder en el área reconocen tu nombre, suelen estar favorablemente dispuestas hacia ti.'
        }
      }
    ]
  },
  {
    id: 'folk_hero',
    name: 'Héroe del Pueblo',
    skillProficiencies: ['Supervivencia', 'Trato con Animales'],
    toolProficiencies: ['Un tipo de herramientas de artesano', 'Vehículos terrestres'],
    equipment: [
      'Un conjunto de herramientas de artesano (de tu elección)',
      'Una pala',
      'Una olla de hierro',
      'Un conjunto de ropa común',
      'Una bolsa con 10 po'
    ],
    feature: {
      name: 'Hospitalidad Rústica',
      description: 'Ya que provienen del pueblo, encuentras fácilmente refugio entre la gente común, que te esconderá y protegerá. Ellos no te entregarán a las autoridades o a quienes te busquen. Sin embargo, no arriesgarán sus vidas por ti.'
    },
    suggestedCharacteristics: {
      personalityTraits: [
        'Juzgo a la gente por sus acciones, no por sus palabras.',
        'Si alguien está en problemas, siempre estoy dispuesto a ayudar.',
        'Cuando me dispongo a hacer algo, voy más allá de lo esperado.',
        'Cuando juego con un grupo de personas, siempre intento ayudar a las más desafortunadas.',
        'Soy inflexible cuando asumo una responsabilidad.',
        'Me gusta verme bien y sigo la última moda.'
      ],
      ideals: [
        'Respeto. Las personas merecen ser tratadas con dignidad y respeto. (Bueno)',
        'Equidad. A nadie se le debe dar un trato preferencial ante la ley, y nadie está por encima de la ley. (Legal)',
        'Libertad. No se debe permitir que los tiranos opriman al pueblo. (Caótico)',
        'Poder. Si me vuelvo fuerte, puedo tomar lo que quiera, cuando quiera. (Malo)',
        'Sinceridad. No hay valor en fingir ser algo que no soy. (Neutral)',
        'Destino. Nada y nadie puede mantenerme alejado de mi destino. (Cualquiera)'
      ],
      bonds: [
        'Tengo una familia, pero no tengo idea de dónde están. Espero encontrarlos algún día.',
        'Trabajé la tierra, amo la tierra y protegeré la tierra.',
        'Un noble orgulloso me dio una paliza terrible, y algún día me vengaré de él.',
        'Mis herramientas son símbolos de mi vida pasada, y las llevo para no olvidar mis raíces.',
        'Protejo a aquellos que no pueden protegerse a sí mismos.',
        'Desearía que mi amado viera lo que llegué a ser con su inspiración.'
      ],
      flaws: [
        'El tirano que gobierna mi tierra nunca renunciará a su poder, y debo oponerme a él.',
        'Estoy convencido de la significancia de mi destino, soy ciego a mis defectos e imprudente con mis decisiones.',
        'Las personas que me conocen como héroe me han puesto en un pedestal, y haría cualquier cosa por mantener su admiración.',
        'Confío demasiado en mis habilidades.',
        'Mi odio por mis enemigos es ciego y sin razón.',
        'Mi confianza en mi habilidad para resolver cualquier problema hace que me meta en problemas.'
      ]
    },
    variants: []
  },
  {
    id: 'guild_artisan',
    name: 'Artesano Gremial',
    skillProficiencies: ['Intuición', 'Persuasión'],
    toolProficiencies: ['Un tipo de herramientas de artesano'],
    languages: { count: 1 },
    equipment: [
      'Un conjunto de herramientas de artesano (de tu elección)',
      'Una carta de presentación de tu gremio',
      'Un conjunto de ropa de viajero',
      'Una bolsa con 15 po'
    ],
    feature: {
      name: 'Membresía Gremial',
      description: 'Como miembro establecido y respetado de un gremio, puedes contar con ciertos beneficios que la membresía proporciona. Tus compañeros miembros del gremio te proporcionarán alojamiento y comida si es necesario, y pagarán por tu funeral si es necesario. En algunas ciudades y pueblos, un edificio del gremio ofrece un lugar central para conocer a otros miembros de tu profesión, que pueden ser fuentes valiosas de chismes, rumores e información laboral. Los gremios a menudo ejercen una considerable influencia política. Si eres acusado de un crimen, tu gremio apoyará tu defensa. También puedes tener acceso a figuras políticas poderosas a través del gremio, si tú y tus compañeros aventureros están en buenos términos con él. Debes pagar cuotas de 5 po por mes a tu gremio. Si te saltas un mes, debes pagar el doble para mantenerte al día.'
    },
    suggestedCharacteristics: {
      personalityTraits: [
        'Creo que cualquier cosa vale la pena hacer si lo haces bien.',
        'Me esfuerzo por ser el mejor en mi oficio.',
        'Siempre estoy interesado en aprender nuevas habilidades.',
        'Soy crítico con el trabajo de los demás.',
        'Soy crítico con mi propio trabajo.',
        'No me conformaré con menos que la perfección.',
        'Me entristece pensar que después de mi generación, las habilidades de mi profesión serán olvidadas.',
        'Me gusta hablar a largo y tendido sobre mi oficio.'
      ],
      ideals: [
        'Comunidad. Es deber de toda persona civilizada fortalecer los lazos de comunidad y la seguridad de la civilización. (Legal)',
        'Generosidad. Mis talentos me fueron dados para que pudiera usarlos para beneficiar al mundo. (Bueno)',
        'Libertad. Todos deberían ser libres para perseguir sus propios medios de vida. (Caótico)',
        'Codicia. Solo estoy en esto por el dinero. (Malo)',
        'Personas. Estoy comprometido con las personas con las que me importa, no con ideales. (Neutral)',
        'Aspiración. Trabajo duro para ser el mejor en mi oficio. (Cualquiera)'
      ],
      bonds: [
        'La tienda donde aprendí mi oficio es lo más importante en mi vida.',
        'Trabajo para preservar un gran trabajo artesanal que me inspiró en mi juventud.',
        'Busco riqueza para asegurar el amor de alguien.',
        'Algún día volveré a mi gremio y probaré que soy el más grande artesano de todos.',
        'Seré recordado por mis creaciones asombrosas.',
        'No permitiré que los errores del pasado se repitan.'
      ],
      flaws: [
        'Haré cualquier cosa para superar a un rival artesano, incluso si significa sabotear su trabajo.',
        'Creo que nadie más puede hacer mi trabajo tan bien como yo.',
        'Una vez le vendí un arma defectuosa a un cliente, lo que resultó en su muerte. Haré lo que sea para mantener este secreto.',
        'Puedo tomar alguna acción drástica si siento que mi posición social está amenazada.',
        'Robé secretos a un compañero gremial que algún día me descubrirá.',
        'Mi orgullo a veces me hace mirar por encima del hombro a aquellos de menor estatus y talento.'
      ]
    },
    variants: [
      {
        id: 'guild_merchant',
        name: 'Mercader Gremial',
        skillProficiencies: ['Intuición', 'Persuasión'],
        toolProficiencies: ['Herramientas de navegante'],
        languages: { count: 1 },
        equipment: [
          'Un conjunto de herramientas de navegante (o un juego de tu elección)',
          'Una carta de presentación de tu gremio',
          'Un conjunto de ropa de viajero',
          'Una bolsa con 15 po'
        ],
        feature: {
          name: 'Membresía Gremial',
          description: 'Como miembro establecido y respetado de un gremio de mercaderes, puedes contar con ciertos beneficios que la membresía proporciona. Tus compañeros comerciantes te proporcionarán alojamiento y comida si es necesario, y pagarán por tu funeral si es necesario. En algunas ciudades y pueblos, un edificio del gremio ofrece un lugar central para conocer a otros comerciantes y potenciales clientes. Los gremios a menudo ejercen una considerable influencia política. Si eres acusado de un crimen, tu gremio apoyará tu defensa. También puedes tener acceso a figuras políticas poderosas a través del gremio, si tú y tus compañeros aventureros están en buenos términos con él. Debes pagar cuotas de 5 po por mes a tu gremio. Si te saltas un mes, debes pagar el doble para mantenerte al día.'
        }
      }
    ]
  },
  {
    id: 'hermit',
    name: 'Ermitaño',
    skillProficiencies: ['Medicina', 'Religión'],
    toolProficiencies: ['Kit de herboristería'],
    languages: { count: 1 },
    equipment: [
      'Un estuche de pergaminos lleno de notas de tus estudios o oraciones',
      'Una manta de invierno',
      'Un conjunto de ropa común',
      'Un kit de herboristería',
      'Una bolsa con 5 po'
    ],
    feature: {
      name: 'Descubrimiento',
      description: 'La tranquila reclusión de tu vida extendida como ermitaño te dio acceso a un descubrimiento único y poderoso. La naturaleza exacta de esta revelación depende de la naturaleza de tu aislamiento. Podría ser una gran verdad sobre el cosmos, los dioses, los poderosos seres de otros planos, o las fuerzas de la naturaleza. Podría ser un sitio que nadie más ha visto. Podrías haber descubierto un hecho que ha sido olvidado durante mucho tiempo, o descubierto un reliquia del pasado que podría reescribir la historia. Podría ser información que sería dañina para las personas que te alejaron en primer lugar, y por eso ahora tratan de silenciarte o capturarte. Podría ser un conocimiento esotérico que, sin embargo, es de poco uso práctico inmediato.'
    },
    suggestedCharacteristics: {
      personalityTraits: [
        'He estado aislado por tanto tiempo que rara vez hablo, prefiriendo gestos y gruñidos ocasionales.',
        'Soy absolutamente sereno, incluso en medio de un desastre.',
        'El líder de mi comunidad tenía algo sabio que decir sobre cada tema, y lo cito constantemente.',
        'Soy extremadamente torpe en situaciones sociales.',
        'Estoy convencido de que todos tratan de robarme.',
        'Me gusta guardar secretos; mis sonrisas enigmáticas y silencios ocasionales hacen que los demás se pongan nerviosos.',
        'Habito de una manera muy literal, y no entiendo las metáforas ni el sarcasmo.',
        'Me expreso de maneras extrañas, a menudo usando metáforas complicadas o símiles inusuales.'
      ],
      ideals: [
        'Bien Mayor. Mis dones están para ser compartidos con todos, no usados para mi propio beneficio. (Bueno)',
        'Lógica. Las emociones no deben nublar nuestro sentido de lo que es correcto y verdadero, o nuestra lógica. (Legal)',
        'Libre Pensamiento. El pensamiento y la razón son soberanos; todos deberíamos trabajar para iluminar nuestras mentes. (Caótico)',
        'Poder. El aislamiento y la contemplación son caminos hacia poder mágico y místico. (Malvado)',
        'Vive y Deja Vivir. Inmiscuirse en los asuntos de los demás solo causa problemas. (Neutral)',
        'Autoconocimiento. Si te conoces a ti mismo, no hay nada más que valga la pena saber. (Cualquiera)'
      ],
      bonds: [
        'Me he enamorado de la idea de una persona tan perfecta y pura, que cualquier persona real no podría compararse.',
        'Entré en aislamiento para esconder a los que podrían estar todavía buscándome. Algún día tendré que enfrentar mi pasado.',
        'Todavía busco la iluminación que perseguía durante mi aislamiento, y continuamente evoluciona.',
        'Entré en aislamiento porque amaba a alguien que no podía tener.',
        'Debería haber muerto, pero no lo hice. Esa fue mi revelación, y ahora estoy realmente vivo por primera vez.',
        'Mi aislamiento me dio gran introspección sobre un gran mal que solo yo puedo destruir.'
      ],
      flaws: [
        'Ahora que he vuelto al mundo, disfruto de sus placeres quizás demasiado.',
        'Tengo dogmas o principios que otros encuentran incomprensibles o dañinos.',
        'Pienso, hablo y escribo en listas de siete puntos.',
        'Puedo ser dogmático en mis pensamientos y filosofía.',
        'He estado aislado por tanto tiempo que me cuesta ser empático con los demás.',
        'Estoy obsesionado con mis metas, a menudo a expensas de mi propia seguridad.'
      ]
    },
    variants: []
  },
  {
    id: 'noble',
    name: 'Noble',
    skillProficiencies: ['Historia', 'Persuasión'],
    toolProficiencies: ['Un tipo de juego'],
    languages: { count: 1 },
    equipment: [
      'Un conjunto de ropa fina',
      'Un anillo de sello',
      'Un pergamino de genealogía',
      'Una bolsa con 25 po'
    ],
    feature: {
      name: 'Posición de Privilegio',
      description: 'Gracias a tu noble nacimiento, la gente tiende a pensar lo mejor de ti. Eres bienvenido en la alta sociedad, y la gente asume que tienes el derecho de estar donde estés. La gente común hace todo lo posible para acomodarte y evitar disgustarte, y otros de alta cuna te tratan como miembro de la misma esfera social. Puedes asegurar una audiencia con un noble local si es necesario.'
    },
    suggestedCharacteristics: {
      personalityTraits: [
        'Mi elocuente adulación hace que todos con los que hablo se sientan como la persona más maravillosa e importante del mundo.',
        'La gente común me ama por mi amabilidad y generosidad.',
        'Nadie podría dudar mirando mi forma real que soy de mejor clase que las masas sin lavar.',
        'Tomo grandes medidas para esconder mi verdadera identidad y evitar la atención.',
        'Habito con tantos floreos que resulta irritante a la mayoría.',
        'La gente común se merece mi atención y respeto.',
        'Por naturaleza, uso cumplidos, algunos sinceros, para suavizar las relaciones y obtener lo que quiero.',
        'Me he hecho tan utilizado a ropa fina, buena comida, y vino de alta calidad que acepto menos solo cuando no tengo otra opción.'
      ],
      ideals: [
        'Respeto. El respeto se debe a mí por mi posición, pero toda la gente, independientemente de su estación, merece ser tratada con dignidad. (Bueno)',
        'Responsabilidad. Es mi deber respetar la autoridad de aquellos por encima de mí, así como aquellos por debajo de mí deben respetar la mía. (Legal)',
        'Independencia. Debo probar que puedo manejarme sin los pañales de mi familia. (Caótico)',
        'Poder. Si puedo alcanzar más poder, nadie me dirá qué hacer. (Malvado)',
        'Familia. La sangre es más espesa que el agua. (Cualquiera)',
        'Obligación Noble. Es mi deber proteger y cuidar a la gente por debajo de mí. (Bueno)'
      ],
      bonds: [
        'Protegeré el legado de mi familia.',
        'Algún día recuperaré las tierras que nos fueron arrebatadas.',
        'Un insulto común será lavado con sangre.',
        'Mi lealtad a mi soberano es inquebrantable.',
        'La gente común debe verme como un héroe del pueblo.',
        'Mi casa tendrá el favor de mi soberano.'
      ],
      flaws: [
        'El más mínimo insulto a mi honor exige venganza.',
        'Secretamente creo que todos están por debajo de mí.',
        'Escondo un secreto verdaderamente escandaloso que podría arruinar a mi familia para siempre.',
        'A menudo oigo insultos velados y amenazas en cada palabra que se me dirige, y me enfado rápidamente.',
        'Tengo un deseo insaciable por los placeres carnales.',
        'De hecho, el mundo gira a mi alrededor, aunque lo oculto con cortesía.'
      ]
    },
    variants: [
      {
        id: 'knight',
        name: 'Caballero',
        feature: {
          name: 'Retinue',
          description: 'Tienes el servicio de tres retainers leales a tu familia. Estos retainers pueden ser asistentes o mensajeros, y uno podría ser un mayordomo. Tus retainers son commoners que pueden realizar tareas mundanas por ti, pero no te acompañarán a combate y no arriesgarán sus vidas. Te seguirán mientras pruebes que puedes mantenerlos. Puedes reemplazar a un retainer según sea necesario.'
        }
      }
    ]
  },
  {
    id: 'outlander',
    name: 'Forastero',
    skillProficiencies: ['Atletismo', 'Supervivencia'],
    toolProficiencies: ['Un tipo de instrumento musical'],
    languages: { count: 1 },
    equipment: [
      'Un bastón',
      'Un trofeo de caza',
      'Un conjunto de ropa de viajero',
      'Una bolsa con 10 po'
    ],
    feature: {
      name: 'Viajero',
      description: 'Tienes una excelente memoria para mapas y geografía, y siempre puedes recordar la disposición general de terrenos, asentamientos y otras características a tu alrededor. Además, puedes encontrar comida y agua fresca para ti y hasta cinco otras personas cada día, siempre que la tierra ofrezca bayas, pequeña caza, agua, y así sucesivamente.'
    },
    suggestedCharacteristics: {
      personalityTraits: [
        'Me impulsa alejarme continuamente del horizonte, ver qué hay alrededor del siguiente monte o descubrir qué hay al otro lado del mar.',
        'He estado en tantos lugares que puedo relacionar cualquier cosa con un acontecimiento o costumbre local.',
        'A menudo me meto en dificultades al hacer cumplidos a miembros del sexo opuesto.',
        'No entiendo muchas de las costumbres, expresiones o entendimientos que la mayoría de la gente da por sentado.',
        'Creo innecesario mentir sobre mi origen o intenciones.',
        'En el mundo salvaje, siempre encontraré la manera de sobrevivir y prosperar.',
        'Me impresionan las maravillas de la civilización como edificios grandes, ropa inusual y comida elaborada.',
        'Dejo a la gente hablar de sí misma. Esto les hace disfrutar de mi compañía (y a veces hablan demasiado).'
      ],
      ideals: [
        'Cambio. La vida es como las estaciones, siempre cambiando, y debemos cambiar con ella. (Caótico)',
        'Bien Mayor. Es responsabilidad de todos hacer del mundo un lugar mejor. (Bueno)',
        'Honor. Si pierdo mi honor, lo he perdido todo. (Legal)',
        'Poder. La supervivencia a menudo depende de la fuerza y el poder. (Malvado)',
        'Naturaleza. Vive en armonía con la naturaleza, y no me interpondré en su camino. (Neutral)',
        'Gloria. Sé valiente, y siempre serás recordado. (Cualquiera)'
      ],
      bonds: [
        'Mi familia, clan, o tribu es lo más importante en mi vida, incluso si están lejos.',
        'Un insulto a la naturaleza es un insulto a mí.',
        'Haré lo que sea necesario para proteger el lugar de mi juventud.',
        'Traigo peligro a quienes amo. Solo viajando solo puedo protegerlos.',
        'Aquellos que luchan a mi lado son aquellos por los que vale la pena morir.',
        'Mi honor es mi vida.'
      ],
      flaws: [
        'Soy demasiado temerario en mi búsqueda de peligro y emoción.',
        'No confío plenamente en los miembros de otras razas, tribus o sociedades.',
        'Una vez me atrajeron a una trampa por una cara bonita. No dejaré que me atrapen de nuevo.',
        'No temo a las criaturas comunes, pero en presencia de abominaciones, me congelo de terror.',
        'Recuerdo cada insulto que he recibido y guardo un resentimiento silencioso contra cualquiera que me haya herido.',
        'No entiendo los modales refinados y la etiqueta, y me avergüenzo a menudo en situaciones sociales.'
      ]
    },
    variants: []
  },
  {
    id: 'sage',
    name: 'Sabio',
    skillProficiencies: ['Arcanos', 'Historia'],
    languages: { count: 2 },
    equipment: [
      'Una botella de tinta negra',
      'Una pluma',
      'Un cuchillo pequeño',
      'Una carta de un colega difunto haciendo una pregunta que aún no has podido responder',
      'Un conjunto de ropa común',
      'Una bolsa con 10 po'
    ],
    feature: {
      name: 'Investigador',
      description: 'Cuando intentas aprender o recordar un fragmento de información, si no conoces la respuesta, a menudo sabes dónde y de quién puedes obtenerla. Normalmente, esta información proviene de una biblioteca, scriptorium, universidad, o un sabio o criatura antigua. Tu DM podría determinar que el conocimiento que buscas está oculto en un lugar remoto e inaccesible, o que simplemente no está disponible. Descubrir la información más profunda podría requerir una aventura o, como mínimo, dinero para sobornar y regalos para los que poseen la información. Si pueden acceder a lo que necesitas saber, podrían solicitar un favor de ti.'
    },
    suggestedCharacteristics: {
      personalityTraits: [
        'Uso palabras polisilábicas para dar la impresión de gran erudición.',
        'He leído cada libro de las grandes bibliotecas, o al menos afirmo haberlo hecho.',
        'Estoy acostumbrado a ayudar a los que no son tan inteligentes como yo, y explico pacientemente cualquier cosa y todo a los demás.',
        'No hay nada que me guste más que un buen misterio.',
        'Me dispongo a corregir a alguien insistentemente cuando comete un error por un detalle pequeño.',
        'A menudo me pierdo en mis pensamientos y contemplación, desentendido de mi entorno.',
        'Soy terrible en guardar secretos. Los misterios no están hechos para ser enterrados.',
        'Hablo... lentamente... cuando hablo... con idiotas,... lo cual... es casi... todo el mundo... comparado... conmigo.'
      ],
      ideals: [
        'Conocimiento. El camino al poder y la auto-mejora es a través del conocimiento. (Neutral)',
        'Belleza. Lo que es bello nos señala hacia lo que es verdadero. (Bueno)',
        'Lógica. Las emociones no deben nublar nuestro pensamiento lógico. (Legal)',
        'Sin Límites. Nada debe impedir la infinita posibilidad inherente a toda existencia. (Caótico)',
        'Poder. El conocimiento es el camino al poder y la dominación. (Malvado)',
        'Auto-Mejora. El objetivo de una vida de estudio es la mejora de uno mismo. (Cualquiera)'
      ],
      bonds: [
        'Es mi deber proteger a mis estudiantes.',
        'Tengo un texto antiguo que contiene terribles secretos que no deben caer en manos equivocadas.',
        'Trabajo para preservar una biblioteca, universidad, scriptorium, o monasterio.',
        'El trabajo de mi vida es una serie de tomos relacionados con un campo específico de conocimiento.',
        'He estado buscando mi vida entera la respuesta a una pregunta específica.',
        'Vendí mi alma a cambio de conocimiento. Espero hacer grandes obras que me permitan recuperarla.'
      ],
      flaws: [
        'Me distraen fácilmente con la promesa de información.',
        'La mayoría de la gente grita y corre cuando ve un demonio. Yo me detengo y tomo notas sobre su anatomía.',
        'Descifrar un misterio antiguo vale el precio de una civilización.',
        'Prefiero soluciones elegantes sobre soluciones prácticas.',
        'Hablo sin pensar realmente mis palabras, insultando invariablemente a otros.',
        'No puedo mantener un secreto para salvar mi vida, o la vida de cualquier otra persona.'
      ]
    },
    variants: []
  },
  {
    id: 'sailor',
    name: 'Marinero',
    skillProficiencies: ['Atletismo', 'Percepción'],
    toolProficiencies: ['Herramientas de navegante', 'Vehículos acuáticos'],
    equipment: [
      'Un cabo de 50 pies',
      'Un amuleto de la suerte como un conejo disecado o una piedra pequeña con un agujero en el centro (o puedes tirar una baratija de la tabla de Baratijas en el capítulo 5)',
      'Un conjunto de ropa común',
      'Una bolsa con 10 po'
    ],
    feature: {
      name: 'Pasaje de Barco',
      description: 'Cuando necesitas, puedes asegurar pasaje gratuito en un barco para ti y tus compañeros de aventura. Podrías viajar en el barco en el que serviste, o en otro barco con el que hayas tenido buenas relaciones (quizás uno donde un antiguo compañero trabaje). Debido a que estás pidiendo un favor, no puedes asegurar un horario o ruta que cumpla con tus necesidades exactas. Tu Dungeon Master determinará cuán lejos desde tu destino previsto terminarás sujeto a los caprichos del mar.'
    },
    suggestedCharacteristics: {
      personalityTraits: [
        'Mi lenguaje es tan colorido como un loro de un capitán.',
        'Nunca me alejo del mar si puedo evitarlo.',
        'Me invento insultos salvajes y elaborados.',
        'Disfruto enormemente de la navegación, y no me gusta estar en tierra firme.',
        'Aprecio cada oportunidad de mostrar mi músculo.',
        'Prefiero trabajar y no hablar.',
        'Una vez casi me ahogué, y desde entonces tengo miedo de estar bajo el agua.',
        'Me gusta navegar por aguas inexploradas y descubrir costas previamente desconocidas.'
      ],
      ideals: [
        'Respeto. Lo único que mantiene unido a un barco es el respeto mutuo entre el capitán y la tripulación. (Bueno)',
        'Equidad. Todos hacemos el trabajo, todos compartimos la recompensa. (Legal)',
        'Libertad. El mar es libertad: la libertad de ir a donde quieras. (Caótico)',
        'Dominio. Soy un depredador, y los otros barcos en el mar son mi presa. (Malvado)',
        'Personas. Estoy comprometido con mis compañeros de tripulación, no con ideales. (Neutral)',
        'Aspiración. Algún día, tendré mi propio barco y trazaré mi propio destino. (Cualquiera)'
      ],
      bonds: [
        'Soy leal a mi capitán primero, todo lo demás es secundario.',
        'El barco es lo más importante: tripulación y capitanes vienen y van.',
        'Siempre recordaré mi primer barco.',
        'En un puerto lejano, tengo un amor que espera mi regreso.',
        'Fui estafado de mi parte del botín, y juro que voy a recuperarla.',
        'Unos piratas crueles mataron a mi capitán y a mis compañeros de tripulación, saquearon nuestro barco, y me dejaron morir. La venganza será mía.'
      ],
      flaws: [
        'Sigo las órdenes, incluso si creo que están equivocadas.',
        'Diré cualquier cosa para evitar trabajo extra.',
        'Una vez que alguien cuestiona mi coraje, nunca retrocedo, sin importar el peligro.',
        'Una vez que empiezo a beber, es difícil que pare.',
        'No puedo evitar embolsarme los objetos brillantes que encuentro.',
        'Mi orgullo seguramente me conducirá a mi destrucción.'
      ]
    },
    variants: [
      {
        id: 'pirate',
        name: 'Pirata',
        feature: {
          name: 'Mala Reputación',
          description: 'No importa en dónde vayas, la gente te teme por tu reputación. Cuando estás en un asentamiento civilizado, puedes conseguir alojamiento y comida modestos gratis, siempre y cuando la gente local más que valiente o poderosa no se oponga a ti.'
        }
      }
    ]
  },
  {
    id: 'soldier',
    name: 'Soldado',
    skillProficiencies: ['Atletismo', 'Intimidación'],
    toolProficiencies: ['Un tipo de juego', 'Vehículos terrestres'],
    equipment: [
      'Un emblema de rango',
      'Un trofeo tomado de un enemigo caído (una daga, hoja rota, o trozo de estandarte)',
      'Un juego de dados o baraja de cartas',
      'Un conjunto de ropa común',
      'Una bolsa con 10 po'
    ],
    feature: {
      name: 'Rango Militar',
      description: 'Tienes un rango militar de tu carrera como soldado. Los soldados leales a tu antigua organización militar aún reconocen tu autoridad e influencia, y te respetan por ello. Puedes invocar tu rango para ejercer influencia sobre otros soldados y requisar equipo simple o caballos para uso temporal. Generalmente puedes obtener acceso a campamentos militares amistosos y fortalezas donde se reconoce tu rango.'
    },
    suggestedCharacteristics: {
      personalityTraits: [
        'Soy siempre educado y respetuoso.',
        'Estoy lleno de historias inspiradoras y aleccionadoras de mis experiencias militares relevantes a casi toda situación de combate.',
        'El primero en la pelea, el último en salir.',
        'Puedo arreglármelas con muy poco sueño o alimento.',
        'Me encanta ser fuerte y romper cosas.',
        'Tengo un comentario crudo para cada ocasión.',
        'Disfruto ser capaz de intimidar a otros a través de mi presencia o actitud.',
        'Trabajo duro para que los otros puedan jugar.'
      ],
      ideals: [
        'Bien Mayor. Nuestro destino es dar nuestras vidas en defensa de otros. (Bueno)',
        'Responsabilidad. Hago lo que debo y obedezco justo a la autoridad. (Legal)',
        'Independencia. Cuando la gente sigue órdenes ciegamente, abraza un tipo de tiranía. (Caótico)',
        'Poder. En la vida como en la guerra, el más fuerte se lleva la victoria. (Malvado)',
        'Vivir y Dejar Vivir. Ideales no valen la pena matar o ir a la guerra por ellos. (Neutral)',
        'Nación. Mi ciudad, nación, o mi gente son todo lo que importa. (Cualquiera)'
      ],
      bonds: [
        'Todavía daría mi vida por las personas con las que serví.',
        'Alguien salvó mi vida en el campo de batalla. A este día, nunca dejaré a un amigo atrás.',
        'Mi honor es mi vida.',
        'Nunca olvidaré la derrota aplastante que mi compañía sufrió o a los enemigos que la causaron.',
        'Aquellos que luchan a mi lado son los que vale la pena morir por.',
        'Lucho por aquellos que no pueden luchar por sí mismos.'
      ],
      flaws: [
        'El enemigo monstruoso que luché aún me deja temblando de miedo.',
        'Tengo poco respeto por aquellos que no son guerreros probados.',
        'Hice un terrible error en batalla que costó muchas vidas, y haría cualquier cosa para mantenerlo en secreto.',
        'Mi odio por mis enemigos es ciego y sin razón.',
        'Obedezco la ley, incluso si la ley causa miseria.',
        'Prefiero comer mi armadura antes que admitir que estoy equivocado.'
      ]
    },
    variants: []
  },
  {
    id: 'urchin',
    name: 'Pícaro Callejero',
    skillProficiencies: ['Sigilo', 'Juego de Manos'],
    toolProficiencies: ['Kit de disfraz', 'Herramientas de ladrón'],
    equipment: [
      'Un cuchillo pequeño',
      'Un mapa de la ciudad en la que creciste',
      'Un ratón mascota',
      'Un recuerdo de tus padres',
      'Un conjunto de ropa común',
      'Una bolsa con 10 po'
    ],
    feature: {
      name: 'Familiaridad con la Ciudad',
      description: 'Conoces los patrones secretos y el flujo de las ciudades y puedes encontrar pasajes a través del entorno urbano que otros no podrían encontrar. Cuando no estás en combate, tú (y los compañeros que lideras) pueden viajar entre dos ubicaciones en la ciudad el doble de rápido que tu velocidad normalmente permitiría.'
    },
    suggestedCharacteristics: {
      personalityTraits: [
        'Escondo fragmentos de comida y baratijas en mis bolsillos.',
        'Le pregunto a mucha gente las mismas preguntas.',
        'Me gusta encajarme en espacios pequeños donde nadie más puede alcanzarme.',
        'Duermo con la espalda contra la pared o el árbol, con todo lo que poseo envuelto en un paquete en mis brazos.',
        'Como como un cerdo y tengo malos modales.',
        'Creo que cualquiera que sea amable conmigo está escondiendo motivos malvados.',
        'No me gusta tener cosas que no pueda esconder fácilmente en mi persona.',
        'Me encanta escalar edificios, árboles y cualquier otra cosa alta a la que pueda subir.'
      ],
      ideals: [
        'Respeto. Todas las personas, ricas o pobres, merecen respeto. (Bueno)',
        'Comunidad. Debemos cuidarnos unos a otros, porque nadie más lo hará. (Legal)',
        'Cambio. Los bajos caerán y los altos se levantarán. El cambio es la naturaleza de las cosas. (Caótico)',
        'Venganza. Los ricos necesitan ser mostrados qué vida y muerte realmente significan. (Malo)',
        'Personas. Ayudo a la gente que me ayuda, eso es lo que nos mantiene vivos. (Neutral)',
        'Aspiración. Demostraré que soy digno de una vida mejor. (Cualquiera)'
      ],
      bonds: [
        'Mi ciudad o pueblo es mi hogar, y lucharé para defenderlo.',
        'Patrocino un orfanato para mantener a otros de tener la misma vida que tuve.',
        'Debo mi supervivencia a otro pícaro callejero que me enseñó a vivir en las calles.',
        'Me vengué de un despiadado tirano callejero. Estoy marcado por muerte, pero no me arrepiento.',
        'Robo a los ricos para poder ayudar a la gente con la que crecí.',
        'Un juguete pequeño es mi posesión más preciada, porque es todo lo que tengo de mi niñez.'
      ],
      flaws: [
        'Si soy superado, correré lejos de una pelea.',
        'El oro parece brillar muchísimo, y me fascina.',
        'Nunca confiaré plenamente en nadie que no sea yo mismo.',
        'Preferiría matar a alguien durante su sueño que pelear cara a cara.',
        'No es robar si sólo estoy tomando lo que necesito.',
        'Las personas que no pueden tomar cuidado de sí mismas merecen lo que obtienen.'
      ]
    },
    variants: []
  }
];

// Exportar todo para su uso
export default {
  races,
  classes,
  backgrounds
};