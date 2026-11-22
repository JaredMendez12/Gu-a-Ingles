// Nivel B2 · 9 temas con ficha completa, lecturas B2 y vocabulario extra.
TOPIC_DEFS.push({
  key: "b2-pastperf", level: "B2", title: "Pasado perfecto", sub: "había hecho algo antes",
  ficha: {
    clave: ["**had + participio**: *When I arrived, the class **had** already **started**.*", "Sirve para decir qué pasó **antes** de otro momento del pasado."],
    que: "El **pasado perfecto** es el *pasado del pasado*. Lo usas cuando cuentas una historia en pasado y necesitas dejar claro que algo ocurrió **antes** de otra acción pasada.",
    usos: ["Acción anterior: *When I got to the station, the bus had left.*", "Causa en el pasado: *I was tired because I hadn't slept.*", "Experiencia hasta un punto del pasado: *I had never seen snow until I went to Canada.*", "Estilo indirecto: *She said she had finished.*"],
    forma: [
      { t: "Formas", h: ["", "Ejemplo"], r: [["Afirmativa", "I/she/they had ('d) finished."], ["Negativa", "We hadn't eaten."], ["Pregunta", "Had you seen it before?"], ["Continuo", "I had been waiting for an hour when she arrived."]] },
      { t: "Pasado simple vs perfecto", h: ["Oración", "Qué pasó primero"], r: [["When I arrived, the class started.", "Llegué y luego empezó."], ["When I arrived, the class had started.", "Ya había empezado cuando llegué."]] },
    ],
    variantes: ["Con *before/after* a veces basta el pasado simple porque el orden ya es claro: *After I finished, I left.*", "*'d* puede ser *had* o *would*: *I'd gone* (had) vs *I'd go* (would).", "Muy usado con *by the time*: *By the time we arrived, they had left.*"],
    espanol: ["Es igual al pluscuamperfecto: *había terminado* = *had finished*.", "*Ya se había ido* → *He had already left*."],
    ejemplos: [["When I arrived, the class had already started.", "Cuando llegué, la clase ya había empezado."], ["I had never seen snow before.", "Nunca había visto la nieve."], ["She said she had finished the report.", "Dijo que había terminado el reporte."], ["By the time we got there, they had left.", "Para cuando llegamos, ya se habían ido."], ["I was tired because I hadn't slept.", "Estaba cansado porque no había dormido."]],
    errores: [["When I arrived, the bus already left.", "...the bus had already left.", "Acción anterior: had + participio."], ["I had saw it.", "I had seen it.", "Participio."], ["She said she has finished.", "She said she had finished.", "Retroceso de tiempo."]],
    truco: "Dibuja una línea de tiempo: si una acción pasada ocurrió **antes** de otra pasada, la primera lleva **had**.",
  },
  s: `When I arrived, the class [had] already started. | Cuando llegué, la clase ya había empezado.
I had never [seen] snow before. | Nunca había visto la nieve.
She said she had [finished] the report. | Dijo que había terminado el reporte.
By the time we got there, they had [left]. | Para cuando llegamos, ya se habían ido.
I was tired because I [hadn't] slept. | Estaba cansado porque no había dormido. | I was tired because I had not slept
[Had] you met him before the interview? | ¿Lo conocías antes de la entrevista?
The movie had [started] when we sat down. | La película ya había empezado cuando nos sentamos.
I realized I had [forgotten] my password. | Me di cuenta de que había olvidado mi contraseña.
He had been [working] there for years before he quit. | Llevaba años trabajando ahí antes de renunciar.
After she had [eaten], she went to bed. | Después de comer, se fue a dormir.
I [had] never used Linux until I started university. | Nunca había usado Linux hasta que entré a la universidad.
They had already [sold] all the tickets. | Ya habían vendido todos los boletos.
We had been [waiting] for an hour when the bus came. | Llevábamos una hora esperando cuando llegó el camión.
The server had [crashed] twice before we fixed it. | El servidor había tronado dos veces antes de que lo arregláramos.
I knew the answer because I had [studied]. | Me sabía la respuesta porque había estudiado.`,
});

TOPIC_DEFS.push({
  key: "b2-cond3", level: "B2", title: "Tercer condicional y mixtos", sub: "si hubiera... habría...",
  ficha: {
    clave: ["**If + had + participio, would have + participio**: *If I had studied, I would have passed.*", "Habla del **pasado irreal**: algo que no pasó y su consecuencia imaginaria."],
    que: "El **tercer condicional** sirve para hablar de **arrepentimientos** y situaciones pasadas que no ocurrieron. Los **condicionales mixtos** combinan un pasado irreal con un presente irreal.",
    usos: ["Arrepentimiento: *If I had saved my work, I wouldn't have lost it.*", "Imaginar otro pasado: *If we had left earlier, we would have caught the bus.*", "Mixto (pasado → presente): *If I had learned English as a kid, I would speak it fluently now.*"],
    forma: [
      { t: "Estructura", h: ["Condición", "Resultado"], r: [["If + had + participio", "would have + participio"], ["If I had known,", "I would have told you."], ["If she hadn't missed the bus,", "she wouldn't have been late."]] },
      { t: "Resumen de condicionales", h: ["Tipo", "Ejemplo", "Idea"], r: [["0", "If you heat ice, it melts.", "siempre"], ["1", "If it rains, I'll stay.", "posible"], ["2", "If I had money, I'd travel.", "imaginario ahora"], ["3", "If I had studied, I'd have passed.", "imaginario pasado"], ["Mixto", "If I had studied, I'd have a job now.", "pasado → presente"]] },
    ],
    variantes: ["*could have / might have* en lugar de *would have*: *If you had asked, I could have helped.*", "Contracciones habladas: *I'd have* /aidəv/, *would've*. Nunca se escribe *would of*.", "Inversión formal: *Had I known, I would have called.*"],
    espanol: ["*Si hubiera sabido, te habría dicho* → *If I **had known**, I **would have told** you*.", "No uses *would* en la parte del if: *If I would have known* está mal."],
    ejemplos: [["If I had studied, I would have passed.", "Si hubiera estudiado, habría aprobado."], ["If I had known, I would have told you.", "Si hubiera sabido, te habría dicho."], ["If we had left earlier, we wouldn't have missed the bus.", "Si hubiéramos salido antes, no habríamos perdido el camión."], ["If you had asked, I could have helped.", "Si hubieras preguntado, te habría podido ayudar."], ["If I had learned English as a kid, I would speak it fluently now.", "Si hubiera aprendido inglés de niño, ahora lo hablaría con fluidez."]],
    errores: [["If I would have known...", "If I had known...", "Sin would en el if."], ["I would of told you.", "I would have told you.", "Would have (no of)."], ["If I had studied, I would pass.", "...I would have passed.", "Resultado pasado: would have."]],
    truco: "**had + participio** en el *if*, **would have + participio** en el resultado. Dos *have* en total: uno en cada mitad.",
  },
  s: `If I had [studied], I would have passed. | Si hubiera estudiado, habría aprobado.
If I had known, I would [have] told you. | Si hubiera sabido, te habría dicho.
If we had left earlier, we [wouldn't] have missed the bus. | Si hubiéramos salido antes, no habríamos perdido el camión. | If we had left earlier, we would not have missed the bus
If you had asked, I [could] have helped. | Si hubieras preguntado, te habría podido ayudar.
If I had saved my work, I wouldn't have [lost] it. | Si hubiera guardado mi trabajo, no lo habría perdido.
If she [had] seen the message, she would have answered. | Si hubiera visto el mensaje, habría contestado.
What would you have done if you [had] failed? | ¿Qué habrías hecho si hubieras reprobado?
If I had learned English as a kid, I [would] speak it fluently now. | Si hubiera aprendido inglés de niño, ahora lo hablaría con fluidez.
If they hadn't [helped] me, I wouldn't have finished. | Si no me hubieran ayudado, no habría terminado.
If I had gone to bed early, I [wouldn't] be so tired now. | Si me hubiera dormido temprano, no estaría tan cansado ahora.
I would have [called] you if I had had time. | Te habría llamado si hubiera tenido tiempo.
If the server hadn't crashed, we would have [won]. | Si el servidor no hubiera tronado, habríamos ganado.
[Had] I known, I would have come. | De haberlo sabido, habría venido.
If we had bought the tickets earlier, they would have [been] cheaper. | Si hubiéramos comprado los boletos antes, habrían salido más baratos.
If you had [backed] up the files, we wouldn't have this problem. | Si hubieras respaldado los archivos, no tendríamos este problema.`,
});

