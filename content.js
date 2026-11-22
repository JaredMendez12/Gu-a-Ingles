// Contenido personalizado: ruta A1 → B1 con temas de programación, videojuegos y vida universitaria.
// En cada oración, [corchetes] marcan la parte que se practica.
// Formato de oraciones: "inglés | español | otras respuestas válidas separadas por ;"

const LEGACY_UNITS = [
  { id: 1, level: "A1", title: "Soy, estoy, tengo: TO BE",
    idea: ["*To be* = ser y estar. También se usa para edad, hambre, frío y razón.", "I **am** · you/we/they **are** · he/she/it **is**", "Negativo: **is not / isn't**. Pregunta: **Are** you...?"],
    s: `I [am] an IT student. | Soy estudiante de TI. | I'm an IT student
My laptop [is] very slow. | Mi laptop es muy lenta. | My laptop's very slow
We [are] in the same group. | Estamos en el mismo grupo.
The game [is] really fun. | El juego es muy divertido. | The game is very fun
I [am] hungry. | Tengo hambre. | I'm hungry
She [is] 20 years old. | Ella tiene 20 años. | She's 20 years old;She is 20
[Are] you ready for the exam? | ¿Estás listo para el examen?
The server [is not] working. | El servidor no está funcionando. | The server isn't working
My friends [are] at the library. | Mis amigos están en la biblioteca.
It [is] cold today. | Hoy hace frío. | It's cold today;Today it is cold` },
  { id: 2, level: "A1", title: "Mi rutina: presente simple",
    idea: ["Hábitos y cosas que siempre pasan.", "I/you/we/they **work** · he/she/it **works** (¡la -s!)", "study → stud**ies** · have → **has** · go → go**es**"],
    s: `I [wake] up at six every day. | Me despierto a las seis todos los días. | I wake up at 6 every day
She [works] in a tech company. | Ella trabaja en una empresa de tecnología. | She works at a tech company
We [play] video games on Fridays. | Jugamos videojuegos los viernes.
My brother [studies] engineering. | Mi hermano estudia ingeniería.
The class [starts] at three. | La clase empieza a las tres. | The class starts at 3;The class begins at three
I usually [take] the bus to school. | Normalmente tomo el camión a la escuela. | I usually take the bus to the university
He [codes] in Python. | Él programa en Python. | He programs in Python
They [live] near the university. | Ellos viven cerca de la universidad.
This app [has] a lot of bugs. | Esta app tiene muchos errores. | This app has many bugs
I [like] horror games. | Me gustan los juegos de terror. | I like horror video games` },
  { id: 3, level: "A1", title: "Preguntas y negaciones",
    idea: ["Para preguntar y negar en presente se usa **do / does**.", "**Do** you play? · **Does** she play? (el verbo ya no lleva -s)", "I **don't** play · She **doesn't** play"],
    s: `I [don't] like coffee. | No me gusta el café. | I do not like coffee
[Do] you play Minecraft? | ¿Juegas Minecraft?
She [doesn't] work on Sundays. | Ella no trabaja los domingos. | She does not work on Sundays
[Does] your code compile? | ¿Tu código compila?
Where [do] you live? | ¿Dónde vives?
What time [does] the class start? | ¿A qué hora empieza la clase? | What time does the class begin
He [doesn't] understand the problem. | Él no entiende el problema. | He does not understand the problem
[Do] they speak English? | ¿Ellos hablan inglés?
Why [do] you want to learn English? | ¿Por qué quieres aprender inglés?` },
  { id: 4, level: "A1", title: "Hay: there is / there are",
    idea: ["«Hay» = **there is** (uno) / **there are** (varios). Nunca *have*.", "**a** + sonido consonante (a keyboard) · **an** + sonido vocal (an engineer)", "Pregunta: **Is there**...? / **Are there**...?"],
    s: `There [is] a bug in my code. | Hay un error en mi código. | There's a bug in my code
There [are] two players online. | Hay dos jugadores en línea. | There are 2 players online
I need [a] new keyboard. | Necesito un teclado nuevo.
She is [an] engineer. | Ella es ingeniera.
There [aren't] any chairs. | No hay sillas. | There are not any chairs;There are no chairs
We have two [classes] today. | Tenemos dos clases hoy. | We have 2 classes today
[Is] there a library at your university? | ¿Hay una biblioteca en tu universidad?
The [people] here are friendly. | La gente aquí es amable. | People here are friendly
There [is] a lot of traffic today. | Hay mucho tráfico hoy. | There's a lot of traffic today` },
  { id: 5, level: "A1", title: "Ahora mismo: presente continuo",
    idea: ["Lo que pasa **ahora**: am/is/are + verbo**-ing**.", "I**'m coding** · She**'s playing** · They**'re waiting**", "Pregunta: What **are** you **doing**?"],
    s: `I [am studying] English right now. | Estoy estudiando inglés ahora mismo. | I'm studying English right now;I am studying English now
She [is coding] a new app. | Ella está programando una app nueva. | She's coding a new app;She is programming a new app
We [are playing] online. | Estamos jugando en línea. | We're playing online
It [is raining] outside. | Está lloviendo afuera. | It's raining outside
What [are] you doing? | ¿Qué estás haciendo?
The computer [isn't working]. | La computadora no está funcionando. | The computer is not working
They [are waiting] for the bus. | Están esperando el camión. | They're waiting for the bus
I [am meeting] my team tomorrow. | Me voy a reunir con mi equipo mañana. | I'm meeting my team tomorrow;I am going to meet my team tomorrow` },
  { id: 6, level: "A1", title: "Poder y saber: can",
    idea: ["**can** + verbo = poder / saber hacer algo.", "I **can** code · She **can't** come · **Can** you help me?", "Más amable: **Could** you...?"],
    s: `I [can] speak a little English. | Puedo hablar un poco de inglés. | I can speak some English
She [can't] come today. | Ella no puede venir hoy. | She cannot come today
[Can] you help me with this bug? | ¿Me ayudas con este error? | Can you help me with this error
We [can] play together tonight. | Podemos jugar juntos esta noche.
[Can] I use your charger? | ¿Puedo usar tu cargador?
He [can] program in three languages. | Él sabe programar en tres lenguajes. | He can code in three languages;He can program in 3 languages
You [can't] use your phone in the exam. | No puedes usar tu celular en el examen. | You cannot use your phone in the exam
[Could] you repeat that, please? | ¿Podrías repetir eso, por favor?` },
  { id: 7, level: "A2", title: "Ayer: was, were y pasado simple",
    idea: ["Pasado de be: I/he/she/it **was** · you/we/they **were**.", "Regulares: work → work**ed** · play → play**ed**", "Pregunta y negativo con **did** + verbo normal: **Did** you **finish**? I **didn't watch**."],
    s: `I [was] tired yesterday. | Ayer estaba cansado. | Yesterday I was tired
We [were] at the university all day. | Estuvimos en la universidad todo el día.
She [worked] on the project last night. | Ella trabajó en el proyecto anoche.
I [played] video games on Saturday. | Jugué videojuegos el sábado.
[Did] you finish the homework? | ¿Terminaste la tarea?
I [didn't] watch the game. | No vi el partido. | I did not watch the game
The app [crashed] again. | La app se cerró otra vez.
We [studied] for the exam together. | Estudiamos juntos para el examen. | We studied together for the exam
Where [were] you last night? | ¿Dónde estabas anoche?` },
  { id: 8, level: "A2", title: "Verbos irregulares en acción",
    idea: ["Los más usados no llevan -ed: go → **went** · make → **made** · see → **saw**.", "Con did / didn't vuelve la forma base: I **didn't go** (no *didn't went*).", "Practica los 30 más comunes en Tarjetas y Contrarreloj."],
    s: `I [went] to the gym yesterday. | Fui al gimnasio ayer. | Yesterday I went to the gym
She [wrote] the report in one hour. | Ella escribió el reporte en una hora.
We [bought] a new router. | Compramos un router nuevo.
I [forgot] my password. | Olvidé mi contraseña.
He [made] a mistake in the code. | Él cometió un error en el código.
They [came] to my house on Sunday. | Vinieron a mi casa el domingo.
I [saw] a great tutorial on YouTube. | Vi un tutorial muy bueno en YouTube. | I watched a great tutorial on YouTube
We [had] a lot of homework. | Tuvimos mucha tarea.
I [didn't go] to class. | No fui a clase. | I did not go to class
What did you [do] last weekend? | ¿Qué hiciste el fin de semana pasado?` },
  { id: 9, level: "A2", title: "Planes: going to y will",
    idea: ["Plan decidido: **am/is/are going to** + verbo.", "Decisión del momento o predicción: **will** + verbo · negativo **won't**.", "I**'m going to** learn English. · I**'ll** help you."],
    s: `I [am going to] learn English this year. | Voy a aprender inglés este año. | I'm going to learn English this year
We [are going to] build a game. | Vamos a crear un juego. | We're going to build a game;We are going to make a game;We're going to make a game
It [is going to] rain. | Va a llover. | It's going to rain
I [will] help you. | Yo te ayudo (lo decido ahora). | I'll help you
I think it [will] be easy. | Creo que será fácil. | I think it'll be easy
[Are] you going to come to the party? | ¿Vas a venir a la fiesta?
She [won't] be late. | Ella no llegará tarde. | She will not be late
What [are] you going to do tomorrow? | ¿Qué vas a hacer mañana?` },
  { id: 10, level: "A2", title: "Comparar: -er, more, the most",
    idea: ["Corto: fast → fast**er** than → **the** fast**est**.", "Largo: **more** difficult than → **the most** difficult.", "Irregulares: good → **better** → **the best** · bad → **worse** → **the worst**"],
    s: `Python is [easier] than C++. | Python es más fácil que C++.
My new phone is [faster] than my old one. | Mi celular nuevo es más rápido que el viejo. | My new phone is faster than the old one
This is [the best] game of the year. | Este es el mejor juego del año.
The exam was [more difficult] than I thought. | El examen fue más difícil de lo que pensé. | The exam was harder than I thought
Mexico City is [bigger] than Monterrey. | La Ciudad de México es más grande que Monterrey.
She is [the most] creative person in the team. | Ella es la persona más creativa del equipo. | She is the most creative person on the team
My laptop is [worse] than yours. | Mi laptop es peor que la tuya.
English is not [as] hard as you think. | El inglés no es tan difícil como crees. | English isn't as hard as you think;English is not as difficult as you think` },
  { id: 11, level: "A2", title: "Cantidades: much, many, some, any",
    idea: ["**many** + contables (players) · **much** + incontables (time).", "**some** en afirmativas · **any** en preguntas y negativas.", "**a few** (algunos) · **a little** (un poco) · **too many** (demasiados)"],
    s: `I don't have [much] time. | No tengo mucho tiempo.
How [many] players are online? | ¿Cuántos jugadores hay en línea? | How many players are there online
There are [some] errors in the code. | Hay algunos errores en el código.
Do you have [any] questions? | ¿Tienes alguna pregunta? | Do you have any question
I have [a few] friends in Canada. | Tengo algunos amigos en Canadá.
There is [a little] coffee left. | Queda un poco de café. | There's a little coffee left
How [much] does it cost? | ¿Cuánto cuesta?
We have [too many] meetings. | Tenemos demasiadas juntas.` },
  { id: 12, level: "B1", title: "Experiencias: presente perfecto",
    idea: ["**have/has** + participio: experiencias y cosas que siguen hasta hoy.", "I**'ve never been** to Canada. · **Have** you **ever played**...?", "**for** + tiempo (for 2 years) · **since** + inicio (since 2020)"],
    s: `I [have never been] to Canada. | Nunca he ido a Canadá. | I've never been to Canada
[Have] you ever played this game? | ¿Alguna vez has jugado este juego?
She [has finished] the project. | Ella ya terminó el proyecto. | She has already finished the project;She's finished the project
I [have lived] here since 2020. | Vivo aquí desde 2020. | I've lived here since 2020;I have been living here since 2020
We [have known] each other for five years. | Nos conocemos desde hace cinco años. | We've known each other for five years;We have known each other for 5 years
I [have been studying] English for two months. | Llevo dos meses estudiando inglés. | I've been studying English for two months;I have been studying English for 2 months
He [hasn't] fixed the bug yet. | Él todavía no ha arreglado el error. | He has not fixed the bug yet
[Have] you seen my charger? | ¿Has visto mi cargador?` },
];

