// Nivel A2 · 12 temas con ficha completa.
TOPIC_DEFS.push({
  key: "a2-past", level: "A2", legacy: 7, title: "Pasado simple y was/were", sub: "lo que pasó ayer",
  ficha: {
    clave: ["Pasado de be: I/he/she/it **was** · you/we/they **were**. Regulares: verbo + **-ed**.", "Pregunta y negativa con **did / didn't** + verbo base: *Did you **go**? I didn't **see** it.*"],
    que: "El **pasado simple** cuenta acciones **terminadas** en un momento del pasado: ayer, la semana pasada, en 2020. Es el tiempo que usas para contar historias. Tiene dos partes: el pasado de *to be* (**was/were**) y el pasado de los demás verbos (**-ed** o irregular).",
    usos: ["Acción terminada con tiempo: *I played yesterday.*", "Historias, una acción tras otra: *I woke up, took a shower and left.*", "Estados del pasado: *I was tired. They were happy.*"],
    forma: [
      { t: "Was / were", h: ["Sujeto", "Afirmativa", "Negativa", "Pregunta"], r: [["I / he / she / it", "was", "wasn't", "Was he...?"], ["you / we / they", "were", "weren't", "Were you...?"]] },
      { t: "Otros verbos", h: ["", "Ejemplo"], r: [["Afirmativa", "I worked · She went (irregular)"], ["Negativa", "I didn't work · She didn't go"], ["Pregunta", "Did you work? · Where did she go?"]] },
      { t: "Ortografía de -ed", h: ["Caso", "Ejemplo"], r: [["normal", "play → played"], ["termina en -e", "live → lived"], ["consonante + y", "study → studied"], ["consonante-vocal-consonante corta", "stop → stopped, plan → planned"]] },
    ],
    variantes: ["Pronunciación de -ed: /t/ en *worked*, /d/ en *played*, /id/ en *wanted, needed* (solo tras t o d).", "Palabras típicas: *yesterday, last night/week/year, ago, in 2020, when I was a kid*.", "*Ago* va después del tiempo: *two days **ago*** (hace dos días)."],
    espanol: ["En español hay pretérito e imperfecto (*comí / comía*); en inglés el pasado simple cubre los dos casos más comunes.", "*Hace dos días* → *two days **ago*** (al final, no *since*).", "En negativas y preguntas, el pasado está en *did*: no lo repitas en el verbo."],
    ejemplos: [["I was tired yesterday.", "Ayer estaba cansado."], ["We were at the university all day.", "Estuvimos en la universidad todo el día."], ["She worked on the project last night.", "Ella trabajó en el proyecto anoche."], ["Did you finish the homework?", "¿Terminaste la tarea?"], ["I didn't watch the game.", "No vi el partido."], ["I studied two hours ago.", "Estudié hace dos horas."]],
    errores: [["Did you went?", "Did you go?", "Después de did, forma base."], ["We was late.", "We were late.", "We → were."], ["I didn't saw it.", "I didn't see it.", "Didn't + forma base."], ["Since two days.", "Two days ago.", "Hace + tiempo = ago."]],
    truco: "El pasado se marca **una sola vez**: o en el verbo (*I play**ed***) o en *did* (*I **did**n't play*), nunca en los dos.",
  },
  s: `I [played] soccer two days ago. | Jugué futbol hace dos días.
[Were] they at the party? | ¿Estaban en la fiesta?
She [didn't] answer my message. | No contestó mi mensaje. | She did not answer my message
I [studied] all night. | Estudié toda la noche.`,
});

TOPIC_DEFS.push({
  key: "a2-irr", level: "A2", legacy: 8, title: "Verbos irregulares", sub: "go-went, see-saw, buy-bought",
  ficha: {
    clave: ["Los verbos más usados son irregulares: **go→went, see→saw, have→had, make→made, get→got**.", "El irregular solo cambia en afirmativa: en preguntas y negativas vuelve la base: *Did you **go**?*"],
    que: "Los **verbos irregulares** no forman el pasado con -ed: tienen su propia forma. Son pocos (unos 100 comunes) pero son los que más se usan, así que vale la pena aprenderlos por **grupos de sonido**.",
    usos: ["Contar lo que hiciste: *I went to the gym and bought a drink.*", "Las 3 formas sirven para distintos tiempos: base (*go*), pasado (*went*) y participio (*gone*, para el presente perfecto)."],
    forma: [
      { t: "Grupos para memorizar", h: ["Patrón", "Ejemplos"], r: [["A-A-A (no cambian)", "cut, put, let, hit, cost, set, quit"], ["A-B-B (pasado = participio)", "buy-bought, think-thought, make-made, find-found, sleep-slept, lose-lost"], ["A-B-C (todas distintas)", "go-went-gone, see-saw-seen, write-wrote-written, take-took-taken, eat-ate-eaten"], ["A-B-A", "come-came-come, become-became-become, run-ran-run"]] },
    ],
    variantes: ["**-ought / -aught** suenan igual (/ɔt/): *bought, thought, brought, caught, taught*.", "**read** se escribe igual en pasado pero suena /red/.", "Algunos aceptan dos formas en EE. UU.: *learned/learnt, dreamed/dreamt* (usa -ed)."],
    espanol: ["En español también hay irregulares (*ir → fui*). La diferencia: en inglés solo cambia la forma afirmativa del pasado.", "No inventes *-ed* a un irregular: *goed, buyed, eated* no existen."],
    ejemplos: [["I went to the gym yesterday.", "Ayer fui al gym."], ["She wrote the report in one hour.", "Ella escribió el reporte en una hora."], ["I forgot my password.", "Olvidé mi contraseña."], ["We had a lot of homework.", "Tuvimos mucha tarea."], ["What did you do last weekend?", "¿Qué hiciste el fin de semana?"]],
    errores: [["I goed home.", "I went home.", "Go es irregular."], ["I buyed a phone.", "I bought a phone.", "Buy → bought."], ["Did you saw it?", "Did you see it?", "Con did va la base."]],
    truco: "Practica 5 verbos al día en el **Contrarreloj** y repite las tres formas en voz alta con ritmo: *go-went-gone, see-saw-seen*.",
  },
  s: `I [brought] my laptop to class. | Traje mi laptop a la clase.
She [taught] us a new trick. | Nos enseñó un truco nuevo.
We [ran] to catch the bus. | Corrimos para alcanzar el camión.
I [put] my phone on the table. | Puse mi celular en la mesa.`,
});

