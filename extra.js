// Contenido extra (v8): más oraciones por unidad, historias, vocabulario y errores típicos.
// Mismo formato que content.js: "inglés con [parte practicada] | español | otras respuestas;válidas"

const EXTRA_S = {
  1: `My teacher [is] very patient. | Mi maestro es muy paciente.
The Wi-Fi [is] slow at school. | El wifi está lento en la escuela. | The WiFi is slow at school
I [am not] good at math. | No soy bueno en matemáticas. | I'm not good at math
[Is] your phone new? | ¿Tu celular es nuevo? | Is your cellphone new
We [are] tired after class. | Estamos cansados después de clase. | We're tired after class
My best friend [is] a gamer. | Mi mejor amigo es gamer.
You [are] right. | Tienes razón. | You're right
The tacos [are] delicious. | Los tacos están deliciosos.
[Is] the store open? | ¿Está abierta la tienda? | Is the shop open
I [am] at the bus stop. | Estoy en la parada del camión. | I'm at the bus stop`,
  2: `I [check] my phone in the morning. | Reviso mi celular en la mañana. | I check my cellphone in the morning
She [watches] anime every night. | Ella ve anime todas las noches.
My mom [cooks] on Sundays. | Mi mamá cocina los domingos.
We [walk] to the store. | Caminamos a la tienda. | We walk to the shop
He always [goes] to bed late. | Él siempre se duerme tarde. | He always goes to sleep late
I [listen] to music on the bus. | Escucho música en el camión.
The store [opens] at nine. | La tienda abre a las nueve. | The store opens at 9;The shop opens at nine
My dog [sleeps] all day. | Mi perro duerme todo el día.
I [drink] a lot of water. | Tomo mucha agua. | I drink lots of water
He [fixes] computers. | Él arregla computadoras. | He repairs computers`,
  3: `I [don't] have a car. | No tengo carro. | I do not have a car
[Does] she like tacos? | ¿A ella le gustan los tacos?
We [don't] have class today. | No tenemos clase hoy. | We do not have class today;We don't have classes today
How [do] you say this in English? | ¿Cómo se dice esto en inglés?
He [doesn't] play soccer. | Él no juega futbol. | He does not play soccer;He doesn't play football
[Do] you have Wi-Fi here? | ¿Tienes wifi aquí? | Do you have WiFi here
What [does] this word mean? | ¿Qué significa esta palabra?
My phone [doesn't] charge. | Mi celular no carga. | My phone does not charge
Where [does] he work? | ¿Dónde trabaja él?
I [don't] understand. | No entiendo. | I do not understand`,
  4: `There [is] a store on the corner. | Hay una tienda en la esquina. | There's a store on the corner;There is a shop on the corner
There [are] many people on the bus. | Hay mucha gente en el camión. | There are a lot of people on the bus
[Is] there a bathroom here? | ¿Hay un baño aquí? | Is there a restroom here
There [isn't] any milk. | No hay leche. | There is not any milk;There's no milk
There [are] three bugs in this file. | Hay tres errores en este archivo. | There are 3 bugs in this file
[Are] there any tacos left? | ¿Quedan tacos?
There [is] a new update. | Hay una actualización nueva. | There's a new update
There [are] two exams this week. | Hay dos exámenes esta semana. | There are 2 exams this week`,
  5: `I [am walking] to the store. | Voy caminando a la tienda. | I'm walking to the store;I am walking to the shop
He [is sleeping] right now. | Él está durmiendo ahorita. | He's sleeping right now;He is sleeping now
The bus [is coming]. | Ya viene el camión. | The bus is coming now
What [are] you watching? | ¿Qué estás viendo?
We [are eating] tacos. | Estamos comiendo tacos. | We're eating tacos
She [is not listening]. | Ella no está escuchando. | She isn't listening;She's not listening
I [am downloading] the update. | Estoy descargando la actualización. | I'm downloading the update
They [are talking] about the game. | Están hablando del juego. | They're talking about the game
My phone [is charging]. | Mi celular se está cargando. | My phone is charging now
[Is] it raining there? | ¿Está lloviendo allá?`,
  6: `I [can't] find my keys. | No encuentro mis llaves. | I cannot find my keys
[Can] you see the bus? | ¿Ves el camión? | Can you see the bus
She [can] cook very well. | Ella cocina muy bien. | She can cook really well
[Can] we pay with card? | ¿Podemos pagar con tarjeta? | Can we pay by card
I [can't] hear you. | No te escucho. | I cannot hear you
He [can] fix your laptop. | Él puede arreglar tu laptop. | He can repair your laptop
[Could] you speak more slowly? | ¿Podrías hablar más despacio? | Could you speak slower
You [can] sit here. | Puedes sentarte aquí.`,
  7: `I [was] at home all weekend. | Estuve en casa todo el fin de semana.
The movie [was] boring. | La película estuvo aburrida.
We [watched] a series last night. | Vimos una serie anoche.
She [called] me yesterday. | Ella me llamó ayer.
[Did] you sleep well? | ¿Dormiste bien?
I [didn't] study for the quiz. | No estudié para el quiz. | I did not study for the quiz
The bus [arrived] late. | El camión llegó tarde.
They [were] very happy. | Estaban muy felices.
I [walked] to school today. | Hoy caminé a la escuela.
[Was] the exam difficult? | ¿Estuvo difícil el examen?`,
  8: `I [ate] tacos for lunch. | Comí tacos de almuerzo. | I ate tacos for dinner
She [took] a lot of photos. | Ella tomó muchas fotos.
We [left] early. | Nos fuimos temprano.
I [lost] my phone last week. | Perdí mi celular la semana pasada.
He [told] me the truth. | Él me dijo la verdad.
I [found] the bug! | ¡Encontré el error!
We [got] a good grade. | Sacamos una buena calificación.
I [slept] only five hours. | Dormí solo cinco horas. | I slept only 5 hours;I only slept five hours
She [spent] all her money. | Ella gastó todo su dinero.
I [knew] the answer. | Me sabía la respuesta. | I knew the answer`,
  9: `I [am going to] buy a new phone. | Voy a comprar un celular nuevo. | I'm going to buy a new phone
We [are going to] be late. | Vamos a llegar tarde. | We're going to be late
I['ll] call you later. | Te llamo más tarde. | I will call you later
It [will] be a great year. | Va a ser un gran año. | It'll be a great year
He [isn't going to] come. | Él no va a venir. | He's not going to come;He is not going to come
[Will] you help me? | ¿Me ayudas? | Will you help me
I [am going to] study tonight. | Voy a estudiar esta noche. | I'm going to study tonight
Don't worry, I [won't] forget. | No te preocupes, no se me va a olvidar. | Don't worry, I will not forget`,
  10: `This line is [longer] than yesterday. | Esta fila está más larga que ayer.
Tacos are [better] than burgers. | Los tacos son mejores que las hamburguesas.
Today is [hotter] than yesterday. | Hoy hace más calor que ayer.
This is the [worst] bug ever. | Este es el peor error de la historia.
My room is [smaller] than yours. | Mi cuarto es más chico que el tuyo. | My room is smaller than your room
The bus is [cheaper] than a taxi. | El camión es más barato que un taxi.
She is the [smartest] in the class. | Ella es la más inteligente de la clase.
This game is [more expensive] than I thought. | Este juego es más caro de lo que pensé.`,
  11: `How [much] is it? | ¿Cuánto cuesta?
I have [some] money. | Tengo algo de dinero.
There aren't [any] seats. | No hay asientos. | There are not any seats
I drink too [much] coffee. | Tomo demasiado café.
How [many] classes do you have? | ¿Cuántas clases tienes?
I need [a few] minutes. | Necesito unos minutos.
We have [a lot of] homework. | Tenemos mucha tarea. | We have lots of homework
Is there [any] water? | ¿Hay agua?`,
  12: `I [have] already eaten. | Ya comí. | I've already eaten
She [has] never seen the ocean. | Ella nunca ha visto el mar. | She's never seen the ocean
Have you [finished] your homework? | ¿Ya terminaste tu tarea?
We [have] just arrived. | Acabamos de llegar. | We've just arrived
I [haven't] started yet. | Todavía no empiezo. | I have not started yet
He [has] lost his keys. | Él perdió sus llaves. | He's lost his keys
How long [have] you studied English? | ¿Cuánto tiempo has estudiado inglés?
I've [been] here for an hour. | Llevo una hora aquí. | I have been here for an hour`,
};