// Pares mínimos: sonidos que en español suenan igual.
const PAIRS = [
  ["ship", "sheep", "barco", "oveja"], ["live", "leave", "vivir", "irse"], ["sit", "seat", "sentarse", "asiento"],
  ["fill", "feel", "llenar", "sentir"], ["bit", "beat", "pedacito", "vencer"], ["cat", "cut", "gato", "cortar"],
  ["hat", "hut", "sombrero", "choza"], ["bag", "bug", "bolsa", "bicho / error"], ["full", "fool", "lleno", "tonto"],
  ["pull", "pool", "jalar", "alberca"], ["very", "berry", "muy", "baya"], ["vote", "boat", "votar", "bote"],
  ["think", "sink", "pensar", "hundirse"], ["three", "tree", "tres", "árbol"], ["shoes", "choose", "zapatos", "elegir"],
  ["wash", "watch", "lavar", "mirar"], ["sheep", "cheap", "oveja", "barato"], ["jet", "yet", "jet", "todavía"],
  ["hot", "hat", "caliente", "sombrero"], ["walk", "work", "caminar", "trabajar"],
];

// Historias cortas (input comprensible). Cada oración: [inglés, español].
const STORIES = [
  { id: "s1", level: "A1", title: "My first day at university", lines: [
    ["Hi! My name is Leo and I am nineteen years old.", "¡Hola! Me llamo Leo y tengo diecinueve años."],
    ["I am a student of Information Technology.", "Soy estudiante de Tecnologías de la Información."],
    ["My university is big and modern.", "Mi universidad es grande y moderna."],
    ["My classes are in the afternoon, from three to eight.", "Mis clases son en la tarde, de tres a ocho."],
    ["In the morning, I study English at home.", "En la mañana estudio inglés en casa."],
    ["My favorite class is programming.", "Mi clase favorita es programación."],
    ["The teacher is very patient and the exercises are fun.", "El profesor es muy paciente y los ejercicios son divertidos."],
    ["I have three new friends: Ana, Carlos and Sofía.", "Tengo tres amigos nuevos: Ana, Carlos y Sofía."],
    ["After class, we eat tacos near the university.", "Después de clase comemos tacos cerca de la universidad."]],
    q: [["When are Leo's classes?", ["In the morning", "In the afternoon", "At night"], 1],
        ["What does Leo do in the morning?", ["He works", "He studies English", "He plays soccer"], 1],
        ["What is his favorite class?", ["Math", "English", "Programming"], 2]] },
  { id: "s2", level: "A1", title: "The bug", lines: [
    ["Marco is making an app for his class.", "Marco está haciendo una app para su clase."],
    ["The app helps students organize their homework.", "La app ayuda a los estudiantes a organizar su tarea."],
    ["But there is a problem: the app crashes when he opens the calendar.", "Pero hay un problema: la app se cierra cuando abre el calendario."],
    ["Marco is not happy. The project is due on Friday.", "Marco no está contento. El proyecto se entrega el viernes."],
    ["He reads the error message carefully.", "Lee el mensaje de error con cuidado."],
    ["Then he looks for the problem online.", "Luego busca el problema en internet."],
    ["He finds the answer in the documentation, in English.", "Encuentra la respuesta en la documentación, en inglés."],
    ["He changes one line of code and the app works!", "¡Cambia una línea de código y la app funciona!"],
    ["Now Marco knows that English is very important for programmers.", "Ahora Marco sabe que el inglés es muy importante para los programadores."]],
    q: [["What does the app do?", ["It plays music", "It helps students organize homework", "It sells tacos"], 1],
        ["When does the app crash?", ["When he opens the calendar", "When he closes it", "Every morning"], 0],
        ["Where does Marco find the answer?", ["In a book", "In the documentation", "In his notebook"], 1]] },
  { id: "s3", level: "A2", title: "Game night", lines: [
    ["Last Friday, Diego and his friends played a horror game online.", "El viernes pasado, Diego y sus amigos jugaron un juego de terror en línea."],
    ["They were in a dark forest, and they were looking for a lost key.", "Estaban en un bosque oscuro y buscaban una llave perdida."],
    ["Suddenly, they heard a strange noise behind a tree.", "De repente, oyeron un ruido extraño detrás de un árbol."],
    ["Diego shouted: \"Run! It's coming!\"", "Diego gritó: «¡Corran! ¡Ya viene!»"],
    ["Everybody ran, but Paula fell into a hole.", "Todos corrieron, pero Paula se cayó en un hoyo."],
    ["The others went back to help her.", "Los demás regresaron a ayudarla."],
    ["Finally, they found the key inside an old house.", "Por fin encontraron la llave dentro de una casa vieja."],
    ["They played until two in the morning.", "Jugaron hasta las dos de la mañana."],
    ["The next day, Diego was very tired, but he was happy.", "Al día siguiente, Diego estaba muy cansado, pero feliz."]],
    q: [["What were they looking for?", ["A lost key", "A dog", "A house"], 0],
        ["What happened to Paula?", ["She won", "She fell into a hole", "She left the game"], 1],
        ["How did Diego feel the next day?", ["Tired but happy", "Sad", "Angry"], 0]] },
  { id: "s4", level: "A2", title: "A bad morning", lines: [
    ["Yesterday was a terrible morning.", "Ayer fue una mañana terrible."],
    ["My alarm didn't ring, so I woke up late.", "Mi alarma no sonó, así que me desperté tarde."],
    ["I took a quick shower and I didn't have breakfast.", "Me bañé rápido y no desayuné."],
    ["I ran to the bus stop, but the bus left before I got there.", "Corrí a la parada, pero el camión se fue antes de que llegara."],
    ["I waited for twenty minutes.", "Esperé veinte minutos."],
    ["When I finally arrived, the teacher was giving out the exam.", "Cuando por fin llegué, el profesor estaba repartiendo el examen."],
    ["Luckily, she let me in.", "Por suerte, me dejó entrar."],
    ["I answered all the questions and I got a good grade!", "¡Contesté todas las preguntas y saqué buena calificación!"],
    ["Now I always set two alarms.", "Ahora siempre pongo dos alarmas."]],
    q: [["Why did the writer wake up late?", ["The alarm didn't ring", "He was sick", "It was Sunday"], 0],
        ["How long did he wait for the bus?", ["Ten minutes", "Twenty minutes", "An hour"], 1],
        ["What does he do now?", ["He takes a taxi", "He sets two alarms", "He sleeps at school"], 1]] },
  { id: "s5", level: "A2", title: "The job interview", lines: [
    ["Next week, Sara is going to have her first job interview.", "La próxima semana, Sara va a tener su primera entrevista de trabajo."],
    ["The company makes apps for hospitals.", "La empresa hace apps para hospitales."],
    ["The interview is going to be in English, so she is practicing every day.", "La entrevista va a ser en inglés, así que practica todos los días."],
    ["She can explain her projects, but she is nervous.", "Puede explicar sus proyectos, pero está nerviosa."],
    ["Every morning, she answers questions out loud and records her voice.", "Cada mañana contesta preguntas en voz alta y graba su voz."],
    ["Her friend asks her: \"Why do you want this job?\"", "Su amiga le pregunta: «¿Por qué quieres este trabajo?»"],
    ["Sara says: \"Because I want to build useful software and learn from a great team.\"", "Sara dice: «Porque quiero crear software útil y aprender de un gran equipo»."],
    ["She feels more confident now.", "Ahora se siente más segura."],
    ["She is going to wear a blue shirt and arrive early.", "Va a ponerse una camisa azul y llegar temprano."]],
    q: [["What does the company make?", ["Video games", "Apps for hospitals", "Phones"], 1],
        ["Why is Sara practicing?", ["The interview is in English", "She is bored", "She is a teacher"], 0],
        ["What does she do every morning?", ["She runs", "She records her voice answering questions", "She plays games"], 1]] },
  { id: "s6", level: "A2", title: "Plans for next year", lines: [
    ["Next year is going to be very important for me.", "El próximo año va a ser muy importante para mí."],
    ["I am going to finish my degree and look for an internship.", "Voy a terminar la carrera y buscar prácticas profesionales."],
    ["I want to work as a developer, maybe in video games.", "Quiero trabajar como desarrollador, tal vez en videojuegos."],
    ["First, I am going to improve my English.", "Primero, voy a mejorar mi inglés."],
    ["I think it will open many doors for me.", "Creo que me abrirá muchas puertas."],
    ["I am also going to build a portfolio with my best projects.", "También voy a armar un portafolio con mis mejores proyectos."],
    ["Maybe I will travel to Canada for a summer course.", "Tal vez viaje a Canadá para un curso de verano."],
    ["It won't be easy, but I am ready.", "No será fácil, pero estoy listo."]],
    q: [["What is he going to finish?", ["His degree", "A video game", "A book"], 0],
        ["Where would he like to work?", ["In a bank", "In video games", "In a hospital"], 1],
        ["Where might he travel?", ["Spain", "Japan", "Canada"], 2]] },
];