TOPIC_DEFS.push({
  key: "b2-wish", level: "B2", title: "Wish e if only", sub: "ojalá, me gustaría que...",
  ficha: {
    clave: ["Presente irreal: **wish + pasado**: *I wish I **had** more time.* (ojalá tuviera)", "Pasado irreal: **wish + had + participio**: *I wish I **had studied**.* Molestia: **wish + would**: *I wish you would stop.*"],
    que: "**Wish** expresa deseos sobre situaciones que no son como queremos. Igual que los condicionales, usa un tiempo **más atrás** del que esperarías.",
    usos: ["Deseo sobre el presente: *I wish I spoke English fluently.*", "Arrepentimiento: *I wish I had saved my work.*", "Queja sobre la conducta de otro: *I wish my neighbor would turn down the music.*", "**If only** es más fuerte: *If only I had more time!*"],
    forma: [
      { t: "Estructuras", h: ["Sobre", "Forma", "Ejemplo"], r: [["presente", "wish + pasado simple", "I wish I lived closer."], ["presente (be)", "wish + were", "I wish I were taller."], ["pasado", "wish + had + participio", "I wish I hadn't said that."], ["futuro / molestia", "wish + would", "I wish it would stop raining."], ["habilidad", "wish + could", "I wish I could fly."]] },
    ],
    variantes: ["Para deseos normales de futuro se usa *hope*: *I hope you pass* (no *I wish you pass*).", "*I wish you a happy birthday* (fórmula fija con sustantivo).", "No se dice *I wish I would*: usa *I wish I could*."],
    espanol: ["*Ojalá tuviera* → *I wish I had*. *Ojalá hubiera* → *I wish I had + participio*.", "*Ojalá que pases* (posible) → *I **hope** you pass*."],
    ejemplos: [["I wish I had more time.", "Ojalá tuviera más tiempo."], ["I wish I had studied more.", "Ojalá hubiera estudiado más."], ["I wish I could speak Japanese.", "Ojalá pudiera hablar japonés."], ["I wish it would stop raining.", "Ojalá dejara de llover."], ["If only I were taller!", "¡Si tan solo fuera más alto!"], ["I hope you pass the exam.", "Ojalá pases el examen."]],
    errores: [["I wish I have more time.", "I wish I had more time.", "Wish + pasado."], ["I wish you pass.", "I hope you pass.", "Futuro posible: hope."], ["I wish I would be rich.", "I wish I were rich.", "Wish + were."]],
    truco: "**Wish** siempre mueve el tiempo un paso atrás: presente → pasado, pasado → *had* + participio.",
  },
  s: `I wish I [had] more time. | Ojalá tuviera más tiempo.
I wish I had [studied] more. | Ojalá hubiera estudiado más.
I wish I [could] speak Japanese. | Ojalá pudiera hablar japonés.
I wish it [would] stop raining. | Ojalá dejara de llover.
If only I [were] taller! | ¡Si tan solo fuera más alto!
I [hope] you pass the exam. | Ojalá pases el examen.
I wish I [hadn't] said that. | Ojalá no hubiera dicho eso. | I wish I had not said that
I wish I [lived] closer to the university. | Ojalá viviera más cerca de la universidad.
I wish you [would] stop interrupting me. | Ojalá dejaras de interrumpirme.
She wishes she [had] bought the cheaper one. | Ojalá hubiera comprado el más barato.
I wish I [knew] the answer. | Ojalá supiera la respuesta.
If only I had [listened] to you! | ¡Si tan solo te hubiera escuchado!
I wish this game [were] cheaper. | Ojalá este juego fuera más barato.
I wish I [didn't] have to work today. | Ojalá no tuviera que trabajar hoy.
We [hope] to see you soon. | Esperamos verte pronto.`,
});

TOPIC_DEFS.push({
  key: "b2-reported", level: "B2", title: "Estilo indirecto", sub: "dijo que..., me preguntó si...",
  ficha: {
    clave: ["Al reportar en pasado, el tiempo **retrocede**: *\"I'm tired\" → She said she **was** tired.*", "Preguntas: **asked if / asked + wh-** y orden normal: *He asked where I **lived**.*"],
    que: "El **estilo indirecto** (*reported speech*) sirve para contar lo que alguien dijo, sin citarlo palabra por palabra. Cambian los tiempos, los pronombres y algunas palabras de tiempo y lugar.",
    usos: ["Afirmaciones: *She said (that) she was busy.*", "Preguntas sí/no: *He asked if I could help.*", "Preguntas con wh-: *They asked where the office was.*", "Órdenes y peticiones: *The teacher told us to be quiet.*"],
    forma: [
      { t: "Retroceso de tiempos", h: ["Dijo", "Se reporta"], r: [["\"I work here.\"", "He said he worked there."], ["\"I'm working.\"", "He said he was working."], ["\"I finished.\" / \"I've finished.\"", "He said he had finished."], ["\"I will call.\"", "He said he would call."], ["\"I can help.\"", "He said he could help."]] },
      { t: "Otros cambios", h: ["Directo", "Indirecto"], r: [["today / tomorrow", "that day / the next day"], ["yesterday", "the day before"], ["here / this", "there / that"], ["now", "then"]] },
    ],
    variantes: ["Si lo dicho sigue siendo verdad, puedes no retroceder: *She said she **is** 21.*", "**say** + (that): *He said that...* · **tell** + persona: *He told me that...*", "Otros verbos: *explain, mention, promise, suggest, warn, admit*."],
    espanol: ["*Me preguntó dónde vivía* → *He asked me where I **lived*** (sin *did*, orden normal).", "*Me dijo que...* → *He **told** me that...* (no *said me*)."],
    ejemplos: [["She said she was tired.", "Dijo que estaba cansada."], ["He told me he had finished the project.", "Me dijo que había terminado el proyecto."], ["They asked if I could help.", "Preguntaron si podía ayudar."], ["She asked me where I lived.", "Me preguntó dónde vivía."], ["The teacher told us to be quiet.", "El maestro nos dijo que nos calláramos."]],
    errores: [["He asked me where did I live.", "He asked me where I lived.", "Sin did, orden normal."], ["She said me that...", "She told me that...", "Tell + persona."], ["He said he will call.", "He said he would call.", "Will → would."]],
    truco: "Retrocede **un paso** cada tiempo (presente → pasado, pasado → *had*, *will* → *would*) y quita la estructura de pregunta.",
  },
  s: `She said she [was] tired. | Dijo que estaba cansada.
He [told] me he had finished the project. | Me dijo que había terminado el proyecto.
They asked [if] I could help. | Preguntaron si podía ayudar. | They asked whether I could help
She asked me where I [lived]. | Me preguntó dónde vivía.
The teacher told us [to] be quiet. | El maestro nos dijo que nos calláramos.
He said he [would] call me later. | Dijo que me llamaría después.
She said she [could] come to the meeting. | Dijo que podía venir a la junta.
He asked me what time it [was]. | Me preguntó qué hora era.
They told me they [had] already left. | Me dijeron que ya se habían ido.
My boss asked [if] I had sent the email. | Mi jefe preguntó si había mandado el correo.
She [said] that she loved the game. | Dijo que le encantaba el juego.
He told me [not] to worry. | Me dijo que no me preocupara.
They asked us why we [were] late. | Nos preguntaron por qué llegamos tarde.
She said she would see me [the] next day. | Dijo que me vería al día siguiente.
He [asked] me to send him the file. | Me pidió que le mandara el archivo.`,
});

