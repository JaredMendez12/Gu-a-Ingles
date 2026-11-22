// Nivel B1 · 12 temas con ficha completa + diálogos.
TOPIC_DEFS.push({
  key: "b1-pp", level: "B1", legacy: 12, title: "Presente perfecto", sub: "experiencias y resultados",
  ficha: {
    clave: ["**have/has + participio**: *I have finished. She has seen it.*", "Experiencias (ever/never), resultados de ahora (already/yet/just). Si dices **cuándo** (yesterday, in 2020) → pasado simple."],
    que: "El **presente perfecto** conecta el pasado con el presente. No importa **cuándo** pasó algo, sino que ya pasó y tiene relación con ahora: una experiencia de vida, un resultado actual o algo que empezó antes y sigue.",
    usos: ["Experiencias: *Have you ever played this game? I've never been to Canada.*", "Resultado presente: *I've lost my keys* (ahora no las tengo).", "Recién: *We have just arrived.*", "Ya / todavía: *I've already eaten. He hasn't fixed it yet.*", "Desde hace: *I've lived here since 2020* (siguiente tema)."],
    forma: [
      { t: "Formas", h: ["", "Ejemplo"], r: [["Afirmativa", "I've (I have) / She's (She has) finished."], ["Negativa", "I haven't / She hasn't finished."], ["Pregunta", "Have you finished? Has she finished?"]] },
      { t: "Palabras clave", h: ["Palabra", "Posición", "Ejemplo"], r: [["ever", "pregunta, antes del participio", "Have you ever...?"], ["never", "antes del participio", "I've never tried it."], ["already", "antes del participio", "I've already done it."], ["yet", "al final, negativa o pregunta", "Have you finished yet?"], ["just", "antes del participio", "She's just left."]] },
    ],
    variantes: ["**been to** (fue y regresó) vs **gone to** (fue y sigue allá): *She's been to Cancún / She's gone to Cancún*.", "En EE. UU. a veces se usa pasado simple con *already/just*: *I already ate.* Ambas se entienden.", "*'s* puede ser *is* o *has*: *She's eaten* = she has eaten."],
    espanol: ["Se parece a *he comido*, pero en México solemos decir *ya comí*. En inglés: *I've already eaten*.", "*Nunca he ido* → *I've never been* (usa *been*, no *gone*).", "Con fecha concreta no se usa: *I went there in 2023* (no *I have gone there in 2023*)."],
    ejemplos: [["Have you ever played this game?", "¿Alguna vez has jugado este juego?"], ["I have never been to Canada.", "Nunca he ido a Canadá."], ["She has finished the project.", "Ya terminó el proyecto."], ["He hasn't fixed the bug yet.", "Todavía no arregla el error."], ["We have just arrived.", "Acabamos de llegar."]],
    errores: [["I have been there last year.", "I was there last year.", "Con fecha: pasado simple."], ["Did you ever play it?", "Have you ever played it?", "Experiencias: present perfect."], ["I have went.", "I have gone.", "Participio, no pasado."]],
    truco: "Pregúntate: *¿digo cuándo?* Si sí → **pasado simple**. Si no importa cuándo, solo que pasó → **presente perfecto**.",
  },
  s: `I've [never] tried sushi. | Nunca he probado el sushi. | I have never tried sushi
She has [just] left. | Ella acaba de irse. | She's just left
Have you finished [yet]? | ¿Ya terminaste?
They have [already] seen the movie. | Ya vieron la película. | They've already seen the movie`,
});

TOPIC_DEFS.push({
  key: "b1-ppc", level: "B1", title: "For, since y perfecto continuo", sub: "desde hace, desde cuándo",
  ficha: {
    clave: ["**for** + duración (*for two years*). **since** + punto de inicio (*since 2020, since Monday*).", "Para algo que empezó antes y sigue: **have been + -ing** (*I've been studying for an hour*) o **have + participio** con verbos de estado (*I've known him for years*)."],
    que: "Cuando algo **empezó en el pasado y sigue hasta hoy**, el inglés no usa el presente (*I live here since...* está mal). Usa el **presente perfecto** o el **presente perfecto continuo**, y la duración con **for** o **since**.",
    usos: ["Acción que sigue: *I've been learning English for two months.*", "Estado que sigue: *I've known her since high school.*", "Preguntar: *How long have you lived here?*", "Actividad reciente con resultado visible: *I'm tired because I've been running.*"],
    forma: [
      { t: "For vs since", h: ["for (duración)", "since (punto de inicio)"], r: [["for two hours", "since 8 o'clock"], ["for three years", "since 2022"], ["for a long time", "since I was a kid"], ["for ages", "since Monday"]] },
      { t: "Perfecto continuo", h: ["", "Ejemplo"], r: [["Afirmativa", "I've been / She's been waiting for an hour."], ["Negativa", "I haven't been sleeping well."], ["Pregunta", "How long have you been studying?"]] },
    ],
    variantes: ["Verbos de estado (*know, be, have* = poseer, *like*) no van en continuo: *I've known him for years* (no *been knowing*).", "*Live* y *work* aceptan las dos: *I've lived / I've been living here for 5 years*.", "*It's been two years since...* = han pasado dos años desde..."],
    espanol: ["*Vivo aquí desde 2020* → *I **have lived** here **since** 2020* (no *I live*).", "*Llevo una hora esperando* → *I've been waiting for an hour*.", "*¿Cuánto tiempo llevas...?* → *How long have you been...?*"],
    ejemplos: [["I have lived here since 2020.", "Vivo aquí desde 2020."], ["We have known each other for five years.", "Nos conocemos desde hace cinco años."], ["I have been studying English for two months.", "Llevo dos meses estudiando inglés."], ["How long have you been waiting?", "¿Cuánto llevas esperando?"], ["It's been a long time since we talked.", "Ha pasado mucho desde que hablamos."]],
    errores: [["I live here since 2020.", "I've lived here since 2020.", "Sigue hasta hoy: perfecto."], ["since two years", "for two years", "Duración: for."], ["I've been knowing him.", "I've known him.", "Know no va en continuo."]],
    truco: "**for** = cuánto dura (una cantidad). **since** = desde cuándo (una fecha o momento).",
  },
  s: `I have lived here [since] 2020. | Vivo aquí desde 2020.
We have known each other [for] five years. | Nos conocemos desde hace cinco años. | We've known each other for 5 years
I have been [studying] English for two months. | Llevo dos meses estudiando inglés. | I've been studying English for two months
How long have you been [waiting]? | ¿Cuánto llevas esperando?
She's been working here [since] March. | Trabaja aquí desde marzo.
I've been playing this game [for] hours. | Llevo horas jugando este juego.
How [long] have you known her? | ¿Desde cuándo la conoces?
It's been raining [since] morning. | Ha estado lloviendo desde la mañana.
They [have] been friends since kindergarten. | Son amigos desde el kínder.
I haven't seen him [for] a long time. | No lo he visto en mucho tiempo.
We've [been] waiting for the bus for twenty minutes. | Llevamos veinte minutos esperando el camión.
He's had that laptop [since] 2019. | Tiene esa laptop desde 2019.
I've been [learning] to code for a year. | Llevo un año aprendiendo a programar.
How long [have] you studied at UVP? | ¿Cuánto tiempo llevas estudiando en la UVP?
It's been two years [since] I started. | Han pasado dos años desde que empecé.`,
});

