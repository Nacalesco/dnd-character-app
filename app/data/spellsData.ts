// app/data/spellsData.ts

export type SpellSchool = 
  'Abjuración' | 
  'Conjuración' | 
  'Adivinación' | 
  'Encantamiento' | 
  'Evocación' | 
  'Ilusión' | 
  'Nigromancia' | 
  'Transmutación';

export type SpellComponent = 'V' | 'S' | 'M';

export type SpellClass = 
  'Bardo' | 
  'Clérigo' | 
  'Druida' | 
  'Hechicero' | 
  'Brujo' | 
  'Mago' | 
  'Paladín' | 
  'Explorador';

export interface Spell {
  id: string;
  name: string;
  level: number; // 0 = cantrip, 1-9 for regular spells
  school: SpellSchool;
  castingTime: string;
  range: string;
  components: SpellComponent[];
  material?: string; // Material components description
  duration: string;
  concentration: boolean;
  ritual: boolean;
  description: string;
  higherLevels?: string; // Description for casting at higher levels
  classes: SpellClass[];
}

// Este es solo un conjunto inicial de hechizos como ejemplo.
// En una aplicación real, podrías tener cientos de hechizos.
export const spells: Spell[] = [
  {
    id: 'acid-splash',
    name: 'Salpicadura Ácida',
    level: 0, // Truco
    school: 'Conjuración',
    castingTime: '1 acción',
    range: '60 pies',
    components: ['V', 'S'],
    duration: 'Instantáneo',
    concentration: false,
    ritual: false,
    description: 'Lanzas una burbuja de ácido. Elige una criatura dentro del alcance, o elige dos criaturas dentro del alcance que estén a 5 pies o menos entre sí. Un objetivo debe tener éxito en una tirada de salvación de Destreza o recibir 1d6 de daño por ácido. El daño de este conjuro aumenta en 1d6 cuando alcanzas el nivel 5 (2d6), el nivel 11 (3d6) y el nivel 17 (4d6).',
    classes: ['Hechicero', 'Mago']
  },
  {
    id: 'blade-ward',
    name: 'Protección contra Armas',
    level: 0, // Truco
    school: 'Abjuración',
    castingTime: '1 acción',
    range: 'Personal',
    components: ['V', 'S'],
    duration: '1 ronda',
    concentration: false,
    ritual: false,
    description: 'Extiendes tu mano y trazas un signo de protección en el aire. Hasta el final de tu siguiente turno, tienes resistencia contra el daño contundente, perforante y cortante infligido por ataques con armas.',
    classes: ['Bardo', 'Brujo', 'Hechicero', 'Mago']
  },
  {
    id: 'dancing-lights',
    name: 'Luces Danzantes',
    level: 0, // Truco
    school: 'Evocación',
    castingTime: '1 acción',
    range: '120 pies',
    components: ['V', 'S', 'M'],
    material: 'Un poco de fósforo o una luciérnaga, o un palo de madera luminosa.',
    duration: 'Concentración, hasta 1 minuto',
    concentration: true,
    ritual: false,
    description: 'Creas hasta cuatro luces del tamaño de una antorcha dentro del alcance, haciéndolas aparecer como antorchas, linternas o esferas luminosas que flotan en el aire. También puedes combinar las cuatro luces en una forma luminosa vagamente humanoide de tamaño Mediano. Cualquiera que sea la forma que elijas, cada luz emite luz tenue en un radio de 10 pies. Como acción adicional en tu turno, puedes mover las luces hasta 60 pies a un nuevo punto dentro del alcance. Una luz debe estar a 20 pies o menos de otra luz creada por este conjuro, y una luz se extingue si excede el alcance del conjuro.',
    classes: ['Bardo', 'Hechicero', 'Mago']
  },
  {
    id: 'fire-bolt',
    name: 'Descarga de Fuego',
    level: 0, // Truco
    school: 'Evocación',
    castingTime: '1 acción',
    range: '120 pies',
    components: ['V', 'S'],
    duration: 'Instantáneo',
    concentration: false,
    ritual: false,
    description: 'Lanzas un mote de fuego a una criatura u objeto dentro del alcance. Realiza un ataque de conjuro a distancia contra el objetivo. Si impactas, el objetivo recibe 1d10 de daño por fuego. Un objeto inflamable alcanzado por este conjuro se incendia si no lo lleva puesto alguien. El daño de este conjuro aumenta en 1d10 cuando alcanzas el nivel 5 (2d10), el nivel 11 (3d10) y el nivel 17 (4d10).',
    classes: ['Hechicero', 'Mago']
  },
  {
    id: 'light',
    name: 'Luz',
    level: 0, // Truco
    school: 'Evocación',
    castingTime: '1 acción',
    range: 'Toque',
    components: ['V', 'M'],
    material: 'Una luciérnaga o musgo fosforescente.',
    duration: '1 hora',
    concentration: false,
    ritual: false,
    description: 'Tocas un objeto que no tenga más de 10 pies en cualquier dimensión. Hasta que el conjuro termine, el objeto emite luz brillante en un radio de 20 pies y luz tenue por 20 pies adicionales. La luz puede ser del color que desees. Cubrir completamente el objeto con algo opaco bloquea la luz. El conjuro termina si lo lanzas otra vez o lo disipas como acción. Si diriges este conjuro a un objeto que lleva o porta una criatura hostil, esa criatura debe tener éxito en una tirada de salvación de Destreza para evitar el conjuro.',
    classes: ['Bardo', 'Clérigo', 'Hechicero', 'Mago']
  },
  {
    id: 'mage-hand',
    name: 'Mano de Mago',
    level: 0, // Truco
    school: 'Conjuración',
    castingTime: '1 acción',
    range: '30 pies',
    components: ['V', 'S'],
    duration: '1 minuto',
    concentration: false,
    ritual: false,
    description: 'Una mano espectral flotante aparece en un punto que elijas dentro del alcance. La mano dura mientras dure el conjuro o hasta que la descartes como acción. La mano se desvanece si está alguna vez a más de 30 pies de ti o si vuelves a lanzar este conjuro. Puedes usar tu acción para controlar la mano. Puedes usar la mano para manipular un objeto, abrir una puerta o contenedor desbloqueado, meter o sacar un objeto de un contenedor abierto, o verter el contenido de un vial. Puedes mover la mano hasta 30 pies cada vez que la usas. La mano no puede atacar, activar objetos mágicos ni cargar más de 10 libras.',
    classes: ['Bardo', 'Brujo', 'Hechicero', 'Mago']
  },
  {
    id: 'magic-missile',
    name: 'Proyectil Mágico',
    level: 1,
    school: 'Evocación',
    castingTime: '1 acción',
    range: '120 pies',
    components: ['V', 'S'],
    duration: 'Instantáneo',
    concentration: false,
    ritual: false,
    description: 'Creas tres dardos brillantes de fuerza mágica. Cada dardo impacta a una criatura de tu elección que puedas ver dentro del alcance. Un dardo inflige 1d4 + 1 de daño por fuerza a su objetivo. Los dardos impactan todos simultáneamente y puedes dirigirlos para que impacten a una o más criaturas.',
    higherLevels: 'Cuando lanzas este conjuro usando un espacio de conjuro de nivel 2 o superior, el conjuro crea un dardo adicional por cada nivel de espacio por encima de nivel 1.',
    classes: ['Hechicero', 'Mago']
  },
  {
    id: 'shield',
    name: 'Escudo',
    level: 1,
    school: 'Abjuración',
    castingTime: '1 reacción, que realizas cuando te impacta un ataque o eres objetivo del conjuro proyectil mágico.',
    range: 'Personal',
    components: ['V', 'S'],
    duration: '1 ronda',
    concentration: false,
    ritual: false,
    description: 'Una barrera invisible de fuerza mágica aparece y te protege. Hasta el inicio de tu siguiente turno, tienes un bonificador +5 a la CA, incluyendo contra el ataque desencadenante, y no recibes daño de proyectil mágico.',
    classes: ['Hechicero', 'Mago']
  },
  {
    id: 'cure-wounds',
    name: 'Curar Heridas',
    level: 1,
    school: 'Evocación',
    castingTime: '1 acción',
    range: 'Toque',
    components: ['V', 'S'],
    duration: 'Instantáneo',
    concentration: false,
    ritual: false,
    description: 'Una criatura que tocas recupera un número de puntos de golpe igual a 1d8 + tu modificador de característica para lanzar conjuros. Este conjuro no tiene efecto en no muertos o constructos.',
    higherLevels: 'Cuando lanzas este conjuro usando un espacio de conjuro de nivel 2 o superior, la curación aumenta en 1d8 por cada nivel de espacio por encima de nivel 1.',
    classes: ['Bardo', 'Clérigo', 'Druida', 'Paladín', 'Explorador']
  },
  {
    id: 'detect-magic',
    name: 'Detectar Magia',
    level: 1,
    school: 'Adivinación',
    castingTime: '1 acción',
    range: 'Personal',
    components: ['V', 'S'],
    duration: 'Concentración, hasta 10 minutos',
    concentration: true,
    ritual: true,
    description: 'Por la duración, sientes la presencia de magia a 30 pies de ti. Si sientes magia de esta manera, puedes usar tu acción para ver un aura débil alrededor de cualquier criatura u objeto visible en el área que porte magia, y aprendes su escuela de magia, si la tiene. El conjuro puede penetrar la mayoría de barreras, pero es bloqueado por 1 pie de piedra, 1 pulgada de metal común, una delgada lámina de plomo, o 3 pies de madera o tierra.',
    classes: ['Bardo', 'Clérigo', 'Druida', 'Paladín', 'Hechicero', 'Mago']
  },
  {
    id: 'fireball',
    name: 'Bola de Fuego',
    level: 3,
    school: 'Evocación',
    castingTime: '1 acción',
    range: '150 pies',
    components: ['V', 'S', 'M'],
    material: 'Una pequeña bola de guano de murciélago y azufre.',
    duration: 'Instantáneo',
    concentration: false,
    ritual: false,
    description: 'Un rayo brillante sale disparado de tu dedo señalador hacia un punto que elijas dentro del alcance y luego florece con un rugido bajo hasta convertirse en una explosión de llamas. Cada criatura en una esfera de 20 pies de radio centrada en ese punto debe hacer una tirada de salvación de Destreza. Un objetivo recibe 8d6 de daño por fuego en una salvación fallida, o la mitad de daño en una exitosa. El fuego se propaga rodeando esquinas. Incendia objetos inflamables en el área que no estén siendo usados o cargados.',
    higherLevels: 'Cuando lanzas este conjuro usando un espacio de conjuro de nivel 4 o superior, el daño aumenta en 1d6 por cada nivel de espacio por encima de nivel 3.',
    classes: ['Hechicero', 'Mago']
  },
  {
    id: 'counterspell',
    name: 'Contrahechizo',
    level: 3,
    school: 'Abjuración',
    castingTime: '1 reacción, que realizas cuando ves a una criatura a 60 pies de ti lanzar un conjuro.',
    range: '60 pies',
    components: ['S'],
    duration: 'Instantáneo',
    concentration: false,
    ritual: false,
    description: 'Intentas interrumpir a una criatura en el proceso de lanzar un conjuro. Si la criatura está lanzando un conjuro de nivel 3 o menor, su conjuro falla y no tiene efecto. Si está lanzando un conjuro de nivel 4 o superior, haz una prueba de característica usando tu característica para lanzar conjuros. La CD es igual a 10 + el nivel del conjuro. En un éxito, el conjuro de la criatura falla y no tiene efecto.',
    higherLevels: 'Cuando lanzas este conjuro usando un espacio de conjuro de nivel 4 o superior, el conjuro interrumpido no tiene efecto si su nivel es menor o igual al nivel del espacio de conjuro que usaste.',
    classes: ['Brujo', 'Hechicero', 'Mago']
  },
  {
    id: 'wish',
    name: 'Deseo',
    level: 9,
    school: 'Conjuración',
    castingTime: '1 acción',
    range: 'Personal',
    components: ['V'],
    duration: 'Instantáneo',
    concentration: false,
    ritual: false,
    description: 'Deseo es el conjuro más poderoso que una criatura mortal puede lanzar. Simplemente hablando en voz alta, puedes alterar los mismos cimientos de la realidad de acuerdo con tus deseos. El uso básico de este conjuro es duplicar cualquier otro conjuro de nivel 8 o menor. No necesitas cumplir con ningún requisito en ese conjuro, incluyendo componentes costosos. El conjuro simplemente tiene efecto. Alternativamente, puedes crear uno de los siguientes efectos a tu elección: • Creas un objeto no mágico valorado en hasta 25,000 po. El objeto no puede tener más de 300 pies en cualquier dimensión, y aparece en un espacio desocupado que puedas ver en el suelo. • Permites a hasta veinte criaturas que puedas ver recuperarse de todo el daño y terminas todos los efectos descritos en el conjuro restauración mayor. • Otorgas a hasta diez criaturas que puedas ver resistencia a un tipo de daño a tu elección. • Otorgas a hasta diez criaturas que puedas ver inmunidad a un único conjuro o efecto mágico por 8 horas. Por ejemplo, podrías hacer inmunes a ti y a todos tus compañeros al ataque de drenaje de vida de un liche. • Deshaces un único evento reciente forzando una nueva tirada de cualquier tirada hecha en la última ronda (incluyendo tu última ronda). La realidad se reformula para acomodar el nuevo resultado. Por ejemplo, un conjuro deseo podría deshacer el éxito de un enemigo en una tirada de salvación, el golpe crítico de un enemigo, o la salvación fallida de un amigo. Puedes forzar que la nueva tirada se haga con ventaja o desventaja, y puedes elegir si usar el nuevo resultado o el original. También podrías ser capaz de lograr algo más allá del alcance de los ejemplos anteriores. Di tu deseo al DM lo más precisamente posible. El DM tiene gran libertad para determinar qué ocurre en tal caso; cuanto mayor sea el deseo, mayor es la probabilidad de que algo salga mal. Este conjuro podría simplemente fallar, el efecto que buscas podría ocurrir solo parcialmente, o podrías sufrir alguna consecuencia imprevista como resultado de cómo fraseas el deseo. Por ejemplo, desear que un villano esté muerto podría propulsarte adelante en el tiempo a un período en el que ese villano ya no está vivo, efectivamente eliminándote del juego. Similarmente, desear un objeto legendario mágico o artefacto podría instantáneamente transportarte a la presencia del actual dueño del objeto. El estrés de lanzar este conjuro para producir cualquier efecto distinto de la duplicación de otro conjuro te debilita. Después de sufrir este estrés, cada vez que lanzas un conjuro hasta que terminas un descanso largo, sufres 1d10 de daño necrótico por nivel de ese conjuro. Este daño no puede ser reducido o prevenido de ninguna manera. Además, tu Fuerza se reduce a 3, si no es ya menor, por 2d4 días. Por cada uno de esos días que pases descansando y sin hacer nada más que actividades ligeras, tu tiempo de recuperación se reduce en 2 días. Finalmente, hay un 33 por ciento de probabilidad de que nunca seas capaz de lanzar deseo de nuevo si sufres este estrés.',
    classes: ['Hechicero', 'Mago']
  },
  // Agrega más hechizos aquí
];

export const getSpellById = (id: string): Spell | undefined => {
  return spells.find(spell => spell.id === id);
};

export const getSpellsByLevel = (level: number): Spell[] => {
  return spells.filter(spell => spell.level === level);
};

export const getSpellsByClass = (className: SpellClass): Spell[] => {
  return spells.filter(spell => spell.classes.includes(className));
};

export const getSpellsBySchool = (school: SpellSchool): Spell[] => {
  return spells.filter(spell => spell.school === school);
};

export const searchSpells = (query: string): Spell[] => {
  const lowerCaseQuery = query.toLowerCase();
  return spells.filter(
    spell => 
      spell.name.toLowerCase().includes(lowerCaseQuery) ||
      spell.description.toLowerCase().includes(lowerCaseQuery)
  );
};