const EXTRA_STORIES = [
  { id: "s7", level: "A1", title: "On the bus", lines: [
    ["I am on the bus.", "Estoy en el camión."],
    ["The bus is full and very slow.", "El camión va lleno y muy lento."],
    ["A woman is talking on the phone.", "Una señora está hablando por teléfono."],
    ["Two students are playing a game on their phones.", "Dos estudiantes están jugando un juego en sus celulares."],
    ["I don't have headphones today.", "Hoy no traigo audífonos."],
    ["So I read English sentences in my app.", "Así que leo oraciones en inglés en mi app."],
    ["It is a good way to use my time.", "Es una buena forma de usar mi tiempo."],
    ["My stop is next. I get off the bus.", "Mi parada es la siguiente. Me bajo del camión."],
  ], q: [
    ["How is the bus?", ["Empty and fast", "Full and slow", "Broken"], 1],
    ["Why doesn't he listen to audio?", ["He has no headphones", "He is sleeping", "The bus is quiet"], 0],
    ["What does he do?", ["He plays a game", "He reads English sentences", "He calls his mom"], 1],
  ]},
  { id: "s8", level: "A1", title: "At the taco stand", lines: [
    ["It is nine at night and I am hungry.", "Son las nueve de la noche y tengo hambre."],
    ["There is a taco stand near my house.", "Hay un puesto de tacos cerca de mi casa."],
    ["The tacos are cheap and delicious.", "Los tacos son baratos y deliciosos."],
    ["I order five tacos al pastor.", "Pido cinco tacos al pastor."],
    ["The man asks: \"With everything?\"", "El señor pregunta: \"¿Con todo?\""],
    ["I say yes, but no onion, please.", "Digo que sí, pero sin cebolla, por favor."],
    ["I pay with cash because they don't take cards.", "Pago en efectivo porque no aceptan tarjeta."],
    ["Now I am happy.", "Ahora estoy feliz."],
  ], q: [
    ["How many tacos does he order?", ["Three", "Five", "Ten"], 1],
    ["What doesn't he want?", ["Onion", "Salsa", "Meat"], 0],
    ["How does he pay?", ["With a card", "With cash", "He doesn't pay"], 1],
  ]},
  { id: "s9", level: "A2", title: "The group project", lines: [
    ["Last week our teacher gave us a group project.", "La semana pasada el maestro nos dejó un proyecto en equipo."],
    ["We had to build a website in five days.", "Teníamos que hacer una página web en cinco días."],
    ["Carlos designed the pages and Ana wrote the text.", "Carlos diseñó las páginas y Ana escribió el texto."],
    ["I worked on the database.", "Yo trabajé en la base de datos."],
    ["On Thursday, the website stopped working.", "El jueves, la página dejó de funcionar."],
    ["We were very nervous.", "Estábamos muy nerviosos."],
    ["I found the problem at two in the morning: a missing comma!", "Encontré el problema a las dos de la mañana: ¡faltaba una coma!"],
    ["On Friday we presented it and got a nine.", "El viernes lo presentamos y sacamos nueve."],
  ], q: [
    ["What did they build?", ["A game", "A website", "An app"], 1],
    ["What did he work on?", ["The design", "The text", "The database"], 2],
    ["What was the problem?", ["A missing comma", "No internet", "A broken laptop"], 0],
  ]},
  { id: "s10", level: "A2", title: "My new phone", lines: [
    ["My old phone was really slow.", "Mi celular viejo era muy lento."],
    ["The battery died every afternoon.", "La batería se acababa todas las tardes."],
    ["So I saved money for six months.", "Así que ahorré dinero por seis meses."],
    ["Yesterday I bought a new phone.", "Ayer compré un celular nuevo."],
    ["It is faster and the camera is much better.", "Es más rápido y la cámara es mucho mejor."],
    ["But it was more expensive than I thought.", "Pero fue más caro de lo que pensé."],
    ["Now I need a case, because I always drop my phone.", "Ahora necesito una funda, porque siempre se me cae el celular."],
  ], q: [
    ["What was the problem with the old phone?", ["It was slow", "It was too big", "It had no camera"], 0],
    ["How long did he save money?", ["Six weeks", "Six months", "One year"], 1],
    ["Why does he need a case?", ["It's cold", "He always drops his phone", "It's a gift"], 1],
  ]},
  { id: "s11", level: "A2", title: "A rainy Saturday", lines: [
    ["On Saturday it rained all day.", "El sábado llovió todo el día."],
    ["I wanted to go to the park, but I stayed home.", "Quería ir al parque, pero me quedé en casa."],
    ["First, I cleaned my room.", "Primero, limpié mi cuarto."],
    ["Then I played Minecraft with my cousins online.", "Luego jugué Minecraft con mis primos en línea."],
    ["We built a huge castle.", "Construimos un castillo enorme."],
    ["In the evening, my mom made hot chocolate.", "En la tarde, mi mamá hizo chocolate caliente."],
    ["It wasn't the day I planned, but it was fun.", "No fue el día que planeé, pero fue divertido."],
  ], q: [
    ["Why didn't he go to the park?", ["It rained", "He was sick", "It was closed"], 0],
    ["What did they build?", ["A house", "A castle", "A bridge"], 1],
    ["Who made hot chocolate?", ["His cousin", "His mom", "He did"], 1],
  ]},
  { id: "s12", level: "B1", title: "Learning English my way", lines: [
    ["I have studied English at school for years, but I never really learned it.", "He estudiado inglés en la escuela por años, pero nunca lo aprendí de verdad."],
    ["The classes were always the same: read, repeat, forget.", "Las clases siempre eran iguales: leer, repetir, olvidar."],
    ["This year I'm trying something different.", "Este año estoy intentando algo diferente."],
    ["I practice a little every day, even on the bus.", "Practico un poco cada día, incluso en el camión."],
    ["I have noticed that I understand more in games and videos.", "He notado que entiendo más en juegos y videos."],
    ["When I make a mistake, the app shows it to me again later.", "Cuando me equivoco, la app me lo vuelve a mostrar después."],
    ["I'm not perfect yet, but I'm getting better.", "Todavía no soy perfecto, pero estoy mejorando."],
    ["My goal is to read programming documentation without a translator.", "Mi meta es leer documentación de programación sin traductor."],
  ], q: [
    ["What was the problem with his classes?", ["They were too hard", "They were always the same", "They were in English"], 1],
    ["Where does he practice?", ["Only at home", "Even on the bus", "Only at school"], 1],
    ["What is his goal?", ["To travel", "To read documentation without a translator", "To pass an exam"], 1],
  ]},
];