TOPIC_DEFS.push({
  key: "b1-pcont", level: "B1", title: "Pasado continuo", sub: "estaba haciendo algo cuando...",
  ficha: {
    clave: ["**was/were + -ing**: *I was studying.* Acción en progreso en el pasado.", "Con **when** + pasado simple para una interrupción: *I was coding **when** the power went out.*"],
    que: "El **pasado continuo** describe lo que **estaba pasando** en un momento del pasado. Se usa mucho para el fondo de una historia y para una acción larga interrumpida por otra corta.",
    usos: ["Acción en progreso a una hora: *At 9 p.m. I was playing.*", "Interrupción: *I was taking a shower when you called.*", "Dos acciones al mismo tiempo: *While I was cooking, she was studying.*", "Ambiente de una historia: *It was raining and everyone was waiting.*"],
    forma: [
      { t: "Formas", h: ["", "Ejemplo"], r: [["Afirmativa", "I/he was working · we/they were working"], ["Negativa", "She wasn't listening."], ["Pregunta", "What were you doing?"]] },
      { t: "When vs while", h: ["Palabra", "Uso", "Ejemplo"], r: [["when", "+ acción corta (pasado simple)", "I was sleeping when the alarm rang."], ["while", "+ acción larga (pasado continuo)", "While I was sleeping, the alarm rang."]] },
    ],
    variantes: ["Verbos de estado no van en continuo: *I knew* (no *I was knowing*).", "*Was going to* = iba a: *I was going to call you, but...*", "Pasado simple para acciones seguidas: *I got up, had breakfast and left.*"],
    espanol: ["Es como *estaba + -ando*: *estaba jugando* = *I was playing*.", "El imperfecto *jugaba* (hábito) NO es pasado continuo: *I used to play* o *I played*."],
    ejemplos: [["I was studying when you called.", "Estaba estudiando cuando llamaste."], ["What were you doing at ten?", "¿Qué estabas haciendo a las diez?"], ["While I was cooking, she was coding.", "Mientras yo cocinaba, ella programaba."], ["It was raining all day.", "Estuvo lloviendo todo el día."], ["The app crashed while I was saving.", "La app tronó mientras guardaba."]],
    errores: [["I was study when...", "I was studying when...", "Falta -ing."], ["When I was child I was playing a lot.", "When I was a child I played a lot.", "Hábito: pasado simple o used to."], ["They was waiting.", "They were waiting.", "They → were."]],
    truco: "Imagina una película: el **pasado continuo** es la escena de fondo (larga); el **pasado simple** es lo que de repente pasa (corto).",
  },
  s: `I [was] studying when you called. | Estaba estudiando cuando llamaste.
What [were] you doing at ten? | ¿Qué estabas haciendo a las diez?
While I was [cooking], she was coding. | Mientras yo cocinaba, ella programaba.
It was [raining] all day. | Estuvo lloviendo todo el día.
The app crashed [while] I was saving. | La app tronó mientras guardaba.
We were [playing] when the power went out. | Estábamos jugando cuando se fue la luz.
She [wasn't] listening to the teacher. | No estaba escuchando al maestro. | She was not listening to the teacher
I was walking home [when] I saw an accident. | Iba caminando a casa cuando vi un accidente.
They [were] talking about the exam. | Estaban hablando del examen.
I [was] going to call you, but I forgot. | Te iba a llamar, pero se me olvidó.
Were you [sleeping]? | ¿Estabas dormido?
My phone rang [while] I was driving. | Mi celular sonó mientras manejaba.
He was [working] at eight last night. | Estaba trabajando a las ocho anoche.
Everybody [was] waiting for the results. | Todos estaban esperando los resultados.
[What] were you thinking? | ¿En qué estabas pensando?`,
});

TOPIC_DEFS.push({
  key: "b1-usedto", level: "B1", title: "Used to", sub: "lo que hacías antes",
  ficha: {
    clave: ["**used to + verbo** = solía, antes hacía: *I used to play soccer.*", "Negativa/pregunta: **didn't use to / Did you use to...?** (sin -d)."],
    que: "**Used to** habla de hábitos o estados del pasado que **ya no** son así. Es la mejor traducción del imperfecto *antes jugaba, vivía, era*.",
    usos: ["Hábito antiguo: *I used to play Minecraft every day.*", "Estado antiguo: *She used to live in Puebla.*", "Contraste con ahora: *I didn't use to like coffee, but now I love it.*"],
    forma: [
      { t: "Formas", h: ["", "Ejemplo"], r: [["Afirmativa", "I used to + verbo"], ["Negativa", "I didn't use to + verbo"], ["Pregunta", "Did you use to + verbo?"]] },
      { t: "No confundir", h: ["Expresión", "Significa", "Ejemplo"], r: [["used to + verbo", "solía", "I used to study at night."], ["be used to + -ing", "estar acostumbrado", "I'm used to studying at night."], ["get used to + -ing", "acostumbrarse", "I'm getting used to waking up early."]] },
    ],
    variantes: ["Solo existe en pasado: para el presente usa *usually*.", "*Would* también sirve para hábitos pasados en historias: *Every summer we would go to the beach.*", "Pronunciación: *used to* suena /yústa/."],
    espanol: ["*Antes jugaba* / *jugaba mucho de niño* → *I used to play*.", "*Estoy acostumbrado* → *I'm used to + -ing* (no *I use to*)."],
    ejemplos: [["I used to play soccer.", "Antes jugaba futbol."], ["She didn't use to like coffee.", "Antes no le gustaba el café."], ["Did you use to live here?", "¿Vivías aquí antes?"], ["I'm used to working at night.", "Estoy acostumbrado a trabajar de noche."], ["You'll get used to it.", "Te vas a acostumbrar."]],
    errores: [["I use to play.", "I used to play.", "En pasado: used."], ["I didn't used to.", "I didn't use to.", "Con did: use."], ["I'm used to wake up early.", "I'm used to waking up early.", "Be used to + -ing."]],
    truco: "**used to** = ya no. Si todavía lo haces, no es *used to*: *I usually play*.",
  },
  s: `I [used] to play soccer. | Antes jugaba futbol.
She didn't [use] to like coffee. | Antes no le gustaba el café.
Did you use [to] live here? | ¿Vivías aquí antes?
I'm used to [working] at night. | Estoy acostumbrado a trabajar de noche.
You'll get [used] to it. | Te vas a acostumbrar.
We used to [play] video games all night. | Antes jugábamos videojuegos toda la noche.
There [used] to be a park here. | Antes había un parque aquí.
I [didn't] use to study much. | Antes no estudiaba mucho. | I did not use to study much
He used to [be] very shy. | Antes era muy tímido.
I'm not used to [speaking] English. | No estoy acostumbrado a hablar inglés.
I'm getting used to [waking] up early. | Me estoy acostumbrando a levantarme temprano.
My dad used to [work] in a factory. | Mi papá trabajaba en una fábrica.
Where did you use to [go] on vacation? | ¿A dónde ibas de vacaciones?
I used to [have] a dog. | Antes tenía un perro.
It took me a month to get [used] to it. | Me tomó un mes acostumbrarme.`,
});