TOPIC_DEFS.push({
  key: "b2-causative", level: "B2", title: "Causativo: have/get something done", sub: "mandar hacer algo",
  ficha: {
    clave: ["**have / get + objeto + participio**: *I **had** my laptop **repaired**.* (alguien la reparó por mí)", "**have someone do / get someone to do**: *I'll **have** him **call** you. I **got** my brother **to help** me.*"],
    que: "El **causativo** sirve para decir que **otra persona** hace algo por ti, normalmente un servicio. En español decimos *me cortaron el pelo* o *mandé arreglar la laptop*.",
    usos: ["Servicios: *I got my hair cut. I'm having my phone fixed.*", "Algo malo que te pasó: *I had my bike stolen.*", "Pedir que alguien haga algo: *I'll have my assistant send it.*"],
    forma: [
      { t: "Estructuras", h: ["Forma", "Ejemplo", "Español"], r: [["have + cosa + participio", "I had my laptop repaired.", "Mandé arreglar mi laptop."], ["get + cosa + participio", "I got my hair cut.", "Me corté el pelo (me lo cortaron)."], ["have + persona + verbo", "I'll have Ana call you.", "Le diré a Ana que te llame."], ["get + persona + to + verbo", "I got him to help me.", "Logré que me ayudara."]] },
    ],
    variantes: ["Se conjuga *have/get* en todos los tiempos: *I'm getting my car washed. I've had it checked.*", "*Get* es más informal y a veces implica esfuerzo.", "Diferencia: *I cut my hair* (yo mismo) vs *I had my hair cut* (en la estética)."],
    espanol: ["*Me cortaron el pelo* → *I **had** my hair **cut*** (no *They cut my hair* si fue un servicio).", "*Me robaron el celular* → *I **had** my phone **stolen*** o *My phone got stolen*."],
    ejemplos: [["I had my laptop repaired.", "Mandé arreglar mi laptop."], ["I'm getting my hair cut tomorrow.", "Mañana me voy a cortar el pelo."], ["She had her phone stolen on the bus.", "Le robaron el celular en el camión."], ["I'll have my assistant send you the file.", "Le pediré a mi asistente que te mande el archivo."], ["I got my brother to help me move.", "Logré que mi hermano me ayudara con la mudanza."]],
    errores: [["I cut my hair at the barber.", "I had/got my hair cut at the barber.", "Servicio: causativo."], ["I had my laptop repair.", "I had my laptop repaired.", "Participio."], ["I got him help me.", "I got him to help me.", "Get + persona + to."]],
    truco: "Si **pagaste** o **pediste** que alguien lo hiciera → *have/get* + cosa + **participio**.",
  },
  s: `I had my laptop [repaired]. | Mandé arreglar mi laptop.
I'm getting my hair [cut] tomorrow. | Mañana me voy a cortar el pelo.
She had her phone [stolen] on the bus. | Le robaron el celular en el camión.
I'll have my assistant [send] you the file. | Le pediré a mi asistente que te mande el archivo.
I got my brother [to] help me move. | Logré que mi hermano me ayudara con la mudanza.
We need to [have] the server checked. | Necesitamos que revisen el servidor.
Where do you get your clothes [cleaned]? | ¿Dónde mandas a lavar tu ropa?
I [had] the screen replaced last week. | Me cambiaron la pantalla la semana pasada.
They're having their house [painted]. | Les están pintando la casa.
Can you get someone [to] fix the printer? | ¿Puedes conseguir que alguien arregle la impresora?
I need to get my eyes [checked]. | Necesito que me revisen la vista.
He had his car [washed]. | Mandó lavar su carro.
I'll [get] it done by Friday. | Lo tendré listo para el viernes.
She got her tooth [pulled] yesterday. | Ayer le sacaron una muela.
We had the documents [translated]. | Mandamos traducir los documentos.`,
});

TOPIC_DEFS.push({
  key: "b2-modalpast", level: "B2", title: "Modales en pasado", sub: "should have, must have, could have",
  ficha: {
    clave: ["**should have + participio** = debí haber (arrepentimiento/crítica). **could have** = pude haber. **must have** = seguro que (deducción).", "**can't have** = no pudo ser. **might have** = quizás."],
    que: "Los **modales + have + participio** hablan del pasado: arrepentimientos, críticas, posibilidades que no pasaron y deducciones sobre lo que ocurrió.",
    usos: ["Arrepentimiento: *I should have saved the file.*", "Crítica: *You shouldn't have told her.*", "Posibilidad no realizada: *You could have called me!*", "Deducción: *He must have forgotten. She can't have seen it.*", "Posibilidad: *They might have left already.*"],
    forma: [
      { t: "Significados", h: ["Forma", "Significa", "Ejemplo"], r: [["should have done", "debí haberlo hecho", "I should have studied."], ["shouldn't have done", "no debí hacerlo", "I shouldn't have eaten so much."], ["could have done", "pude haberlo hecho", "We could have won."], ["must have done", "seguro que lo hizo", "She must have left."], ["can't have done", "es imposible que lo hiciera", "He can't have finished already."], ["might / may have done", "quizás lo hizo", "I might have left it at home."]] },
    ],
    variantes: ["En el habla: *should've, could've, must've* (nunca *should of*).", "*Needn't have* = no hacía falta (y lo hiciste): *You needn't have bought it.*", "*Would have* va con condicionales (tercer condicional)."],
    espanol: ["*Debí haber guardado* → *I should have saved* (no *I must have saved*, que es deducción).", "*Me lo hubieras dicho* → *You could have told me*."],
    ejemplos: [["I should have saved the file.", "Debí haber guardado el archivo."], ["You shouldn't have told her.", "No debiste decirle."], ["You could have called me!", "¡Me hubieras llamado!"], ["He must have forgotten.", "Se le debe haber olvidado."], ["I might have left it at home.", "Quizás lo dejé en casa."]],
    errores: [["I should of studied.", "I should have studied.", "Have, no of."], ["I must have studied more. (arrepentimiento)", "I should have studied more.", "Arrepentimiento: should have."], ["She can't have saw it.", "She can't have seen it.", "Participio."]],
    truco: "**should have** = lo correcto que no hiciste. **must have** = lo que seguramente pasó.",
  },
  s: `I should have [saved] the file. | Debí haber guardado el archivo.
You [shouldn't] have told her. | No debiste decirle. | You should not have told her
You could have [called] me! | ¡Me hubieras llamado!
He must have [forgotten]. | Se le debe haber olvidado.
I might have [left] it at home. | Quizás lo dejé en casa.
She [can't] have finished already. | No es posible que ya haya terminado. | She cannot have finished already
We [could] have won the game. | Pudimos haber ganado el partido.
They must [have] taken the wrong bus. | Deben haber tomado el camión equivocado.
I should have [listened] to you. | Debí haberte escuchado.
You should have [backed] up your files. | Debiste respaldar tus archivos.
He [might] have missed the message. | Quizás no vio el mensaje.
It must have [been] difficult. | Debe haber sido difícil.
I [shouldn't] have eaten so much. | No debí comer tanto.
She could have [told] us earlier. | Nos pudo haber dicho antes.
They can't [have] seen us. | No es posible que nos hayan visto.`,
});

