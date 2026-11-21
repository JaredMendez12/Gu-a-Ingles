// Contenido de la app. Todo funciona sin internet.
// Formato compacto: cada línea separada por "|".

const VERBS_RAW = `
bet|bet|bet|apostar|1
broadcast|broadcast|broadcast|transmitir|1
burst|burst|burst|reventar|1
cast|cast|cast|lanzar; elegir actores|1
cost|cost|cost|costar|1
cut|cut|cut|cortar|1
fit|fit|fit|quedar (ropa), caber|1
forecast|forecast|forecast|pronosticar|1
hit|hit|hit|golpear|1
hurt|hurt|hurt|lastimar, doler|1
let|let|let|dejar, permitir|1
put|put|put|poner|1
quit|quit|quit|renunciar, dejar un hábito|1
read|read|read|leer (pasado suena /red/)|1
set|set|set|establecer, configurar|1
shut|shut|shut|cerrar|1
split|split|split|dividir|1
spread|spread|spread|extender, untar|1
upset|upset|upset|molestar, alterar|1
bring|brought|brought|traer|2
buy|bought|bought|comprar|2
catch|caught|caught|atrapar|2
fight|fought|fought|pelear|2
seek|sought|sought|buscar|2
teach|taught|taught|enseñar|2
think|thought|thought|pensar|2
bend|bent|bent|doblar|2
build|built|built|construir|2
burn|burned|burned|quemar (UK: burnt)|2
creep|crept|crept|arrastrarse|2
deal|dealt|dealt|tratar, repartir|2
dream|dreamed|dreamed|soñar (UK: dreamt)|2
feel|felt|felt|sentir|2
keep|kept|kept|mantener, guardar|2
kneel|knelt|knelt|arrodillarse|2
learn|learned|learned|aprender (UK: learnt)|2
leave|left|left|salir, dejar|2
lend|lent|lent|prestar|2
lose|lost|lost|perder|2
mean|meant|meant|significar|2
send|sent|sent|enviar|2
sleep|slept|slept|dormir|2
spend|spent|spent|gastar; pasar (tiempo)|2
sweep|swept|swept|barrer|2
weep|wept|wept|llorar|2
bind|bound|bound|atar|2
find|found|found|encontrar|2
grind|ground|ground|moler|2
wind|wound|wound|enrollar|2
bleed|bled|bled|sangrar|2
feed|fed|fed|alimentar|2
flee|fled|fled|huir|2
have|had|had|tener|2
hear|heard|heard|oír|2
hold|held|held|sostener|2
lay|laid|laid|colocar|2
lead|led|led|guiar, dirigir|2
make|made|made|hacer, fabricar|2
pay|paid|paid|pagar|2
say|said|said|decir|2
sell|sold|sold|vender|2
slide|slid|slid|deslizar|2
stand|stood|stood|estar de pie|2
tell|told|told|decir, contar|2
understand|understood|understood|entender|2
dig|dug|dug|cavar|2
hang|hung|hung|colgar|2
light|lit|lit|encender|2
meet|met|met|conocer, reunirse|2
shine|shone|shone|brillar|2
shoot|shot|shot|disparar|2
sit|sat|sat|sentarse|2
spin|spun|spun|girar|2
stick|stuck|stuck|pegar|2
sting|stung|stung|picar (insecto)|2
strike|struck|struck|golpear|2
swing|swung|swung|columpiar|2
win|won|won|ganar|2
begin|began|begun|empezar|3
drink|drank|drunk|beber|3
ring|rang|rung|sonar; llamar|3
shrink|shrank|shrunk|encoger|3
sing|sang|sung|cantar|3
sink|sank|sunk|hundirse|3
swim|swam|swum|nadar|3
blow|blew|blown|soplar|3
draw|drew|drawn|dibujar|3
fly|flew|flown|volar|3
grow|grew|grown|crecer|3
know|knew|known|saber, conocer|3
show|showed|shown|mostrar|3
throw|threw|thrown|lanzar|3
withdraw|withdrew|withdrawn|retirar|3
break|broke|broken|romper|3
choose|chose|chosen|elegir|3
forget|forgot|forgotten|olvidar|3
freeze|froze|frozen|congelar|3
speak|spoke|spoken|hablar|3
steal|stole|stolen|robar|3
swear|swore|sworn|jurar|3
tear|tore|torn|rasgar|3
wake|woke|woken|despertar|3
wear|wore|worn|usar (ropa)|3
arise|arose|arisen|surgir|3
beat|beat|beaten|vencer, golpear|3
bite|bit|bitten|morder|3
drive|drove|driven|manejar|3
eat|ate|eaten|comer|3
fall|fell|fallen|caer|3
forbid|forbade|forbidden|prohibir|3
forgive|forgave|forgiven|perdonar|3
give|gave|given|dar|3
hide|hid|hidden|esconder|3
mistake|mistook|mistaken|confundir|3
ride|rode|ridden|montar, andar en|3
rise|rose|risen|subir, elevarse|3
shake|shook|shaken|agitar|3
take|took|taken|tomar, llevar|3
write|wrote|written|escribir|3
be|was/were|been|ser, estar|3
do|did|done|hacer|3
get|got|gotten|obtener, conseguir (UK: got)|3
go|went|gone|ir|3
lie|lay|lain|estar acostado (mentir: lied)|3
see|saw|seen|ver|3
become|became|become|convertirse|4
come|came|come|venir|4
overcome|overcame|overcome|superar|4
run|ran|run|correr|4
`;

