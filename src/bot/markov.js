const titlegen = require('titlegen');

let generator = titlegen.create();
 
generator.feed(["The Shawshank Redemption",
"The Godfather",
"The Godfather: Part II",
"Il buono, il brutto, il cattivo.",
"Pulp Fiction",
"Inception",
"Schindler's List",
"12 Angry Men",
"One Flew Over the Cuckoo's Nest",
"The Dark Knight",
"Star Wars: Episode V - The Empire Strikes Back",
"The Lord of the Rings: The Return of the King",
"Shichinin no samurai",
"Star Wars",
"Goodfellas",
"Casablanca",
"Fight Club",
"Cidade de Deus",
"The Lord of the Rings: The Fellowship of the Ring",
"Rear Window",
"C'era una volta il West",
"Raiders of the Lost Ark",
"Toy Story 3",
"Psycho",
"The Usual Suspects",
"The Matrix",
"The Silence of the Lambs",
"Se7en",
"Memento",
"It's a Wonderful Life",
"The Lord of the Rings: The Two Towers",
"Sunset Blvd.",
"Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
"Forrest Gump",
"Léon",
"Citizen Kane",
"Apocalypse Now",
"North by Northwest",
"American Beauty",
"American History X",
"Taxi Driver",
"Terminator 2: Judgment Day",
"Saving Private Ryan",
"Vertigo",
"Le fabuleux destin d'Amélie Poulain",
"Alien",
"WALL·E",
"Lawrence of Arabia",
"The Shining",
"Sen to Chihiro no kamikakushi",
"Paths of Glory",
"A Clockwork Orange",
"Double Indemnity",
"To Kill a Mockingbird",
"The Pianist",
"Das Leben der Anderen",
"The Departed",
"M",
"City Lights",
"Aliens",
"Eternal Sunshine of the Spotless Mind",
"Requiem for a Dream",
"Das Boot",
"The Third Man",
"L.A. Confidential",
"Reservoir Dogs",
"Chinatown",
"The Treasure of the Sierra Madre",
"Modern Times",
"Monty Python and the Holy Grail",
"La vita è bella",
"Back to the Future",
"The Prestige",
"El laberinto del fauno",
"Raging Bull",
"Nuovo Cinema Paradiso",
"Singin' in the Rain",
"Some Like It Hot",
"The Bridge on the River Kwai",
"Rashômon",
"All About Eve",
"Amadeus",
"Once Upon a Time in America",
"The Green Mile",
"Full Metal Jacket",
"Inglourious Basterds",
"2001: A Space Odyssey",
"The Great Dictator",
"Braveheart",
"Ladri di biciclette",
"The Apartment",
"Up",
"Der Untergang",
"Gran Torino",
"Metropolis",
"The Sting",
"Gladiator",
"The Maltese Falcon",
"Unforgiven",
"Sin City",
"The Elephant Man",
"Mr. Smith Goes to Washington",
"Oldeuboi",
"On the Waterfront",
"Indiana Jones and the Last Crusade",
"Star Wars: Episode VI - Return of the Jedi",
"Rebecca",
"The Great Escape",
"Die Hard",
"Batman Begins",
"Mononoke-hime",
"Jaws",
"Hotel Rwanda",
"Slumdog Millionaire",
"Det sjunde inseglet",
"Blade Runner",
"Fargo",
"No Country for Old Men",
"Heat",
"The General",
"The Wizard of Oz",
"Touch of Evil",
"Per qualche dollaro in più",
"Ran",
"Yôjinbô",
"District 9",
"The Sixth Sense",
"Snatch.",
"Donnie Darko",
"Annie Hall",
"Witness for the Prosecution",
"Smultronstället",
"The Deer Hunter",
"Avatar",
"The Social Network",
"Cool Hand Luke",
"Strangers on a Train",
"High Noon",
"The Big Lebowski",
"Hotaru no haka",
"Kill Bill: Vol. 1",
"It Happened One Night",
"Platoon",
"The Lion King",
"Into the Wild",
"There Will Be Blood",
"Notorious",
"Million Dollar Baby",
"Toy Story",
"Butch Cassidy and the Sundance Kid",
"Gone with the Wind",
"Sunrise: A Song of Two Humans",
"The Wrestler",
"The Manchurian Candidate",
"Trainspotting",
"Ben-Hur",
"Scarface",
"The Grapes of Wrath",
"The Graduate",
"The Big Sleep",
"Groundhog Day",
"Life of Brian",
"The Gold Rush",
"The Bourne Ultimatum",
"Amores perros",
"Finding Nemo",
"The Terminator",
"Stand by Me",
"How to Train Your Dragon",
"The Best Years of Our Lives",
"Lock, Stock and Two Smoking Barrels",
"The Thing",
"The Kid",
"V for Vendetta",
"Casino",
"Twelve Monkeys",
"Dog Day Afternoon",
"Ratatouille",
"El secreto de sus ojos",
"Gandhi",
"Star Trek",
"Ikiru",
"Le salaire de la peur",
"Les diaboliques",
"8½",
"The Princess Bride",
"The Night of the Hunter",
"Judgment at Nuremberg",
"The Incredibles",
"Tonari no Totoro",
"The Hustler",
"Good Will Hunting",
"The Killing",
"In Bruges",
"The Wild Bunch",
"Network",
"Le scaphandre et le papillon",
"A Streetcar Named Desire",
"Les quatre cents coups",
"La strada",
"The Exorcist",
"Children of Men",
"Stalag 17",
"Persona",
"Who's Afraid of Virginia Woolf?",
"Ed Wood",
"Dial M for Murder",
"La battaglia di Algeri",
"Låt den rätte komma in",
"All Quiet on the Western Front",
"Big Fish",
"Magnolia",
"Rocky",
"La passion de Jeanne d'Arc",
"Kind Hearts and Coronets",
"Fanny och Alexander",
"Mystic River",
"Manhattan",
"Barry Lyndon",
"Kill Bill: Vol. 2",
"Mary and Max",
"Patton",
"Rosemary's Baby",
"Duck Soup",
"Festen",
"Kick-Ass",
"Fa yeung nin wa",
"Letters from Iwo Jima",
"Roman Holiday",
"Pirates of the Caribbean: The Curse of the Black Pearl",
"Mou gaan dou",
"The Truman Show",
"Crash (",
"Hauru no ugoku shiro",
"His Girl Friday",
"Arsenic and Old Lace",
"Harvey",
"Le notti di Cabiria",
"Trois couleurs: Rouge",
"The Philadelphia Story",
"A Christmas Story",
"Sleuth",
"King Kong",
"Bom yeoreum gaeul gyeoul geurigo bom",
"Rope",
"Monsters, Inc.",
"Tenkû no shiro Rapyuta",
"Yeopgijeogin geunyeo",
"Mulholland Dr.",
"The Man Who Shot Liberty Valance",
"The Shawshank Redemption",
"The Godfather",
"The Godfather: Part II",
"The Dark Knight",
"12 Angry Men",
"Schindler's List",
"Pulp Fiction",
"The Good, the Bad and the Ugly",
"The Lord of the Rings: The Return of the King",
"Fight Club",
"The Lord of the Rings: The Fellowship of the Ring",
"Star Wars: Episode V - The Empire Strikes Back",
"Forrest Gump",
"Inception",
"One Flew Over the Cuckoo's Nest",
"The Lord of the Rings: The Two Towers",
"Goodfellas",
"The Matrix",
"Star Wars",
"Seven Samurai",
"City of God",
"Se7en",
"The Silence of the Lambs",
"The Usual Suspects",
"It's a Wonderful Life",
"Life Is Beautiful",
"Léon: The Professional",
"Once Upon a Time in the West",
"Interstellar",
"Saving Private Ryan",
"American History X",
"Spirited Away",
"Casablanca",
"Raiders of the Lost Ark",
"Psycho",
"City Lights",
"Rear Window",
"The Intouchables",
"Modern Times",
"Terminator 2: Judgment Day",
"Whiplash",
"The Green Mile",
"The Pianist",
"Memento",
"The Departed",
"Gladiator",
"Apocalypse Now",
"Back to the Future",
"Sunset Blvd.",
"Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
"The Prestige",
"Alien",
"The Lion King",
"The Lives of Others",
"The Great Dictator",
"Inside Out",
"Cinema Paradiso",
"The Shining",
"Paths of Glory",
"Django Unchained",
"The Dark Knight Rises",
"WALL·E",
"American Beauty",
"Grave of the Fireflies",
"Aliens",
"Citizen Kane",
"North by Northwest",
"Princess Mononoke",
"Vertigo",
"Oldeuboi",
"Das Boot",
"M",
"Star Wars: Episode VI - Return of the Jedi",
"Once Upon a Time in America",
"Amélie",
"Witness for the Prosecution",
"Reservoir Dogs",
"Braveheart",
"Toy Story 3",
"A Clockwork Orange",
"Double Indemnity",
"Taxi Driver",
"Requiem for a Dream",
"To Kill a Mockingbird",
"Lawrence of Arabia",
"Eternal Sunshine of the Spotless Mind",
"Full Metal Jacket",
"The Sting",
"Amadeus",
"Bicycle Thieves",
"Singin' in the Rain",
"Monty Python and the Holy Grail",
"Snatch.",
"2001: A Space Odyssey",
"The Kid",
"L.A. Confidential",
"Rashômon",
"For a Few Dollars More",
"Toy Story",
"The Apartment",
"Inglourious Basterds",
"All About Eve",
"The Treasure of the Sierra Madre",
"Jodaeiye Nader az Simin",
"Indiana Jones and the Last Crusade",
"Metropolis",
"Yojimbo",
"The Third Man",
"Batman Begins",
"Scarface",
"Some Like It Hot",
"Unforgiven",
"3 Idiots",
"Up",
"Raging Bull",
"Downfall",
"Mad Max: Fury Road",
"Jagten",
"Chinatown",
"The Great Escape",
"Die Hard",
"Good Will Hunting",
"Heat",
"On the Waterfront",
"Pan's Labyrinth",
"Mr. Smith Goes to Washington",
"The Bridge on the River Kwai",
"My Neighbor Totoro",
"Ran",
"The Gold Rush",
"Ikiru",
"The Seventh Seal",
"Blade Runner",
"The Secret in Their Eyes",
"Wild Strawberries",
"The General",
"Lock, Stock and Two Smoking Barrels",
"The Elephant Man",
"Casino",
"The Wolf of Wall Street",
"Howl's Moving Castle",
"Warrior",
"Gran Torino",
"V for Vendetta",
"The Big Lebowski",
"Rebecca",
"Judgment at Nuremberg",
"A Beautiful Mind",
"Cool Hand Luke",
"The Deer Hunter",
"How to Train Your Dragon",
"Gone with the Wind",
"Fargo",
"Trainspotting",
"It Happened One Night",
"Dial M for Murder",
"Into the Wild",
"Gone Girl",
"The Sixth Sense",
"Rush",
"Finding Nemo",
"The Maltese Falcon",
"Mary and Max",
"No Country for Old Men",
"The Thing",
"Incendies",
"Hotel Rwanda",
"Kill Bill: Vol. 1",
"Life of Brian",
"Platoon",
"The Wages of Fear",
"Butch Cassidy and the Sundance Kid",
"There Will Be Blood",
"Network",
"Touch of Evil",
"The 400 Blows",
"Stand by Me",
"12 Years a Slave",
"The Princess Bride",
"Annie Hall",
"Persona",
"The Grand Budapest Hotel",
"Amores Perros",
"In the Name of the Father",
"Million Dollar Baby",
"Ben-Hur",
"The Grapes of Wrath",
"Hachi: A Dog's Tale",
"Nausicaä of the Valley of the Wind",
"Shutter Island",
"Diabolique",
"Sin City",
"The Wizard of Oz",
"Gandhi",
"Stalker",
"The Bourne Ultimatum",
"The Best Years of Our Lives",
"Donnie Darko",
"Relatos salvajes",
"8½",
"Strangers on a Train",
"Jurassic Park",
"The Avengers",
"Before Sunrise",
"Twelve Monkeys",
"The Terminator",
"Infernal Affairs",
"Jaws",
"The Battle of Algiers",
"Groundhog Day",
"Memories of Murder",
"Guardians of the Galaxy",
"Monsters, Inc.",
"Harry Potter and the Deathly Hallows: Part 2",
"Throne of Blood",
"The Truman Show",
"Fanny and Alexander",
"Barry Lyndon",
"Rocky",
"Dog Day Afternoon",
"The Imitation Game",
"Yip Man",
"The King's Speech",
"High Noon",
"La Haine",
"A Fistful of Dollars",
"Pirates of the Caribbean: The Curse of the Black Pearl",
"Notorious",
"Castle in the Sky",
"Prisoners",
"The Help",
"Who's Afraid of Virginia Woolf?",
"Roman Holiday",
"Spring, Summer, Fall, Winter... and Spring",
"The Night of the Hunter",
"Beauty and the Beast",
"La Strada",
"Papillon",
"X-Men: Days of Future Past",
"Before Sunset",
"Anatomy of a Murder",
"The Hustler",
"The Graduate",
"The Big Sleep",
"Underground",
"Elite Squad: The Enemy Within",
"Gangs of Wasseypur",
"Lagaan: Once Upon a Time in India",
"Paris, Texas",
"Akira"]);
 

for(let i = 0 ; i < 40;i++){
    console.log(generator.next());
}