TOPIC_DEFS.push({
  key: "b2-phrasal2", level: "B2", title: "Phrasal verbs avanzados", sub: "trabajo, problemas y decisiones",
  ficha: {
    clave: ["Trabajo: **carry out** (llevar a cabo), **take over** (tomar el control), **bring up** (mencionar), **put off** (posponer).", "Problemas: **deal with** (lidiar con), **come across** (encontrarse con), **break down** (descomponerse), **sort out** (resolver)."],
    que: "En B2 los **phrasal verbs** aparecen en reuniones, correos y conversaciones con nativos. Muchos tienen un equivalente formal; conocer ambos te ayuda a entender y a sonar natural.",
    usos: ["Reuniones: *Let's go over the plan. Can we put off the meeting?*", "Problemas técnicos: *The system broke down. We need to sort it out.*", "Personas: *I look up to my mentor. Don't let me down.*"],
    forma: [
      { t: "Phrasal verbs de B2", h: ["Phrasal", "Significado", "Formal"], r: [["carry out", "llevar a cabo", "perform"], ["put off", "posponer", "postpone"], ["bring up", "mencionar, sacar un tema", "mention"], ["go over", "revisar", "review"], ["deal with", "lidiar con, atender", "handle"], ["sort out", "resolver, arreglar", "resolve"], ["break down", "descomponerse", "fail"], ["come across", "encontrarse con", "find"], ["take over", "tomar el control", "assume control"], ["point out", "señalar", "indicate"], ["look up to", "admirar", "admire"], ["let down", "decepcionar", "disappoint"], ["keep up with", "mantenerse al día", "stay updated"], ["run into", "toparse con", "encounter"]] },
    ],
    variantes: ["Algunos tienen varios significados: *pick up* = recoger, aprender (*I picked up some Japanese*), contestar el teléfono.", "Con tres partes son inseparables: *keep up with it, look forward to it*.", "En correos formales suele preferirse el verbo de una palabra."],
    espanol: ["*Posponer la junta* → *put off the meeting* (o *postpone*).", "*Lidiar con el cliente* → *deal with the client*."],
    ejemplos: [["We need to carry out more tests.", "Necesitamos hacer más pruebas."], ["Let's put off the meeting until Monday.", "Pospongamos la junta para el lunes."], ["She brought up an interesting point.", "Mencionó un punto interesante."], ["I'll deal with the client.", "Yo me encargo del cliente."], ["The system broke down again.", "El sistema volvió a fallar."], ["Don't let me down.", "No me decepciones."]],
    errores: [["Let's put the meeting off it.", "Let's put it off.", "Pronombre en medio, una vez."], ["I need to deal the problem.", "I need to deal with the problem.", "Deal with."], ["I can't keep up the news.", "I can't keep up with the news.", "Keep up with."]],
    truco: "Aprende cada phrasal verb **con su equivalente formal**: así entiendes conversaciones y escribes correos profesionales.",
  },
  s: `We need to carry [out] more tests. | Necesitamos hacer más pruebas.
Let's put [off] the meeting until Monday. | Pospongamos la junta para el lunes.
She brought [up] an interesting point. | Mencionó un punto interesante.
I'll deal [with] the client. | Yo me encargo del cliente.
The system broke [down] again. | El sistema volvió a fallar.
Don't let me [down]. | No me decepciones.
Let's go [over] the plan one more time. | Revisemos el plan una vez más.
I came [across] an interesting article. | Me encontré un artículo interesante.
We need to sort [out] this problem today. | Tenemos que resolver este problema hoy.
She pointed [out] a mistake in my code. | Me señaló un error en mi código.
I really look up [to] my mentor. | Admiro mucho a mi mentor.
It's hard to keep up [with] new technologies. | Es difícil mantenerse al día con las nuevas tecnologías.
A new manager took [over] the project. | Un nuevo gerente tomó el control del proyecto.
I ran [into] my old teacher at the mall. | Me topé con mi antiguo maestro en el centro comercial.
I picked [up] some Japanese from anime. | Aprendí algo de japonés con el anime.`,
});

TOPIC_DEFS.push({
  key: "b2-colloc", level: "B2", title: "Colocaciones: make, do, take, have", sub: "combinaciones que suenan naturales",
  ficha: {
    clave: ["**make**: crear o producir (*a decision, a mistake, money, progress*). **do**: tareas y actividades (*homework, research, a favor, business*).", "**take**: *a break, a photo, a risk, notes*. **have**: *a meeting, a good time, lunch*."],
    que: "Las **colocaciones** son palabras que naturalmente van juntas. No siempre hay lógica: un nativo dice *make a mistake* y nunca *do a mistake*. Aprenderlas te hace sonar natural de inmediato.",
    usos: ["Trabajo: *make a decision, do research, take notes, have a meeting*.", "Día a día: *take a shower, have breakfast, do the dishes, make the bed*.", "Adjetivos: *heavy traffic, strong coffee, high price, fast food*."],
    forma: [
      { t: "Verbos y sus colocaciones", h: ["Verbo", "Colocaciones"], r: [["make", "a mistake, a decision, money, progress, an effort, a plan, a call, friends, noise"], ["do", "homework, research, a favor, business, exercise, the dishes, your best"], ["take", "a break, a photo, notes, a risk, a test, time, a seat, care of"], ["have", "a meeting, a good time, lunch, a problem, a look, fun"], ["get", "a job, ready, lost, better, home, an email"]] },
      { t: "Adjetivo + sustantivo", h: ["Natural", "No natural"], r: [["heavy traffic", "strong traffic"], ["strong coffee", "powerful coffee"], ["high price", "expensive price"], ["make a mistake", "do a mistake"], ["take a decision (UK) / make a decision (US)", "—"]] },
    ],
    variantes: ["*Take an exam* (presentarlo) vs *pass an exam* (aprobarlo).", "*Do someone a favor*: *Can you do me a favor?*", "*Pay attention*, *pay a visit*, *pay a compliment*."],
    espanol: ["*Tomar una decisión* → *make a decision* (en EE. UU.).", "*Hacer la tarea* → *do homework* (no *make*).", "*Tomar un descanso* → *take a break* (igual que en español)."],
    ejemplos: [["I made a mistake in the code.", "Cometí un error en el código."], ["Let's take a break.", "Tomemos un descanso."], ["We need to make a decision today.", "Tenemos que tomar una decisión hoy."], ["Can you do me a favor?", "¿Me haces un favor?"], ["We had a meeting with the client.", "Tuvimos una junta con el cliente."], ["There's heavy traffic today.", "Hay mucho tráfico hoy."]],
    errores: [["do a mistake", "make a mistake", "Make + mistake."], ["make homework", "do homework", "Do + tareas."], ["strong traffic", "heavy traffic", "Colocación: heavy."]],
    truco: "**make** = el resultado es algo nuevo (una decisión, dinero). **do** = la actividad en sí (tarea, ejercicio).",
  },
  s: `I [made] a mistake in the code. | Cometí un error en el código.
Let's [take] a break. | Tomemos un descanso.
We need to [make] a decision today. | Tenemos que tomar una decisión hoy.
Can you [do] me a favor? | ¿Me haces un favor?
We [had] a meeting with the client. | Tuvimos una junta con el cliente.
There's [heavy] traffic today. | Hay mucho tráfico hoy.
I have to [do] some research for my project. | Tengo que investigar para mi proyecto.
She [took] a lot of notes in class. | Tomó muchos apuntes en clase.
I'm [making] progress with my English. | Estoy avanzando con mi inglés.
Don't [take] the risk. | No te arriesgues.
I always [do] my best. | Siempre doy lo mejor de mí.
We [had] a great time at the party. | La pasamos muy bien en la fiesta.
He [makes] a lot of money as a developer. | Gana mucho dinero como desarrollador.
Please [pay] attention. | Por favor pongan atención.
I need to [get] ready for the interview. | Necesito alistarme para la entrevista.`,
});