// Vocabulario para "Parejas" y "¿Qué significa?" (todo sin audio)
const VOCAB = {
  "Tecnología": "laptop|laptop;keyboard|teclado;mouse|ratón;screen|pantalla;charger|cargador;battery|batería;password|contraseña;update|actualización;download|descargar;upload|subir;file|archivo;folder|carpeta;bug|error;server|servidor;database|base de datos;to save|guardar;to delete|borrar;settings|configuración;network|red;to crash|tronar / colgarse",
  "Escuela": "homework|tarea;grade|calificación;teacher|maestro;classmate|compañero de clase;exam|examen;to fail|reprobar;to pass|aprobar;subject|materia;schedule|horario;group project|proyecto en equipo;deadline|fecha de entrega;library|biblioteca;notebook|cuaderno;to attend|asistir;degree|carrera / título",
  "Videojuegos": "player|jugador;level|nivel;to win|ganar;to lose|perder;enemy|enemigo;weapon|arma;to build|construir;to beat|vencer / pasar;skin|apariencia;team|equipo;lag|retraso;health|vida;quest|misión;to respawn|reaparecer;controller|control",
  "En la calle": "bus|camión;bus stop|parada;street|calle;corner|esquina;traffic|tráfico;sidewalk|banqueta;store|tienda;cash|efectivo;change|cambio;ticket|boleto;line|fila;crowded|lleno de gente;on foot|a pie;to get off|bajarse;to get on|subirse",
  "Comida": "breakfast|desayuno;lunch|comida / almuerzo;dinner|cena;hungry|con hambre;thirsty|con sed;spicy|picante;sweet|dulce;the bill|la cuenta;tip|propina;to order|pedir;onion|cebolla;beans|frijoles;chicken|pollo;water|agua;juice|jugo",
  "Sentimientos": "tired|cansado;bored|aburrido;boring|aburrido (algo);excited|emocionado;nervous|nervioso;worried|preocupado;angry|enojado;proud|orgulloso;scared|asustado;sad|triste;happy|feliz;stressed|estresado;lazy|flojo;confused|confundido;relaxed|relajado",
  "Verbos útiles": "to look for|buscar;to find|encontrar;to wait|esperar;to need|necesitar;to try|intentar;to forget|olvidar;to remember|recordar;to borrow|pedir prestado;to lend|prestar;to spend|gastar;to save|ahorrar;to choose|elegir;to share|compartir;to arrive|llegar;to leave|irse / dejar",
  "Falsos amigos": "actually|en realidad;currently|actualmente;to realize|darse cuenta;to attend|asistir;to assist|ayudar;embarrassed|avergonzado;library|biblioteca;bookstore|librería;sensible|sensato;sensitive|sensible;exit|salida;success|éxito;career|carrera profesional;argument|discusión;to pretend|fingir",
};
const VOCAB_LIST = Object.entries(VOCAB).flatMap(([cat, s]) => s.split(";").map((p) => { const [en, es] = p.split("|"); return { en, es, cat }; }));