TOPIC_DEFS.push({
  key: "a2-fut", level: "A2", legacy: 9, title: "Futuro: going to y will", sub: "planes, decisiones y predicciones",
  ficha: {
    clave: ["**going to** = plan ya decidido o algo que se ve venir: *I'm going to study tonight. It's going to rain.*", "**will** = decisión en el momento, promesas, ofertas y opiniones: *I'll help you. I think it will be easy.*"],
    que: "El inglés tiene varias formas de hablar del futuro. Las dos básicas son **going to** y **will**. No son intercambiables siempre: depende de si el plan ya estaba decidido o lo decides ahora.",
    usos: ["Planes e intenciones: *I'm going to learn English this year.*", "Predicción con evidencia: *Look at the clouds. It's going to rain.*", "Decisión espontánea: *The phone is ringing. I'll answer it.*", "Promesas y ofertas: *I'll call you later. I'll help you.*", "Opiniones sobre el futuro: *I think you'll pass.*"],
    forma: [
      { t: "Going to", h: ["", "Ejemplo"], r: [["Afirmativa", "I'm / She's / They're going to + verbo"], ["Negativa", "He isn't going to come."], ["Pregunta", "Are you going to come?"]] },
      { t: "Will", h: ["", "Ejemplo"], r: [["Afirmativa", "I'll / She'll / They'll + verbo"], ["Negativa", "won't (will not): I won't forget."], ["Pregunta", "Will you help me?"]] },
    ],
    variantes: ["**Presente continuo** para citas ya acordadas: *I'm meeting my team tomorrow.*", "**Will** no lleva *to*: *I will call* (no *will to call*).", "*Gonna* = going to en conversación informal (no se escribe en tareas)."],
    espanol: ["*Voy a estudiar* → *I'm going to study* (casi literal).", "*Te ayudo* (ofrecimiento) → ***I'll** help you* (no *I help you*).", "*¿Me ayudas?* → *Will you help me?* o *Can you help me?*"],
    ejemplos: [["I am going to learn English this year.", "Voy a aprender inglés este año."], ["It is going to rain.", "Va a llover."], ["I'll call you later.", "Te llamo más tarde."], ["I think it will be easy.", "Creo que va a ser fácil."], ["She won't be late.", "No va a llegar tarde."]],
    errores: [["I will to call you.", "I will call you.", "Will sin to."], ["I going to study.", "I'm going to study.", "Falta am/is/are."], ["I help you. (ofreciendo)", "I'll help you.", "Ofertas con will."]],
    truco: "Si ya lo tenías planeado: **going to**. Si se te ocurre en este momento: **will**.",
  },
  s: `We [are going to] travel in December. | Vamos a viajar en diciembre. | We're going to travel in December
I think it [will] rain tomorrow. | Creo que va a llover mañana. | I think it'll rain tomorrow
[I'll] send you the link. | Te mando el link. | I will send you the link
She [is going to] start a new job. | Va a empezar un trabajo nuevo. | She's going to start a new job`,
});

TOPIC_DEFS.push({
  key: "a2-comp", level: "A2", legacy: 10, title: "Comparativos", sub: "más que, menos que, tan... como",
  ficha: {
    clave: ["Corto: **-er than** (*faster than*). Largo: **more ... than** (*more expensive than*).", "Irregulares: **good → better, bad → worse, far → further**. Igualdad: **as ... as**."],
    que: "Los **comparativos** sirven para comparar dos cosas. La forma depende del largo del adjetivo: los cortos agregan **-er**, los largos usan **more**. Después va **than** (que).",
    usos: ["Comparar: *Python is easier than C++.*", "Igualdad: *English is **as** hard **as** Spanish.*", "Desigualdad suave: *It's **not as** expensive **as** I thought.*", "Intensificar: ***much / a lot** better*, *a bit cheaper*."],
    forma: [
      { t: "Reglas", h: ["Adjetivo", "Regla", "Ejemplo"], r: [["1 sílaba", "+ er", "fast → faster, cheap → cheaper"], ["termina en -e", "+ r", "nice → nicer"], ["consonante-vocal-consonante", "dobla + er", "big → bigger, hot → hotter"], ["2 sílabas en -y", "y → ier", "easy → easier, happy → happier"], ["2+ sílabas", "more + adj", "more expensive, more difficult"]] },
      { t: "Irregulares", h: ["Adjetivo", "Comparativo"], r: [["good", "better"], ["bad", "worse"], ["far", "farther / further"], ["much / many", "more"], ["little", "less"]] },
    ],
    variantes: ["**less** + adjetivo largo = menos: *less expensive*.", "**than me** (informal) o **than I am** (formal).", "Doble comparativo: *the more you practice, the better you get*."],
    espanol: ["*Más grande* → **bigger** (una sola palabra), no *more big*.", "*Mejor* → **better**, nunca *more good* ni *more better*.", "*Que* en comparación = **than**, no *that*."],
    ejemplos: [["Python is easier than C++.", "Python es más fácil que C++."], ["My new phone is faster than my old one.", "Mi celular nuevo es más rápido que el viejo."], ["The exam was more difficult than I thought.", "El examen fue más difícil de lo que pensé."], ["English is not as hard as you think.", "El inglés no es tan difícil como crees."], ["Tacos are better than burgers.", "Los tacos son mejores que las hamburguesas."]],
    errores: [["more tall", "taller", "Corto: -er."], ["more better", "better", "Better ya es comparativo."], ["bigger that", "bigger than", "Que = than."]],
    truco: "Cuenta sílabas: **1 sílaba → -er**, **3 o más → more**. Con 2 sílabas: si termina en -y, -ier; si no, normalmente more.",
  },
  s: `My laptop is [heavier] than yours. | Mi laptop es más pesada que la tuya.
This app is [less] popular than the other one. | Esta app es menos popular que la otra.
Today is [as] hot as yesterday. | Hoy hace tanto calor como ayer.
The new version is [much] better. | La versión nueva es mucho mejor.`,
});