TOPIC_DEFS.push({
  key: "b1-cond1", level: "B1", title: "Primer condicional", sub: "si pasa esto, pasará aquello",
  ficha: {
    clave: ["**If + presente, will + verbo**: *If it rains, I'll stay home.*", "Después de **if** NO va *will*: *If I **have** time* (no *If I will have*)."],
    que: "El **primer condicional** habla de situaciones **reales o probables** en el futuro y su consecuencia. Es el que más usarás para planes, advertencias y promesas.",
    usos: ["Planes con condición: *If I finish early, I'll call you.*", "Advertencias: *If you don't save, you'll lose your work.*", "Promesas: *If you help me, I'll buy you a coffee.*", "Con *unless* (a menos que): *I won't go unless you come.*"],
    forma: [
      { t: "Estructura", h: ["Condición", "Resultado"], r: [["If + presente simple", "will / won't + verbo"], ["If it rains,", "I'll stay home."], ["If you don't study,", "you won't pass."]] },
      { t: "Variantes del resultado", h: ["Forma", "Ejemplo"], r: [["can / might", "If you're free, we can play."], ["imperativo", "If you see him, tell him."], ["presente (siempre)", "If you heat ice, it melts. (condicional cero)"]] },
    ],
    variantes: ["El orden puede invertirse sin coma: *I'll stay home if it rains.*", "**When** = cuando sea seguro: *When I finish, I'll call you.*", "**Unless** = if not: *Unless you hurry, you'll miss the bus.*"],
    espanol: ["*Si llueve, me quedo* → *If it **rains**, I'**ll** stay* (presente + will).", "En español usamos presente después de *si*; en inglés también: nunca *if it will rain*.", "*Cuando llegue, te aviso* → *When I **get** there, I'll let you know*."],
    ejemplos: [["If it rains, I'll stay home.", "Si llueve, me quedo en casa."], ["If you don't save, you'll lose your work.", "Si no guardas, vas a perder tu trabajo."], ["If I have time, I'll help you.", "Si tengo tiempo, te ayudo."], ["I won't go unless you come.", "No voy a menos que vengas."], ["When I finish, I'll call you.", "Cuando termine, te llamo."]],
    errores: [["If it will rain, I'll stay.", "If it rains, I'll stay.", "Sin will después de if."], ["If I will have time...", "If I have time...", "Presente después de if."], ["When I will finish...", "When I finish...", "Igual con when."]],
    truco: "**If** y **will** no se sientan juntos: will va en la otra mitad de la oración.",
  },
  s: `If it [rains], I'll stay home. | Si llueve, me quedo en casa.
If you don't save, you['ll] lose your work. | Si no guardas, vas a perder tu trabajo. | If you don't save, you will lose your work
If I [have] time, I'll help you. | Si tengo tiempo, te ayudo.
I won't go [unless] you come. | No voy a menos que vengas.
When I [finish], I'll call you. | Cuando termine, te llamo.
If you [study], you'll pass. | Si estudias, vas a aprobar.
If the server [crashes], we'll lose everything. | Si el servidor truena, vamos a perder todo.
What will you do if you [don't] get the job? | ¿Qué vas a hacer si no te dan el trabajo?
If you see Ana, [tell] her to call me. | Si ves a Ana, dile que me llame.
If we leave now, we [will] catch the bus. | Si salimos ahorita, alcanzamos el camión. | If we leave now, we'll catch the bus
I'll buy it if it [is] cheap. | Lo compro si está barato.
If you're free tonight, we [can] play. | Si estás libre en la noche, podemos jugar.
If you heat water, it [boils]. | Si calientas agua, hierve.
She'll be angry if you [forget]. | Se va a enojar si se te olvida.
If I [pass] the exam, I'll celebrate. | Si apruebo el examen, voy a celebrar.`,
});

TOPIC_DEFS.push({
  key: "b1-cond2", level: "B1", title: "Segundo condicional", sub: "si tuviera, haría...",
  ficha: {
    clave: ["**If + pasado, would + verbo**: *If I had money, I would buy a PC.* (situación imaginaria)", "Con *to be* se usa **were** para todos: *If I were you, I'd study.*"],
    que: "El **segundo condicional** habla de situaciones **imaginarias, improbables o irreales** en el presente o futuro. Aunque usa pasado, no habla del pasado: es como *si tuviera... haría*.",
    usos: ["Imaginar: *If I won the lottery, I'd travel the world.*", "Consejos: *If I were you, I'd talk to the teacher.*", "Situación irreal ahora: *If I had a car, I wouldn't take the bus.*", "Preguntas hipotéticas: *What would you do if...?*"],
    forma: [
      { t: "Estructura", h: ["Condición", "Resultado"], r: [["If + pasado simple", "would / wouldn't + verbo"], ["If I had time,", "I would learn guitar."], ["If I were rich,", "I'd buy a house."]] },
      { t: "Primero vs segundo", h: ["", "Ejemplo", "Idea"], r: [["1º", "If I have time, I'll help you.", "es posible"], ["2º", "If I had time, I'd help you.", "no tengo tiempo (imaginario)"]] },
    ],
    variantes: ["*'d* = would: *I'd go*.", "*could / might* en lugar de would: *If I had a car, I could drive you.*", "*If I was you* se oye en conversación, pero *If I were you* es lo correcto."],
    espanol: ["*Si tuviera dinero, compraría...* → *If I **had** money, I **would** buy...* (pasado + would).", "*Yo que tú...* → *If I were you...*", "Después de *if* no va *would*: *If I would have* está mal."],
    ejemplos: [["If I had money, I would buy a new PC.", "Si tuviera dinero, compraría una PC nueva."], ["If I were you, I'd talk to the teacher.", "Yo que tú, hablaría con el maestro."], ["What would you do if you won?", "¿Qué harías si ganaras?"], ["If I lived closer, I wouldn't take the bus.", "Si viviera más cerca, no tomaría el camión."], ["If she knew, she would tell us.", "Si supiera, nos diría."]],
    errores: [["If I would have money...", "If I had money...", "Sin would después de if."], ["If I was you...", "If I were you...", "Were con todos."], ["If I had time, I will help.", "If I had time, I would help.", "2º condicional: would."]],
    truco: "Si es **sueño o imaginación** → pasado + **would**. Si es **posible** → presente + **will**.",
  },
  s: `If I [had] money, I would buy a new PC. | Si tuviera dinero, compraría una PC nueva.
If I [were] you, I'd talk to the teacher. | Yo que tú, hablaría con el maestro. | If I were you, I would talk to the teacher
What [would] you do if you won? | ¿Qué harías si ganaras?
If I lived closer, I [wouldn't] take the bus. | Si viviera más cerca, no tomaría el camión. | If I lived closer, I would not take the bus
If she [knew], she would tell us. | Si supiera, nos diría.
If I could fly, I [would] go to Japan. | Si pudiera volar, iría a Japón.
If I [spoke] English fluently, I'd work abroad. | Si hablara inglés con fluidez, trabajaría en el extranjero.
I would help you if I [had] time. | Te ayudaría si tuviera tiempo.
If we [didn't] have homework, we'd go out. | Si no tuviéramos tarea, saldríamos.
If it [were] cheaper, I'd buy it. | Si fuera más barato, lo compraría.
Would you [quit] if they paid you more somewhere else? | ¿Renunciarías si te pagaran más en otro lado?
If I [knew] the answer, I'd tell you. | Si supiera la respuesta, te diría.
If I had a car, I [could] drive you home. | Si tuviera carro, te podría llevar a tu casa.
If you [studied] more, you'd get better grades. | Si estudiaras más, sacarías mejores calificaciones.
What would you [do] if you lost your phone? | ¿Qué harías si perdieras tu celular?`,
});

