// Nivel A1 · 12 temas con ficha completa.
// Ficha: que, usos, forma (tablas), variantes, espanol (comparación), ejemplos, errores, truco, clave (resumen corto).
// Oraciones: "inglés con [parte practicada] | español | otras respuestas;válidas"
// Si un tema tiene "legacy", también usa las oraciones de esa unidad anterior (para no perder tu progreso).

const TOPIC_DEFS = [];

TOPIC_DEFS.push({
  key: "a1-be", level: "A1", legacy: 1, title: "Verbo TO BE", sub: "ser, estar, edad y estados",
  ficha: {
    clave: ["*To be* = ser y estar: I **am** · he/she/it **is** · you/we/they **are**.", "La edad, el hambre, el frío y tener razón van con *to be*: **I'm 20**, **I'm hungry**."],
    que: "**To be** es el verbo más usado del inglés. Significa **ser** y también **estar**: en inglés no hay diferencia entre los dos. Además se usa en frases donde en español usamos *tener*: la edad, el hambre, la sed, el frío y tener razón.",
    usos: ["Identidad y profesión: *I am a student.* (Soy estudiante.)", "Ubicación: *We are at the library.* (Estamos en la biblioteca.)", "Estados y emociones: *She is tired.* (Está cansada.)", "Edad: *I am 20 (years old).* (Tengo 20 años.)", "Clima y hora con **it**: *It is cold. It is 8 o'clock.*"],
    forma: [
      { t: "Afirmativa", h: ["Sujeto", "To be", "Contracción"], r: [["I", "am", "I'm"], ["You / We / They", "are", "you're · we're · they're"], ["He / She / It", "is", "he's · she's · it's"]] },
      { t: "Negativa: agrega not", h: ["Completa", "Contracción"], r: [["I am not", "I'm not"], ["You are not", "you aren't / you're not"], ["He is not", "he isn't / he's not"]] },
      { t: "Pregunta: invierte el orden", h: ["Pregunta", "Respuesta corta"], r: [["Am I late?", "Yes, you are. / No, you aren't."], ["Are you ready?", "Yes, I am. / No, I'm not."], ["Is it cold?", "Yes, it is. / No, it isn't."]] },
    ],
    variantes: ["Contracciones: en conversación casi siempre se dice **I'm, you're, it's**. En respuestas cortas afirmativas NO se contrae: *Yes, I am* (no *Yes, I'm*).", "**There is / there are** (hay) es otra forma de *to be*; tiene su propio tema.", "No existe *amn't*: la negativa de *I am* es **I'm not**."],
    espanol: ["En español el sujeto se puede omitir (*Es fácil*), en inglés **nunca**: *It is easy*.", "En español *tengo 20 años* usa *tener*; en inglés es *ser*: **I am 20**. Decir *I have 20 years* suena a que posees 20 años.", "*Tengo hambre / frío / razón* → **I'm hungry / cold / right**."],
    ejemplos: [["I am an IT student.", "Soy estudiante de TI."], ["My laptop is very slow.", "Mi laptop es muy lenta."], ["Are you ready for the exam?", "¿Estás listo para el examen?"], ["The server isn't working.", "El servidor no está funcionando."], ["She is 20 years old.", "Ella tiene 20 años."], ["It's cold today.", "Hoy hace frío."], ["You're right.", "Tienes razón."]],
    errores: [["I have 20 years.", "I'm 20 (years old).", "La edad va con to be."], ["Is very easy.", "It's very easy.", "Siempre necesitas sujeto: it."], ["I am agree.", "I agree.", "Agree es verbo; no lleva am."], ["Yes, I'm.", "Yes, I am.", "En respuestas cortas no se contrae."]],
    truco: "Si en español puedes decir **ser** o **estar**, en inglés es **to be**. Si dices *tengo* + edad, hambre, frío o razón, también.",
  },
  s: `The coffee [is] hot. | El café está caliente.
[Are] they your classmates? | ¿Son tus compañeros de clase? | Are they your classmates
I['m] not sure. | No estoy seguro. | I am not sure`,
});