TOPIC_DEFS.push({
  key: "a2-sup", level: "A2", title: "Superlativos", sub: "el más, el menos, el mejor",
  ficha: {
    clave: ["Corto: **the -est** (*the fastest*). Largo: **the most** (*the most expensive*).", "Irregulares: **the best, the worst**. Después: **in** + lugar/grupo, **of** + periodo."],
    que: "El **superlativo** dice cuál es el extremo de un grupo: *el más rápido, el mejor, el peor*. Siempre lleva **the** y sigue las mismas reglas de largo que el comparativo.",
    usos: ["El extremo de un grupo: *She is the smartest in the class.*", "Experiencias: *It's the best game I've ever played.*", "Con *one of*: *one of the most popular games*."],
    forma: [
      { t: "Reglas", h: ["Adjetivo", "Superlativo"], r: [["fast, cheap", "the fastest, the cheapest"], ["big, hot", "the biggest, the hottest"], ["easy, happy", "the easiest, the happiest"], ["expensive, difficult", "the most expensive, the most difficult"], ["good / bad", "the best / the worst"]] },
    ],
    variantes: ["**in** con lugares y grupos: *the best in Mexico, in my team*. **of** con periodos o cantidades: *the best day of my life, of all*.", "**the least** = el menos: *the least expensive*.", "*one of the best* + plural: *one of the best **games***."],
    espanol: ["*El más grande* → *the biggest* (una palabra), no *the more big*.", "*El mejor de la clase* → *the best **in** the class* (no *of the class*)."],
    ejemplos: [["This is the best game of the year.", "Es el mejor juego del año."], ["She is the most creative person in the team.", "Es la persona más creativa del equipo."], ["It's the cheapest option.", "Es la opción más barata."], ["That was the worst bug ever.", "Fue el peor error de la historia."], ["It's one of the most popular apps.", "Es una de las apps más populares."]],
    errores: [["the more expensive", "the most expensive", "Superlativo: most."], ["the best of the class", "the best in the class", "Grupo: in."], ["one of the best game", "one of the best games", "One of + plural."]],
    truco: "Comparativo = 2 cosas (**-er / more**). Superlativo = todo el grupo (**the -est / the most**).",
  },
  s: `This is the [best] game of the year. | Es el mejor juego del año.
She is the [most] creative person in the team. | Es la persona más creativa del equipo.
It's the [cheapest] option. | Es la opción más barata. | It is the cheapest option
That was the [worst] day of my life. | Fue el peor día de mi vida.
Mount Everest is the [highest] mountain in the world. | El Everest es la montaña más alta del mundo.
He is the [fastest] player on the team. | Es el jugador más rápido del equipo.
It's one of the most popular [apps]. | Es una de las apps más populares.
This is the [easiest] exercise. | Este es el ejercicio más fácil.
What's the [most] important thing? | ¿Qué es lo más importante?
It's the [least] expensive phone. | Es el celular menos caro.
That's the [biggest] city in Mexico. | Es la ciudad más grande de México.
She is the [smartest] student [in] the class. | Es la estudiante más inteligente de la clase.
Today is the [hottest] day of the year. | Hoy es el día más caluroso del año.
This is the most [difficult] subject. | Esta es la materia más difícil.
You are the [best]! | ¡Eres el mejor!`,
});

TOPIC_DEFS.push({
  key: "a2-quant", level: "A2", legacy: 11, title: "Cantidades: much, many, some, any", sub: "contables e incontables",
  ficha: {
    clave: ["**many** + contables (players), **much** + incontables (time). En afirmativas, mejor **a lot of**.", "**some** en afirmativas y ofertas; **any** en preguntas y negativas. **a few** (contables) / **a little** (incontables) = unos pocos."],
    que: "Para hablar de cantidades primero decide si el sustantivo es **contable** (lo puedes contar: 1 game, 2 games) o **incontable** (no tiene plural: water, time, money, information). Cada tipo usa palabras distintas.",
    usos: ["Preguntar cantidad: *How many classes? How much time?*", "Algo de / ningún: *I have some money. I don't have any money.*", "Pocos: *a few friends, a little sugar*.", "Demasiado: *too much coffee, too many meetings*."],
    forma: [
      { t: "Qué va con cada tipo", h: ["", "Contables (games)", "Incontables (time)"], r: [["Mucho", "many / a lot of", "much / a lot of"], ["Pocos", "a few / few", "a little / little"], ["¿Cuánto?", "How many?", "How much?"], ["Algo de", "some / any", "some / any"]] },
    ],
    variantes: ["**few / little** sin *a* = casi nada (negativo): *I have few friends* (casi no tengo).", "**some** en preguntas de oferta: *Do you want some coffee?*", "Incontables comunes: *information, advice, homework, music, money, water, traffic, furniture, news*."],
    espanol: ["*Mucha tarea* → *a lot of homework* (no *many homeworks*).", "*No hay nada de leche* → *There isn't **any** milk*."],
    ejemplos: [["I don't have much time.", "No tengo mucho tiempo."], ["How many players are online?", "¿Cuántos jugadores hay en línea?"], ["Do you have any questions?", "¿Tienen alguna pregunta?"], ["I have a few friends in Canada.", "Tengo unos amigos en Canadá."], ["We have too many meetings.", "Tenemos demasiadas juntas."]],
    errores: [["much friends", "many friends", "Contable: many."], ["How much players?", "How many players?", "Contable: many."], ["I don't have some money.", "I don't have any money.", "Negativa: any."]],
    truco: "Si le puedes poner un número delante (*2 games*), es contable → **many / a few**. Si no (*2 waters* suena raro), es incontable → **much / a little**.",
  },
  s: `There isn't [much] traffic today. | No hay mucho tráfico hoy.
I have [a little] money left. | Me queda un poco de dinero.
Are there [any] good restaurants near here? | ¿Hay buenos restaurantes cerca?
I made [a few] mistakes. | Cometí unos errores.`,
});

TOPIC_DEFS.push({
  key: "a2-freq", level: "A2", title: "Frecuencia y rutinas", sub: "always, usually, never, how often",
  ficha: {
    clave: ["**always > usually > often > sometimes > rarely > never**. Van **antes** del verbo y **después** de *to be*.", "Pregunta: **How often...?** Respuesta: *every day, once a week, twice a month*."],
    que: "Los **adverbios de frecuencia** dicen qué tan seguido haces algo. Lo difícil es su **posición**: en inglés tienen un lugar fijo en la oración.",
    usos: ["Rutinas: *I usually take the bus.*", "Con to be: *He is always late.*", "Preguntar: *How often do you play?*", "Expresiones de tiempo al final: *I go to the gym three times a week.*"],
    forma: [
      { t: "Posición", h: ["Caso", "Ejemplo"], r: [["Antes de un verbo normal", "I **always** wake up early."], ["Después de to be", "She is **never** late."], ["Entre auxiliar y verbo", "I don't **usually** eat breakfast. I have **never** been there."]] },
      { t: "Escala", h: ["Adverbio", "Más o menos"], r: [["always", "100%"], ["usually", "90%"], ["often", "70%"], ["sometimes", "50%"], ["rarely / hardly ever", "10%"], ["never", "0%"]] },
    ],
    variantes: ["*once* (una vez), *twice* (dos veces), *three times* (tres veces) + *a day/week/month*.", "*Sometimes* también puede ir al principio: *Sometimes I study at night.*", "*Never* ya es negativo: *I never eat meat* (no *I don't never*)."],
    espanol: ["*Siempre llego tarde* → *I'm **always** late* (después de am).", "*Nunca no* no existe: *I never go* (una sola negación)."],
    ejemplos: [["I usually take the bus to school.", "Normalmente tomo el camión a la escuela."], ["He is always late.", "Siempre llega tarde."], ["How often do you play?", "¿Qué tan seguido juegas?"], ["I go to the gym twice a week.", "Voy al gym dos veces por semana."], ["I never drink coffee at night.", "Nunca tomo café en la noche."]],
    errores: [["I always am tired.", "I am always tired.", "Después de to be."], ["I don't never study.", "I never study.", "Una sola negación."], ["I go always to the gym.", "I always go to the gym.", "Antes del verbo."]],
    truco: "Con **be**, el adverbio va **después**; con cualquier otro verbo, **antes**. *I'm always / I always go.*",
  },
  s: `I [usually] wake up at seven. | Normalmente me despierto a las siete.
She is [always] online. | Ella siempre está en línea.
How [often] do you play video games? | ¿Qué tan seguido juegas videojuegos?
I [never] eat breakfast. | Nunca desayuno.
We [sometimes] study together. | A veces estudiamos juntos.
I go to the gym [twice] a week. | Voy al gym dos veces por semana. | I go to the gym two times a week
He is [never] on time. | Él nunca llega a tiempo.
I check my email [every] morning. | Reviso mi correo todas las mañanas.
They [often] play online at night. | Seguido juegan en línea en la noche.
I [rarely] watch TV. | Casi nunca veo la tele. | I hardly ever watch TV
I don't [usually] go out on Mondays. | Normalmente no salgo los lunes.
She calls her mom [once] a day. | Le llama a su mamá una vez al día.
Are you [always] this tired? | ¿Siempre estás así de cansado?
I have class three [times] a week. | Tengo clase tres veces por semana.
I [always] forget my password. | Siempre olvido mi contraseña.`,
});