TOPIC_DEFS.push({
  key: "b2-formal", level: "B2", title: "Inglés formal y conectores avanzados", sub: "therefore, moreover, regarding",
  ficha: {
    clave: ["Formales: **therefore** (por lo tanto), **moreover / furthermore** (además), **nevertheless** (no obstante), **whereas** (mientras que).", "Correos: **regarding** (respecto a), **I'd appreciate it if...**, **Please find attached...**, **I look forward to hearing from you**."],
    que: "En B2 necesitas cambiar de registro: hablar con amigos no es igual que escribir a un reclutador o documentar un proyecto. Aquí están los conectores y frases que hacen que tu inglés escrito suene profesional.",
    usos: ["Ensayos y reportes: *The results were positive. Therefore, we recommend...*", "Correos de trabajo: *Regarding your question, ... Please find attached my CV.*", "Contrastar: *Python is easy to learn, whereas C++ is more complex.*"],
    forma: [
      { t: "Informal → formal", h: ["Informal", "Formal"], r: [["so", "therefore / as a result"], ["also / plus", "moreover / furthermore / in addition"], ["but", "however / nevertheless"], ["about", "regarding / concerning"], ["get", "receive / obtain"], ["ask for", "request"], ["help", "assist"], ["find out", "discover / determine"]] },
      { t: "Frases para correos", h: ["Para...", "Frase"], r: [["iniciar", "Dear Mr. / Ms. ... · I'm writing to ..."], ["adjuntar", "Please find attached ..."], ["pedir", "I would appreciate it if you could ..."], ["cerrar", "I look forward to hearing from you. · Best regards,"]] },
    ],
    variantes: ["*Whereas* compara dos cosas opuestas; *while* también puede hacerlo.", "En correos evita contracciones (*I am* en lugar de *I'm*) si es muy formal.", "*Nevertheless* = sin embargo (más fuerte que *however*)."],
    espanol: ["*Por lo tanto* → *therefore*. *Además* → *moreover / in addition*.", "*Adjunto mi CV* → *Please find attached my CV* o *I have attached my CV*.", "*Quedo atento a su respuesta* → *I look forward to hearing from you*."],
    ejemplos: [["Therefore, we recommend updating the system.", "Por lo tanto, recomendamos actualizar el sistema."], ["Moreover, the new version is faster.", "Además, la nueva versión es más rápida."], ["Python is easy to learn, whereas C++ is more complex.", "Python es fácil de aprender, mientras que C++ es más complejo."], ["Please find attached my CV.", "Adjunto mi CV."], ["I look forward to hearing from you.", "Quedo atento a su respuesta."]],
    errores: [["I look forward to hear from you.", "I look forward to hearing from you.", "Look forward to + -ing."], ["Regarding to your question...", "Regarding your question...", "Regarding sin to."], ["Therefore of that...", "Therefore, ...", "Therefore va solo + coma."]],
    truco: "Escribe primero como hablas y luego **cambia 3 palabras** por su versión formal: *so → therefore, also → moreover, about → regarding*.",
  },
  s: `[Therefore], we recommend updating the system. | Por lo tanto, recomendamos actualizar el sistema.
[Moreover], the new version is faster. | Además, la nueva versión es más rápida. | Furthermore, the new version is faster
Python is easy to learn, [whereas] C++ is more complex. | Python es fácil de aprender, mientras que C++ es más complejo.
Please find [attached] my CV. | Adjunto mi CV.
I look forward to [hearing] from you. | Quedo atento a su respuesta.
[Regarding] your question, the answer is yes. | Respecto a su pregunta, la respuesta es sí.
I would [appreciate] it if you could reply soon. | Le agradecería que me respondiera pronto.
The project was difficult. [Nevertheless], we finished on time. | El proyecto fue difícil. No obstante, terminamos a tiempo.
I am writing to [request] more information. | Le escribo para solicitar más información.
As a [result], the app is now faster. | Como resultado, la app ahora es más rápida.
In [addition], we added a dark mode. | Además, agregamos un modo oscuro.
I am writing [to] apply for the position. | Le escribo para postularme al puesto.
Could you [assist] me with this issue? | ¿Podría ayudarme con este problema?
We have [received] your application. | Hemos recibido su solicitud.
Best [regards], Jared Méndez | Saludos cordiales, Jared Méndez`,
});