TOPIC_DEFS.push({
  key: "a1-pron", level: "A1", title: "Pronombres y posesivos", sub: "I/me/my, 's y de quién es",
  ficha: {
    clave: ["Sujeto: **I, you, he, she, it, we, they**. Posesivo: **my, your, his, her, its, our, their**.", "Para decir *de alguien* usa **'s**: *Ana's laptop* = la laptop de Ana."],
    que: "Los **pronombres** reemplazan a una persona o cosa. Hay tres tipos que necesitas en A1: los de **sujeto** (quién hace la acción), los de **objeto** (a quién se la hacen) y los **posesivos** (de quién es algo).",
    usos: ["Sujeto, antes del verbo: *She codes in Python.*", "Objeto, después del verbo o de una preposición: *Call **me**. This is for **him**.*", "Posesivo, antes de un sustantivo: ***My** phone, **their** house.*", "Posesión con nombres: *Carlos**'s** car, my parents**'** house.*"],
    forma: [
      { t: "Las tres formas", h: ["Sujeto", "Objeto", "Posesivo"], r: [["I", "me", "my"], ["you", "you", "your"], ["he", "him", "his"], ["she", "her", "her"], ["it", "it", "its"], ["we", "us", "our"], ["they", "them", "their"]] },
      { t: "Posesión con 's", h: ["Caso", "Ejemplo"], r: [["Una persona", "Ana's phone"], ["Plural con -s", "my friends' house"], ["Plural irregular", "the children's toys"]] },
    ],
    variantes: ["**It's** (it is) ≠ **its** (su, de una cosa): *It's a dog. Its name is Max.*", "**Your** (tu/su de usted) ≠ **you're** (you are).", "**Their** (su de ellos) ≠ **there** (ahí) ≠ **they're** (they are).", "Pronombres posesivos sin sustantivo: *mine, yours, his, hers, ours, theirs*: *This laptop is **mine**.*"],
    espanol: ["En español *su* sirve para él, ella, ellos y usted. En inglés debes elegir: **his** (de él), **her** (de ella), **their** (de ellos), **your** (de usted).", "El posesivo concuerda con el **dueño**, no con la cosa: *her brother* (el hermano de ella), aunque el hermano sea hombre.", "*La laptop de Ana* se dice al revés: **Ana's laptop**."],
    ejemplos: [["This is my laptop.", "Esta es mi laptop."], ["Her brother is a programmer.", "Su hermano (de ella) es programador."], ["Can you help me?", "¿Me puedes ayudar?"], ["Their house is near the university.", "Su casa (de ellos) está cerca de la universidad."], ["Ana's phone is new.", "El celular de Ana es nuevo."], ["The game is fun. Its music is great.", "El juego es divertido. Su música es genial."]],
    errores: [["She is my sister. His name is Ana.", "...Her name is Ana.", "Ella → her."], ["The laptop of Ana.", "Ana's laptop.", "La posesión se dice con 's."], ["Me and my friend play.", "My friend and I play.", "Como sujeto se usa I, no me."], ["It's color is blue.", "Its color is blue.", "Its (posesivo) no lleva apóstrofo."]],
    truco: "Pregúntate *¿de quién es?*: si es de un hombre → **his**, de una mujer → **her**, de varios → **their**, de una cosa → **its**.",
  },
  s: `This is [my] laptop. | Esta es mi laptop.
[Her] brother is a programmer. | Su hermano (de ella) es programador. | Her brother is a developer
[His] name is Carlos. | Su nombre (de él) es Carlos. | His name's Carlos
Can you help [me]? | ¿Me puedes ayudar?
[Their] house is near the university. | Su casa (de ellos) está cerca de la universidad.
[Our] teacher is very strict. | Nuestro maestro es muy estricto.
I call [her] every day. | La llamo todos los días.
[Ana's] phone is new. | El celular de Ana es nuevo.
Is this [your] charger? | ¿Este es tu cargador?
The game is fun. [Its] music is great. | El juego es divertido. Su música es genial.
[We] play online every night. | Jugamos en línea todas las noches.
I don't know [them]. | No los conozco.
[They] are in my group. | Ellos están en mi grupo.
This is for [you]. | Esto es para ti.
My [friend's] car is red. | El carro de mi amigo es rojo.
Tell [him] the password. | Dile la contraseña. | Tell him the password
[She] studies at UVP. | Ella estudia en la UVP.
The laptop is [mine]. | La laptop es mía.
[It] is my favorite game. | Es mi juego favorito. | It's my favorite game
Send [us] the file, please. | Mándanos el archivo, por favor.`,
});

TOPIC_DEFS.push({
  key: "a1-art", level: "A1", title: "Artículos: a, an, the", sub: "un, una, el, la... o nada",
  ficha: {
    clave: ["**a** antes de sonido de consonante, **an** antes de sonido de vocal: *a laptop, an app, an hour*.", "**the** = el/la/los/las cuando ya se sabe cuál. Para hablar en general, sin artículo: *Life is hard.*"],
    que: "Los artículos acompañan a los sustantivos. **A/an** = un, una (algo no específico, uno de muchos). **The** = el, la, los, las (algo específico, que ya sabemos cuál es). A veces en inglés **no va ningún artículo** donde en español sí.",
    usos: ["**a/an**: algo nuevo o cualquiera, en singular: *I need **a** charger.*", "**a/an** con profesiones: *She is **an** engineer.* (en español: *es ingeniera*, sin artículo)", "**the**: algo específico o único: ***The** server is down. **The** sun.*", "Sin artículo: plurales e incontables en general, idiomas, materias, comidas: *I like games. English is easy. Lunch is at two.*"],
    forma: [
      { t: "a o an: depende del SONIDO", h: ["Artículo", "Ejemplos"], r: [["a + consonante", "a game, a user, a university (suena /yu/)"], ["an + vocal", "an app, an error, an hour (la h no suena)"]] },
      { t: "Con o sin the", h: ["Situación", "Ejemplo"], r: [["Algo específico", "The game we played was fun."], ["En general", "Games are fun."], ["Lugares fijos", "at home · at school · go to bed · go home"]] },
    ],
    variantes: ["Expresiones sin artículo: *at home, go home, go to bed, at work, by bus, on Monday, in 2026*.", "Con **the**: *the internet, the weekend, the morning, play the guitar*.", "**A** también significa *por*: *twice **a** week* (dos veces por semana), *50 pesos **an** hour*."],
    espanol: ["En español decimos *la vida es dura*; en inglés, para hablar en general, **sin the**: *Life is hard.*", "Con profesiones el inglés SÍ usa artículo: *Soy estudiante* → *I'm **a** student.*", "*Me gustan los videojuegos* (en general) → *I like video games* (sin the)."],
    ejemplos: [["I need a new charger.", "Necesito un cargador nuevo."], ["She is an engineer.", "Ella es ingeniera."], ["The server is down.", "El servidor está caído."], ["I like video games.", "Me gustan los videojuegos."], ["It's an easy exercise.", "Es un ejercicio fácil."], ["I'm at home.", "Estoy en casa."]],
    errores: [["I am student.", "I am a student.", "Profesiones llevan a/an."], ["The life is hard.", "Life is hard.", "En general, sin the."], ["A error.", "An error.", "Error empieza con sonido de vocal."], ["I'm going to the home.", "I'm going home.", "Go home, sin to ni the."]],
    truco: "Escucha la primera letra en voz alta: si suena a vocal, **an**. *An hour* (no suena la h), pero *a university* (suena /yu/).",
  },
  s: `I need [a] new charger. | Necesito un cargador nuevo.
She is [an] engineer. | Ella es ingeniera.
[The] server is down. | El servidor está caído.
I'm [a] student. | Soy estudiante. | I am a student
It's [an] easy exercise. | Es un ejercicio fácil. | It is an easy exercise
I have [an] idea. | Tengo una idea.
[The] teacher is late. | El maestro llega tarde.
I want [a] coffee. | Quiero un café.
Close [the] door, please. | Cierra la puerta, por favor.
He is [an] amazing player. | Él es un jugador increíble.
I like [music]. | Me gusta la música.
[Life] is hard sometimes. | La vida es difícil a veces.
I go to the gym twice [a] week. | Voy al gym dos veces por semana. | I go to the gym two times a week
It takes [an] hour. | Toma una hora.
I'm at [home]. | Estoy en casa. | I am at home
Open [the] app. | Abre la app.
She has [a] dog and [a] cat. | Ella tiene un perro y un gato.
[English] is important for my career. | El inglés es importante para mi carrera.
Is there [a] bathroom here? | ¿Hay un baño aquí?
[The] weekend is too short. | El fin de semana es muy corto.`,
});