TOPIC_DEFS.push({
  key: "a2-time", level: "A2", title: "Expresiones de tiempo", sub: "ago, for, during, until, in/on/at",
  ficha: {
    clave: ["**ago** = hace (al final): *two days ago*. **for** = durante cuánto: *for two hours*. **during** = durante qué: *during the class*.", "**until** = hasta. **by** = a más tardar. **in** + tiempo = dentro de: *in five minutes*."],
    que: "Muchas palabras de tiempo se traducen igual en español (*durante, hace, en*), pero en inglés tienen usos distintos. Aquí están las que más confusión causan.",
    usos: ["*I finished two hours **ago**.* (hace dos horas)", "*I studied **for** two hours.* (cuánto tiempo)", "*I fell asleep **during** the movie.* (en qué momento)", "*The store is open **until** 10.* (hasta)", "*Send it **by** Friday.* (a más tardar)", "*I'll be there **in** five minutes.* (dentro de)"],
    forma: [
      { t: "Comparación", h: ["Palabra", "Pregunta que responde", "Ejemplo"], r: [["ago", "¿hace cuánto?", "three days ago"], ["for", "¿cuánto tiempo?", "for three days"], ["during", "¿en qué momento?", "during the exam"], ["since", "¿desde cuándo?", "since Monday (con presente perfecto)"], ["until", "¿hasta cuándo?", "until 5 p.m."], ["in", "¿dentro de cuánto?", "in ten minutes"]] },
    ],
    variantes: ["*In the morning / afternoon / evening* pero ***at** night*.", "*On time* = puntual; *in time* = a tiempo para algo.", "*Last* y *next* no llevan preposición: *last week, next Monday* (no *in the next Monday*)."],
    espanol: ["*Hace dos días* → *two days **ago*** (la palabra va al final).", "*Durante dos horas* → ***for** two hours* (con duración no se usa *during*).", "*La semana pasada* → *last week* (sin *the* ni *in*)."],
    ejemplos: [["I called you an hour ago.", "Te llamé hace una hora."], ["I played for three hours.", "Jugué tres horas."], ["Don't use your phone during the exam.", "No uses tu celular durante el examen."], ["I'll be there in five minutes.", "Llego en cinco minutos."], ["Send it by Friday.", "Mándalo a más tardar el viernes."]],
    errores: [["since two days", "two days ago", "Hace = ago."], ["during two hours", "for two hours", "Duración: for."], ["in the next week", "next week", "Next sin preposición."]],
    truco: "Si puedes decir *¿cuánto tiempo?* → **for**. Si puedes decir *¿en qué momento?* → **during**. Si es *hace* → número + **ago**.",
  },
  s: `I called you an hour [ago]. | Te llamé hace una hora.
I played [for] three hours. | Jugué tres horas.
Don't use your phone [during] the exam. | No uses tu celular durante el examen.
I'll be there [in] five minutes. | Llego en cinco minutos. | I'll be there in 5 minutes
Send me the file [by] Friday. | Mándame el archivo a más tardar el viernes.
The library is open [until] nine. | La biblioteca abre hasta las nueve.
We met two years [ago]. | Nos conocimos hace dos años.
I slept [during] the movie. | Me dormí durante la película.
I waited [for] twenty minutes. | Esperé veinte minutos. | I waited for 20 minutes
I'm going to Canada [next] year. | Voy a Canadá el próximo año.
I saw her [last] week. | La vi la semana pasada.
I study [at] night. | Estudio en la noche.
The class starts [in] ten minutes. | La clase empieza en diez minutos.
Please arrive [on] time. | Por favor lleguen puntuales.
I lived there [for] two years. | Viví ahí dos años.`,
});

TOPIC_DEFS.push({
  key: "a2-must", level: "A2", title: "Obligación y consejo", sub: "have to, must, should, don't have to",
  ficha: {
    clave: ["**have to** = tener que (obligación externa). **must** = deber (regla fuerte). **should** = debería (consejo).", "**don't have to** = no es necesario. **mustn't** = está prohibido. ¡No significan lo mismo!"],
    que: "Para hablar de obligaciones, prohibiciones y consejos el inglés usa varios verbos. Lo más importante es la diferencia entre **don't have to** (no hace falta) y **mustn't** (no debes, está prohibido).",
    usos: ["Obligación: *I have to finish the project today.*", "Regla o algo muy importante: *You must wear a helmet.*", "Consejo: *You should sleep more.*", "No es necesario: *You don't have to come.*", "Prohibido: *You mustn't share your password.*"],
    forma: [
      { t: "Formas", h: ["Verbo", "He/she", "Negativa", "Pasado"], r: [["have to", "has to", "doesn't have to", "had to"], ["must", "must", "mustn't", "(had to)"], ["should", "should", "shouldn't", "should have + participio"]] },
    ],
    variantes: ["**have to** usa *do* en preguntas: *Do you have to work?* **should/must** no: *Should I go?*", "*Need to* ≈ have to: *I need to study.*", "*Had better* = más te vale: *You'd better hurry.*"],
    espanol: ["*Tengo que* → *I **have to*** (no *I have that*).", "*No tienes que venir* (no es necesario) → *You **don't have to** come*. *No debes decirlo* (prohibido) → *You **mustn't** tell anyone*.", "*Deberías* → *You **should***."],
    ejemplos: [["I have to finish the project today.", "Tengo que terminar el proyecto hoy."], ["You should sleep more.", "Deberías dormir más."], ["You don't have to come.", "No tienes que venir."], ["You mustn't share your password.", "No debes compartir tu contraseña."], ["She has to work on Saturdays.", "Ella tiene que trabajar los sábados."]],
    errores: [["I have that study.", "I have to study.", "Tener que = have to."], ["She have to go.", "She has to go.", "He/she → has to."], ["You should to rest.", "You should rest.", "Should sin to."], ["Do I should go?", "Should I go?", "Should no usa do."]],
    truco: "**Don't have to** = *no hace falta* (eres libre). **Mustn't** = *ni se te ocurra*.",
  },
  s: `I [have to] finish the project today. | Tengo que terminar el proyecto hoy.
You [should] sleep more. | Deberías dormir más.
You [don't have to] come. | No tienes que venir. | You do not have to come
You [mustn't] share your password. | No debes compartir tu contraseña. | You must not share your password
She [has to] work on Saturdays. | Ella tiene que trabajar los sábados.
[Should] I call the teacher? | ¿Debería llamar al maestro?
We [had to] wait for an hour. | Tuvimos que esperar una hora.
You [shouldn't] drink so much coffee. | No deberías tomar tanto café. | You should not drink so much coffee
[Do] you have to work tomorrow? | ¿Tienes que trabajar mañana?
Students [must] bring their ID. | Los estudiantes deben traer su credencial.
I [need to] buy a new charger. | Necesito comprar un cargador nuevo.
He [doesn't have to] pay. | Él no tiene que pagar. | He does not have to pay
You [should] try this game. | Deberías probar este juego.
I [have to] go now. | Me tengo que ir. | I have to leave now
What [should] I do? | ¿Qué debería hacer?`,
});