const PHRASES_RAW = `
How's it going?|¿Cómo te va?
Nice to meet you.|Mucho gusto.
Long time no see!|¡Cuánto tiempo sin verte!
Sorry, could you repeat that?|Perdón, ¿lo puedes repetir?
Could you speak more slowly, please?|¿Puedes hablar más despacio, por favor?
What do you mean by that?|¿Qué quieres decir con eso?
How do you say "carpeta" in English?|¿Cómo se dice "carpeta" en inglés?
What does this word mean?|¿Qué significa esta palabra?
How do you spell it?|¿Cómo se deletrea?
I think so.|Creo que sí.
In my opinion, it's a good idea.|En mi opinión, es buena idea.
I agree with you.|Estoy de acuerdo contigo.
I see your point, but...|Entiendo tu punto, pero...
I'm not so sure about that.|No estoy tan seguro de eso.
Could you help me with this?|¿Me ayudas con esto?
Would you mind closing the door?|¿Te molestaría cerrar la puerta?
Is it OK if I sit here?|¿Está bien si me siento aquí?
I'd like a coffee, please.|Quisiera un café, por favor.
Thanks a lot, I really appreciate it.|Muchas gracias, de verdad lo agradezco.
Sorry about that.|Perdón por eso.
No problem.|No hay problema.
Let me think...|Déjame pensar...
That's a good question.|Esa es una buena pregunta.
Can I ask a question?|¿Puedo hacer una pregunta?
You're on mute.|Estás en silencio (micrófono).
Can you hear me?|¿Me escuchas?
Could you share your screen?|¿Puedes compartir tu pantalla?
Let's move on to the next point.|Pasemos al siguiente punto.
I'll get back to you on that.|Te respondo sobre eso después.
I'm running late.|Voy tarde.
I'm on my way.|Voy en camino.
What do you do?|¿A qué te dedicas?
I'm studying Information Technology.|Estudio Tecnologías de la Información.
How long have you been studying English?|¿Cuánto tiempo llevas estudiando inglés?
It depends on the situation.|Depende de la situación.
I've never been there.|Nunca he ido ahí.
I used to play soccer.|Antes jugaba fútbol.
I'm looking forward to it.|Tengo muchas ganas de eso.
It doesn't matter.|No importa.
I'm stuck on this bug.|Estoy atorado con este error.
Yesterday I worked on the login page.|Ayer trabajé en la página de inicio de sesión.
Today I'm going to fix the database.|Hoy voy a arreglar la base de datos.
It works on my computer.|En mi computadora sí funciona.
Have a nice weekend!|¡Buen fin de semana!
`;