TOPIC_DEFS.push({
  key: "a1-plur", level: "A1", title: "Plurales, this/that", sub: "-s, -es, irregulares y demostrativos",
  ficha: {
    clave: ["Plural normal **+s**: *games*. Después de s, sh, ch, x: **+es**: *classes, boxes*. Consonante + y: **-ies**: *cities*.", "Irregulares: man→**men**, person→**people**, child→**children**. Los adjetivos NUNCA llevan -s."],
    que: "Para hablar de más de una cosa, los sustantivos cambian. La mayoría solo agrega **-s**, pero hay reglas de ortografía y algunos plurales irregulares. También verás **this/that** (este/ese) y sus plurales **these/those**.",
    usos: ["Contar cosas: *two players, three bugs*.", "Señalar algo cerca: ***this** laptop, **these** files*.", "Señalar algo lejos: ***that** bus, **those** people*."],
    forma: [
      { t: "Reglas de ortografía", h: ["Termina en", "Regla", "Ejemplo"], r: [["casi todo", "+ s", "game → games"], ["s, ss, sh, ch, x", "+ es", "class → classes, box → boxes"], ["consonante + y", "y → ies", "city → cities"], ["vocal + y", "+ s", "day → days, key → keys"], ["f / fe", "→ ves", "life → lives, knife → knives"]] },
      { t: "Irregulares comunes", h: ["Singular", "Plural"], r: [["man / woman", "men / women"], ["person", "people"], ["child", "children"], ["foot / tooth", "feet / teeth"], ["mouse", "mice (animales) · mouses o mice (de compu)"]] },
      { t: "Demostrativos", h: ["", "Cerca", "Lejos"], r: [["Singular", "this (este, esta)", "that (ese, aquel)"], ["Plural", "these (estos)", "those (esos)"]] },
    ],
    variantes: ["Incontables no tienen plural: *information, advice, homework, music, money* → *some information*, nunca *informations*.", "**People** ya es plural: *people **are***.", "Algunos solo existen en plural: *jeans, glasses, headphones*: *My headphones **are** broken.*"],
    espanol: ["En español el adjetivo cambia (*carros rojos*); en inglés **no**: *red cars*, nunca *reds cars*.", "*La gente es amable* → *People **are** friendly* (plural en inglés).", "*Información, consejo, tarea* son incontables: no se les pone -s."],
    ejemplos: [["There are two players online.", "Hay dos jugadores en línea."], ["These files are important.", "Estos archivos son importantes."], ["Those people are my classmates.", "Esas personas son mis compañeros."], ["I have three classes today.", "Tengo tres clases hoy."], ["My headphones are broken.", "Mis audífonos están rotos."]],
    errores: [["I have two reds cars.", "I have two red cars.", "Los adjetivos no llevan -s."], ["People is friendly.", "People are friendly.", "People es plural."], ["I need informations.", "I need information.", "Information es incontable."], ["This files are new.", "These files are new.", "Plural: these."]],
    truco: "**This/these** tienen la **i** y la **e** de *aquí*; **that/those** son para lo que está *allá*.",
  },
  s: `There are two [players] online. | Hay dos jugadores en línea.
[These] files are important. | Estos archivos son importantes.
[Those] people are my classmates. | Esas personas son mis compañeros. | Those people are my classmates
I have three [classes] today. | Tengo tres clases hoy.
My [headphones] are broken. | Mis audífonos están rotos.
[This] game is amazing. | Este juego es increíble.
[That] bus goes to the university. | Ese camión va a la universidad.
I have two [children] in my family. | Tengo dos niños en mi familia.
There are many [cities] in Mexico. | Hay muchas ciudades en México.
The [people] here are friendly. | La gente aquí es amable.
I need some [information]. | Necesito información. | I need information
We have five red [cars]. | Tenemos cinco carros rojos. | We have 5 red cars
[These] are my friends. | Estos son mis amigos.
Is [that] your phone? | ¿Ese es tu celular?
I have a lot of [boxes]. | Tengo muchas cajas.
The [women] in my team are very smart. | Las mujeres de mi equipo son muy inteligentes.
I lost my [keys]. | Perdí mis llaves.
[Those] tacos look delicious. | Esos tacos se ven deliciosos.`,
});

TOPIC_DEFS.push({
  key: "a1-there", level: "A1", legacy: 4, title: "There is / there are", sub: "hay, había, ¿hay...?",
  ficha: {
    clave: ["**There is** + singular (hay un/una). **There are** + plural (hay varios).", "Pregunta: **Is there / Are there...?** Negativa: **There isn't / There aren't any...**"],
    que: "**There is / there are** significa **hay**. En español *hay* no cambia, pero en inglés depende de si lo que sigue es **singular** o **plural**. No lo confundas con **have** (tener).",
    usos: ["Decir que algo existe en un lugar: *There is a bug in my code.*", "Describir lugares: *There are two chairs and a desk.*", "Preguntar si algo existe: *Is there Wi-Fi here?*"],
    forma: [
      { t: "Formas", h: ["", "Singular / incontable", "Plural"], r: [["Afirmativa", "There is (There's) a bug.", "There are two bugs."], ["Negativa", "There isn't a bathroom.", "There aren't any chairs."], ["Pregunta", "Is there a library?", "Are there any tacos?"], ["Respuesta corta", "Yes, there is. / No, there isn't.", "Yes, there are. / No, there aren't."]] },
    ],
    variantes: ["Con incontables se usa **there is**: *There is a lot of traffic. There is some coffee.*", "En pasado: **there was / there were** (había, hubo).", "**There's** es la contracción de *there is*; *there are* no se contrae al escribir."],
    espanol: ["*Hay* = **there is/are**, no *have*: *Hay un error* → *There is an error* (no *Have an error*).", "*Tengo dos clases* sí es **have**: *I have two classes*. *Hay* = existe; *tener* = poseer."],
    ejemplos: [["There is a bug in my code.", "Hay un error en mi código."], ["There are two players online.", "Hay dos jugadores en línea."], ["Is there a bathroom here?", "¿Hay un baño aquí?"], ["There aren't any seats.", "No hay asientos."], ["There's a lot of traffic.", "Hay mucho tráfico."]],
    errores: [["There is two players.", "There are two players.", "Plural: there are."], ["Have a problem in the server.", "There is a problem with the server.", "Hay = there is."], ["Is there any chairs?", "Are there any chairs?", "Chairs es plural."]],
    truco: "Mira la palabra que sigue: si lleva **-s** de plural, es **are**.",
  },
  s: `There [is] a park near my house. | Hay un parque cerca de mi casa. | There's a park near my house
There [are] five students in my team. | Hay cinco estudiantes en mi equipo. | There are 5 students in my team
[Are] there any questions? | ¿Hay preguntas?`,
});