// Encuentra el error: [oración con error, parte equivocada, oración correcta, explicación]
const FIX = [
  ["I have 20 years.", "have", "I am 20 years old.", "La edad va con TO BE: I am 20 (years old)."],
  ["She don't like coffee.", "don't", "She doesn't like coffee.", "Con he/she/it se usa doesn't."],
  ["Is raining.", "Is", "It is raining.", "En inglés el sujeto es obligatorio: It is raining."],
  ["People is happy.", "is", "People are happy.", "People es plural: are."],
  ["I am agree.", "am", "I agree.", "Agree es verbo; no lleva am."],
  ["Did you went to class?", "went", "Did you go to class?", "Después de did va la forma base."],
  ["The life is hard.", "The", "Life is hard.", "Sin the cuando hablas en general."],
  ["Explain me this.", "me", "Explain this to me.", "Se dice explain something to someone."],
  ["It depends of you.", "of", "It depends on you.", "Depend on, no depend of."],
  ["Can I make a question?", "make", "Can I ask a question?", "Se dice ask a question."],
  ["I need informations.", "informations", "I need information.", "Information no tiene plural."],
  ["It's more better.", "more", "It's better.", "Better ya es comparativo."],
  ["I want that you come.", "that", "I want you to come.", "Want + persona + to + verbo."],
  ["I have two reds cars.", "reds", "I have two red cars.", "Los adjetivos no llevan -s."],
  ["I'm boring in class.", "boring", "I'm bored in class.", "Bored = cómo te sientes; boring = cómo es algo."],
  ["I assist to class every day.", "assist", "I attend class every day.", "Asistir a clase = attend."],
  ["I'm going to the home.", "the", "I'm going home.", "Go home, sin to the."],
  ["He work in a bank.", "work", "He works in a bank.", "He/she/it + verbo con -s."],
  ["She can to swim.", "to", "She can swim.", "Después de can no va to."],
  ["I didn't saw the email.", "saw", "I didn't see the email.", "Después de didn't, forma base."],
  ["Where you live?", "you", "Where do you live?", "Las preguntas necesitan do/does."],
  ["My brother is more tall than me.", "more", "My brother is taller than me.", "Adjetivos cortos: -er."],
  ["There is two players.", "is", "There are two players.", "Plural: there are."],
  ["I am study English.", "study", "I am studying English.", "Presente continuo: am + -ing."],
  ["She have a new laptop.", "have", "She has a new laptop.", "He/she/it + has."],
  ["I live here since 2020.", "live", "I have lived here since 2020.", "Acción que sigue desde el pasado: presente perfecto."],
  ["I have much friends.", "much", "I have many friends.", "Many con cosas contables."],
  ["How much players are online?", "much", "How many players are online?", "How many + plural contable."],
  ["Actually I study at UVP.", "Actually", "Currently, I study at UVP.", "Actually = en realidad; actualmente = currently."],
  ["I'm very exciting about the trip.", "exciting", "I'm very excited about the trip.", "Excited = cómo te sientes."],
  ["He doesn't plays video games.", "plays", "He doesn't play video games.", "Después de doesn't, forma base."],
  ["We was at the party.", "was", "We were at the party.", "We/you/they + were."],
  ["I goed to the store.", "goed", "I went to the store.", "Go es irregular: went."],
  ["I will to call you.", "to", "I will call you.", "Después de will no va to."],
  ["The code don't compile.", "don't", "The code doesn't compile.", "The code = it → doesn't."],
  ["I'm agree with you.", "I'm", "I agree with you.", "Agree es verbo: I agree."],
  ["She is more smart than me.", "more", "She is smarter than me.", "Adjetivo corto: smarter."],
  ["This is the more expensive game.", "more", "This is the most expensive game.", "Superlativo: the most."],
  ["I have been in Canada last year.", "have been", "I was in Canada last year.", "Con last year se usa pasado simple."],
  ["Do you can help me?", "Do", "Can you help me?", "Con can no se usa do."],
  ["I'm waiting the bus.", "waiting", "I'm waiting for the bus.", "Wait for something."],
  ["Tell me what do you want.", "do", "Tell me what you want.", "En preguntas indirectas no va do."],
  ["I lend a pencil from my friend.", "lend", "I borrowed a pencil from my friend.", "Borrow = pedir prestado; lend = prestar."],
  ["Is very easy.", "Is", "It's very easy.", "El sujeto es obligatorio: it's."],
  ["Yesterday I go to the gym.", "go", "Yesterday I went to the gym.", "Yesterday → pasado: went."],
  ["She is married with a programmer.", "with", "She is married to a programmer.", "Married to, no married with."],
];
