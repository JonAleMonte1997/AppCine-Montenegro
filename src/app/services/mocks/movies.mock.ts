import { Movie } from "src/app/models/movie.model";

export const moviesMock: Movie[] = [
  {
    id: 1,
    title: 'Venom: Habrá Matanza',
    year: 2021,
    director: 'Andy Serkis',
    gender: ['Ciencia ficción', 'Acción', 'Aventura'],
    plot: 'Eddie Brock (Tom Hardy) y su simbionte Venom todavía están intentando descubrir cómo vivir juntos cuando un preso que está en el corredor de la muerte (Woody Harrelson) se infecta con un simbionte propio.',
    posterURL: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/2jVVDtDaeMxmcvrz2SNyhMcYtWc.jpg',
    classifield: 'PG-13',
    rate: 4,
    duration: 97,
    price: 1000
  },
  {
    id: 2,
    title: 'Godzilla vs. Kong',
    year: 2021,
    director: 'Adam Wingard',
    gender: ['Acción', 'Fantasía', 'Ciencia ficción'],
    plot: 'Godzilla y Kong, dos de las fuerzas más poderosas de un planeta habitado por todo tipo de aterradoras criaturas, se enfrentan en un espectacular combate que sacude los cimientos de la humanidad. Monarch (Kyle Chandler) se embarca en una misión de alto riesgo y pone rumbo hacia territorios inexplorados para descubrir los orígenes de estos dos titanes, en un último esfuerzo por tratar de salvar a dos bestias que parecen tener las horas contadas sobre la faz de la Tierra.',
    posterURL: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/yJTk4eqQd9Yo5REpFbTSOMkbSgn.jpg',
    classifield: 'PG-13',
    rate: 4,
    duration: 113,
    price: 2000
  },
  {
    id: 3,
    title: 'Mortal Kombat',
    year: 2021,
    director: 'Simon McQuoid',
    gender: ['Acción', 'Fantasía', 'Aventura'],
    plot: 'Un boxeador fracasado descubre un secreto familiar que lo lleva a un torneo místico llamado Mortal Kombat donde se encuentra con un grupo de guerreros que luchan hasta la muerte para salvar los reinos del malvado hechicero Shang Tsung.',
    posterURL: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/jtBHWEbuTrqhsd1Xf3jqF1Rr3KY.jpg',
    classifield: 'R',
    rate: 4,
    duration: 110,
    price: 1500
  },
  {
    id: 4,
    title: 'El padrino. Parte II',
    year: 1974,
    director: 'Francis Ford Coppola',
    gender: ['Drama', 'Crimen'],
    plot: 'Continuación de la saga de los Corleone con dos historias paralelas: la elección de Michael Corleone como jefe de los negocios familiares y los orígenes del patriarca, el ya fallecido Don Vito, primero en Sicilia y luego en Estados Unidos, donde, empezando desde abajo, llegó a ser un poderosísimo jefe de la mafia de Nueva York.',
    posterURL: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/qm0X1q3e8HXz9LuyY6KHqq7wYi1.jpg',
    classifield: 'R',
    rate: 4.5,
    duration: 200,
    price: 500
  },
  {
    id: 5,
    title: 'El Grinch',
    year: 2000,
    director: 'Ron Howard',
    gender: ['Familia', 'Comedia', 'Fantasía'],
    plot: 'Cada año, en Navidad, los lugareños perturban su pacífica soledad con celebraciones cada vez más desmesuradas, luminosas y ruidosas. Cuando los Quién declaran que ese año van a preparar una Navidad el triple de grande, el Grinch se da cuenta de que solo hay un modo de recuperar algo de paz y silencio: robar la Navidad. Para ello, decide hacerse pasar por Santa Claus en Nochebuena, haciéndose con un reno muy peculiar para tirar de su trineo. Mientras tanto, en Villa Quién, una dulce niña llamada Cindy-Lou, desbordante de espíritu navideño, planea con sus amigos atrapar a Papá Noel durante su visita en Nochebuena para darle las gracias por ayudar a su trabajadora madre. Sin embargo, a medida que se acerca la noche mágica, sus buenas intenciones amenazan con chocar con las del Grinch, mucho más perversas.',
    posterURL: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/yCZ3xAPM5009ltBUUwPtCeWKQWy.jpg',
    classifield: 'PG',
    rate: 3.5,
    duration: 104,
    price: 1000
  }
]