TOPIC_DEFS.push({
  key: "a1-pres", level: "A1", legacy: 2, title: "Presente simple", sub: "rutinas, gustos y hechos",
  ficha: {
    clave: ["I/you/we/they **work** · he/she/it **works** (¡la -s!).", "Ortografía: study → **studies**, watch → **watches**, go → **goes**, have → **has**."],
    que: "El **presente simple** sirve para cosas que pasan **siempre o normalmente**: rutinas, hábitos, gustos y verdades generales. La regla más importante: con **he, she, it** el verbo lleva **-s**.",
    usos: ["Rutinas: *I wake up at six.*", "Gustos y opiniones: *I like horror games.*", "Hechos: *Water boils at 100 degrees.*", "Horarios fijos: *The class starts at three.*"],
    forma: [
      { t: "Afirmativa", h: ["Sujeto", "Verbo", "Ejemplo"], r: [["I / you / we / they", "verbo base", "They play online."], ["he / she / it", "verbo + s", "She plays online."]] },
      { t: "La -s de he/she/it", h: ["Termina en", "Regla", "Ejemplo"], r: [["casi todo", "+ s", "work → works"], ["s, sh, ch, x, o", "+ es", "watch → watches, go → goes"], ["consonante + y", "y → ies", "study → studies"], ["have", "irregular", "has"]] },
    ],
    variantes: ["Adverbios de frecuencia van ANTES del verbo: *I **usually** take the bus. She **never** cooks.* Pero DESPUÉS de *to be*: *He is **always** late.*", "Negativas y preguntas usan **do/does** (siguiente tema).", "Pronunciación de la -s: /s/ en *works*, /z/ en *plays*, /iz/ en *watches*."],
    espanol: ["En español cada persona tiene su terminación (trabajo, trabajas, trabaja...). En inglés solo cambia **una**: la de he/she/it.", "El sujeto es obligatorio: *Trabaja aquí* → ***He** works here.*"],
    ejemplos: [["I wake up at six every day.", "Me despierto a las seis todos los días."], ["She works in a tech company.", "Ella trabaja en una empresa de tecnología."], ["My brother studies engineering.", "Mi hermano estudia ingeniería."], ["He always goes to bed late.", "Él siempre se duerme tarde."], ["This app has a lot of bugs.", "Esta app tiene muchos errores."]],
    errores: [["He work in a bank.", "He works in a bank.", "He/she/it + -s."], ["She have a laptop.", "She has a laptop.", "Have → has con he/she/it."], ["I always am late.", "I am always late.", "Con to be, el adverbio va después."], ["He studys a lot.", "He studies a lot.", "Consonante + y → ies."]],
    truco: "**He, she, it, ¡la -s se lleva!** Si el sujeto es una persona o cosa en singular (my mom, the app), también cuenta como he/she/it.",
  },
  s: ``,
});

TOPIC_DEFS.push({
  key: "a1-do", level: "A1", legacy: 3, title: "Preguntas y negaciones", sub: "do, does, don't, doesn't",
  ficha: {
    clave: ["Pregunta: **Do** you...? / **Does** he...? Negativa: I **don't**... / She **doesn't**...", "Después de do/does/don't/doesn't el verbo va **sin -s**: *She doesn't **work***."],
    que: "En presente simple, para preguntar o negar necesitas un **verbo auxiliar**: **do** (I, you, we, they) o **does** (he, she, it). El auxiliar se queda con la -s, así que el verbo principal regresa a su forma base.",
    usos: ["Preguntas de sí/no: ***Do** you play Minecraft?*", "Preguntas con palabra interrogativa: *Where **do** you live? What **does** this mean?*", "Negar: *I **don't** like coffee. He **doesn't** understand.*"],
    forma: [
      { t: "Negativa", h: ["Sujeto", "Auxiliar", "Verbo"], r: [["I / you / we / they", "don't (do not)", "work"], ["he / she / it", "doesn't (does not)", "work"]] },
      { t: "Pregunta", h: ["(Palabra)", "Auxiliar", "Sujeto + verbo"], r: [["—", "Do", "you play?"], ["Where", "does", "she live?"], ["What time", "does", "the class start?"]] },
      { t: "Palabras interrogativas", h: ["Inglés", "Español"], r: [["What", "qué"], ["Where", "dónde"], ["When", "cuándo"], ["Who", "quién"], ["Why", "por qué"], ["How", "cómo"], ["How much / many", "cuánto / cuántos"]] },
    ],
    variantes: ["Con **to be** y **can** NO se usa do: *Are you ready? Can you help?* (no *Do you are...*).", "Respuestas cortas: *Yes, I do. / No, she doesn't.*", "**Why** pregunta, **because** responde: *Why do you study? Because I want a better job.*"],
    espanol: ["En español basta con la entonación: *¿Juegas Minecraft?* En inglés necesitas **do**: *Do you play Minecraft?*", "*No* va antes del verbo en español; en inglés se necesita el auxiliar: *No entiendo* → *I **don't** understand* (no *I no understand*)."],
    ejemplos: [["Do you play Minecraft?", "¿Juegas Minecraft?"], ["She doesn't work on Sundays.", "Ella no trabaja los domingos."], ["Where do you live?", "¿Dónde vives?"], ["What does this word mean?", "¿Qué significa esta palabra?"], ["I don't understand.", "No entiendo."]],
    errores: [["She don't like coffee.", "She doesn't like coffee.", "He/she/it → doesn't."], ["He doesn't plays.", "He doesn't play.", "Después de doesn't, forma base."], ["Where you live?", "Where do you live?", "Falta el auxiliar do."], ["Do you can help me?", "Can you help me?", "Con can no se usa do."]],
    truco: "La **-s** solo aparece una vez: o en el verbo (*she work**s***) o en el auxiliar (*she doe**s**n't work*), nunca en los dos.",
  },
  s: `[Does] your brother play video games? | ¿Tu hermano juega videojuegos?
I [don't] know. | No sé. | I do not know`,
});