TOPIC_DEFS.push({
  key: "b1-passive", level: "B1", title: "Voz pasiva", sub: "se hace, fue hecho",
  ficha: {
    clave: ["**be + participio**: *English **is spoken** here. The app **was created** in 2020.*", "Quién lo hizo, con **by**: *The game was made **by** a small team.*"],
    que: "La **voz pasiva** pone el foco en **lo que recibe la acción**, no en quién la hace. Es muy común en textos técnicos, noticias y documentación. En español solemos usar *se* (*se habla inglés*).",
    usos: ["Cuando no importa quién lo hizo: *The server was updated last night.*", "Procesos y documentación: *The data is stored in the cloud.*", "Noticias: *Two people were arrested.*", "Con *by* si sí importa: *Minecraft was created by Notch.*"],
    forma: [
      { t: "Por tiempo", h: ["Tiempo", "Pasiva", "Ejemplo"], r: [["Presente", "is / are + participio", "The files are saved automatically."], ["Pasado", "was / were + participio", "The bug was fixed yesterday."], ["Futuro", "will be + participio", "The results will be published."], ["Presente perfecto", "has / have been + participio", "Your account has been blocked."], ["Modal", "can / must be + participio", "It can be done."]] },
    ],
    variantes: ["*It is said that...* = se dice que...", "*To be born* es pasiva: *I was born in 2004*.", "*Get* + participio en conversación: *He got fired. My phone got stolen.*"],
    espanol: ["*Se habla inglés* → *English is spoken*.", "*Fue creado por...* → *was created by...*", "*Nací en* → *I **was** born in* (no *I born*)."],
    ejemplos: [["English is spoken all over the world.", "Se habla inglés en todo el mundo."], ["The bug was fixed yesterday.", "El error se arregló ayer."], ["Minecraft was created by Markus Persson.", "Minecraft fue creado por Markus Persson."], ["Your password has been changed.", "Tu contraseña ha sido cambiada."], ["The results will be published on Monday.", "Los resultados se publicarán el lunes."]],
    errores: [["I born in 2004.", "I was born in 2004.", "Pasiva: was born."], ["The app was create...", "The app was created...", "Participio."], ["It was made for a small team.", "It was made by a small team.", "Autor: by."]],
    truco: "Si en español usarías **se** + verbo o **fue + -ado**, prueba la pasiva: **be + participio**.",
  },
  s: `English [is] spoken all over the world. | Se habla inglés en todo el mundo.
The bug was [fixed] yesterday. | El error se arregló ayer.
Minecraft was created [by] Markus Persson. | Minecraft fue creado por Markus Persson.
Your password has [been] changed. | Tu contraseña ha sido cambiada.
The results will be [published] on Monday. | Los resultados se publicarán el lunes.
I [was] born in 2004. | Nací en 2004.
The data is [stored] in the cloud. | Los datos se guardan en la nube.
This game was [made] by a small team. | Este juego fue hecho por un equipo pequeño.
The files [are] saved automatically. | Los archivos se guardan automáticamente.
My phone got [stolen]. | Me robaron el celular.
The meeting was [canceled]. | La junta se canceló. | The meeting was cancelled
It can [be] done in one day. | Se puede hacer en un día.
The new version [will] be released next week. | La nueva versión saldrá la próxima semana.
Were you [invited] to the party? | ¿Te invitaron a la fiesta?
All the tickets have been [sold]. | Se vendieron todos los boletos.`,
});

TOPIC_DEFS.push({
  key: "b1-rel", level: "B1", title: "Oraciones de relativo", sub: "who, which, that, where, whose",
  ficha: {
    clave: ["**who** = personas, **which** = cosas, **that** = personas o cosas, **where** = lugares, **whose** = de quien.", "Si el relativo es objeto, se puede omitir: *The game (that) I bought.*"],
    que: "Los **relativos** unen dos ideas en una oración y dan información sobre una persona, cosa o lugar: *el juego **que** compré*, *la chica **que** ganó*.",
    usos: ["Personas: *The girl who won the prize is my cousin.*", "Cosas: *This is the phone that/which I bought.*", "Lugares: *That's the restaurant where we had dinner.*", "Posesión: *He's the man whose car was stolen.*"],
    forma: [
      { t: "Relativos", h: ["Relativo", "Para", "Ejemplo"], r: [["who", "personas", "the teacher who helped me"], ["which", "cosas", "the app which I use"], ["that", "personas y cosas (informal)", "the game that I like"], ["where", "lugares", "the city where I live"], ["whose", "posesión", "the student whose laptop broke"], ["when", "tiempo", "the day when we met"]] },
    ],
    variantes: ["Omitir el relativo cuando es objeto: *The book (that) you lent me*. No se omite si es sujeto: *The man **who** called*.", "Con comas (información extra) no se usa *that*: *My laptop, which is old, still works.*", "*What* = lo que (no es relativo de un sustantivo): *I don't know what you mean.*"],
    espanol: ["En español todo es *que*; en inglés eliges **who / which / that**.", "*El chico cuyo...* → *the boy **whose**...*", "*Lo que quiero* → ***what** I want* (no *that I want* solo)."],
    ejemplos: [["The girl who won the prize is my cousin.", "La chica que ganó el premio es mi prima."], ["This is the phone that I bought online.", "Este es el celular que compré en línea."], ["That's the restaurant where we had dinner.", "Ese es el restaurante donde cenamos."], ["He's the man whose car was stolen.", "Es el señor al que le robaron el carro."], ["I don't know what you mean.", "No sé lo que quieres decir."]],
    errores: [["The man which called...", "The man who called...", "Personas: who."], ["The city where I live in.", "The city where I live.", "Sin in con where."], ["I don't know that you want.", "I don't know what you want.", "Lo que = what."]],
    truco: "¿Persona? **who**. ¿Cosa? **which**. ¿No estás seguro? **that** funciona con las dos (sin comas).",
  },
  s: `The girl [who] won the prize is my cousin. | La chica que ganó el premio es mi prima.
This is the phone [that] I bought online. | Este es el celular que compré en línea. | This is the phone which I bought online
That's the restaurant [where] we had dinner. | Ese es el restaurante donde cenamos.
He's the man [whose] car was stolen. | Es el señor al que le robaron el carro.
I don't know [what] you mean. | No sé lo que quieres decir.
The teacher [who] helped me is very kind. | El maestro que me ayudó es muy amable.
The game [which] I play the most is Minecraft. | El juego que más juego es Minecraft. | The game that I play the most is Minecraft
Do you remember the day [when] we met? | ¿Recuerdas el día que nos conocimos?
This is the city [where] I was born. | Esta es la ciudad donde nací.
I have a friend [who] speaks four languages. | Tengo un amigo que habla cuatro idiomas.
The student [whose] laptop broke is Carlos. | El estudiante al que se le rompió la laptop es Carlos.
The app [that] you recommended is great. | La app que recomendaste está buenísima.
My laptop, [which] is very old, still works. | Mi laptop, que es muy vieja, todavía funciona.
That's [what] I want. | Eso es lo que quiero.
The people [who] work here are friendly. | La gente que trabaja aquí es amable.`,
});