TOPIC_DEFS.push({
  key: "a2-verbprep", level: "A2", title: "Verbos con preposición", sub: "depend on, wait for, listen to...",
  ficha: {
    clave: ["Muchos verbos llevan una preposición fija: **depend on, wait for, listen to, look at, look for, think about, agree with**.", "No traduzcas la preposición del español: *depende **de*** → *depends **on***."],
    que: "En inglés muchos verbos van con una **preposición fija** que no siempre coincide con el español. No hay una regla lógica: se aprenden como bloque (*verbo + preposición*), igual que una sola palabra.",
    usos: ["*It depends **on** you.* (depende de ti)", "*I'm waiting **for** the bus.* (espero el camión)", "*Listen **to** me.* (escúchame)", "*Look **at** this.* (mira esto) / *I'm looking **for** my keys.* (busco)", "*I agree **with** you.* / *Think **about** it.*"],
    forma: [
      { t: "Los más comunes", h: ["Inglés", "Español", "Ojo"], r: [["depend on", "depender de", "no *of*"], ["wait for", "esperar (algo)", "no se omite *for*"], ["listen to", "escuchar (algo)", "no se omite *to*"], ["look at / look for", "mirar / buscar", "dos significados"], ["think about / of", "pensar en", "no *in*"], ["agree with", "estar de acuerdo con", ""], ["ask for", "pedir", "*ask for help*"], ["pay for", "pagar (algo)", "*pay for the tickets*"], ["arrive at / in", "llegar a", "no *to*"], ["be married to", "estar casado con", "no *with*"], ["be good at", "ser bueno en", "no *in*"], ["be interested in", "interesarse en", ""]] },
    ],
    variantes: ["Sin objeto no va la preposición: *Please wait. Listen!*", "*Arrive **at*** lugares pequeños (the airport), ***in*** ciudades o países (in Puebla). Nunca *arrive to*.", "*Explain something **to** someone* (no *explain me*)."],
    espanol: ["*Pensar **en** ti* → *think **about** you* (no *in*).", "*Llegar **a** casa* → *get home / arrive home* (sin preposición).", "*Esperar el camión* → *wait **for** the bus* (en inglés sí lleva)."],
    ejemplos: [["It depends on the price.", "Depende del precio."], ["I'm waiting for your answer.", "Espero tu respuesta."], ["Listen to this song.", "Escucha esta canción."], ["I'm looking for my keys.", "Estoy buscando mis llaves."], ["I agree with you.", "Estoy de acuerdo contigo."], ["She's good at math.", "Es buena en matemáticas."]],
    errores: [["It depends of you.", "It depends on you.", "Depend on."], ["I'm waiting the bus.", "I'm waiting for the bus.", "Wait for."], ["I think in you.", "I think about you.", "Think about."], ["We arrived to the airport.", "We arrived at the airport.", "Arrive at/in."]],
    truco: "Guarda cada verbo **con su preposición** en Mis frases: *depend on* es una sola pieza, como si fuera una palabra.",
  },
  s: `It depends [on] the price. | Depende del precio.
I'm waiting [for] your answer. | Espero tu respuesta.
Listen [to] this song. | Escucha esta canción.
I'm looking [for] my keys. | Estoy buscando mis llaves.
I agree [with] you. | Estoy de acuerdo contigo.
She's good [at] math. | Es buena en matemáticas.
Look [at] this bug. | Mira este error.
I'm thinking [about] the project. | Estoy pensando en el proyecto.
We arrived [at] the airport late. | Llegamos tarde al aeropuerto.
Can I ask [for] help? | ¿Puedo pedir ayuda?
I'm interested [in] artificial intelligence. | Me interesa la inteligencia artificial.
He is married [to] a doctor. | Está casado con una doctora.
Who is going to pay [for] the tickets? | ¿Quién va a pagar los boletos?
Can you explain it [to] me? | ¿Me lo puedes explicar?
You can count [on] me. | Puedes contar conmigo.`,
});