TOPIC_DEFS.push({
  key: "a1-prep", level: "A1", title: "Preposiciones de lugar", sub: "in, on, at, under, next to...",
  ficha: {
    clave: ["**in** = dentro (in the box, in Mexico) · **on** = sobre una superficie (on the table) · **at** = en un punto (at the bus stop, at home).", "Otras: **under** (debajo), **next to** (al lado), **between** (entre), **in front of** (enfrente), **behind** (detrás)."],
    que: "Las preposiciones de lugar dicen **dónde** está algo. En español casi todo es *en*; en inglés se divide en **in, on, at** según el tipo de lugar. Esta es una de las cosas que más cuesta, así que aprende las expresiones completas.",
    usos: ["**in**: espacios cerrados, ciudades, países: *in my room, in Puebla, in the car*.", "**on**: superficies, calles, transporte público, pantallas: *on the desk, on Reforma Street, on the bus, on the screen*.", "**at**: puntos o lugares de actividad: *at the bus stop, at school, at work, at home, at the door*."],
    forma: [
      { t: "Expresiones fijas", h: ["Inglés", "Español"], r: [["at home / at work / at school", "en casa / en el trabajo / en la escuela"], ["on the bus / on the train", "en el camión / en el tren"], ["in the car / in a taxi", "en el carro / en un taxi"], ["on the internet / online", "en internet"], ["on the screen / on the phone", "en la pantalla / en el teléfono"], ["in the picture", "en la foto"]] },
      { t: "Posición", h: ["Inglés", "Español"], r: [["under", "debajo de"], ["next to", "al lado de"], ["between", "entre"], ["in front of", "enfrente de"], ["behind", "detrás de"], ["near", "cerca de"], ["across from", "frente a (del otro lado)"]] },
    ],
    variantes: ["**on the bus** (transporte grande donde vas de pie) pero **in the car** (vehículo pequeño).", "**in front of** = enfrente (pegado, delante). **across from** = del otro lado de la calle.", "**near** no lleva *of*: *near the university* (no *near of*)."],
    espanol: ["*En* se traduce de tres formas: *en la caja* (in), *en la mesa* (on), *en la parada* (at).", "*Cerca de* → **near** (sin *of*). *Al lado de* → **next to** (sin *of*)."],
    ejemplos: [["My phone is on the table.", "Mi celular está en la mesa."], ["I'm at the bus stop.", "Estoy en la parada del camión."], ["The charger is in my bag.", "El cargador está en mi mochila."], ["The store is next to the bank.", "La tienda está al lado del banco."], ["I live near the university.", "Vivo cerca de la universidad."]],
    errores: [["I'm in the bus.", "I'm on the bus.", "Transporte público: on."], ["I live near of the park.", "I live near the park.", "Near no lleva of."], ["I'm in home.", "I'm at home.", "Expresión fija: at home."], ["The book is in the table.", "The book is on the table.", "Superficie: on."]],
    truco: "Imagina un triángulo: **in** es lo más grande y cerrado (países, cuartos), **on** es una superficie o línea (mesas, calles), **at** es un punto exacto (una parada, una dirección).",
  },
  s: `My phone is [on] the table. | Mi celular está en la mesa.
I'm [at] the bus stop. | Estoy en la parada del camión. | I am at the bus stop
The charger is [in] my bag. | El cargador está en mi mochila. | The charger is in my backpack
The store is [next to] the bank. | La tienda está al lado del banco.
I live [near] the university. | Vivo cerca de la universidad.
The cat is [under] the bed. | El gato está debajo de la cama.
I'm [on] the bus. | Voy en el camión. | I am on the bus
She is [at] work. | Ella está en el trabajo.
We live [in] Puebla. | Vivimos en Puebla.
The library is [between] the cafeteria and the gym. | La biblioteca está entre la cafetería y el gym.
There is a car [in front of] my house. | Hay un carro enfrente de mi casa.
The answer is [on] the screen. | La respuesta está en la pantalla.
I'm [in] my room. | Estoy en mi cuarto. | I am in my room
The park is [behind] the school. | El parque está detrás de la escuela.
He is [in] the car. | Él está en el carro.
Meet me [at] the entrance. | Nos vemos en la entrada. | See you at the entrance
My keys are [in] my pocket. | Mis llaves están en mi bolsillo.
The bank is [across from] the store. | El banco está frente a la tienda.
I study [at] home. | Estudio en casa.
Your name is [on] the list. | Tu nombre está en la lista.`,
});

TOPIC_DEFS.push({
  key: "a1-cont", level: "A1", legacy: 5, title: "Presente continuo", sub: "lo que pasa ahora",
  ficha: {
    clave: ["**am/is/are + verbo-ing**: *I **am studying**. She **is coding**.*", "Ahora mismo o planes cercanos. Verbos de estado (like, know, want) NO van en -ing."],
    que: "El **presente continuo** describe acciones que están pasando **en este momento** o en este periodo, y también planes ya acordados. Se forma con **to be + verbo con -ing**.",
    usos: ["Ahora mismo: *I'm studying English right now.*", "Situaciones temporales: *I'm living with my cousin this month.*", "Planes ya organizados: *I'm meeting my team tomorrow.*"],
    forma: [
      { t: "Formas", h: ["", "Ejemplo"], r: [["Afirmativa", "She is coding a new app."], ["Negativa", "The computer isn't working."], ["Pregunta", "What are you doing?"]] },
      { t: "Ortografía del -ing", h: ["Caso", "Ejemplo"], r: [["normal", "play → playing"], ["termina en -e", "make → making, code → coding"], ["consonante-vocal-consonante corta", "run → running, sit → sitting, stop → stopping"], ["-ie", "lie → lying, die → dying"]] },
    ],
    variantes: ["Verbos de estado normalmente NO usan -ing: *like, love, want, need, know, understand, believe*: *I **want** a coffee* (no *I'm wanting*).", "Palabras típicas: *now, right now, at the moment, today, this week, currently*.", "Presente simple = siempre; continuo = ahora: *I **play** soccer (en general)* vs *I'**m playing** soccer (ahorita)*."],
    espanol: ["Es como *estar + -ando/-iendo*: *estoy estudiando* = *I am studying*.", "En español *voy caminando* o *ya viene el camión* también se dicen con continuo: *I'm walking, the bus is coming*.", "Nunca olvides **am/is/are**: *I studying* está incompleto."],
    ejemplos: [["I am studying English right now.", "Estoy estudiando inglés ahorita."], ["She is coding a new app.", "Ella está programando una app nueva."], ["What are you doing?", "¿Qué estás haciendo?"], ["The bus is coming.", "Ya viene el camión."], ["I'm meeting my team tomorrow.", "Mañana me reúno con mi equipo."]],
    errores: [["I studying now.", "I am studying now.", "Falta am/is/are."], ["I am study English.", "I am studying English.", "Falta el -ing."], ["I'm wanting a coffee.", "I want a coffee.", "Want es verbo de estado."], ["He is runing.", "He is running.", "Run → running (doble n)."]],
    truco: "Dos piezas siempre: **be** (am/is/are) + **-ing**. Si falta una, la oración está incompleta.",
  },
  s: `I['m] waiting for you. | Te estoy esperando. | I am waiting for you
Why [are] you laughing? | ¿Por qué te ríes?`,
});