const TECH_RAW = `
bug|error, falla|We found a bug in the login page.
to debug|depurar|I spent hours debugging the API.
to deploy|desplegar, publicar|We deploy every Tuesday.
release|versión publicada|The new release fixes three bugs.
feature|funcionalidad|Users asked for a dark-mode feature.
requirement|requisito|The client changed the requirements.
deadline|fecha límite|The deadline is next Monday.
query|consulta|This query is too slow.
framework|marco de trabajo|Django is a Python framework.
library|biblioteca (de código)|Import the library first.
repository|repositorio|Clone the repository.
branch|rama|Create a new branch for this feature.
to merge|fusionar|Merge your branch into main.
to commit|confirmar cambios|Commit your changes often.
pull request|solicitud de cambios|Please review my pull request.
issue|incidencia, problema|I opened an issue on GitHub.
backlog|lista de pendientes|It's in the backlog.
edge case|caso límite|Add a test for this edge case.
workaround|solución temporal|This is just a workaround.
legacy code|código heredado|We still maintain legacy code.
to refactor|refactorizar|Let's refactor this function.
to troubleshoot|diagnosticar y resolver|I'm troubleshooting the network.
upgrade|mejora a versión mayor|Upgrade to the new version.
latency|latencia|High latency makes the game lag.
bandwidth|ancho de banda|Video calls need more bandwidth.
encryption|cifrado|The data is protected with encryption.
to crash|cerrarse por error|The app crashes when I upload a photo.
timeout|tiempo de espera agotado|The request timed out.
deprecated|obsoleto|This function is deprecated.
default|predeterminado|Use the default settings.
`;

const FALSE_FRIENDS_RAW = `
actually|en realidad|"actualmente" es currently
assist|ayudar|"asistir" es attend
attend|asistir (a clase)|"atender" es serve / pay attention
embarrassed|avergonzado|"embarazada" es pregnant
exit|salida|"éxito" es success
success|éxito|"suceso" es event
library|biblioteca|"librería" es bookstore
realize|darse cuenta|"realizar" es carry out
sensible|sensato|"sensible" es sensitive
carpet|alfombra|"carpeta" es folder
college|universidad|"colegio" es school
career|trayectoria profesional|"carrera universitaria" es major / degree
lecture|clase, conferencia|"lectura" es reading
fabric|tela|"fábrica" es factory
eventually|al final|"eventualmente" es possibly
introduce|presentar (a alguien)|"introducir" es insert
record|grabar|"recordar" es remember
support|apoyar|"soportar" es put up with
argument|discusión, pelea|"argumento" (de película) es plot
parents|padres|"parientes" es relatives
casualty|víctima, herido|"casualidad" es coincidence
compromise|acuerdo, concesión|"compromiso" es commitment
deception|engaño|"decepción" es disappointment
pretend|fingir|"pretender" es intend
resume|reanudar|"resumir" es summarize
sympathetic|comprensivo|"simpático" es nice
large|grande|"largo" es long
notice|notar; aviso|"noticia" es news
quiet|callado, tranquilo|"quieto" es still
educated|culto, con estudios|"educado" es polite
file|archivo|"fila" es line / row
`;

const PHRASAL_RAW = `
back up|respaldar archivos|Always back up your files.
break down|descomponerse|My car broke down.
bring up|sacar un tema|Don't bring up politics.
call off|cancelar|They called off the meeting.
carry on|continuar|Carry on with your work.
carry out|llevar a cabo|We carried out a survey.
catch up|ponerse al corriente|I need to catch up on my emails.
come up with|idear, proponer|She came up with a great idea.
count on|contar con|You can count on me.
end up|terminar (haciendo algo)|We ended up staying home.
figure out|descifrar, resolver|I can't figure out this bug.
fill out|llenar (un formulario)|Fill out this form, please.
find out|averiguar, enterarse|I found out the truth.
get along|llevarse bien|I get along with my coworkers.
get over|superar|She got over the flu.
give up|rendirse; dejar|Don't give up!
go on|continuar; pasar|What's going on?
grow up|crecer|I grew up in a small town.
hang out|pasar el rato|We hang out on Fridays.
hold on|esperar un momento|Hold on, please.
keep up|seguir el ritmo|It's hard to keep up with new tech.
log in|iniciar sesión|Log in with your email.
look after|cuidar|Can you look after my dog?
look for|buscar|I'm looking for a job.
look forward to|esperar con ganas|I look forward to hearing from you.
look into|investigar|We'll look into the problem.
look up|buscar (dato, palabra)|Look it up in the dictionary.
make up|inventar|He made up an excuse.
pick up|recoger|I'll pick you up at 8.
point out|señalar|She pointed out a mistake.
put off|posponer|Don't put off your homework.
put up with|tolerar|I can't put up with the noise.
run into|encontrarse por casualidad|I ran into my teacher.
run out of|quedarse sin|We ran out of coffee.
set up|instalar, configurar|I set up the new router.
show up|aparecer, llegar|He didn't show up.
shut down|apagar (un sistema)|Shut down the computer.
sign up|inscribirse|I signed up for the course.
sort out|resolver|Let's sort out this problem.
take off|despegar; quitarse|The plane took off.
take up|empezar (un hobby)|I took up yoga.
turn down|rechazar|She turned down the offer.
turn off|apagar|Turn off the lights.
wake up|despertar|I woke up late.
work out|hacer ejercicio; resolver|I work out every day.
write down|anotar|Write down the address.
`;