TOPIC_DEFS.push({
  key: "b1-gerinf", level: "B1", title: "Gerundio o infinitivo", sub: "-ing o to + verbo",
  ficha: {
    clave: ["Después de **preposición** siempre **-ing**: *interested in learning, good at coding, before leaving*.", "Como sujeto, **-ing**: *Learning English is fun*. Para expresar propósito (*para*), **to**: *I study **to** get a better job*."],
    que: "Cuando un verbo va después de otra palabra, puede ir en **-ing** (gerundio) o **to + verbo** (infinitivo). Algunas reglas te resuelven la mayoría de casos; el resto depende del verbo anterior.",
    usos: ["Después de preposiciones: *Thanks for helping. I'm tired of waiting.*", "Como sujeto: *Coding is my passion.*", "Propósito: *I came here to learn.*", "Después de adjetivos: *It's easy to use. I'm happy to help.*"],
    forma: [
      { t: "Reglas", h: ["Después de...", "Forma", "Ejemplo"], r: [["preposición (in, at, of, for, about, before, after)", "-ing", "before leaving, good at drawing"], ["sujeto de la oración", "-ing", "Swimming is good exercise."], ["propósito (para)", "to", "I saved money to buy a PC."], ["adjetivo", "to", "It's hard to explain."], ["enjoy, avoid, finish, mind, keep, suggest", "-ing", "I keep forgetting."], ["want, need, decide, hope, plan, learn, promise", "to", "I promise to call."]] },
      { t: "Cambian el significado", h: ["Verbo", "+ -ing", "+ to"], r: [["stop", "dejar de: stop smoking", "pararse para: stop to buy water"], ["remember", "recordar algo pasado: I remember meeting her", "acordarse de hacer: remember to call"], ["try", "probar: try restarting it", "intentar: try to sleep"]] },
    ],
    variantes: ["*Look forward to* + -ing: *I look forward to hearing from you* (aquí *to* es preposición).", "*Used to* (solía) + verbo, pero *be used to* + -ing.", "*Like/love/hate* aceptan ambos con poca diferencia."],
    espanol: ["*Para* + verbo → ***to*** + verbo: *para aprender = to learn* (no *for learn*).", "*Antes de salir* → *before **leaving*** (no *before to leave*).", "*Gracias por ayudar* → *Thanks for **helping***."],
    ejemplos: [["I'm interested in learning Japanese.", "Me interesa aprender japonés."], ["Learning English is fun.", "Aprender inglés es divertido."], ["I study to get a better job.", "Estudio para conseguir un mejor trabajo."], ["Thanks for helping me.", "Gracias por ayudarme."], ["Remember to save your work.", "Acuérdate de guardar tu trabajo."], ["I look forward to hearing from you.", "Quedo a la espera de tu respuesta."]],
    errores: [["I study for get a job.", "I study to get a job.", "Propósito: to."], ["Before to leave...", "Before leaving...", "Después de preposición: -ing."], ["I'm good at draw.", "I'm good at drawing.", "Preposición + -ing."]],
    truco: "Si antes hay una **preposición** → **-ing** siempre. Si en español dirías **para** → **to**.",
  },
  s: `I'm interested in [learning] Japanese. | Me interesa aprender japonés.
[Learning] English is fun. | Aprender inglés es divertido.
I study [to] get a better job. | Estudio para conseguir un mejor trabajo.
Thanks for [helping] me. | Gracias por ayudarme.
Remember [to] save your work. | Acuérdate de guardar tu trabajo.
I look forward to [hearing] from you. | Quedo a la espera de tu respuesta.
Before [leaving], turn off the lights. | Antes de salir, apaga las luces.
It's hard [to] explain. | Es difícil de explicar.
I keep [forgetting] my password. | Se me sigue olvidando mi contraseña.
I stopped [playing] that game. | Dejé de jugar ese juego.
Try [restarting] your computer. | Intenta reiniciar tu computadora.
I'm tired of [waiting]. | Estoy cansado de esperar.
She went to the store [to] buy snacks. | Fue a la tienda a comprar botanas.
He's good at [solving] problems. | Es bueno resolviendo problemas.
I promise [to] call you. | Te prometo que te llamo.`,
});

TOPIC_DEFS.push({
  key: "b1-phrasal", level: "B1", title: "Phrasal verbs esenciales", sub: "turn on, give up, find out...",
  ficha: {
    clave: ["**Phrasal verb** = verbo + partícula (up, out, on, off...) con un significado nuevo: *give up* = rendirse.", "Si llevan objeto y son separables: *turn **it** on* (el pronombre va en medio)."],
    que: "Los **phrasal verbs** son muy comunes en el inglés hablado. El significado no siempre se deduce de sus partes, así que conviene aprenderlos con ejemplos y por temas.",
    usos: ["Tecnología: *turn on/off, log in/out, sign up, set up, back up*.", "Día a día: *wake up, get up, look for, find out, run out of*.", "Relaciones: *get along with, hang out, break up*.", "Decisiones: *give up, figure out, come up with*."],
    forma: [
      { t: "Los más útiles", h: ["Phrasal", "Significado", "Ejemplo"], r: [["turn on / off", "prender / apagar", "Turn off your phone."], ["log in / out", "iniciar / cerrar sesión", "Log in with your email."], ["sign up", "registrarse", "Sign up for free."], ["set up", "configurar, instalar", "I set up the server."], ["give up", "rendirse, dejar", "Don't give up!"], ["find out", "averiguar, enterarse", "I found out the truth."], ["figure out", "descifrar, entender", "I can't figure out this bug."], ["run out of", "quedarse sin", "We ran out of coffee."], ["look for", "buscar", "I'm looking for a job."], ["look up", "buscar (información)", "Look it up online."], ["get along with", "llevarse bien", "I get along with my team."], ["hang out", "pasar el rato", "Let's hang out."], ["come up with", "ocurrírsele", "She came up with an idea."], ["pick up", "recoger", "I'll pick you up at 8."]] },
    ],
    variantes: ["Separables: *turn the TV on* = *turn on the TV*; con pronombre siempre en medio: *turn **it** on* (no *turn on it*).", "Inseparables: *look for, get along with, run out of*: *look for **it***.", "En textos formales hay sinónimos: *find out = discover, give up = quit*."],
    espanol: ["No traduzcas parte por parte: *give up* no es *dar arriba*.", "*Prender la luz* → *turn on the light* (no *light on*)."],
    ejemplos: [["Turn off your phone, please.", "Apaga tu celular, por favor."], ["I can't figure out this bug.", "No le encuentro la solución a este error."], ["We ran out of coffee.", "Se nos acabó el café."], ["Don't give up!", "¡No te rindas!"], ["I get along with my classmates.", "Me llevo bien con mis compañeros."], ["She came up with a great idea.", "Se le ocurrió una gran idea."]],
    errores: [["Turn on it.", "Turn it on.", "Pronombre en medio."], ["I'm looking it for.", "I'm looking for it.", "Look for es inseparable."], ["We ran out coffee.", "We ran out of coffee.", "Run out of."]],
    truco: "Aprende 3 phrasal verbs por semana y úsalos hoy mismo en una oración sobre tu vida.",
  },
  s: `Turn [off] your phone, please. | Apaga tu celular, por favor.
I can't figure [out] this bug. | No le encuentro la solución a este error.
We ran [out] of coffee. | Se nos acabó el café.
Don't give [up]! | ¡No te rindas!
I get [along] with my classmates. | Me llevo bien con mis compañeros.
She came [up] with a great idea. | Se le ocurrió una gran idea.
Log [in] with your email. | Inicia sesión con tu correo.
I set [up] the new router. | Configuré el router nuevo.
I found [out] the truth. | Me enteré de la verdad.
Let's hang [out] this weekend. | Salgamos este fin de semana.
Look it [up] online. | Búscalo en internet.
I'll pick you [up] at eight. | Paso por ti a las ocho.
Sign [up] for free. | Regístrate gratis.
Turn it [on]. | Préndelo.
I'm looking [for] a new job. | Estoy buscando un trabajo nuevo.`,
});

TOPIC_DEFS.push({
  key: "b1-modals", level: "B1", title: "Posibilidad: might, may, could, must", sub: "quizás, seguramente, no puede ser",
  ficha: {
    clave: ["**might / may / could** = quizás (posible). **must** = seguro que sí (deducción). **can't** = seguro que no.", "*It **might** rain. He **must** be tired. That **can't** be true.*"],
    que: "Los modales también sirven para expresar **qué tan seguro** estás de algo. Es muy útil para dar opiniones sin sonar demasiado directo.",
    usos: ["Posibilidad: *I might go to the party.*", "Permiso formal: *May I come in?*", "Deducción positiva: *You've been working all day. You must be tired.*", "Deducción negativa: *That can't be Ana; she's in Canada.*"],
    forma: [
      { t: "Escala de certeza", h: ["Modal", "Seguridad", "Ejemplo"], r: [["must", "95% sí", "She must be at home."], ["may / might / could", "30–60%", "She might be at home."], ["might not / may not", "posiblemente no", "She might not come."], ["can't", "95% no", "She can't be at home; I just saw her."]] },
    ],
    variantes: ["*Maybe* (adverbio) + presente/futuro: *Maybe I'll go* = *I might go*.", "*Couldn't* también es deducción negativa: *It couldn't be him.*", "En pasado: *might have / must have + participio* (tema B2)."],
    espanol: ["*Quizás vaya* → *I might go* o *Maybe I'll go*.", "*Debe estar cansado* (deducción) → *He **must** be tired*.", "*No puede ser* → *It **can't** be*."],
    ejemplos: [["I might go to the party.", "Puede que vaya a la fiesta."], ["You must be tired.", "Debes estar cansado."], ["That can't be true.", "Eso no puede ser cierto."], ["It may rain later.", "Puede que llueva más tarde."], ["She might not come.", "Puede que no venga."]],
    errores: [["I might to go.", "I might go.", "Modal sin to."], ["He musts be tired.", "He must be tired.", "Modal sin -s."], ["It mustn't be true. (deducción)", "It can't be true.", "Deducción negativa: can't."]],
    truco: "Piensa en un termómetro: **must** (casi seguro) → **might** (puede ser) → **can't** (imposible).",
  },
  s: `I [might] go to the party. | Puede que vaya a la fiesta.
You [must] be tired. | Debes estar cansado.
That [can't] be true. | Eso no puede ser cierto. | That cannot be true
It [may] rain later. | Puede que llueva más tarde.
She might [not] come. | Puede que no venga.
[May] I come in? | ¿Puedo pasar?
It [could] be a problem with the server. | Podría ser un problema del servidor.
He [must] be at home. The lights are on. | Debe estar en su casa. Las luces están prendidas.
We [might] need more time. | Puede que necesitemos más tiempo.
It [can't] be him. He's in Canada. | No puede ser él. Está en Canadá.
[Maybe] I'll study tonight. | Quizás estudie esta noche.
You [must] be joking! | ¡Debes estar bromeando!
The store [might] be closed. | La tienda podría estar cerrada.
This [could] take a while. | Esto podría tardar un rato.
She [may] not know the answer. | Puede que no sepa la respuesta.`,
});