const STORIES_B2 = [
  { id: "s31", level: "B2", title: "The deadline", lines: [
    ["By the time I opened my laptop, the deadline had almost passed.", "Para cuando abrí mi laptop, la fecha límite casi había pasado."], ["I had spent the whole week putting it off.", "Me había pasado toda la semana posponiéndolo."], ["If I had started on Monday, I wouldn't have been so stressed.", "Si hubiera empezado el lunes, no habría estado tan estresado."], ["I should have listened to my teammate, who had warned me.", "Debí haber escuchado a mi compañera, que me había advertido."], ["Somehow, I managed to finish five minutes before midnight.", "De alguna manera, logré terminar cinco minutos antes de medianoche."], ["The next morning, the professor said the deadline had been extended.", "A la mañana siguiente, el profesor dijo que la fecha límite se había extendido."], ["I wish I had known that the night before.", "Ojalá lo hubiera sabido la noche anterior."],
  ], q: [["Why was he stressed?", ["He had put off the work", "His laptop broke", "He was sick"], 0, "*I had spent the whole week **putting it off*** (pasado perfecto + phrasal verb)."], ["What should he have done?", ["Listened to his teammate", "Bought a new laptop", "Asked for money"], 0, "*I should have listened to my teammate* (arrepentimiento)."], ["What did the professor say?", ["The deadline had been extended", "Nobody passed", "The project was canceled"], 0, "Estilo indirecto: *said the deadline **had been** extended*."]] },
  { id: "s32", level: "B2", title: "An email to a recruiter", lines: [
    ["Dear Ms. Smith,", "Estimada Sra. Smith:"], ["I am writing to apply for the Junior Developer position advertised on your website.", "Le escribo para postularme al puesto de Desarrollador Junior anunciado en su sitio web."], ["I am currently studying IT at UVP, and I have built several web and game projects.", "Actualmente estudio TI en la UVP y he desarrollado varios proyectos web y de videojuegos."], ["Moreover, I have experience working in teams using Git.", "Además, tengo experiencia trabajando en equipo con Git."], ["Please find attached my CV and a link to my portfolio.", "Adjunto mi CV y un enlace a mi portafolio."], ["I would appreciate the opportunity to discuss my application.", "Agradecería la oportunidad de hablar sobre mi solicitud."], ["I look forward to hearing from you.", "Quedo atento a su respuesta."], ["Best regards, Jared Méndez", "Saludos cordiales, Jared Méndez"],
  ], q: [["Why is he writing?", ["To complain", "To apply for a job", "To ask for a refund"], 1, "*I am writing to apply for...* — fórmula formal para postularse."], ["What did he attach?", ["His CV and a portfolio link", "A photo", "His grades"], 0, "*Please find attached my CV and a link to my portfolio.*"], ["Which phrase is a formal closing?", ["See ya!", "I look forward to hearing from you.", "Bye!"], 1, "*I look forward to hearing from you* + *Best regards* es el cierre profesional."]] },
  { id: "s33", level: "B2", title: "The laptop repair", lines: [
    ["Last month my laptop broke down in the middle of an exam.", "El mes pasado mi laptop se descompuso a la mitad de un examen."], ["I had it repaired at a small shop near the university.", "La mandé arreglar a un taller pequeño cerca de la universidad."], ["The technician said the fan must have stopped working weeks before.", "El técnico dijo que el ventilador debió haber dejado de funcionar semanas antes."], ["He pointed out that the laptop had been overheating for a long time.", "Me señaló que la laptop llevaba mucho tiempo sobrecalentándose."], ["I could have avoided the problem if I had cleaned it.", "Pude haber evitado el problema si la hubiera limpiado."], ["Now I get it checked every six months.", "Ahora la mando revisar cada seis meses."], ["Lesson learned: take care of your tools.", "Lección aprendida: cuida tus herramientas."],
  ], q: [["What did he do with the laptop?", ["He fixed it himself", "He had it repaired", "He threw it away"], 1, "*I had it repaired* (causativo: alguien lo hizo por él)."], ["What must have happened?", ["The fan stopped working", "The screen broke", "It got wet"], 0, "*the fan **must have stopped*** (deducción sobre el pasado)."], ["What does he do now?", ["Buys a new laptop every year", "Gets it checked every six months", "Never uses it"], 1, "*I get it checked every six months.*"]] },
  { id: "s34", level: "B2", title: "Remote work: pros and cons", lines: [
    ["Remote work has become very common in the tech industry.", "El trabajo remoto se ha vuelto muy común en la industria tecnológica."], ["On the one hand, it saves time and money, since you don't have to commute.", "Por un lado, ahorra tiempo y dinero, ya que no tienes que trasladarte."], ["Moreover, many people feel more productive at home.", "Además, mucha gente se siente más productiva en casa."], ["On the other hand, it can be lonely, whereas an office offers social contact.", "Por otro lado, puede ser solitario, mientras que una oficina ofrece contacto social."], ["Some workers also find it hard to separate work from free time.", "Algunos trabajadores también tienen dificultad para separar el trabajo del tiempo libre."], ["Therefore, many companies now offer a hybrid model.", "Por lo tanto, muchas empresas ahora ofrecen un modelo híbrido."], ["Nevertheless, the best option depends on each person.", "No obstante, la mejor opción depende de cada persona."],
  ], q: [["What is an advantage of remote work?", ["You don't have to commute", "More meetings", "Free lunch"], 0, "*it saves time and money, since you don't have to commute.*"], ["What does 'whereas' introduce?", ["A contrast", "A result", "An example"], 0, "*Whereas* = mientras que (contraste)."], ["What do many companies offer now?", ["Only office work", "A hybrid model", "Higher salaries"], 1, "*Therefore, many companies now offer a hybrid model.*"]] },
  { id: "s35", level: "B2", title: "💬 Job interview", lines: [
    ["Interviewer: Tell me about a time you dealt with a difficult problem.", "Entrevistadora: Cuéntame de una vez que lidiaste con un problema difícil."], ["Jared: In a university project, our database had been losing data for days.", "Jared: En un proyecto de la universidad, nuestra base de datos llevaba días perdiendo información."], ["Jared: Nobody had noticed until a teammate pointed it out.", "Jared: Nadie lo había notado hasta que una compañera lo señaló."], ["Interviewer: What did you do?", "Entrevistadora: ¿Qué hiciste?"], ["Jared: I went over the logs and found out that a script was deleting old records by mistake.", "Jared: Revisé los registros y descubrí que un script borraba registros viejos por error."], ["Jared: We fixed it and set up automatic backups.", "Jared: Lo arreglamos y configuramos respaldos automáticos."], ["Interviewer: What would you do differently?", "Entrevistadora: ¿Qué harías diferente?"], ["Jared: I would have set up the backups from the beginning.", "Jared: Habría configurado los respaldos desde el principio."],
  ], q: [["What was the problem?", ["The database was losing data", "The server was slow", "A teammate quit"], 0, "*our database had been losing data for days* (pasado perfecto continuo)."], ["Who noticed the problem?", ["Jared", "A teammate", "The professor"], 1, "*until a teammate pointed it out.*"], ["What would he do differently?", ["Use another language", "Set up backups from the beginning", "Work alone"], 1, "*I would have set up the backups from the beginning* (tercer condicional implícito)."]] },
  { id: "s36", level: "B2", title: "💬 A complaint call", lines: [
    ["Agent: Customer service, how may I help you?", "Agente: Servicio al cliente, ¿en qué le puedo ayudar?"], ["Jared: Hi, I ordered a keyboard two weeks ago, and it still hasn't arrived.", "Jared: Hola, pedí un teclado hace dos semanas y todavía no llega."], ["Agent: I'm sorry to hear that. Could you give me your order number?", "Agente: Lamento escuchar eso. ¿Me podría dar su número de pedido?"], ["Jared: Sure, it's 4-5-7-2. The website said it would arrive in five days.", "Jared: Claro, es 4-5-7-2. La página decía que llegaría en cinco días."], ["Agent: I see. It seems it was sent to the wrong address.", "Agente: Ya veo. Parece que se envió a la dirección equivocada."], ["Jared: I'd appreciate it if you could send a new one as soon as possible.", "Jared: Le agradecería que me mandaran uno nuevo lo antes posible."], ["Agent: Of course. We'll have it delivered by Friday, free of charge.", "Agente: Por supuesto. Se lo entregaremos a más tardar el viernes, sin costo."],
  ], q: [["When did he order the keyboard?", ["Two days ago", "Two weeks ago", "Last year"], 1, "*I ordered a keyboard two weeks ago.*"], ["What went wrong?", ["It was broken", "It was sent to the wrong address", "It was the wrong color"], 1, "*it was sent to the wrong address* (voz pasiva)."], ["What will the company do?", ["Give a refund", "Have it delivered by Friday", "Nothing"], 1, "*We'll have it delivered by Friday* (causativo + by = a más tardar)."]] },
];