// Preguntas: [pregunta, [opciones], índice correcto, explicación, nivel]
const QUIZ = [
  ["___ you a student?", ["Is", "Are", "Do"], 1, "Con you se usa are.", "A1"],
  ["She ___ in a hospital.", ["work", "works", "working"], 1, "Con she, el presente simple lleva -s.", "A1"],
  ["There ___ two chairs in the room.", ["is", "are", "be"], 1, "Plural: there are.", "A1"],
  ["I ___ like coffee.", ["don't", "doesn't", "not"], 0, "Con I se usa don't.", "A1"],
  ["My birthday is ___ May.", ["on", "at", "in"], 2, "Meses: in.", "A1"],
  ["He has two ___.", ["child", "childs", "children"], 2, "Plural irregular: children.", "A1"],
  ["I'm ___ engineer.", ["a", "an", "—"], 1, "Engineer empieza con sonido vocal: an.", "A1"],
  ["They ___ at home yesterday.", ["was", "were", "are"], 1, "Pasado de are: were.", "A1"],
  ["I'm 20 ___.", ["years", "years old", "have years"], 1, "La edad: I'm 20 years old.", "A1"],
  ["Let's meet ___ 6 p.m.", ["in", "on", "at"], 2, "Horas exactas: at.", "A1"],
  ["I ___ to the cinema last weekend.", ["go", "went", "gone"], 1, "Pasado simple de go: went.", "A2"],
  ["My car is ___ than yours.", ["more fast", "faster", "fastest"], 1, "Adjetivo corto: -er.", "A2"],
  ["How ___ water do you drink?", ["many", "much", "lot"], 1, "Water es incontable: much.", "A2"],
  ["Look! The baby ___.", ["sleeps", "is sleeping", "sleep"], 1, "Algo que pasa ahora: presente continuo.", "A2"],
  ["___ you finish your homework yesterday?", ["Do", "Did", "Were"], 1, "Pregunta en pasado: did.", "A2"],
  ["You ___ smoke here. It's forbidden.", ["mustn't", "don't have to", "needn't"], 0, "Prohibición: mustn't.", "A2"],
  ["I was watching TV when the phone ___.", ["rang", "was ringing", "rings"], 0, "La acción que interrumpe va en pasado simple.", "A2"],
  ["There isn't ___ milk left.", ["some", "any", "many"], 1, "Negativas: any.", "A2"],
  ["She's the ___ student in the class.", ["most intelligent", "more intelligent", "intelligentest"], 0, "Superlativo largo: the most.", "A2"],
  ["Did you ___ the message?", ["saw", "see", "seen"], 1, "Después de did, forma base.", "A2"],
  ["I ___ here since 2020.", ["live", "lived", "have lived"], 2, "Algo que empezó y sigue: presente perfecto.", "B1"],
  ["If it rains tomorrow, we ___ at home.", ["stay", "will stay", "would stay"], 1, "Condicional 1: if + presente, will.", "B1"],
  ["The new bridge ___ last year.", ["built", "was built", "has built"], 1, "Voz pasiva en pasado: was + participio.", "B1"],
  ["I'm not used to ___ up so early.", ["get", "getting", "got"], 1, "Be used to + -ing.", "B1"],
  ["She asked me where I ___.", ["lived", "do I live", "did live"], 0, "Pregunta reportada: orden normal y pasado.", "B1"],
  ["Have you ever ___ to Canada?", ["went", "been", "go"], 1, "Have you ever been to...?", "B1"],
  ["The man ___ car was stolen called the police.", ["who", "which", "whose"], 2, "Posesión: whose.", "B1"],
  ["I enjoy ___ in the rain.", ["to walk", "walking", "walk"], 1, "Enjoy + -ing.", "B1"],
  ["You look tired. You ___ go to bed.", ["should", "must to", "ought"], 0, "Consejo: should + base.", "B1"],
  ["I ___ for two hours when she finally called.", ["waited", "had been waiting", "have waited"], 1, "Duración antes de otro pasado: had been + -ing.", "B1"],
  ["It depends ___ you.", ["of", "on", "from"], 1, "Depend on.", "B1"],
  ["She told me ___ outside.", ["wait", "to wait", "waiting"], 1, "Tell someone to + verbo.", "B1"],
  ["___ it was late, we kept working.", ["Although", "Despite", "Because"], 0, "Although + oración completa.", "B1"],
  ["If I ___ harder, I would have passed.", ["studied", "had studied", "would study"], 1, "Condicional 3: if + had + participio.", "B2"],
  ["By next June, I ___ my degree.", ["will finish", "will have finished", "finish"], 1, "Terminado antes de un momento futuro: futuro perfecto.", "B2"],
  ["I wish I ___ more time to travel.", ["have", "had", "would have"], 1, "Deseo sobre el presente: wish + pasado.", "B2"],
  ["She must ___ the bus; she's never late.", ["miss", "have missed", "missed"], 1, "Deducción sobre el pasado: must have + participio.", "B2"],
  ["I'm having my car ___ tomorrow.", ["fix", "fixing", "fixed"], 2, "Causativo: have + objeto + participio.", "B2"],
  ["___ the bad weather, the flight left on time.", ["Although", "Despite", "However"], 1, "Despite + sustantivo.", "B2"],
  ["He denied ___ the money.", ["to take", "taking", "take"], 1, "Deny + -ing.", "B2"],
  ["If I had studied medicine, I ___ a doctor now.", ["would be", "would have been", "will be"], 0, "Condicional mixto: efecto en el presente.", "B2"],
  ["The meeting was put ___ until next month.", ["off", "up", "out"], 0, "Put off = posponer.", "B2"],
  ["I remember ___ this movie as a kid.", ["to watch", "watching", "watch"], 1, "Remember + -ing: recordar algo que pasó.", "B2"],
  ["I stopped ___ a coffee on my way to work.", ["buying", "to buy", "buy"], 1, "Stop + to: detenerse para hacer algo.", "B2"],
  ["The report should ___ yesterday.", ["have sent", "have been sent", "be sent"], 1, "Modal en pasado + pasiva.", "B2"],
  ["En inglés, «actually» significa...", ["actualmente", "en realidad", "eventualmente"], 1, "Actually = en realidad. «Actualmente» se dice currently.", "A2"],
  ["I need to ___ a class at 9.", ["assist", "attend", "help"], 1, "Asistir a clase = attend.", "A2"],
  ["Can I ___ a question?", ["make", "do", "ask"], 2, "Se dice ask a question.", "A2"],
  ["I ___ a mistake in the code.", ["did", "made", "took"], 1, "Make a mistake.", "A2"],
  ["Let's ___ a break.", ["take", "make", "do"], 0, "Take a break.", "A2"],
];