TOPIC_DEFS.push({
  key: "b1-link", level: "B1", title: "Conectores", sub: "however, although, because of, so",
  ficha: {
    clave: ["Causa: **because** + oración / **because of** + sustantivo. Resultado: **so, that's why**.", "Contraste: **but, although** + oración, **however,** al inicio, **despite** + sustantivo/-ing."],
    que: "Los **conectores** unen ideas y hacen que hables y escribas con más fluidez. Cada uno tiene una **estructura**: algunos van con oración completa y otros con sustantivo.",
    usos: ["Causa: *I stayed home because it was raining / because of the rain.*", "Resultado: *I was tired, so I went to bed.*", "Contraste: *Although it was late, I finished.* *It was late. However, I finished.*", "Añadir: *also, too, in addition, besides*.", "Ejemplos: *for example, such as*."],
    forma: [
      { t: "Estructura", h: ["Conector", "Va con", "Ejemplo"], r: [["because", "oración", "because it rained"], ["because of", "sustantivo", "because of the rain"], ["although / even though", "oración", "although it was expensive"], ["despite / in spite of", "sustantivo o -ing", "despite the rain / despite being tired"], ["however", "inicio de oración + coma", "However, it worked."], ["so", "resultado", "It was cheap, so I bought it."], ["unless", "condición negativa", "unless you hurry"]] },
    ],
    variantes: ["*Too* al final, *also* antes del verbo: *I like it too. I also like it.*", "*Even though* es más fuerte que *although*.", "Formales: *therefore, moreover, nevertheless* (en B2)."],
    espanol: ["*A pesar de la lluvia* → *despite the rain* (sin *of*: no *despite of*).", "*Por eso* → *that's why* / *so*.", "*Sin embargo* → *however* (con coma)."],
    ejemplos: [["I stayed home because of the rain.", "Me quedé en casa por la lluvia."], ["Although it was late, I finished the project.", "Aunque era tarde, terminé el proyecto."], ["I was tired, so I went to bed.", "Estaba cansado, así que me fui a dormir."], ["Despite being tired, I went to class.", "A pesar de estar cansado, fui a clase."], ["It's expensive. However, it's worth it.", "Es caro. Sin embargo, vale la pena."]],
    errores: [["because the rain", "because of the rain", "Sustantivo: because of."], ["despite of the rain", "despite the rain", "Despite sin of."], ["Although it was late, but I finished.", "Although it was late, I finished.", "No uses although + but juntos."]],
    truco: "Mira lo que sigue: si es una **oración** (tiene verbo) → *because / although*. Si es solo un **sustantivo** → *because of / despite*.",
  },
  s: `I stayed home because [of] the rain. | Me quedé en casa por la lluvia.
[Although] it was late, I finished the project. | Aunque era tarde, terminé el proyecto.
I was tired, [so] I went to bed. | Estaba cansado, así que me fui a dormir.
[Despite] being tired, I went to class. | A pesar de estar cansado, fui a clase.
It's expensive. [However], it's worth it. | Es caro. Sin embargo, vale la pena.
I like Python [because] it's easy. | Me gusta Python porque es fácil.
She speaks English and French [too]. | Habla inglés y francés también.
I [also] play the guitar. | También toco la guitarra.
That's [why] I'm learning English. | Por eso estoy aprendiendo inglés.
I like games [such] as Minecraft and Fortnite. | Me gustan juegos como Minecraft y Fortnite.
[Even] though it was raining, we played. | Aunque estaba lloviendo, jugamos.
The game was canceled because [of] the storm. | El partido se canceló por la tormenta.
I studied a lot. [However], I failed. | Estudié mucho. Sin embargo, reprobé.
I'll go [unless] it rains. | Voy a menos que llueva.
[For] example, you can use Python. | Por ejemplo, puedes usar Python.`,
});