FIX2.push(
  { w: "When I arrived, the bus already left.", bad: "left", r: "When I arrived, the bus had already left.", t: "b2-pastperf", why: "Si una acción pasó **antes** de otra en el pasado, la primera va en **pasado perfecto** (*had + participio*). Sin *had* parece que el camión se fue después de que llegaste.", ex: ["The movie had started when we arrived.", "I had never seen it before.", "By 9, they had left."] },
  { w: "If I would have known, I would have told you.", bad: "would", r: "If I had known, I would have told you.", t: "b2-cond3", why: "En la parte del **if** del tercer condicional va **had + participio**. *Would have* solo va en el resultado.", ex: ["If I had studied, I would have passed.", "If you had asked, I could have helped.", "Had I known, I would have called."] },
  { w: "I would of called you.", bad: "of", r: "I would have called you.", t: "b2-cond3", why: "Al hablar rápido, *would've* suena parecido a *would of*, pero se escribe siempre **would have**. Igual con *should have, could have, must have*.", ex: ["I should have known.", "You could have told me.", "It must have been hard."] },
  { w: "I wish I have more time.", bad: "have", r: "I wish I had more time.", t: "b2-wish", why: "**Wish** sobre el presente usa **pasado**: *I wish I had* = ojalá tuviera. Es un deseo irreal, por eso el tiempo retrocede.", ex: ["I wish I knew.", "I wish I lived closer.", "I wish I were taller."] },
  { w: "I wish you pass the exam.", bad: "wish", r: "I hope you pass the exam.", t: "b2-wish", why: "Para algo **posible** en el futuro se usa **hope**. **Wish** es para cosas irreales o imposibles.", ex: ["I hope it doesn't rain.", "I hope you like it.", "I wish I could go (pero no puedo)."] },
  { w: "He asked me where did I live.", bad: "did", r: "He asked me where I lived.", t: "b2-reported", why: "En una pregunta reportada se pierde el auxiliar (*do/did*) y vuelve el orden normal **sujeto + verbo**: *where I lived*.", ex: ["She asked what I wanted.", "They asked if I was ready.", "He asked why I was late."] },
  { w: "She said me that she was busy.", bad: "said", r: "She told me that she was busy.", t: "b2-reported", why: "**Tell** + persona (*told me*). **Say** sin persona (*she said that...*) o con *to* (*said to me*).", ex: ["He told us the truth.", "She said she was busy.", "What did he say to you?"] },
  { w: "He said he will call me.", bad: "will", r: "He said he would call me.", t: "b2-reported", why: "Al reportar en pasado, **will** cambia a **would**, **can** a **could** y el presente a pasado.", ex: ["She said she could come.", "He said he was tired.", "They said they would help."] },
  { w: "I cut my hair at the barber yesterday.", bad: "cut", r: "I had my hair cut at the barber yesterday.", t: "b2-causative", why: "Si otra persona lo hizo por ti (un servicio), se usa el **causativo**: *have/get + cosa + participio*. *I cut my hair* significa que tú mismo te lo cortaste.", ex: ["I got my phone fixed.", "She had her car washed.", "We're having the house painted."] },
  { w: "I had my laptop repair.", bad: "repair", r: "I had my laptop repaired.", t: "b2-causative", why: "En el causativo la acción va en **participio**: *repaired, cut, fixed, cleaned*.", ex: ["had it fixed", "got it checked", "had them translated"] },
  { w: "I must have studied more for the exam.", bad: "must", r: "I should have studied more for the exam.", t: "b2-modalpast", why: "Para **arrepentimiento** (*debí haber*) se usa **should have**. **Must have** es deducción: *seguro que pasó*.", ex: ["I should have saved it.", "He must have forgotten.", "You shouldn't have said that."] },
  { w: "I need to deal the problem.", bad: "deal", r: "I need to deal with the problem.", t: "b2-phrasal2", why: "**Deal with** (lidiar con, encargarse de) siempre lleva **with**.", ex: ["I'll deal with it.", "How do you deal with stress?", "She deals with clients."] },
  { w: "I can't keep up the new technologies.", bad: "up", r: "I can't keep up with the new technologies.", t: "b2-phrasal2", why: "*Mantenerse al día con* = **keep up with**. Es un phrasal verb de tres partes y ninguna se omite.", ex: ["Keep up with the news.", "I can't keep up with you.", "Stay up to date."] },
  { w: "I need to do a decision.", bad: "do", r: "I need to make a decision.", t: "b2-colloc", why: "Se dice **make a decision** (en EE. UU.). *Make* va con lo que produces: *a decision, a plan, money, progress*.", ex: ["make a plan", "make progress", "do research"] },
  { w: "There is strong traffic today.", bad: "strong", r: "There is heavy traffic today.", t: "b2-colloc", why: "Colocación fija: **heavy traffic** (mucho tráfico). *Strong* va con *coffee, wind, opinion*.", ex: ["heavy rain", "strong coffee", "high prices"] },
  { w: "I look forward to hear from you.", bad: "hear", r: "I look forward to hearing from you.", t: "b2-formal", why: "En **look forward to**, el *to* es preposición, así que va seguido de **-ing**.", ex: ["I look forward to meeting you.", "We look forward to working with you.", "I'm looking forward to it."] },
  { w: "Regarding to your question, the answer is yes.", bad: "to", r: "Regarding your question, the answer is yes.", t: "b2-formal", why: "**Regarding** ya significa *respecto a*; no lleva *to*. Alternativas: *with regard to, concerning*.", ex: ["Regarding the meeting...", "With regard to your email...", "Concerning the project..."] },
);