TOPIC_DEFS.push({
  key: "a2-falsos", level: "A2", title: "Falsos amigos y -ed / -ing", sub: "actually, assist, bored/boring",
  ficha: {
    clave: ["**Falsos amigos**: palabras que parecen español pero significan otra cosa: *actually* = en realidad, *assist* = ayudar, *embarrassed* = avergonzado.", "**-ed** = cómo te sientes (*bored*). **-ing** = cómo es algo (*boring*)."],
    que: "Hay palabras en inglés que se parecen al español pero significan algo diferente. Usarlas mal puede cambiar todo el mensaje. Aquí también están los adjetivos **-ed / -ing**, que causan muchos errores.",
    usos: ["*Actually, I don't agree.* (En realidad...)", "*I'm currently working.* (Actualmente...)", "*I attend class.* (Asisto a clase)", "*I'm bored.* (Estoy aburrido) vs *The class is boring.* (La clase es aburrida)"],
    forma: [
      { t: "Falsos amigos frecuentes", h: ["Inglés", "Significa", "Para decir..."], r: [["actually", "en realidad", "actualmente → currently"], ["assist", "ayudar", "asistir → attend"], ["embarrassed", "avergonzado", "embarazada → pregnant"], ["library", "biblioteca", "librería → bookstore"], ["realize", "darse cuenta", "realizar → carry out, do"], ["career", "carrera profesional", "carrera (universidad) → degree / major"], ["sensible", "sensato", "sensible → sensitive"], ["argument", "discusión, pelea", "argumento (de película) → plot"], ["exit", "salida", "éxito → success"], ["pretend", "fingir", "pretender → intend, try"], ["carpet", "alfombra", "carpeta → folder"]] },
      { t: "-ed vs -ing", h: ["Cómo te sientes", "Cómo es algo"], r: [["bored", "boring"], ["interested", "interesting"], ["excited", "exciting"], ["tired", "tiring"], ["confused", "confusing"], ["surprised", "surprising"]] },
    ],
    variantes: ["*I'm boring* = soy aburrido (!). *I'm bored* = estoy aburrido.", "*Exciting* = emocionante (no *excitante*).", "*Major* (EE. UU.) = carrera universitaria: *My major is IT.*"],
    espanol: ["*Actualmente* → **currently / right now**, nunca *actually*.", "*Estoy embarazada* → *I'm pregnant*; *embarrassed* es *apenado*.", "*Mi carrera es Sistemas* → *My major is IT* o *I'm studying IT*."],
    ejemplos: [["Actually, I don't agree.", "En realidad, no estoy de acuerdo."], ["I'm currently looking for a job.", "Actualmente busco trabajo."], ["I attend every class.", "Asisto a todas las clases."], ["The class was boring.", "La clase estuvo aburrida."], ["I was so embarrassed.", "Me dio mucha pena."], ["I realized I was wrong.", "Me di cuenta de que estaba mal."]],
    errores: [["Actually I live in Puebla.", "Currently, I live in Puebla.", "Actualmente = currently."], ["I assist to class.", "I attend class.", "Asistir = attend."], ["I'm boring.", "I'm bored.", "Sentimiento: -ed."], ["I'm very exciting.", "I'm very excited.", "Sentimiento: -ed."]],
    truco: "Si una palabra se parece **demasiado** al español, sospecha y búscala. Para -ed/-ing: **-ed** = yo **siento**, **-ing** = la cosa **causa**.",
  },
  s: `[Actually], I don't agree. | En realidad, no estoy de acuerdo.
I'm [currently] looking for a job. | Actualmente busco trabajo. | I am currently looking for a job
I [attend] every class. | Asisto a todas las clases.
The class was [boring]. | La clase estuvo aburrida.
I'm [bored]. | Estoy aburrido. | I am bored
I was so [embarrassed]. | Me dio mucha pena.
I [realized] I was wrong. | Me di cuenta de que estaba mal.
The movie was really [exciting]. | La película estuvo muy emocionante.
I'm [interested] in programming. | Me interesa la programación. | I am interested in programming
This exercise is [confusing]. | Este ejercicio es confuso.
I need to go to the [bookstore]. | Necesito ir a la librería.
Save it in this [folder]. | Guárdalo en esta carpeta.
Her new job was a big [success]. | Su nuevo trabajo fue un gran éxito.
My [major] is IT. | Mi carrera es TI.
I'm so [tired] after work. | Estoy muy cansado después del trabajo. | I am so tired after work`,
});

TOPIC_DEFS.push({
  key: "a2-verbs", level: "A2", title: "Want to, like -ing, say y tell", sub: "patrones de verbos útiles",
  ficha: {
    clave: ["**want / need / would like + to + verbo**: *I want to learn*. **like / love / enjoy + -ing**: *I enjoy coding*.", "**want + persona + to**: *I want **you to** come*. **tell** + persona, **say** + algo: *She told **me**... / She said that...*"],
    que: "Algunos verbos van seguidos de otro verbo con una forma fija: **to + verbo** o **-ing**. También hay pares que confunden, como **say/tell** y **borrow/lend**.",
    usos: ["*I want to learn English.* · *I need to sleep.* · *I'd like to order.*", "*I enjoy playing.* · *I like reading.* · *I don't mind waiting.*", "*She wants me to help her.* (quiere que la ayude)", "*He told me the truth.* · *He said it was easy.*"],
    forma: [
      { t: "Verbo + to / -ing", h: ["+ to + verbo", "+ verbo-ing"], r: [["want, need, decide, plan, hope, learn, try, would like", "enjoy, finish, mind, avoid, practice, keep"], ["I decided to stay.", "I finished working."], ["like / love / hate aceptan los dos", "I like to read = I like reading"]] },
      { t: "Pares confusos", h: ["Verbo", "Uso", "Ejemplo"], r: [["say", "decir algo", "She said it was late."], ["tell", "decirle a alguien", "She told me it was late."], ["borrow", "pedir prestado", "Can I borrow your pen?"], ["lend", "prestar", "Can you lend me your pen?"], ["make", "crear, fabricar", "make a cake, make a mistake"], ["do", "actividades, tareas", "do homework, do exercise"]] },
    ],
    variantes: ["*Would like* es más amable que *want*: *I'd like a coffee, please.*", "Preguntas indirectas sin *do*: *Tell me what you want* (no *what do you want*).", "*Stop smoking* (dejar de) vs *stop to smoke* (pararse para fumar)."],
    espanol: ["*Quiero que vengas* → *I want **you to** come* (no *I want that you come*).", "*Me dijo* → *She **told** me* (no *she said me*).", "*Me prestas...?* → *Can you **lend** me...?* / *Can I **borrow**...?*"],
    ejemplos: [["I want to learn English.", "Quiero aprender inglés."], ["I enjoy playing online.", "Disfruto jugar en línea."], ["She wants me to help her.", "Quiere que la ayude."], ["He told me the truth.", "Me dijo la verdad."], ["Can I borrow your charger?", "¿Me prestas tu cargador?"], ["I made a mistake.", "Me equivoqué."]],
    errores: [["I want that you come.", "I want you to come.", "Want + persona + to."], ["She said me.", "She told me.", "Tell + persona."], ["I enjoy to play.", "I enjoy playing.", "Enjoy + -ing."], ["I did a mistake.", "I made a mistake.", "Make a mistake."]],
    truco: "**Tell** siempre necesita a **alguien** después (*tell me, tell her*). **Say** no: *say hello, say something*.",
  },
  s: `I want [to] learn English. | Quiero aprender inglés.
I enjoy [playing] online. | Disfruto jugar en línea.
She wants me [to] help her. | Quiere que la ayude.
He [told] me the truth. | Me dijo la verdad.
Can I [borrow] your charger? | ¿Me prestas tu cargador?
I [made] a mistake. | Me equivoqué.
Can you [lend] me fifty pesos? | ¿Me prestas cincuenta pesos? | Can you lend me 50 pesos
I finished [working] at nine. | Terminé de trabajar a las nueve.
She [said] it was easy. | Dijo que era fácil.
I need [to] sleep. | Necesito dormir.
I [did] my homework. | Hice mi tarea.
Tell me what you [want]. | Dime qué quieres.
I'd like [to] order, please. | Quisiera ordenar, por favor.
Do you mind [waiting]? | ¿Te importa esperar?
I decided [to] stay home. | Decidí quedarme en casa.`,
});