const STORIES_B1 = [
  { id: "s23", level: "B1", title: "The night the server went down", lines: [
    ["It was Friday night and I was finally relaxing.", "Era viernes en la noche y por fin me estaba relajando."], ["Suddenly my phone started vibrating with alerts.", "De repente mi celular empezó a vibrar con alertas."], ["The company's server had stopped responding.", "El servidor de la empresa había dejado de responder."], ["While I was opening my laptop, my boss called me.", "Mientras abría mi laptop, me llamó mi jefe."], ["We spent two hours trying to figure out the problem.", "Pasamos dos horas tratando de encontrar el problema."], ["Finally, we found out that the disk was full.", "Al final, descubrimos que el disco estaba lleno."], ["A log file had been growing for months.", "Un archivo de registro llevaba meses creciendo."], ["Since that night, I always check the disk space.", "Desde esa noche, siempre reviso el espacio en disco."],
  ], q: [["What was he doing when the alerts started?", ["Working", "Relaxing", "Sleeping"], 1, "*I was finally **relaxing*** (pasado continuo: acción de fondo)."], ["What was the problem?", ["The disk was full", "No internet", "A virus"], 0, "*We found out that the disk was full* (*find out* = descubrir)."], ["What does he do now?", ["He turns off the server", "He checks the disk space", "He works on Fridays"], 1, "*Since that night, I always check the disk space.*"]] },
  { id: "s24", level: "B1", title: "If I could live anywhere", lines: [
    ["People often ask me where I would live if I could choose.", "La gente seguido me pregunta dónde viviría si pudiera elegir."], ["If I had enough money, I would move to Japan for a year.", "Si tuviera suficiente dinero, me mudaría a Japón un año."], ["I would work for a game studio and learn Japanese.", "Trabajaría en un estudio de videojuegos y aprendería japonés."], ["But if I lived there, I would miss my family.", "Pero si viviera allá, extrañaría a mi familia."], ["And I would definitely miss tacos.", "Y definitivamente extrañaría los tacos."], ["Maybe the best option is to work remotely.", "Tal vez la mejor opción es trabajar a distancia."], ["That way, I could live anywhere and still visit my family.", "Así podría vivir en cualquier lado y aún visitar a mi familia."],
  ], q: [["Where would he move if he had money?", ["Canada", "Japan", "Spain"], 1, "*If I had enough money, I would move to Japan* (segundo condicional: imaginario)."], ["What would he miss?", ["His friends and the weather", "His family and tacos", "His job"], 1, "*I would miss my family... and tacos.*"], ["What is his final idea?", ["Stay in Puebla forever", "Work remotely", "Study medicine"], 1, "*Maybe the best option is to work remotely.*"]] },
  { id: "s25", level: "B1", title: "How the game was made", lines: [
    ["Our university game was made by a team of five students.", "El videojuego de la universidad fue hecho por un equipo de cinco estudiantes."], ["The idea was proposed by Ana in the first class.", "La idea la propuso Ana en la primera clase."], ["The characters were designed in Blender.", "Los personajes se diseñaron en Blender."], ["The code was written in C#, and the music was composed by Luis.", "El código se escribió en C# y la música la compuso Luis."], ["The game was tested by our classmates for two weeks.", "Nuestros compañeros probaron el juego durante dos semanas."], ["More than thirty bugs were found and fixed.", "Se encontraron y arreglaron más de treinta errores."], ["In the end, it was chosen as the best project of the semester.", "Al final, fue elegido el mejor proyecto del semestre."],
  ], q: [["Who proposed the idea?", ["Luis", "Ana", "The teacher"], 1, "*The idea was proposed **by** Ana* (pasiva + by)."], ["Where were the characters designed?", ["In Unity", "In Blender", "On paper"], 1, "*The characters were designed in Blender.*"], ["What happened in the end?", ["It was canceled", "It was chosen as the best project", "It was sold"], 1, "*It was chosen as the best project of the semester.*"]] },
  { id: "s26", level: "B1", title: "Things I used to believe", lines: [
    ["When I was a kid, I used to believe that computers were alive.", "De niño, creía que las computadoras estaban vivas."], ["I used to say 'thank you' to my mom's laptop.", "Le decía 'gracias' a la laptop de mi mamá."], ["I also used to think that English was impossible.", "También pensaba que el inglés era imposible."], ["I didn't use to understand any songs.", "Antes no entendía ninguna canción."], ["Now I'm used to watching videos in English.", "Ahora estoy acostumbrado a ver videos en inglés."], ["It took time, but I got used to it.", "Tomó tiempo, pero me acostumbré."], ["I still say 'thank you' to computers, though.", "Aunque todavía les digo 'gracias' a las computadoras."],
  ], q: [["What did he use to believe?", ["Computers were alive", "English was easy", "Games were bad"], 0, "*I used to believe that computers were alive* (*used to* = antes, ya no)."], ["What is he used to now?", ["Speaking Japanese", "Watching videos in English", "Waking up early"], 1, "*I'm used to watching...* (*be used to* + -ing = estar acostumbrado)."], ["What does he still do?", ["Say 'thank you' to computers", "Believe computers are alive", "Avoid English"], 0, "*I still say 'thank you' to computers, though.*"]] },
  { id: "s27", level: "B1", title: "A difficult decision", lines: [
    ["I've been working at a small company for six months.", "Llevo seis meses trabajando en una empresa pequeña."], ["Last week, a bigger company offered me a job.", "La semana pasada, una empresa más grande me ofreció trabajo."], ["The salary is better, although the office is far away.", "El sueldo es mejor, aunque la oficina está lejos."], ["If I accept, I'll have to travel two hours every day.", "Si acepto, voy a tener que viajar dos horas diario."], ["However, I would learn a lot more there.", "Sin embargo, aprendería mucho más ahí."], ["I might ask if I can work from home two days a week.", "Puede que pregunte si puedo trabajar desde casa dos días a la semana."], ["I have to decide by Friday.", "Tengo que decidir a más tardar el viernes."],
  ], q: [["How long has he been at his current job?", ["Six weeks", "Six months", "Two years"], 1, "*I've been working... **for** six months* (for + duración)."], ["What is the problem with the new job?", ["The salary", "The office is far", "The boss"], 1, "*although the office is far away.*"], ["When does he have to decide?", ["Today", "By Friday", "Next month"], 1, "*by Friday* = a más tardar el viernes."]] },
  { id: "s28", level: "B1", title: "💬 Technical support", lines: [
    ["Agent: Good afternoon, technical support. How can I help you?", "Agente: Buenas tardes, soporte técnico. ¿En qué le ayudo?"], ["Jared: Hi. My internet stopped working this morning.", "Jared: Hola. Mi internet dejó de funcionar en la mañana."], ["Agent: I'm sorry about that. Have you tried restarting the modem?", "Agente: Lamento eso. ¿Ya intentó reiniciar el módem?"], ["Jared: Yes, I've already turned it off and on twice.", "Jared: Sí, ya lo apagué y prendí dos veces."], ["Agent: Are the lights on the modem green or red?", "Agente: ¿Las luces del módem están verdes o rojas?"], ["Jared: One of them is blinking red.", "Jared: Una está parpadeando en rojo."], ["Agent: There might be a problem in your area. I'll send a technician tomorrow.", "Agente: Podría haber un problema en su zona. Mañana le mando un técnico."], ["Jared: Great, thank you for your help.", "Jared: Perfecto, gracias por su ayuda."],
  ], q: [["What has Jared already done?", ["Called a technician", "Restarted the modem", "Bought a new modem"], 1, "*I've already turned it off and on twice* (*already* + presente perfecto)."], ["What color is the blinking light?", ["Green", "Red", "Blue"], 1, "*One of them is blinking red.*"], ["What will the agent do?", ["Send a technician", "Cancel the service", "Call back in an hour"], 0, "*I'll send a technician tomorrow.*"]] },
  { id: "s29", level: "B1", title: "💬 Ordering food", lines: [
    ["Waiter: Hi! Are you ready to order?", "Mesero: ¡Hola! ¿Listos para ordenar?"], ["Jared: Almost. What do you recommend?", "Jared: Casi. ¿Qué me recomienda?"], ["Waiter: The burger is very popular, and the pasta is homemade.", "Mesero: La hamburguesa es muy popular y la pasta es casera."], ["Jared: I'll have the burger, but without onions, please.", "Jared: Me da la hamburguesa, pero sin cebolla, por favor."], ["Waiter: Sure. Would you like something to drink?", "Mesero: Claro. ¿Gusta algo de tomar?"], ["Jared: Just water, thanks.", "Jared: Solo agua, gracias."], ["Jared: Excuse me, could we have the check, please?", "Jared: Disculpe, ¿nos trae la cuenta, por favor?"], ["Waiter: Of course. You can pay by card or in cash.", "Mesero: Claro. Puede pagar con tarjeta o en efectivo."],
  ], q: [["How does Jared order?", ["I want the burger", "I'll have the burger", "Give me the burger"], 1, "*I'll have...* es la forma natural y amable de pedir."], ["What doesn't he want?", ["Cheese", "Onions", "Tomato"], 1, "*without onions, please.*"], ["How do you ask for la cuenta?", ["Could we have the check?", "Give me the account", "Can I pay the count?"], 0, "*La cuenta* = **the check** (EE. UU.) o *the bill*."]] },
  { id: "s30", level: "B1", title: "💬 Daily stand-up meeting", lines: [
    ["Lead: Good morning, team. Let's start. Jared, what did you do yesterday?", "Líder: Buenos días, equipo. Empecemos. Jared, ¿qué hiciste ayer?"], ["Jared: Yesterday I finished the login page and fixed two bugs.", "Jared: Ayer terminé la página de inicio de sesión y arreglé dos errores."], ["Lead: Great. What are you going to work on today?", "Líder: Muy bien. ¿En qué vas a trabajar hoy?"], ["Jared: Today I'm going to connect it to the database.", "Jared: Hoy voy a conectarla con la base de datos."], ["Lead: Any blockers?", "Líder: ¿Algún bloqueo?"], ["Jared: Yes, I don't have access to the test server yet.", "Jared: Sí, todavía no tengo acceso al servidor de pruebas."], ["Lead: No problem, I'll give you access after the meeting.", "Líder: No hay problema, te doy acceso después de la junta."],
  ], q: [["What did Jared finish yesterday?", ["The database", "The login page", "The server"], 1, "*Yesterday I finished the login page* (pasado simple con *yesterday*)."], ["What is a 'blocker'?", ["Algo que te impide avanzar", "Un compañero", "Un error resuelto"], 0, "*Blocker* = bloqueo, algo que no te deja continuar."], ["What does he need?", ["A new laptop", "Access to the test server", "More time"], 1, "*I don't have access to the test server **yet**.*"]] },
];