TOPIC_DEFS.push({
  key: "a1-can", level: "A1", legacy: 6, title: "Can y could", sub: "poder, saber hacer, pedir",
  ficha: {
    clave: ["**can + verbo base**: *I can swim. She can't come.* No lleva *to* ni *-s*.", "Pregunta: **Can you...?** Más amable: **Could you...?**"],
    que: "**Can** expresa **habilidad** (saber hacer algo), **posibilidad** y **permiso**. Es un verbo modal: no cambia con he/she/it, no lleva *to* después, y no usa *do* en preguntas.",
    usos: ["Habilidad: *He can program in three languages.*", "Permiso: *Can I use your charger?*", "Pedir algo: *Can you help me?* / *Could you repeat that?* (más amable)", "Posibilidad: *We can play tonight.*"],
    forma: [
      { t: "Formas", h: ["", "Ejemplo"], r: [["Afirmativa", "I/she/they can speak English."], ["Negativa", "can't (cannot): She can't come."], ["Pregunta", "Can you help me?"], ["Respuesta corta", "Yes, I can. / No, I can't."]] },
      { t: "Can vs could", h: ["Forma", "Uso"], r: [["can", "presente: puedo, sé"], ["could", "pasado (podía, sabía) o petición amable (podrías)"]] },
    ],
    variantes: ["**cannot** se escribe junto. **can't** es la forma normal al hablar.", "*Saber nadar* = **can swim**; *saber algo (información)* = **know**: *I know the answer*.", "Para futuro o tiempos que can no tiene: **be able to**: *I will be able to help you tomorrow.*"],
    espanol: ["*Puedo, sé hacer, me deja* → **can**.", "En español *¿me pasas la sal?*; en inglés se pide con can/could: *Can you pass the salt?*", "*No te escucho* → *I can't hear you* (con can para percepción: see, hear)."],
    ejemplos: [["I can speak a little English.", "Hablo un poco de inglés."], ["Can you help me with this bug?", "¿Me ayudas con este error?"], ["She can't come today.", "Ella no puede venir hoy."], ["Could you speak more slowly?", "¿Podrías hablar más despacio?"], ["I can't find my keys.", "No encuentro mis llaves."]],
    errores: [["She can to swim.", "She can swim.", "Después de can no va to."], ["He cans play.", "He can play.", "Can no lleva -s."], ["Do you can help me?", "Can you help me?", "Can no usa do."], ["I can to go.", "I can go.", "Sin to."]],
    truco: "**Can** es un verbo flojo: nunca cambia (sin -s, sin to, sin do). El verbo de después también queda en su forma base.",
  },
  s: `[Can] I open the window? | ¿Puedo abrir la ventana?
I [can't] understand this code. | No entiendo este código. | I cannot understand this code
[Could] you send me the file? | ¿Podrías mandarme el archivo? | Could you send me the file
They [can] win the tournament. | Pueden ganar el torneo.`,
});

TOPIC_DEFS.push({
  key: "a1-imp", level: "A1", title: "Imperativos y let's", sub: "dar instrucciones y proponer",
  ficha: {
    clave: ["Imperativo = **verbo base** sin sujeto: *Open the app. Click here.*", "Negativo: **Don't** + verbo: *Don't touch that.* Proponer: **Let's** + verbo: *Let's play.*"],
    que: "El **imperativo** sirve para dar órdenes, instrucciones o consejos. Es la forma más fácil del inglés: el verbo base sin sujeto. **Let's** sirve para proponer algo que hacemos juntos.",
    usos: ["Instrucciones (tutoriales, apps): *Open the settings. Click save.*", "Pedir algo con *please*: *Close the door, please.*", "Advertencias: *Don't forget your password.*", "Propuestas: *Let's study together.*"],
    forma: [
      { t: "Formas", h: ["", "Ejemplo", "Español"], r: [["Afirmativo", "Open the file.", "Abre el archivo."], ["Negativo", "Don't open the file.", "No abras el archivo."], ["Propuesta", "Let's open the file.", "Abramos el archivo."], ["Propuesta negativa", "Let's not wait.", "No esperemos."]] },
    ],
    variantes: ["Para sonar amable agrega **please** al inicio o al final.", "**Let's** = let us. *Let me* = déjame: *Let me see.*", "Instrucciones de software comunes: *click, tap, type, select, scroll down, sign in, log out*."],
    espanol: ["En español el imperativo cambia (abre, abra, abran); en inglés es uno solo: **open**.", "*No toques* → **Don't touch** (no *No touch*).", "*Vamos a jugar* (propuesta) → **Let's play**."],
    ejemplos: [["Open the app and sign in.", "Abre la app e inicia sesión."], ["Don't forget your password.", "No olvides tu contraseña."], ["Let's play together tonight.", "Juguemos juntos esta noche."], ["Please wait a moment.", "Por favor espera un momento."], ["Turn off your phone.", "Apaga tu celular."]],
    errores: [["No touch that.", "Don't touch that.", "Negativo: don't."], ["Let's to go.", "Let's go.", "Después de let's no va to."], ["You open the window.", "Open the window.", "El imperativo no lleva sujeto."]],
    truco: "Piensa en los botones de una app: *Save, Delete, Cancel, Try again*. Todos son imperativos.",
  },
  s: `[Open] the app and sign in. | Abre la app e inicia sesión. | Open the app and log in
[Don't] forget your password. | No olvides tu contraseña. | Do not forget your password
[Let's] play together tonight. | Juguemos juntos esta noche. | Let's play together tonight
Please [wait] a moment. | Por favor espera un momento.
[Turn] off your phone. | Apaga tu celular.
[Click] the blue button. | Da clic en el botón azul.
[Don't] be late. | No llegues tarde. | Do not be late
[Let's] go to the cafeteria. | Vamos a la cafetería.
[Save] the file before you close it. | Guarda el archivo antes de cerrarlo.
[Listen] to me, please. | Escúchame, por favor.
[Don't] touch my keyboard. | No toques mi teclado. | Do not touch my keyboard
[Restart] your computer. | Reinicia tu computadora.
[Take] the bus number 5. | Toma el camión número 5. | Take bus number 5
[Let's] study together. | Estudiemos juntos.
[Type] your name here. | Escribe tu nombre aquí.
[Have] a nice day! | ¡Que tengas buen día!
[Be] careful. | Ten cuidado.
[Don't] worry about it. | No te preocupes. | Do not worry about it`,
});