const STORIES_A2 = [
  { id: "s19", level: "A2", title: "My first job interview", lines: [
    ["Last month I had my first job interview.", "El mes pasado tuve mi primera entrevista de trabajo."], ["It was for a junior developer position.", "Era para un puesto de desarrollador junior."], ["I was very nervous, so I arrived early.", "Estaba muy nervioso, así que llegué temprano."], ["The interviewer asked me about my projects.", "El entrevistador me preguntó por mis proyectos."], ["I showed him a game I made with my friends.", "Le enseñé un juego que hice con mis amigos."], ["Then he asked a question in English.", "Luego hizo una pregunta en inglés."], ["I didn't understand everything, but I answered.", "No entendí todo, pero contesté."], ["Two days later, they called me. I got the job!", "Dos días después, me llamaron. ¡Me quedé con el trabajo!"],
  ], q: [["Why did he arrive early?", ["He was nervous", "The bus was fast", "He wanted coffee"], 0, "*I was very nervous, **so** I arrived early* (*so* = así que)."], ["What did he show the interviewer?", ["His grades", "A game he made", "His CV"], 1, "*I showed him a game I made with my friends.*"], ["Did he get the job?", ["Yes", "No", "We don't know"], 0, "*I got the job!* (*get the job* = quedarse con el trabajo)."]] },
  { id: "s20", level: "A2", title: "The best phone", lines: [
    ["My cousin and I always argue about phones.", "Mi primo y yo siempre discutimos sobre celulares."], ["He says his phone is the best phone in the world.", "Él dice que su celular es el mejor del mundo."], ["It's bigger and more expensive than mine.", "Es más grande y más caro que el mío."], ["But my phone is lighter and the battery lasts longer.", "Pero mi celular es más ligero y la batería dura más."], ["His camera is better, I have to admit it.", "Su cámara es mejor, lo tengo que admitir."], ["But mine was much cheaper.", "Pero el mío fue mucho más barato."], ["In the end, the best phone is the one you can pay for.", "Al final, el mejor celular es el que puedes pagar."],
  ], q: [["Whose phone is more expensive?", ["His cousin's", "His", "Both are the same"], 0, "*It's bigger and more expensive than **mine*** — el del primo."], ["What is better on his cousin's phone?", ["The battery", "The camera", "The price"], 1, "*His camera is better.*"], ["What does 'lasts longer' mean?", ["Dura más", "Es más larga", "Carga rápido"], 0, "*Last* = durar. *Lasts longer* = dura más."]] },
  { id: "s21", level: "A2", title: "Rules at the lab", lines: [
    ["These are the rules of the computer lab.", "Estas son las reglas del laboratorio de cómputo."], ["You must show your student ID at the door.", "Debes mostrar tu credencial en la puerta."], ["You mustn't eat or drink near the computers.", "No debes comer ni beber cerca de las computadoras."], ["You don't have to bring your own laptop.", "No tienes que traer tu propia laptop."], ["You should save your work every ten minutes.", "Deberías guardar tu trabajo cada diez minutos."], ["You have to log out before you leave.", "Tienes que cerrar sesión antes de irte."], ["The lab is open from eight until eight.", "El laboratorio abre de ocho a ocho."],
  ], q: [["Do you have to bring a laptop?", ["Yes, always", "No, it's not necessary", "Only on Mondays"], 1, "*You **don't have to** bring...* = no es necesario (no es lo mismo que *mustn't*)."], ["What is prohibited?", ["Saving your work", "Eating near the computers", "Logging out"], 1, "*You **mustn't** eat or drink* = prohibido."], ["When does the lab close?", ["At six", "At eight", "At ten"], 1, "*from eight **until** eight* (hasta las ocho)."]] },
  { id: "s22", level: "A2", title: "A weekend in Oaxaca", lines: [
    ["Two weeks ago, I went to Oaxaca with my family.", "Hace dos semanas fui a Oaxaca con mi familia."], ["We took a bus at night and arrived in the morning.", "Tomamos un camión en la noche y llegamos en la mañana."], ["The city was beautiful and very colorful.", "La ciudad era hermosa y muy colorida."], ["We ate mole, tlayudas and a lot of chocolate.", "Comimos mole, tlayudas y mucho chocolate."], ["On Saturday we visited Monte Albán.", "El sábado visitamos Monte Albán."], ["It was really hot, so we bought a lot of water.", "Hacía mucho calor, así que compramos mucha agua."], ["I want to go back next year.", "Quiero regresar el próximo año."],
  ], q: [["When did he go to Oaxaca?", ["Two weeks ago", "Last year", "Next month"], 0, "*Two weeks **ago*** = hace dos semanas."], ["How did they travel?", ["By plane", "By bus", "By car"], 1, "*We took a bus at night.*"], ["Why did they buy water?", ["It was hot", "They were sick", "It was cheap"], 0, "*It was really hot, **so** we bought a lot of water.*"]] },
];