// Oraciones para dictado: [inglés, español, nivel]
const DICTATION = [
  ["I wake up at seven every day.", "Me despierto a las siete todos los días.", "A1"],
  ["My brother works in a bank.", "Mi hermano trabaja en un banco.", "A1"],
  ["Where do you live?", "¿Dónde vives?", "A1"],
  ["It's cold today.", "Hoy hace frío.", "A1"],
  ["I don't like horror movies.", "No me gustan las películas de terror.", "A1"],
  ["She is my best friend.", "Ella es mi mejor amiga.", "A1"],
  ["What time is it?", "¿Qué hora es?", "A1"],
  ["We have class in the morning.", "Tenemos clase en la mañana.", "A1"],
  ["I went to the park yesterday.", "Fui al parque ayer.", "A2"],
  ["Did you finish your homework?", "¿Terminaste tu tarea?", "A2"],
  ["She is studying for an exam right now.", "Ella está estudiando para un examen ahora mismo.", "A2"],
  ["I'm going to visit my grandparents next weekend.", "Voy a visitar a mis abuelos el próximo fin de semana.", "A2"],
  ["This phone is cheaper than that one.", "Este celular es más barato que ese.", "A2"],
  ["There are two bugs in the code.", "Hay dos errores en el código.", "A2"],
  ["I was cooking when the phone rang.", "Estaba cocinando cuando sonó el teléfono.", "A2"],
  ["How much does it cost?", "¿Cuánto cuesta?", "A2"],
  ["I've lived here since 2020.", "Vivo aquí desde 2020.", "B1"],
  ["Have you ever been to Canada?", "¿Alguna vez has ido a Canadá?", "B1"],
  ["If it rains, I'll stay at home.", "Si llueve, me quedaré en casa.", "B1"],
  ["The website was launched last year.", "El sitio web se lanzó el año pasado.", "B1"],
  ["I've been studying English for two years.", "Llevo dos años estudiando inglés.", "B1"],
  ["You should back up your files.", "Deberías respaldar tus archivos.", "B1"],
  ["Could you tell me where the station is?", "¿Me podría decir dónde está la estación?", "B1"],
  ["I'm looking forward to meeting you.", "Tengo muchas ganas de conocerte.", "B1"],
  ["She said that she was tired.", "Ella dijo que estaba cansada.", "B1"],
  ["When I arrived, the class had already started.", "Cuando llegué, la clase ya había empezado.", "B2"],
  ["If I had known, I would have helped you.", "Si lo hubiera sabido, te habría ayudado.", "B2"],
  ["The data is stored in the cloud.", "Los datos se guardan en la nube.", "B2"],
  ["He must have forgotten about the meeting.", "Seguro se le olvidó la junta.", "B2"],
  ["By the end of the year, I'll have finished the project.", "Para fin de año habré terminado el proyecto.", "B2"],
  ["I wish I had more time to practice.", "Ojalá tuviera más tiempo para practicar.", "B2"],
  ["We need to figure out why the app keeps crashing.", "Tenemos que averiguar por qué la app se sigue cerrando.", "B2"],
];