TOPIC_DEFS.push({
  key: "a1-num", level: "A1", title: "Números, hora y fechas", sub: "precios, horarios y cumpleaños",
  ficha: {
    clave: ["Hora: **It's seven thirty** o **It's half past seven**. *At* + hora: *at 3 o'clock*.", "Fechas: **on** + día (on Monday, on May 5th), **in** + mes/año (in May, in 2026)."],
    que: "Los números aparecen en todo: precios, horarios, fechas y edades. Lo más importante es decir la **hora**, las **fechas** con su preposición y no confundir *thirteen* (13) con *thirty* (30).",
    usos: ["Hora: *What time is it? It's ten fifteen.*", "Horarios: *The class starts at three.*", "Fechas: *My birthday is on June 12th.*", "Precios: *It costs fifty pesos.*"],
    forma: [
      { t: "La hora", h: ["Hora", "Forma fácil", "Forma tradicional"], r: [["7:00", "seven o'clock", "seven o'clock"], ["7:15", "seven fifteen", "a quarter past seven"], ["7:30", "seven thirty", "half past seven"], ["7:45", "seven forty-five", "a quarter to eight"]] },
      { t: "Preposiciones de tiempo", h: ["Prep.", "Con", "Ejemplo"], r: [["at", "horas, noche, fin de semana", "at 5 p.m., at night, at the weekend"], ["on", "días y fechas", "on Monday, on May 5th"], ["in", "meses, años, partes del día", "in May, in 2026, in the morning"]] },
      { t: "Números que se confunden", h: ["Número", "Acento"], r: [["13 thirteen · 30 thirty", "thir-TEEN · THIR-ty"], ["14 fourteen · 40 forty", "four-TEEN · FOR-ty (sin u)"], ["15 fifteen · 50 fifty", "fif-TEEN · FIF-ty"]] },
    ],
    variantes: ["Ordinales para fechas: *1st first, 2nd second, 3rd third, 4th fourth, 21st twenty-first*.", "Años: *2026 = twenty twenty-six*. *1998 = nineteen ninety-eight*.", "Precios: *$150 = a hundred and fifty pesos*. Preguntar: *How much is it?*", "*a.m.* = de la mañana, *p.m.* = de la tarde/noche."],
    espanol: ["En español *el lunes*; en inglés ***on** Monday* (sin artículo).", "*A las tres* → ***at** three*.", "*Son las dos* → ***It's** two* (singular, con it)."],
    ejemplos: [["What time is it?", "¿Qué hora es?"], ["It's half past seven.", "Son las siete y media."], ["My class starts at three.", "Mi clase empieza a las tres."], ["My birthday is in June.", "Mi cumpleaños es en junio."], ["How much is it?", "¿Cuánto cuesta?"]],
    errores: [["Are two o'clock.", "It's two o'clock.", "La hora va con it's."], ["In Monday.", "On Monday.", "Días con on."], ["At June.", "In June.", "Meses con in."], ["The monday.", "On Monday.", "Sin artículo y con mayúscula."]],
    truco: "De lo más grande a lo más chico: **in** (año, mes) → **on** (día, fecha) → **at** (hora exacta).",
  },
  s: `What time [is] it? | ¿Qué hora es?
It's [half] past seven. | Son las siete y media. | It's seven thirty;It is half past seven
My class starts [at] three. | Mi clase empieza a las tres. | My class starts at 3
My birthday is [in] June. | Mi cumpleaños es en junio.
How [much] is it? | ¿Cuánto cuesta? | How much does it cost
I have class [on] Monday. | Tengo clase el lunes.
It's a [quarter] to eight. | Son cuarto para las ocho. | It's seven forty-five
The exam is [on] May fifth. | El examen es el cinco de mayo. | The exam is on May 5th
I was born [in] 2004. | Nací en 2004. | I was born in two thousand four
We meet [at] night. | Nos vemos en la noche.
It costs [fifty] pesos. | Cuesta cincuenta pesos. | It costs 50 pesos
I wake up [at] six thirty. | Me despierto a las seis y media. | I wake up at half past six
It's [ten] o'clock. | Son las diez. | It's 10 o'clock
The store opens [in] the morning. | La tienda abre en la mañana.
There are [thirty] students in my class. | Hay treinta estudiantes en mi clase. | There are 30 students in my class
Today is the [first] of December. | Hoy es primero de diciembre. | Today is December first
I study English [on] weekdays. | Estudio inglés entre semana.`,
});