FIX2.push(
  { w: "I went to Oaxaca since two weeks.", bad: "since", r: "I went to Oaxaca two weeks ago.", t: "a2-time", why: "*Hace + tiempo* en pasado se dice **tiempo + ago**, al final: *two weeks ago*. **Since** solo se usa con presente perfecto y un punto de inicio: *I've been here since Monday*.", ex: ["I called you an hour ago.", "We met two years ago.", "I've lived here since 2020."] },
  { w: "I played during three hours.", bad: "during", r: "I played for three hours.", t: "a2-time", why: "Para **cuánto tiempo** dura algo se usa **for**. **During** responde *¿en qué momento?*: *during the class, during the movie*.", ex: ["for two hours", "during the exam", "for a long time"] },
  { w: "I will see you in the next week.", bad: "in the", r: "I will see you next week.", t: "a2-time", why: "**Next** y **last** no llevan preposición ni artículo: *next week, last Monday, next year*.", ex: ["See you next Friday.", "I saw her last week.", "Next year I'll graduate."] },
  { w: "I have that study tonight.", bad: "that", r: "I have to study tonight.", t: "a2-must", why: "*Tener que* = **have to** + verbo. *Have that* es traducción literal y no tiene sentido en inglés.", ex: ["I have to go.", "She has to work.", "Do you have to pay?"] },
  { w: "You should to rest.", bad: "to", r: "You should rest.", t: "a2-must", why: "**Should** es modal: el verbo va directo, sin *to*. Igual que *can, must, will*.", ex: ["You should sleep more.", "Should I call her?", "You shouldn't worry."] },
  { w: "You mustn't come if you are busy.", bad: "mustn't", r: "You don't have to come if you are busy.", t: "a2-must", why: "**Mustn't** = está prohibido. Si quieres decir *no es necesario*, usa **don't have to**. Son muy diferentes: *You mustn't come* = no vengas, no tienes permiso.", ex: ["You don't have to pay.", "You mustn't touch it.", "We didn't have to wait."] },
  { w: "She has to works on Saturdays.", bad: "works", r: "She has to work on Saturdays.", t: "a2-must", why: "La **-s** ya está en *has*; después de *has to* el verbo va en forma base.", ex: ["He has to study.", "She needs to rest.", "It has to be today."] },
  { w: "I go always to the gym.", bad: "always", r: "I always go to the gym.", t: "a2-freq", why: "Los adverbios de frecuencia van **antes** del verbo principal (*I always go*) y **después** de *to be* (*I'm always late*). En español el orden es libre; en inglés no.", ex: ["I usually take the bus.", "She never eats meat.", "He is often late."] },
  { w: "I don't never study on Sundays.", bad: "don't", r: "I never study on Sundays.", t: "a2-freq", why: "**Never** ya es negativo. En inglés no se usan dos negaciones juntas: *I never study* o *I don't ever study*.", ex: ["I never drink coffee.", "She never calls.", "I don't ever go there."] },
  { w: "This is the best restaurant of the city.", bad: "of", r: "This is the best restaurant in the city.", t: "a2-sup", why: "Con lugares y grupos el superlativo usa **in**: *the best in the city, the tallest in my family*. **Of** se usa con periodos o cantidades: *the best day of my life*.", ex: ["the best player in the team", "the hottest day of the year", "the biggest city in Mexico"] },
  { w: "It's one of the best game.", bad: "game", r: "It's one of the best games.", t: "a2-sup", why: "*One of the...* habla de un grupo, así que el sustantivo va en **plural**: *one of the best **games***.", ex: ["one of my friends", "one of the most popular apps", "one of the hardest exams"] },
  { w: "I'm thinking in you.", bad: "in", r: "I'm thinking about you.", t: "a2-verbprep", why: "*Pensar en* = **think about** (o *think of*). *Think in* solo se usa para idiomas: *I think in Spanish*.", ex: ["Think about it.", "What do you think about the game?", "I'm thinking of you."] },
  { w: "We arrived to the airport.", bad: "to", r: "We arrived at the airport.", t: "a2-verbprep", why: "**Arrive** nunca va con *to*. Usa **at** con lugares concretos (*at the airport, at school*) e **in** con ciudades o países (*in Cancún*).", ex: ["We arrived at the station.", "She arrived in Mexico yesterday.", "I arrived home late."] },
  { w: "Listen me, please.", bad: "me", r: "Listen to me, please.", t: "a2-verbprep", why: "**Listen** necesita **to** antes de lo que escuchas: *listen to me, listen to music*. Sin objeto: *Listen!*", ex: ["Listen to this.", "I listen to music on the bus.", "Listen!"] },
  { w: "She said me the truth.", bad: "said", r: "She told me the truth.", t: "a2-verbs", why: "**Tell** va con la persona directo (*tell me*). **Say** no acepta a la persona directo: *say something* o *say something to someone*.", ex: ["He told me a secret.", "She said hello.", "What did he say to you?"] },
  { w: "I enjoy to play online.", bad: "to", r: "I enjoy playing online.", t: "a2-verbs", why: "**Enjoy** siempre va con **-ing**: *enjoy playing, enjoy reading*. Lo mismo *finish, mind, avoid, practice*.", ex: ["I enjoy coding.", "I finished working.", "Do you mind waiting?"] },
  { w: "I did a mistake in the code.", bad: "did", r: "I made a mistake in the code.", t: "a2-verbs", why: "Se dice **make a mistake**. *Make* = crear o producir; *do* = actividades y tareas (*do homework, do the dishes*).", ex: ["make a decision", "do your homework", "make money"] },
  { w: "My carreer is IT.", bad: "carreer", r: "My major is IT.", t: "a2-falsos", why: "*Carrera universitaria* = **major** (EE. UU.) o **degree**. **Career** es tu trayectoria profesional: *a career in software*.", ex: ["My major is IT.", "I'm studying computer science.", "She has a great career."] },
  { w: "I'm embarrassed, I'm going to have a baby.", bad: "embarrassed", r: "I'm pregnant, I'm going to have a baby.", t: "a2-falsos", why: "**Embarrassed** = apenado, avergonzado. *Embarazada* = **pregnant**. Es de los falsos amigos más famosos.", ex: ["I was so embarrassed.", "She is pregnant.", "Don't be embarrassed."] },
  { w: "I bought it in the library.", bad: "library", r: "I bought it at the bookstore.", t: "a2-falsos", why: "**Library** = biblioteca (prestan libros). *Librería* (venden libros) = **bookstore**.", ex: ["I study at the library.", "The bookstore is closed.", "I borrowed a book from the library."] },
  { w: "This class is very bored.", bad: "bored", r: "This class is very boring.", t: "a2-falsos", why: "Una cosa que aburre es **boring**. **Bored** es cómo te sientes tú. *The class is boring, so I'm bored.*", ex: ["The movie was boring.", "I'm bored.", "It's an interesting topic."] },
  { w: "I buyed a new keyboard.", bad: "buyed", r: "I bought a new keyboard.", t: "a2-irr", why: "**Buy** es irregular: *buy – bought – bought*. Se agrupa con *think-thought, bring-brought, catch-caught* (todos suenan /ɔt/).", ex: ["I bought it online.", "She thought it was easy.", "He brought snacks."] },
  { w: "I'm going to to call you.", bad: "to", r: "I'm going to call you.", t: "a2-fut", why: "Sobra un *to*: la estructura es **going to + verbo**, con un solo *to*.", ex: ["I'm going to study.", "It's going to rain.", "Are you going to come?"] },
  { w: "Tomorrow I go to call you.", bad: "go", r: "Tomorrow I'm going to call you.", t: "a2-fut", why: "*Voy a + verbo* = **I'm going to** + verbo. Falta *am* y *-ing*: *go to* no expresa futuro.", ex: ["I'm going to call you.", "We're going to win.", "She's going to be late."] },
  { w: "There aren't some chairs.", bad: "some", r: "There aren't any chairs.", t: "a2-quant", why: "En negativas y preguntas se usa **any**: *There aren't any chairs. Are there any questions?* **Some** es para afirmativas.", ex: ["I don't have any money.", "Do you have any questions?", "I have some ideas."] },
  { w: "I have a lot of homeworks.", bad: "homeworks", r: "I have a lot of homework.", t: "a2-quant", why: "**Homework** es incontable: no lleva -s. Para contar: *two assignments* o *two pieces of homework*.", ex: ["We have a lot of homework.", "I need some advice.", "How much homework do you have?"] },
  { w: "My laptop is more heavy than yours.", bad: "more", r: "My laptop is heavier than yours.", t: "a2-comp", why: "*Heavy* tiene 2 sílabas y termina en **-y** → **heavier**. Regla: -y después de consonante cambia a **-ier**.", ex: ["easier", "happier", "busier"] },
  { w: "It's bigger that mine.", bad: "that", r: "It's bigger than mine.", t: "a2-comp", why: "En comparaciones, *que* = **than**. **That** significa *ese/eso* o *que* en otras oraciones (*I know that...*).", ex: ["faster than", "more expensive than", "better than ever"] },
);