// Situaciones para hablar: [título, situación, frases útiles]
const SITUATIONS = [
  ["Preséntate", "Habla 1 minuto: tu nombre, de dónde eres, qué estudias y qué te gusta hacer.", ["My name is...", "I'm from...", "I'm studying...", "In my free time, I like..."]],
  ["Tu rutina", "Describe un día normal, desde que te despiertas hasta que te duermes.", ["I usually wake up at...", "Then I...", "After class, I...", "I go to bed at..."]],
  ["Tu fin de semana", "Cuenta qué hiciste el fin de semana pasado (en pasado).", ["Last weekend I...", "On Saturday I went...", "After that, we...", "It was great because..."]],
  ["En una cafetería", "Pide una bebida y algo de comer, pregunta el precio y paga.", ["Can I have a...?", "How much is it?", "For here, please.", "Can I pay by card?"]],
  ["Pedir direcciones", "Estás perdido: pregunta cómo llegar a la estación y repite las indicaciones.", ["Excuse me, how do I get to...?", "Is it far from here?", "Turn left at the corner.", "Go straight for two blocks."]],
  ["Entrevista de trabajo", "Preséntate y explica por qué eres buen candidato para unas prácticas de desarrollo.", ["I'm a ... student.", "I have experience with...", "I'm good at...", "I'd like to learn..."]],
  ["Soporte técnico", "Un usuario no puede iniciar sesión. Hazle 3 preguntas y dale una solución.", ["What error message do you see?", "Have you tried resetting your password?", "Which browser are you using?", "Let's try clearing the cache."]],
  ["Junta diaria", "Di qué hiciste ayer, qué harás hoy y qué te está bloqueando.", ["Yesterday I worked on...", "Today I'm going to...", "I'm blocked by...", "I need help with..."]],
  ["Tus planes", "Habla de lo que vas a hacer cuando termines la carrera.", ["When I graduate, I'm going to...", "I'd like to work as...", "I hope to...", "Maybe I'll..."]],
  ["Una experiencia", "Cuenta la mejor experiencia o viaje que has tenido.", ["The best trip I've ever taken was...", "I went with...", "We visited...", "I'll never forget..."]],
  ["Da tu opinión", "¿Los estudiantes deberían usar IA en sus tareas? Da 2 razones.", ["In my opinion...", "On the one hand...", "On the other hand...", "To sum up..."]],
  ["Un problema que resolviste", "Describe un problema (de código, de escuela o personal) y cómo lo resolviste.", ["I had a problem with...", "At first, I tried...", "Finally, I figured out...", "Now I know that..."]],
  ["Si ganaras la lotería", "¿Qué harías si ganaras un millón de pesos? (condicional 2)", ["If I won a million pesos, I would...", "I'd also...", "I wouldn't...", "The first thing I'd do is..."]],
  ["Explica un sistema", "Explica cómo funciona una app que usas mucho (usa voz pasiva).", ["The app is used to...", "The data is stored...", "Users can...", "It's connected to..."]],
];