// Construye la lista de oraciones con su id, unidad, respuesta objetivo y alternativas.
// ---------- Ruta de temas (v10) ----------
// A1: temas de a1.js (algunos reutilizan las oraciones de las unidades anteriores para conservar el progreso).
// A2/B1: unidades anteriores, hasta que tengan su ficha completa.
const LEGACY_KEYS = { 7: "a2-past", 8: "a2-irr", 9: "a2-fut", 10: "a2-comp", 11: "a2-quant", 12: "b1-pp" };
const parseLine = (line) => {
  const [enRaw, es, alts = ""] = line.split("|").map((x) => x.trim());
  const m = enRaw.match(/\[(.+?)\]/);
  return { es, en: enRaw.replace(/[\[\]]/g, ""), target: m ? m[1] : "", cloze: enRaw.replace(/\[.+?\]/, "____"), alts: alts ? alts.split(";").map((a) => a.trim()) : [] };
};
const legacyLines = (n) => { const u = LEGACY_UNITS.find((x) => x.id === n); return (u.s.trim() + (typeof EXTRA_S !== "undefined" && EXTRA_S[n] ? "\n" + EXTRA_S[n].trim() : "")).split("\n").filter((l) => l.trim()); };
const DEFS = [...(typeof TOPIC_DEFS !== "undefined" ? TOPIC_DEFS : [])];
const usedLegacy = new Set(DEFS.map((d) => d.legacy).filter(Boolean));
LEGACY_UNITS.filter((u) => !usedLegacy.has(u.id)).forEach((u) => DEFS.push({ key: LEGACY_KEYS[u.id] || "u" + u.id, level: u.level, legacy: u.id, title: u.title, sub: "", idea: u.idea, s: "" }));
const UNITS = DEFS.map((d, i) => ({
  id: i + 1, key: d.key, level: d.level, title: d.title, sub: d.sub || "", legacy: d.legacy || null, ficha: d.ficha || null,
  idea: d.ficha ? d.ficha.clave : d.idea || [],
}));
const SENTENCES = DEFS.flatMap((d, i) => {
  const out = [];
  if (d.legacy) legacyLines(d.legacy).forEach((line, k) => out.push({ id: `u${d.legacy}-${k}`, unit: i + 1, topic: d.key, ...parseLine(line) }));
  (d.s || "").split("\n").filter((l) => l.trim()).forEach((line, k) => out.push({ id: `${d.key}-${k}`, unit: i + 1, topic: d.key, ...parseLine(line) }));
  return out;
});
const TOPIC_BY_KEY = Object.fromEntries(UNITS.map((u) => [u.key, u]));
const LEGACY_TO_UNIT = Object.fromEntries(UNITS.filter((u) => u.legacy).map((u) => [u.legacy, u.id]));

if (typeof EXTRA_STORIES !== "undefined") STORIES.push(...EXTRA_STORIES);
["STORIES_A1", "STORIES_A2", "STORIES_B1", "STORIES_B2"].forEach((n) => { try { STORIES.push(...eval(n)); } catch (e) {} });