FIX2.push(
  { w: "Did you ever play this game?", bad: "Did", r: "Have you ever played this game?", t: "b1-pp", why: "Para preguntar por **experiencias de vida** (alguna vez) se usa el **presente perfecto**: *Have you ever...?* + participio.", ex: ["Have you ever been to Canada?", "I've never seen it.", "Has she ever tried sushi?"] },
  { w: "I have went to Cancún.", bad: "went", r: "I have been to Cancún.", t: "b1-pp", why: "Después de **have/has** va el **participio**, no el pasado: *go – went – gone/been*. Para experiencias de viaje se usa **been**: *I've been to Cancún*.", ex: ["I have seen it.", "She has eaten.", "We have been there."] },
  { w: "I know her since high school.", bad: "know", r: "I've known her since high school.", t: "b1-ppc", why: "Algo que empezó en el pasado y **sigue** necesita **presente perfecto**: *I've known her since...* El presente simple solo no funciona con *since*.", ex: ["I've had this phone since 2022.", "We've been friends for years.", "How long have you known him?"] },
  { w: "I'm studying English since two months.", bad: "since", r: "I've been studying English for two months.", t: "b1-ppc", why: "Dos errores típicos juntos: con duración (*dos meses*) va **for**, y para algo que sigue se usa **have been + -ing**.", ex: ["I've been working here for a year.", "She's been waiting since 9.", "for two months / since March"] },
  { w: "When I was child, I was playing soccer every day.", bad: "was playing", r: "When I was a child, I played soccer every day.", t: "b1-pcont", why: "Para **hábitos del pasado** se usa **pasado simple** o **used to**, no pasado continuo. El continuo es para una acción en progreso en un momento concreto.", ex: ["I used to play soccer every day.", "I was playing at 5 p.m. yesterday.", "When I was a child, I lived in Puebla."] },
  { w: "I use to play soccer when I was a kid.", bad: "use", r: "I used to play soccer when I was a kid.", t: "b1-usedto", why: "En afirmativa se escribe **used to**. *Use to* (sin -d) solo va después de *did/didn't*: *I didn't use to*.", ex: ["I used to live there.", "Did you use to play?", "I didn't use to like it."] },
  { w: "I'm used to wake up early.", bad: "wake", r: "I'm used to waking up early.", t: "b1-usedto", why: "**Be used to** (estar acostumbrado) va con **-ing**, porque *to* aquí es preposición. No confundir con *used to + verbo* (solía).", ex: ["I'm used to working late.", "You'll get used to living alone.", "I used to wake up late."] },
  { w: "If it will rain, I'll stay home.", bad: "will", r: "If it rains, I'll stay home.", t: "b1-cond1", why: "En el primer condicional, después de **if** va **presente** (aunque hable del futuro). **Will** solo va en el resultado.", ex: ["If I see him, I'll tell him.", "When I finish, I'll call you.", "Unless you hurry, you'll be late."] },
  { w: "If I would have money, I would buy a PC.", bad: "would", r: "If I had money, I would buy a PC.", t: "b1-cond2", why: "En la parte del **if** va **pasado simple**, no *would*. *Si tuviera* = *If I had*. **Would** solo en el resultado.", ex: ["If I knew, I'd tell you.", "If I lived closer, I'd walk.", "What would you do if you won?"] },
  { w: "If I was you, I would study more.", bad: "was", r: "If I were you, I would study more.", t: "b1-cond2", why: "En el segundo condicional, *to be* usa **were** con todos los sujetos. *If I were you* es la frase fija para dar consejos (*yo que tú*).", ex: ["If I were rich...", "If she were here...", "If it were cheaper, I'd buy it."] },
  { w: "I born in 2004.", bad: "born", r: "I was born in 2004.", t: "b1-passive", why: "*Nacer* en inglés es pasiva: **to be born**. Siempre lleva *was/were*: *I was born, she was born*.", ex: ["Where were you born?", "She was born in Puebla.", "I was born in May."] },
  { w: "This game was made for a small team.", bad: "for", r: "This game was made by a small team.", t: "b1-passive", why: "En la pasiva, **quien hace la acción** va con **by**. *For* significa *para*: *made for kids* = hecho para niños.", ex: ["written by Ana", "designed by students", "made for beginners"] },
  { w: "The man which called you is my boss.", bad: "which", r: "The man who called you is my boss.", t: "b1-rel", why: "Para **personas** se usa **who** (o *that*). **Which** es solo para cosas.", ex: ["the girl who won", "the app which I use", "the teacher that helped me"] },
  { w: "I don't know that you want.", bad: "that", r: "I don't know what you want.", t: "b1-rel", why: "*Lo que* se dice **what**. **That** necesita un sustantivo antes: *the game that I want*.", ex: ["That's what I said.", "Tell me what you need.", "the thing that I need"] },
  { w: "I study for get a better job.", bad: "for", r: "I study to get a better job.", t: "b1-gerinf", why: "Para expresar **propósito** (*para + verbo*) se usa **to + verbo**, no *for*. *For* va con sustantivos: *for my career*.", ex: ["I saved money to buy a PC.", "I came to learn.", "This is for you."] },
  { w: "Before to leave, turn off the lights.", bad: "to", r: "Before leaving, turn off the lights.", t: "b1-gerinf", why: "Después de una **preposición** (*before, after, without, for, in*...) el verbo siempre va en **-ing**.", ex: ["after eating", "without saying goodbye", "thanks for coming"] },
  { w: "Turn on it, please.", bad: "on", r: "Turn it on, please.", t: "b1-phrasal", why: "Con phrasal verbs separables, si el objeto es un **pronombre** (it, them, him) va **en medio**: *turn it on, pick me up, log it out*.", ex: ["Turn it off.", "Pick me up at 8.", "Look it up."] },
  { w: "We ran out coffee.", bad: "out", r: "We ran out of coffee.", t: "b1-phrasal", why: "*Quedarse sin* = **run out of**. El *of* es parte del phrasal verb y no se omite.", ex: ["I ran out of battery.", "We're running out of time.", "They ran out of tickets."] },
  { w: "He musts be tired.", bad: "musts", r: "He must be tired.", t: "b1-modals", why: "Los modales nunca llevan **-s**, aunque el sujeto sea *he/she/it*.", ex: ["She might come.", "It may rain.", "He can't be serious."] },
  { w: "I might to go to the party.", bad: "to", r: "I might go to the party.", t: "b1-modals", why: "**Might** es modal: va con el verbo directo, sin *to*.", ex: ["I might go.", "It may help.", "You could try."] },
  { w: "I stayed home because the rain.", bad: "because", r: "I stayed home because of the rain.", t: "b1-link", why: "**Because** va con una oración completa (*because it rained*); **because of** va con un sustantivo (*because of the rain*).", ex: ["because it was late", "because of the traffic", "because of you"] },
  { w: "Despite of the rain, we played.", bad: "of", r: "Despite the rain, we played.", t: "b1-link", why: "**Despite** no lleva *of*. Si quieres usar *of*, la forma es **in spite of**.", ex: ["Despite the rain", "In spite of the rain", "Despite being tired"] },
  { w: "Although it was late, but I finished.", bad: "but", r: "Although it was late, I finished.", t: "b1-link", why: "**Although** y **but** expresan contraste; con uno basta. En español *aunque... pero* suena normal, en inglés no.", ex: ["Although it was late, I finished.", "It was late, but I finished.", "Even though I was tired, I went."] },
);