// Resumen de tiempos para consulta rápida.
const TENSES = [
  ["Presente simple", "I work. / She works.", "Hábitos y hechos"],
  ["Presente continuo", "I'm working.", "Ahora, temporal"],
  ["Presente perfecto", "I have worked.", "Experiencia, algo que sigue"],
  ["Pres. perfecto continuo", "I have been working.", "Duración hasta ahora"],
  ["Pasado simple", "I worked.", "Terminado, con fecha"],
  ["Pasado continuo", "I was working.", "En progreso en el pasado"],
  ["Pasado perfecto", "I had worked.", "Antes de otro pasado"],
  ["Futuro will", "I will work.", "Decisión, predicción"],
  ["Futuro going to", "I'm going to work.", "Plan ya decidido"],
  ["Futuro perfecto", "I will have worked.", "Terminado antes de un momento futuro"],
];

const GUIDE_DOCS = [
  ["00 · Mapa, método y cómo practicar", "https://claude.ai/artifact/CCNkGGcobswjwLgRqym86y"],
  ["01 · Gramática esencial", "https://claude.ai/artifact/6mMvmgxCsdU8w8FBfZgyfQ"],
  ["02 · Verbos I: tiempos verbales", "https://claude.ai/artifact/1SMkceUX2pKtTq5K1DMpeo"],
  ["03 · Verbos regulares e irregulares", "https://claude.ai/artifact/TEMqjqTFCTiRPvx1fUYQ9e"],
  ["04 · Verbos II: modales, condicionales, pasiva", "https://claude.ai/artifact/VzTTHtBv7A1hhEnbfKSGvm"],
  ["05 · Vocabulario, expresiones y pronunciación", "https://claude.ai/artifact/Q8pcam3SbRnR14KKWFeczC"],
  ["06 · Cuaderno de práctica y exámenes", "https://claude.ai/artifact/E4hGxkq7wqkT3h6H3hzucy"],
];

// ---- Construcción de mazos ----
const parseLines = (raw) => raw.trim().split("\n").map((l) => l.split("|"));

const COMMON = "be have do say go get make know think take see come give find tell become leave feel put bring begin keep hold write stand hear let mean set meet run pay sit speak lose buy send build understand eat drink read win teach choose break forget".split(" ");
const VERBS = parseLines(VERBS_RAW).map(([base, past, pp, es, group]) => ({ base, past, pp, es, group: Number(group) }))
  .sort((a, b) => (COMMON.indexOf(a.base) + 1 || 999) - (COMMON.indexOf(b.base) + 1 || 999));

const DECKS = {
  verbos: {
    name: "Verbos irregulares",
    desc: "Base → pasado → participio",
    cards: VERBS.map((v) => ({ id: "v:" + v.base, front: v.base, speak: `${v.base}, ${v.past.replace("/", ", ")}, ${v.pp}`, back: `${v.past} · ${v.pp}`, note: v.es })),
  },
  frases: {
    name: "Frases útiles",
    desc: "Para usar tal cual al hablar",
    cards: parseLines(PHRASES_RAW).map(([en, es]) => ({ id: "f:" + en, front: en, speak: en, back: es, note: "" })),
  },
  ti: {
    name: "Inglés para TI",
    desc: "Vocabulario de trabajo y código",
    cards: parseLines(TECH_RAW).map(([en, es, ex]) => ({ id: "t:" + en, front: en, speak: `${en}. ${ex}`, back: es, note: ex })),
  },
  phrasal: {
    name: "Phrasal verbs",
    desc: "Los más útiles del día a día",
    cards: parseLines(PHRASAL_RAW).map(([en, es, ex]) => ({ id: "p:" + en, front: en, speak: `${en}. ${ex}`, back: es, note: ex })),
  },
  falsos: {
    name: "Falsos amigos",
    desc: "Palabras que engañan",
    cards: parseLines(FALSE_FRIENDS_RAW).map(([en, es, not]) => ({ id: "ff:" + en, front: en, speak: en, back: es, note: not })),
  },
};
