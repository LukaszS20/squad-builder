// src/data/players.js

export let PLAYERS = [];

export const loadPlayers = async (onProgress) => {
  console.log('📋 Ładowanie lokalnej listy zawodników...');
  
  if (onProgress) {
    onProgress(1, 1, 'Ładowanie danych...');
  }
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  PLAYERS = getLocalPlayers();
  
  console.log(`✅ Załadowano ${PLAYERS.length} zawodników`);
  return PLAYERS;
};

const getLocalPlayers = () => {
  return [
    // ==================== BOŚNIA I HERCEGOWINA ====================
    // Bramkarze
    { id: 1, name: 'Nikola Vasilj', positions: ['GK'], primaryPosition: 'GK', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'FC St. Pauli' },
    { id: 2, name: 'Martin Zlomislić', positions: ['GK'], primaryPosition: 'GK', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'HNK Rijeka' },
    { id: 3, name: 'Osman Hadžikić', positions: ['GK'], primaryPosition: 'GK', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'NK Slaven Belupo' },
    // Obrońcy
    { id: 4, name: 'Sead Kolašinac', positions: ['CB', 'LB'], primaryPosition: 'DEF', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'Atalanta BC' },
    { id: 5, name: 'Amar Dedić', positions: ['RB', 'LB'], primaryPosition: 'DEF', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'SL Benfica' },
    { id: 6, name: 'Nihad Mujakić', positions: ['CB'], primaryPosition: 'DEF', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'Gaziantep FK' },
    { id: 7, name: 'Nikola Katić', positions: ['CB'], primaryPosition: 'DEF', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'FC Schalke 04' },
    { id: 8, name: 'Tarik Muharemović', positions: ['CB'], primaryPosition: 'DEF', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'US Sassuolo' },
    { id: 9, name: 'Stjepan Radeljić', positions: ['CB'], primaryPosition: 'DEF', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'HNK Rijeka' },
    { id: 10, name: 'Dennis Hadžikadunić', positions: ['CB'], primaryPosition: 'DEF', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'UC Sampdoria' },
    { id: 11, name: 'Nidal Čelik', positions: ['CB'], primaryPosition: 'DEF', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'RC Lens' },
    // Pomocnicy
    { id: 12, name: 'Amir Hadžiahmetović', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'Hull City' },
    { id: 13, name: 'Ivan Šunjić', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'Pafos FC' },
    { id: 14, name: 'Ivan Bašić', positions: ['CM'], primaryPosition: 'MID', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'FK Astana' },
    { id: 15, name: 'Dženis Burnić', positions: ['CM'], primaryPosition: 'MID', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'Karlsruher SC' },
    { id: 16, name: 'Ermin Mahmić', positions: ['CM'], primaryPosition: 'MID', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'Slovan Liberec' },
    { id: 17, name: 'Benjamin Tahirović', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'Brøndby IF' },
    { id: 18, name: 'Amar Memić', positions: ['CM'], primaryPosition: 'MID', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'Viktoria Pilzno' },
    { id: 19, name: 'Armin Gigović', positions: ['CM'], primaryPosition: 'MID', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'BSC Young Boys' },
    { id: 20, name: 'Kerim Alajbegović', positions: ['CAM', 'LW'], primaryPosition: 'MID', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'Red Bull Salzburg' },
    { id: 21, name: 'Esmir Bajraktarević', positions: ['CAM', 'RW'], primaryPosition: 'MID', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'PSV Eindhoven' },
    // Napastnicy
    { id: 22, name: 'Ermedin Demirović', positions: ['ST'], primaryPosition: 'FWD', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'VfB Stuttgart' },
    { id: 23, name: 'Jovo Lukić', positions: ['ST'], primaryPosition: 'FWD', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'Universitatea Kluż' },
    { id: 24, name: 'Samed Baždar', positions: ['ST'], primaryPosition: 'FWD', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'Jagiellonia Białystok' },
    { id: 25, name: 'Haris Tabaković', positions: ['ST'], primaryPosition: 'FWD', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'Borussia Mönchengladbach' },
    { id: 26, name: 'Edin Džeko', positions: ['ST'], primaryPosition: 'FWD', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'FC Schalke 04' },

    // ==================== HAITI ====================

// Bramkarze
{ id: 27, name: 'Johny Placide', positions: ['GK'], primaryPosition: 'GK', country: 'Haiti', flag: '🇭🇹', image: null, club: 'SC Bastia' },
{ id: 28, name: 'Alexandre Pierre', positions: ['GK'], primaryPosition: 'GK', country: 'Haiti', flag: '🇭🇹', image: null, club: 'FC Sochaux' },
{ id: 29, name: 'Josué Duverger', positions: ['GK'], primaryPosition: 'GK', country: 'Haiti', flag: '🇭🇹', image: null, club: 'FC Cosmos Koblenz' },

// Obrońcy
{ id: 30, name: 'Carlens Arcus', positions: ['RB', 'RWB'], primaryPosition: 'DEF', country: 'Haiti', flag: '🇭🇹', image: null, club: 'Angers SCO' },
{ id: 31, name: 'Wilguens Paugain', positions: ['CB'], primaryPosition: 'DEF', country: 'Haiti', flag: '🇭🇹', image: null, club: 'SV Zulte Waregem' },
{ id: 32, name: 'Duke Lacroix', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'Haiti', flag: '🇭🇹', image: null, club: 'Colorado Springs Switchbacks' },
{ id: 33, name: 'Martin Expérience', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'Haiti', flag: '🇭🇹', image: null, club: 'AS Nancy' },
{ id: 34, name: 'Jean-Kévin Duverne', positions: ['CB'], primaryPosition: 'DEF', country: 'Haiti', flag: '🇭🇹', image: null, club: 'KAA Gent' },
{ id: 35, name: 'Ricardo Adé', positions: ['CB'], primaryPosition: 'DEF', country: 'Haiti', flag: '🇭🇹', image: null, club: 'LDU Quito' },
{ id: 36, name: 'Hannes Delcroix', positions: ['CB'], primaryPosition: 'DEF', country: 'Haiti', flag: '🇭🇹', image: null, club: 'FC Lugano' },
{ id: 37, name: 'Keeto Thermoncy', positions: ['CB'], primaryPosition: 'DEF', country: 'Haiti', flag: '🇭🇹', image: null, club: 'BSC Young Boys U21' },

// Pomocnicy
{ id: 38, name: 'Carl-Fred Sainté', positions: ['CM'], primaryPosition: 'MID', country: 'Haiti', flag: '🇭🇹', image: null, club: 'El Paso Locomotive' },
{ id: 39, name: 'Leverton Pierre', positions: ['CM'], primaryPosition: 'MID', country: 'Haiti', flag: '🇭🇹', image: null, club: 'FC Vizela' },
{ id: 40, name: 'Danley Jean Jacques', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Haiti', flag: '🇭🇹', image: null, club: 'Philadelphia Union' },
{ id: 41, name: 'Jean-Ricner Bellegarde', positions: ['CM', 'CAM'], primaryPosition: 'MID', country: 'Haiti', flag: '🇭🇹', image: null, club: 'Wolverhampton Wanderers' },
{ id: 42, name: 'Woodensky Pierre', positions: ['CM'], primaryPosition: 'MID', country: 'Haiti', flag: '🇭🇹', image: null, club: 'Violette AC' },
{ id: 43, name: 'Dominique Simon', positions: ['CM'], primaryPosition: 'MID', country: 'Haiti', flag: '🇭🇹', image: null, club: 'Tatran Preszów' },

// Napastnicy
{ id: 44, name: 'Louicius Deedson', positions: ['LW', 'ST'], primaryPosition: 'FWD', country: 'Haiti', flag: '🇭🇹', image: null, club: 'FC Dallas' },
{ id: 45, name: 'Josué Casimir', positions: ['RW'], primaryPosition: 'FWD', country: 'Haiti', flag: '🇭🇹', image: null, club: 'AJ Auxerre' },
{ id: 46, name: 'Derrick Etienne Jr.', positions: ['LW', 'RW'], primaryPosition: 'FWD', country: 'Haiti', flag: '🇭🇹', image: null, club: 'Toronto FC' },
{ id: 47, name: 'Ruben Providence', positions: ['LW'], primaryPosition: 'FWD', country: 'Haiti', flag: '🇭🇹', image: null, club: 'Almere City' },
{ id: 48, name: 'Duckens Nazon', positions: ['ST'], primaryPosition: 'FWD', country: 'Haiti', flag: '🇭🇹', image: null, club: 'Esteghlal FC' },
{ id: 49, name: 'Frantzdy Pierrot', positions: ['ST'], primaryPosition: 'FWD', country: 'Haiti', flag: '🇭🇹', image: null, club: 'Çaykur Rizespor' },
{ id: 50, name: 'Wilson Isidor', positions: ['ST'], primaryPosition: 'FWD', country: 'Haiti', flag: '🇭🇹', image: null, club: 'Sunderland' },
{ id: 51, name: 'Yassin Fortuné', positions: ['RW', 'ST'], primaryPosition: 'FWD', country: 'Haiti', flag: '🇭🇹', image: null, club: 'FC Vizela' },
{ id: 52, name: 'Lenny Joseph', positions: ['ST'], primaryPosition: 'FWD', country: 'Haiti', flag: '🇭🇹', image: null, club: 'Ferencvárosi TC' },

   

   // ==================== WYBRZEŻE KOŚCI SŁONIOWEJ ====================
// Bramkarze
{ id: 53, name: 'Yahia Fofana', positions: ['GK'], primaryPosition: 'GK', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'Çaykur Rizespor' },
{ id: 54, name: 'Mohamed Koné', positions: ['GK'], primaryPosition: 'GK', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'Royal Charleroi' },
{ id: 55, name: 'Alban Lafont', positions: ['GK'], primaryPosition: 'GK', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'Panathinaikos AO' },

// Obrońcy
{ id: 56, name: 'Emmanuel Agbadou', positions: ['CB'], primaryPosition: 'DEF', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'Beşiktaş JK' },
{ id: 57, name: 'Clément Akpa', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'AJ Auxerre' },
{ id: 58, name: 'Ousmane Diomande', positions: ['CB'], primaryPosition: 'DEF', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'Sporting CP' },
{ id: 59, name: 'Guéla Doué', positions: ['RB', 'RWB'], primaryPosition: 'DEF', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'RC Strasbourg' },
{ id: 60, name: 'Ghislain Konan', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'Gil Vicente FC' },
{ id: 61, name: 'Odilon Kossounou', positions: ['CB'], primaryPosition: 'DEF', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'Atalanta BC' },
{ id: 62, name: 'Evan Ndicka', positions: ['CB'], primaryPosition: 'DEF', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'AS Roma' },
{ id: 63, name: 'Wilfried Singo', positions: ['RB', 'CB'], primaryPosition: 'DEF', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'Galatasaray SK' },

// Pomocnicy
{ id: 64, name: 'Seko Fofana', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'FC Porto' },
{ id: 65, name: 'Parfait Guiagon', positions: ['CAM', 'RW'], primaryPosition: 'MID', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'Royal Charleroi' },
{ id: 66, name: 'Christ Inao Oulaï', positions: ['CM'], primaryPosition: 'MID', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'Trabzonspor' },
{ id: 67, name: 'Franck Kessié', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'Al-Ahli' },
{ id: 68, name: 'Ibrahim Sangaré', positions: ['CDM'], primaryPosition: 'MID', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'Nottingham Forest' },
{ id: 69, name: 'Jean Michaël Seri', positions: ['CM'], primaryPosition: 'MID', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'NK Maribor' },

// Napastnicy
{ id: 70, name: 'Simon Adingra', positions: ['LW', 'RW'], primaryPosition: 'FWD', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'AS Monaco' },
{ id: 71, name: 'Ange-Yoan Bonny', positions: ['ST'], primaryPosition: 'FWD', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'Inter Mediolan' },
{ id: 72, name: 'Amad Diallo', positions: ['RW', 'CAM'], primaryPosition: 'FWD', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'Manchester United' },
{ id: 73, name: 'Oumar Diakité', positions: ['ST'], primaryPosition: 'FWD', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'Cercle Brugge' },
{ id: 74, name: 'Yan Diomande', positions: ['LW'], primaryPosition: 'FWD', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'RB Leipzig' },
{ id: 75, name: 'Evann Guessand', positions: ['ST', 'RW'], primaryPosition: 'FWD', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'Crystal Palace' },
{ id: 76, name: 'Nicolas Pépé', positions: ['RW', 'LW'], primaryPosition: 'FWD', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'Villarreal CF' },
{ id: 77, name: 'Bazoumana Touré', positions: ['LW'], primaryPosition: 'FWD', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'TSG Hoffenheim' },
{ id: 78, name: 'Elye Wahi', positions: ['ST'], primaryPosition: 'FWD', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'OGC Nice' },

   // ==================== JAPONIA ====================
// Bramkarze
{ id: 79, name: 'Tomoki Hayakawa', positions: ['GK'], primaryPosition: 'GK', country: 'Japonia', flag: '🇯🇵', image: null, club: 'Kashima Antlers' },
{ id: 80, name: 'Keisuke Ōsako', positions: ['GK'], primaryPosition: 'GK', country: 'Japonia', flag: '🇯🇵', image: null, club: 'Sanfrecce Hiroszima' },
{ id: 81, name: 'Zion Suzuki', positions: ['GK'], primaryPosition: 'GK', country: 'Japonia', flag: '🇯🇵', image: null, club: 'Parma Calcio' },

// Obrońcy
{ id: 82, name: 'Yūto Nagatomo', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'Japonia', flag: '🇯🇵', image: null, club: 'FC Tokyo' },
{ id: 83, name: 'Shōgo Taniguchi', positions: ['CB'], primaryPosition: 'DEF', country: 'Japonia', flag: '🇯🇵', image: null, club: 'Sint-Truidense VV' },
{ id: 84, name: 'Kō Itakura', positions: ['CB'], primaryPosition: 'DEF', country: 'Japonia', flag: '🇯🇵', image: null, club: 'AFC Ajax' },
{ id: 85, name: 'Tsuyoshi Watanabe', positions: ['CB'], primaryPosition: 'DEF', country: 'Japonia', flag: '🇯🇵', image: null, club: 'Feyenoord' },
{ id: 86, name: 'Hiroki Itō', positions: ['CB', 'LB'], primaryPosition: 'DEF', country: 'Japonia', flag: '🇯🇵', image: null, club: 'Bayern Monachium' },
{ id: 87, name: 'Ayumu Seko', positions: ['CB'], primaryPosition: 'DEF', country: 'Japonia', flag: '🇯🇵', image: null, club: 'Le Havre AC' },
{ id: 88, name: 'Yukinari Sugawara', positions: ['RB', 'RWB'], primaryPosition: 'DEF', country: 'Japonia', flag: '🇯🇵', image: null, club: 'Werder Brema' },
{ id: 89, name: 'Junnosuke Suzuki', positions: ['RB', 'RWB'], primaryPosition: 'DEF', country: 'Japonia', flag: '🇯🇵', image: null, club: 'FC Kopenhaga' },

// Pomocnicy
{ id: 90, name: 'Wataru Endō', positions: ['CDM', 'CM'], primaryPosition: 'MID', country: 'Japonia', flag: '🇯🇵', image: null, club: 'Liverpool' },
{ id: 91, name: 'Junya Itō', positions: ['RW'], primaryPosition: 'MID', country: 'Japonia', flag: '🇯🇵', image: null, club: 'KRC Genk' },
{ id: 92, name: 'Daichi Kamada', positions: ['CAM', 'CM'], primaryPosition: 'MID', country: 'Japonia', flag: '🇯🇵', image: null, club: 'Crystal Palace' },
{ id: 93, name: 'Ritsu Dōan', positions: ['RW', 'LW'], primaryPosition: 'MID', country: 'Japonia', flag: '🇯🇵', image: null, club: 'Eintracht Frankfurt' },
{ id: 94, name: 'Ao Tanaka', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Japonia', flag: '🇯🇵', image: null, club: 'Leeds United' },
{ id: 95, name: 'Keito Nakamura', positions: ['LW'], primaryPosition: 'MID', country: 'Japonia', flag: '🇯🇵', image: null, club: 'Stade de Reims' },
{ id: 96, name: 'Kaishū Sano', positions: ['CDM'], primaryPosition: 'MID', country: 'Japonia', flag: '🇯🇵', image: null, club: '1. FSV Mainz 05' },
{ id: 97, name: 'Takefusa Kubo', positions: ['RW', 'CAM'], primaryPosition: 'MID', country: 'Japonia', flag: '🇯🇵', image: null, club: 'Real Sociedad' },

// Napastnicy
{ id: 98, name: 'Kōki Ogawa', positions: ['ST'], primaryPosition: 'FWD', country: 'Japonia', flag: '🇯🇵', image: null, club: 'NEC Nijmegen' },
{ id: 99, name: 'Daizen Maeda', positions: ['ST', 'LW'], primaryPosition: 'FWD', country: 'Japonia', flag: '🇯🇵', image: null, club: 'Celtic' },
{ id: 100, name: 'Ayase Ueda', positions: ['ST'], primaryPosition: 'FWD', country: 'Japonia', flag: '🇯🇵', image: null, club: 'Feyenoord' },
{ id: 101, name: 'Yuito Suzuki', positions: ['RW', 'LW'], primaryPosition: 'FWD', country: 'Japonia', flag: '🇯🇵', image: null, club: 'SC Freiburg' },
{ id: 102, name: 'Kento Shiogai', positions: ['ST'], primaryPosition: 'FWD', country: 'Japonia', flag: '🇯🇵', image: null, club: 'VfL Wolfsburg' },
{ id: 103, name: 'Keisuke Gotō', positions: ['ST'], primaryPosition: 'FWD', country: 'Japonia', flag: '🇯🇵', image: null, club: 'Sint-Truidense VV' },

   // ==================== SZWECJA ====================
// Bramkarze
{ id: 104, name: 'Viktor Johansson', positions: ['GK'], primaryPosition: 'GK', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Stoke City' },
{ id: 105, name: 'Kristoffer Nordfeldt', positions: ['GK'], primaryPosition: 'GK', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'AIK Fotboll' },
{ id: 106, name: 'Jacob Widell Zetterström', positions: ['GK'], primaryPosition: 'GK', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Derby County' },

// Obrońcy
{ id: 107, name: 'Hjalmar Ekdal', positions: ['CB'], primaryPosition: 'DEF', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Burnley' },
{ id: 108, name: 'Gabriel Gudmundsson', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Leeds United' },
{ id: 109, name: 'Isak Hien', positions: ['CB'], primaryPosition: 'DEF', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Atalanta BC' },
{ id: 110, name: 'Emil Holm', positions: ['RB', 'RWB'], primaryPosition: 'DEF', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Juventus' },
{ id: 111, name: 'Gustaf Lagerbielke', positions: ['CB'], primaryPosition: 'DEF', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'SC Braga' },
{ id: 112, name: 'Victor Lindelöf', positions: ['CB'], primaryPosition: 'DEF', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Aston Villa' },
{ id: 113, name: 'Eric Smith', positions: ['CB', 'CDM'], primaryPosition: 'DEF', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'FC St. Pauli' },
{ id: 114, name: 'Carl Starfelt', positions: ['CB'], primaryPosition: 'DEF', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Celta Vigo' },
{ id: 115, name: 'Elliot Stroud', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Mjällby AIF' },
{ id: 116, name: 'Daniel Svensson', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Borussia Dortmund' },

// Pomocnicy
{ id: 117, name: 'Taha Ali', positions: ['RW', 'LW'], primaryPosition: 'MID', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Malmö FF' },
{ id: 118, name: 'Yasin Ayari', positions: ['CM'], primaryPosition: 'MID', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Brighton & Hove Albion' },
{ id: 119, name: 'Lucas Bergvall', positions: ['CM', 'CAM'], primaryPosition: 'MID', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Tottenham Hotspur' },
{ id: 120, name: 'Jesper Karlström', positions: ['CDM'], primaryPosition: 'MID', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Udinese Calcio' },
{ id: 121, name: 'Ken Sema', positions: ['LM', 'LW'], primaryPosition: 'MID', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Pafos FC' },
{ id: 122, name: 'Mattias Svanberg', positions: ['CM'], primaryPosition: 'MID', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'VfL Wolfsburg' },
{ id: 123, name: 'Besfort Zeneli', positions: ['CM'], primaryPosition: 'MID', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Royale Union Saint-Gilloise' },

// Napastnicy
{ id: 124, name: 'Alexander Bernhardsson', positions: ['ST', 'RW'], primaryPosition: 'FWD', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Holstein Kiel' },
{ id: 125, name: 'Anthony Elanga', positions: ['RW', 'LW'], primaryPosition: 'FWD', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Newcastle United' },
{ id: 126, name: 'Viktor Gyökeres', positions: ['ST'], primaryPosition: 'FWD', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Arsenal' },
{ id: 127, name: 'Alexander Isak', positions: ['ST'], primaryPosition: 'FWD', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Liverpool' },
{ id: 128, name: 'Gustaf Nilsson', positions: ['ST'], primaryPosition: 'FWD', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Club Brugge' },
{ id: 129, name: 'Benjamin Nygren', positions: ['RW', 'CAM'], primaryPosition: 'FWD', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Celtic' },

   // ==================== TUNEZJA ====================
// Bramkarze
{ id: 130, name: 'Aymen Dahmen', positions: ['GK'], primaryPosition: 'GK', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'Club Sportif Sfaxien' },
{ id: 131, name: 'Sabri Ben Hessen', positions: ['GK'], primaryPosition: 'GK', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'Étoile Sportive du Sahel' },
{ id: 132, name: 'Abdelmouhib Chamakh', positions: ['GK'], primaryPosition: 'GK', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'Club Africain' },

// Obrońcy
{ id: 133, name: 'Montassar Talbi', positions: ['CB'], primaryPosition: 'DEF', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'FC Lorient' },
{ id: 134, name: 'Dylan Bronn', positions: ['CB'], primaryPosition: 'DEF', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'Servette FC' },
{ id: 135, name: 'Omar Rekik', positions: ['CB'], primaryPosition: 'DEF', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'NK Maribor' },
{ id: 136, name: 'Adem Arous', positions: ['RB', 'RWB'], primaryPosition: 'DEF', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'Kasımpaşa SK' },
{ id: 137, name: 'Raed Chikhaoui', positions: ['CB'], primaryPosition: 'DEF', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'US Monastir' },
{ id: 138, name: 'Yan Valery', positions: ['RB', 'RWB'], primaryPosition: 'DEF', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'BSC Young Boys' },
{ id: 139, name: 'Moutaz Neffati', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'IFK Norrköping' },
{ id: 140, name: 'Ali Abdi', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'OGC Nice' },
{ id: 141, name: 'Mohamed Amine Ben Hamida', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'Espérance Tunis' },

// Pomocnicy
{ id: 142, name: 'Ellyes Skhiri', positions: ['CDM', 'CM'], primaryPosition: 'MID', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'Eintracht Frankfurt' },
{ id: 143, name: 'Mohamed Belhadj Mahmoud', positions: ['CM'], primaryPosition: 'MID', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'FC Lugano' },
{ id: 144, name: 'Rani Khedira', positions: ['CDM'], primaryPosition: 'MID', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'Union Berlin' },
{ id: 145, name: 'Hannibal Mejbri', positions: ['CAM', 'CM'], primaryPosition: 'MID', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'Burnley' },
{ id: 146, name: 'Anis Ben Slimane', positions: ['CM', 'CAM'], primaryPosition: 'MID', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'Norwich City' },
{ id: 147, name: 'Mortadha Ben Ouanes', positions: ['LM', 'LW'], primaryPosition: 'MID', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'Kasımpaşa SK' },
{ id: 148, name: 'Ismaël Gharbi', positions: ['CAM', 'LW'], primaryPosition: 'MID', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'FC Augsburg' },

// Napastnicy
{ id: 149, name: 'Khalil Ayari', positions: ['ST'], primaryPosition: 'FWD', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'Paris Saint-Germain U21' },
{ id: 150, name: 'Sebastian Tounekti', positions: ['LW', 'RW'], primaryPosition: 'FWD', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'Celtic' },
{ id: 151, name: 'Elias Achouri', positions: ['LW', 'RW'], primaryPosition: 'FWD', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'FC Kopenhaga' },
{ id: 152, name: 'Firas Chaouat', positions: ['ST'], primaryPosition: 'FWD', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'Club Africain' },
{ id: 153, name: 'Hazem Mastouri', positions: ['ST'], primaryPosition: 'FWD', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'Dinamo Machaczkała' },
{ id: 154, name: 'Elias Saad', positions: ['LW'], primaryPosition: 'FWD', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'Hannover 96' },
{ id: 155, name: 'Rayan Elloumi', positions: ['RW'], primaryPosition: 'FWD', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'Vancouver Whitecaps' },

   // ==================== BELGIA ====================
// Bramkarze
{ id: 156, name: 'Thibaut Courtois', positions: ['GK'], primaryPosition: 'GK', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Real Madryt' },
{ id: 157, name: 'Senne Lammens', positions: ['GK'], primaryPosition: 'GK', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Manchester United' },
{ id: 158, name: 'Mike Penders', positions: ['GK'], primaryPosition: 'GK', country: 'Belgia', flag: '🇧🇪', image: null, club: 'RC Strasbourg' },

// Obrońcy
{ id: 159, name: 'Timothy Castagne', positions: ['RB', 'LB'], primaryPosition: 'DEF', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Fulham' },
{ id: 160, name: 'Zeno Debast', positions: ['CB'], primaryPosition: 'DEF', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Sporting CP' },
{ id: 161, name: 'Maxim De Cuyper', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Brighton & Hove Albion' },
{ id: 162, name: 'Koni De Winter', positions: ['CB'], primaryPosition: 'DEF', country: 'Belgia', flag: '🇧🇪', image: null, club: 'AC Milan' },
{ id: 163, name: 'Brandon Mechele', positions: ['CB'], primaryPosition: 'DEF', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Club Brugge' },
{ id: 164, name: 'Thomas Meunier', positions: ['RB', 'RWB'], primaryPosition: 'DEF', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Lille OSC' },
{ id: 165, name: 'Nathan Ngoy', positions: ['CB'], primaryPosition: 'DEF', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Lille OSC' },
{ id: 166, name: 'Joaquin Seys', positions: ['CB', 'RB'], primaryPosition: 'DEF', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Club Brugge' },
{ id: 167, name: 'Arthur Theate', positions: ['CB', 'LB'], primaryPosition: 'DEF', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Eintracht Frankfurt' },

// Pomocnicy
{ id: 168, name: 'Kevin De Bruyne', positions: ['CM', 'CAM'], primaryPosition: 'MID', country: 'Belgia', flag: '🇧🇪', image: null, club: 'SSC Napoli' },
{ id: 169, name: 'Amadou Onana', positions: ['CDM', 'CM'], primaryPosition: 'MID', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Aston Villa' },
{ id: 170, name: 'Nicolas Raskin', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Rangers' },
{ id: 171, name: 'Youri Tielemans', positions: ['CM'], primaryPosition: 'MID', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Aston Villa' },
{ id: 172, name: 'Hans Vanaken', positions: ['CAM', 'CM'], primaryPosition: 'MID', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Club Brugge' },
{ id: 173, name: 'Axel Witsel', positions: ['CDM', 'CM'], primaryPosition: 'MID', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Girona FC' },

// Napastnicy
{ id: 174, name: 'Charles De Ketelaere', positions: ['SS', 'CAM'], primaryPosition: 'FWD', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Atalanta BC' },
{ id: 175, name: 'Jérémy Doku', positions: ['LW', 'RW'], primaryPosition: 'FWD', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Manchester City' },
{ id: 176, name: 'Matias Fernandez-Pardo', positions: ['RW', 'LW'], primaryPosition: 'FWD', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Lille OSC' },
{ id: 177, name: 'Romelu Lukaku', positions: ['ST'], primaryPosition: 'FWD', country: 'Belgia', flag: '🇧🇪', image: null, club: 'SSC Napoli' },
{ id: 178, name: 'Dodi Lukebakio', positions: ['RW', 'LW'], primaryPosition: 'FWD', country: 'Belgia', flag: '🇧🇪', image: null, club: 'SL Benfica' },
{ id: 179, name: 'Diego Moreira', positions: ['LW', 'LM'], primaryPosition: 'FWD', country: 'Belgia', flag: '🇧🇪', image: null, club: 'RC Strasbourg' },
{ id: 180, name: 'Alexis Saelemaekers', positions: ['RW', 'RM'], primaryPosition: 'FWD', country: 'Belgia', flag: '🇧🇪', image: null, club: 'AC Milan' },
{ id: 181, name: 'Leandro Trossard', positions: ['LW', 'RW'], primaryPosition: 'FWD', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Arsenal' },

    // ==================== NOWA ZELANDIA ====================

// Bramkarze
{ id: 182, name: 'Max Crocombe', positions: ['GK'], primaryPosition: 'GK', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Millwall' },
{ id: 183, name: 'Alex Paulsen', positions: ['GK'], primaryPosition: 'GK', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Lechia Gdańsk' },
{ id: 184, name: 'Michael Woud', positions: ['GK'], primaryPosition: 'GK', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Auckland FC' },

// Obrońcy
{ id: 185, name: 'Tim Payne', positions: ['RB', 'RWB'], primaryPosition: 'DEF', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Wellington Phoenix' },
{ id: 186, name: 'Francis de Vries', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Auckland FC' },
{ id: 187, name: 'Tyler Bindon', positions: ['CB'], primaryPosition: 'DEF', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Sheffield United' },
{ id: 188, name: 'Michael Boxall', positions: ['CB'], primaryPosition: 'DEF', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Minnesota United' },
{ id: 189, name: 'Elijah Just', positions: ['RB', 'RM'], primaryPosition: 'DEF', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Motherwell' },
{ id: 190, name: 'Liberato Cacace', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Wrexham' },
{ id: 191, name: 'Nando Pijnaker', positions: ['CB'], primaryPosition: 'DEF', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Auckland FC' },
{ id: 192, name: 'Finn Surman', positions: ['CB'], primaryPosition: 'DEF', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Portland Timbers' },
{ id: 193, name: 'Callan Elliot', positions: ['RB', 'RWB'], primaryPosition: 'DEF', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Auckland FC' },
{ id: 194, name: 'Tommy Smith', positions: ['CB'], primaryPosition: 'DEF', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Braintree Town' },

// Pomocnicy
{ id: 195, name: 'Joe Bell', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Viking FK' },
{ id: 196, name: 'Matthew Garbett', positions: ['CM'], primaryPosition: 'MID', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Peterborough United' },
{ id: 197, name: 'Marko Stamenic', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Swansea City' },
{ id: 198, name: 'Sarpreet Singh', positions: ['CAM', 'CM'], primaryPosition: 'MID', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Wellington Phoenix' },
{ id: 199, name: 'Alex Rufer', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Wellington Phoenix' },
{ id: 200, name: 'Ben Old', positions: ['CAM', 'LM'], primaryPosition: 'MID', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'AS Saint-Étienne' },
{ id: 201, name: 'Callum McCowatt', positions: ['CAM', 'RW'], primaryPosition: 'MID', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Silkeborg IF' },
{ id: 202, name: 'Ryan Thomas', positions: ['CM'], primaryPosition: 'MID', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'PEC Zwolle' },
{ id: 203, name: 'Lachlan Bayliss', positions: ['CM'], primaryPosition: 'MID', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Newcastle Jets' },

// Napastnicy
{ id: 204, name: 'Chris Wood', positions: ['ST'], primaryPosition: 'FWD', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Nottingham Forest' },
{ id: 205, name: 'Kosta Barbarouses', positions: ['ST', 'RW'], primaryPosition: 'FWD', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Western Sydney Wanderers' },
{ id: 206, name: 'Ben Waine', positions: ['ST'], primaryPosition: 'FWD', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Port Vale' },
{ id: 207, name: 'Jesse Randall', positions: ['ST'], primaryPosition: 'FWD', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Auckland FC' },

    // ==================== FRANCJA ====================

// Bramkarze
{ id: 208, name: 'Mike Maignan', positions: ['GK'], primaryPosition: 'GK', country: 'Francja', flag: '🇫🇷', image: null, club: 'AC Milan' },
{ id: 209, name: 'Robin Risser', positions: ['GK'], primaryPosition: 'GK', country: 'Francja', flag: '🇫🇷', image: null, club: 'RC Lens' },
{ id: 210, name: 'Brice Samba', positions: ['GK'], primaryPosition: 'GK', country: 'Francja', flag: '🇫🇷', image: null, club: 'Stade Rennais' },

// Obrońcy
{ id: 211, name: 'Lucas Digne', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'Francja', flag: '🇫🇷', image: null, club: 'Aston Villa' },
{ id: 212, name: 'Malo Gusto', positions: ['RB', 'RWB'], primaryPosition: 'DEF', country: 'Francja', flag: '🇫🇷', image: null, club: 'Chelsea' },
{ id: 213, name: 'Lucas Hernández', positions: ['CB', 'LB'], primaryPosition: 'DEF', country: 'Francja', flag: '🇫🇷', image: null, club: 'Paris Saint-Germain' },
{ id: 214, name: 'Theo Hernández', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'Francja', flag: '🇫🇷', image: null, club: 'Al-Hilal' },
{ id: 215, name: 'Ibrahima Konaté', positions: ['CB'], primaryPosition: 'DEF', country: 'Francja', flag: '🇫🇷', image: null, club: 'Liverpool' },
{ id: 216, name: 'Jules Koundé', positions: ['CB', 'RB'], primaryPosition: 'DEF', country: 'Francja', flag: '🇫🇷', image: null, club: 'FC Barcelona' },
{ id: 217, name: 'Maxence Lacroix', positions: ['CB'], primaryPosition: 'DEF', country: 'Francja', flag: '🇫🇷', image: null, club: 'Crystal Palace' },
{ id: 218, name: 'William Saliba', positions: ['CB'], primaryPosition: 'DEF', country: 'Francja', flag: '🇫🇷', image: null, club: 'Arsenal' },
{ id: 219, name: 'Dayot Upamecano', positions: ['CB'], primaryPosition: 'DEF', country: 'Francja', flag: '🇫🇷', image: null, club: 'Bayern Monachium' },

// Pomocnicy
{ id: 220, name: 'N’Golo Kanté', positions: ['CDM', 'CM'], primaryPosition: 'MID', country: 'Francja', flag: '🇫🇷', image: null, club: 'Fenerbahçe SK' },
{ id: 221, name: 'Manu Koné', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Francja', flag: '🇫🇷', image: null, club: 'AS Roma' },
{ id: 222, name: 'Adrien Rabiot', positions: ['CM'], primaryPosition: 'MID', country: 'Francja', flag: '🇫🇷', image: null, club: 'AC Milan' },
{ id: 223, name: 'Aurélien Tchouaméni', positions: ['CDM', 'CM'], primaryPosition: 'MID', country: 'Francja', flag: '🇫🇷', image: null, club: 'Real Madryt' },
{ id: 224, name: 'Warren Zaïre-Emery', positions: ['CM'], primaryPosition: 'MID', country: 'Francja', flag: '🇫🇷', image: null, club: 'Paris Saint-Germain' },

// Napastnicy
{ id: 225, name: 'Maghnes Akliouche', positions: ['RW', 'CAM'], primaryPosition: 'FWD', country: 'Francja', flag: '🇫🇷', image: null, club: 'AS Monaco' },
{ id: 226, name: 'Bradley Barcola', positions: ['LW'], primaryPosition: 'FWD', country: 'Francja', flag: '🇫🇷', image: null, club: 'Paris Saint-Germain' },
{ id: 227, name: 'Rayan Cherki', positions: ['CAM', 'RW'], primaryPosition: 'FWD', country: 'Francja', flag: '🇫🇷', image: null, club: 'Manchester City' },
{ id: 228, name: 'Ousmane Dembélé', positions: ['RW', 'LW'], primaryPosition: 'FWD', country: 'Francja', flag: '🇫🇷', image: null, club: 'Paris Saint-Germain' },
{ id: 229, name: 'Désiré Doué', positions: ['LW', 'CAM'], primaryPosition: 'FWD', country: 'Francja', flag: '🇫🇷', image: null, club: 'Paris Saint-Germain' },
{ id: 230, name: 'Jean-Philippe Mateta', positions: ['ST'], primaryPosition: 'FWD', country: 'Francja', flag: '🇫🇷', image: null, club: 'Crystal Palace' },
{ id: 231, name: 'Kylian Mbappé', positions: ['ST', 'LW'], primaryPosition: 'FWD', country: 'Francja', flag: '🇫🇷', image: null, club: 'Real Madryt' },
{ id: 232, name: 'Michael Olise', positions: ['RW', 'CAM'], primaryPosition: 'FWD', country: 'Francja', flag: '🇫🇷', image: null, club: 'Bayern Monachium' },
{ id: 233, name: 'Marcus Thuram', positions: ['ST', 'LW'], primaryPosition: 'FWD', country: 'Francja', flag: '🇫🇷', image: null, club: 'Inter Mediolan' }
  ];
};

export const getPlayers = () => PLAYERS;
export const getPlayerById = (id) => PLAYERS.find(p => p.id === id);
export const getPlayersByPosition = (position) => PLAYERS.filter(p => p.positions.includes(position));
export const getPlayersByCountry = (country) => PLAYERS.filter(p => p.country === country);