// Lecturas A1 nuevas
const STORIES_A1 = [
  { id: "s13", level: "A1", title: "My room", lines: [
    ["This is my room.", "Este es mi cuarto."], ["It is small, but I like it.", "Es pequeño, pero me gusta."], ["There is a bed next to the window.", "Hay una cama al lado de la ventana."], ["My desk is in front of the bed.", "Mi escritorio está enfrente de la cama."], ["On my desk there is a laptop and two monitors.", "En mi escritorio hay una laptop y dos monitores."], ["My headphones are always on the chair.", "Mis audífonos siempre están en la silla."], ["There are posters of games on the walls.", "Hay pósters de juegos en las paredes."], ["It's my favorite place in the house.", "Es mi lugar favorito de la casa."],
  ], q: [["Where is the bed?", ["Next to the window", "Under the desk", "In the kitchen"], 0, "Dice: *There is a bed **next to** the window*."], ["How many monitors are there?", ["One", "Two", "Three"], 1, "*a laptop and **two** monitors*."], ["What is on the walls?", ["Photos of his family", "Posters of games", "Nothing"], 1, "*There are **posters of games** on the walls*."]] },
  { id: "s14", level: "A1", title: "Ana's day", lines: [
    ["Ana is 21 years old.", "Ana tiene 21 años."], ["She studies software engineering.", "Ella estudia ingeniería de software."], ["She wakes up at six thirty.", "Se despierta a las seis y media."], ["She doesn't eat breakfast at home.", "No desayuna en casa."], ["She buys a coffee near the university.", "Compra un café cerca de la universidad."], ["Her classes start at eight.", "Sus clases empiezan a las ocho."], ["In the afternoon, she works in a small company.", "En la tarde, trabaja en una empresa pequeña."], ["At night, she plays games with her brother.", "En la noche, juega videojuegos con su hermano."],
  ], q: [["How old is Ana?", ["20", "21", "31"], 1, "*Ana **is 21** years old* (la edad va con to be)."], ["Where does she eat breakfast?", ["At home", "She doesn't eat breakfast", "She buys a coffee near the university"], 2, "No desayuna en casa; compra café cerca de la universidad."], ["What does she do at night?", ["She works", "She plays games", "She studies"], 1, "*At night, she **plays games** with her brother*."]] },
  { id: "s15", level: "A1", title: "A new phone app", lines: [
    ["Download the app.", "Descarga la app."], ["Open it and create an account.", "Ábrela y crea una cuenta."], ["Type your name and your email.", "Escribe tu nombre y tu correo."], ["Choose a password.", "Elige una contraseña."], ["Don't use your birthday as a password!", "¡No uses tu cumpleaños como contraseña!"], ["Click the blue button.", "Da clic en el botón azul."], ["Now you can chat with your friends.", "Ahora puedes chatear con tus amigos."], ["Let's start!", "¡Empecemos!"],
  ], q: [["What do you type?", ["Your name and email", "Your address", "Your phone number"], 0, "*Type your **name** and your **email***."], ["What is a bad password?", ["Your birthday", "A long password", "Numbers and letters"], 0, "*Don't use your **birthday** as a password*."], ["What button do you click?", ["The red one", "The blue one", "The green one"], 1, "*Click the **blue** button*."]] },
  { id: "s16", level: "A1", title: "At the university", lines: [
    ["My university is big.", "Mi universidad es grande."], ["There are four buildings and a big library.", "Hay cuatro edificios y una biblioteca grande."], ["The cafeteria is between the library and the gym.", "La cafetería está entre la biblioteca y el gym."], ["My classes are in building C.", "Mis clases son en el edificio C."], ["My favorite teacher is Mr. Ruiz.", "Mi maestro favorito es el profesor Ruiz."], ["He teaches databases.", "Él enseña bases de datos."], ["His classes are difficult, but interesting.", "Sus clases son difíciles, pero interesantes."], ["I'm happy here.", "Estoy feliz aquí."],
  ], q: [["How many buildings are there?", ["Three", "Four", "Five"], 1, "*There are **four** buildings*."], ["Where is the cafeteria?", ["Next to the library", "Between the library and the gym", "In building C"], 1, "*The cafeteria is **between** the library and the gym*."], ["What does Mr. Ruiz teach?", ["English", "Math", "Databases"], 2, "*He teaches **databases***."]] },
  { id: "s17", level: "A1", title: "The weekend", lines: [
    ["It's Saturday morning.", "Es sábado en la mañana."], ["I'm not at school today.", "Hoy no estoy en la escuela."], ["My mom is cooking chilaquiles.", "Mi mamá está cocinando chilaquiles."], ["My dad is watching soccer on TV.", "Mi papá está viendo futbol en la tele."], ["My little sister is playing with the dog.", "Mi hermanita está jugando con el perro."], ["And me? I'm playing Minecraft with my friends.", "¿Y yo? Estoy jugando Minecraft con mis amigos."], ["We're building a city.", "Estamos construyendo una ciudad."], ["Weekends are the best.", "Los fines de semana son lo mejor."],
  ], q: [["What is his mom doing?", ["Watching TV", "Cooking", "Sleeping"], 1, "*My mom **is cooking** chilaquiles*."], ["Who is playing with the dog?", ["His dad", "His sister", "His friends"], 1, "*My little sister is playing with the dog*."], ["What are they building in Minecraft?", ["A house", "A city", "A castle"], 1, "*We're building **a city***."]] },
  { id: "s18", level: "A1", title: "Can you help me?", lines: [
    ["Carlos: Hi, Luis. Can you help me?", "Carlos: Hola, Luis. ¿Me puedes ayudar?"], ["Luis: Sure. What's the problem?", "Luis: Claro. ¿Cuál es el problema?"], ["Carlos: My code doesn't work.", "Carlos: Mi código no funciona."], ["Luis: Let's see. Oh, there's an error here.", "Luis: A ver. Oh, hay un error aquí."], ["Carlos: Where?", "Carlos: ¿Dónde?"], ["Luis: On line ten. You can't write 'pirnt'. It's 'print'.", "Luis: En la línea diez. No puedes escribir 'pirnt'. Es 'print'."], ["Carlos: Oh no! Thank you!", "Carlos: ¡Oh no! ¡Gracias!"], ["Luis: No problem.", "Luis: De nada."],
  ], q: [["What is Carlos's problem?", ["His laptop is broken", "His code doesn't work", "He can't find Luis"], 1, "*My code **doesn't work***."], ["Where is the error?", ["On line one", "On line ten", "On line twenty"], 1, "*On line **ten***."], ["What was the mistake?", ["A missing comma", "He wrote 'pirnt'", "No internet"], 1, "Escribió *pirnt* en lugar de *print*."]] },
];