// Vocabulario extra (B1–B2 y temas nuevos)
const VOCAB_EXTRA = {
  "Trabajo y oficina": "job interview|entrevista de trabajo;salary|sueldo;boss|jefe;coworker|compañero de trabajo;meeting|junta;deadline|fecha límite;to apply|postularse;resume / CV|currículum;to hire|contratar;to fire|despedir;to quit|renunciar;skills|habilidades;remote work|trabajo remoto;full-time|tiempo completo;part-time|medio tiempo;internship|prácticas;promotion|ascenso;team leader|líder de equipo;task|tarea;report|reporte",
  "Programación": "to deploy|desplegar;repository|repositorio;branch|rama;to merge|fusionar;commit|commit, confirmar cambios;framework|framework;library|biblioteca (de código);function|función;variable|variable;loop|ciclo;array|arreglo;to debug|depurar;to compile|compilar;backend|backend;frontend|frontend;API|API;cloud|la nube;backup|respaldo;to run|ejecutar;feature|funcionalidad",
  "Casa": "kitchen|cocina;bedroom|recámara;bathroom|baño;living room|sala;roof|techo;floor|piso;stairs|escaleras;fridge|refrigerador;stove|estufa;sink|fregadero;couch|sillón;blanket|cobija;pillow|almohada;to clean|limpiar;to do the dishes|lavar los trastes;to do laundry|lavar la ropa;rent|renta;neighbor|vecino;key|llave;light bulb|foco",
  "Viajes": "flight|vuelo;airport|aeropuerto;passport|pasaporte;luggage|equipaje;boarding pass|pase de abordar;delay|retraso;hotel|hotel;reservation|reservación;to book|reservar;round trip|viaje redondo;one-way|sencillo (solo ida);tourist|turista;map|mapa;beach|playa;souvenir|recuerdo;to check in|registrarse;customs|aduana;currency|moneda;abroad|en el extranjero;trip|viaje",
  "Salud": "doctor|doctor;appointment|cita;headache|dolor de cabeza;stomachache|dolor de estómago;fever|fiebre;cold|resfriado;cough|tos;pill|pastilla;pharmacy|farmacia;to feel sick|sentirse mal;to rest|descansar;to get better|mejorar;healthy|saludable;injury|lesión;to hurt|doler, lastimar;sore throat|dolor de garganta;allergy|alergia;dentist|dentista;prescription|receta médica;emergency|emergencia",
  "Ropa y compras": "shirt|camisa;T-shirt|playera;pants|pantalones;shoes|zapatos;sneakers|tenis;jacket|chamarra;hoodie|sudadera;size|talla;discount|descuento;sale|oferta, rebaja;receipt|ticket, recibo;refund|reembolso;to try on|probarse;fitting room|probador;cashier|cajero;to afford|poder pagar;expensive|caro;cheap|barato;brand|marca;online shopping|compras en línea",
  "Clima": "weather|clima;sunny|soleado;cloudy|nublado;rainy|lluvioso;windy|con viento;storm|tormenta;hot|caluroso;warm|templado, cálido;cool|fresco;cold|frío;degrees|grados;forecast|pronóstico;umbrella|paraguas;humid|húmedo;snow|nieve;heat wave|ola de calor;thunder|trueno;lightning|relámpago;flood|inundación;earthquake|sismo",
  "Tiempo libre": "to hang out|pasar el rato;movie theater|cine;concert|concierto;series|serie;to stream|transmitir en vivo;hobby|pasatiempo;board game|juego de mesa;to work out|hacer ejercicio;soccer match|partido de futbol;to go out|salir;party|fiesta;to relax|relajarse;to chill|relajarse (informal);book|libro;to draw|dibujar;to travel|viajar;museum|museo;gym|gimnasio;to binge-watch|ver muchos capítulos seguidos;podcast|podcast",
  "Adjetivos útiles": "useful|útil;useless|inútil;reliable|confiable;available|disponible;busy|ocupado;crowded|lleno de gente;quiet|tranquilo, callado;loud|ruidoso;fair|justo;unfair|injusto;awesome|increíble;awful|horrible;huge|enorme;tiny|diminuto;smart|inteligente;lazy|flojo;polite|educado;rude|grosero;proud|orgulloso;lucky|afortunado",
  "Verbos B1–B2": "to achieve|lograr;to improve|mejorar;to avoid|evitar;to suggest|sugerir;to require|requerir;to provide|proporcionar;to manage|lograr, administrar;to deal with|lidiar con;to rely on|depender de, confiar en;to admit|admitir;to complain|quejarse;to warn|advertir;to increase|aumentar;to reduce|reducir;to solve|resolver;to share|compartir;to belong|pertenecer;to waste|desperdiciar;to apologize|disculparse;to realize|darse cuenta",
  "Expresiones comunes": "by the way|por cierto;anyway|en fin;no way!|¡no manches! / ¡imposible!;it's up to you|tú decides;never mind|olvídalo;I'm in|me apunto;my bad|mi culpa;same here|igual yo;for real?|¿neta?;no worries|no te preocupes;sounds good|me parece bien;what's up?|¿qué onda?;take care|cuídate;hang on|espera tantito;I'm on my way|voy en camino;it's not a big deal|no es para tanto;good luck|suerte;cheers|salud / gracias;you're welcome|de nada;let me know|avísame",
};
Object.entries(VOCAB_EXTRA).forEach(([cat, s]) => {
  VOCAB[cat] = s;
  s.split(";").forEach((p) => { const [en, es] = p.split("|"); VOCAB_LIST.push({ en, es, cat }); });
});

const VOCAB_EXTRA2 = {
  "Familia y personas": "parents|papás;relatives|parientes;cousin|primo;uncle|tío;aunt|tía;grandparents|abuelos;nephew|sobrino;niece|sobrina;husband|esposo;wife|esposa;boyfriend|novio;girlfriend|novia;stranger|desconocido;roommate|compañero de cuarto;teenager|adolescente;adult|adulto;baby|bebé;twin|gemelo;only child|hijo único;in-laws|suegros",
  "Universidad": "semester|semestre;credits|créditos;grade point average (GPA)|promedio;to enroll|inscribirse;scholarship|beca;thesis|tesis;campus|campus;lecture|clase (exposición);professor|profesor;assignment|tarea, trabajo;essay|ensayo;midterm|examen parcial;final exam|examen final;to graduate|graduarse;degree|título;internship|prácticas;social service|servicio social;dean|director de facultad;classroom|salón;to skip class|irse de pinta",
  "Internet y redes": "account|cuenta;username|usuario;to log in|iniciar sesión;to sign up|registrarse;link|enlace;to share|compartir;to post|publicar;follower|seguidor;to follow|seguir;notification|notificación;to unfollow|dejar de seguir;comment|comentario;to like|dar like;to block|bloquear;privacy|privacidad;to scroll|deslizar;viral|viral;to upload|subir;to stream|transmitir;Wi-Fi|wifi",
  "Ciudad y transporte": "downtown|centro;neighborhood|colonia, barrio;traffic light|semáforo;crosswalk|paso peatonal;subway|metro;parking lot|estacionamiento;gas station|gasolinera;bridge|puente;highway|carretera;to turn left|dar vuelta a la izquierda;to go straight|seguir derecho;block|cuadra;corner|esquina;ride|aventón, viaje;driver|conductor;to commute|trasladarse;rush hour|hora pico;fare|pasaje;taxi stand|sitio de taxis;sidewalk|banqueta",
  "Dinero": "bill|billete, factura;coin|moneda;wallet|cartera;bank account|cuenta bancaria;to withdraw|retirar;to deposit|depositar;to transfer|transferir;loan|préstamo;debt|deuda;to owe|deber (dinero);budget|presupuesto;to save money|ahorrar;to spend|gastar;price|precio;fee|cuota, comisión;tax|impuesto;income|ingreso;to borrow money|pedir prestado;change|cambio;ATM|cajero automático",
  "Videojuegos avanzado": "to level up|subir de nivel;boss fight|pelea contra el jefe;checkpoint|punto de control;to unlock|desbloquear;achievement|logro;to grind|farmear, repetir para avanzar;spawn point|punto de aparición;multiplayer|multijugador;to team up|hacer equipo;loot|botín;inventory|inventario;to craft|fabricar;patch|parche;update|actualización;server|servidor;ranked match|partida clasificatoria;to rage quit|salirse enojado;noob|novato;cheat|trampa;speedrun|speedrun",
  "Emociones B1–B2": "anxious|ansioso;frustrated|frustrado;relieved|aliviado;overwhelmed|abrumado;disappointed|decepcionado;grateful|agradecido;jealous|celoso;lonely|solo, solitario;motivated|motivado;homesick|con nostalgia de casa;upset|molesto;ashamed|avergonzado;calm|tranquilo;confident|seguro de sí;insecure|inseguro;curious|curioso;thrilled|encantado;fed up|harto;moody|de malas;hopeful|esperanzado",
  "Conectores y frases": "first of all|antes que nada;in my opinion|en mi opinión;on the other hand|por otro lado;as a result|como resultado;for instance|por ejemplo;in fact|de hecho;in other words|en otras palabras;as far as I know|hasta donde sé;to sum up|en resumen;at least|al menos;by the way|por cierto;even if|aunque, incluso si;as soon as|en cuanto;as long as|siempre y cuando;instead of|en lugar de;due to|debido a;according to|según;so far|hasta ahora;in the end|al final;at first|al principio",
};
Object.entries(VOCAB_EXTRA2).forEach(([cat, s]) => {
  VOCAB[cat] = s;
  s.split(";").forEach((p) => { const [en, es] = p.split("|"); VOCAB_LIST.push({ en, es, cat }); });
});
