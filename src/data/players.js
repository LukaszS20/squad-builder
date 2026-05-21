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
{ id: 1, name: 'Nikola Vasilj', positions: ['GK'], primaryPosition: 'GK', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'FC St. Pauli', age: 30, height: 193, preferredFoot: 'Right', marketValue: '€4.5m' },
{ id: 2, name: 'Martin Zlomislić', positions: ['GK'], primaryPosition: 'GK', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'HNK Rijeka', age: 27, height: 199, preferredFoot: 'Right', marketValue: '€2m' },
{ id: 3, name: 'Osman Hadžikić', positions: ['GK'], primaryPosition: 'GK', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'NK Slaven Belupo', age: 29, height: 186, preferredFoot: 'Right', marketValue: '€400k' },

// Obrońcy
{ id: 4, name: 'Sead Kolašinac', positions: ['CB', 'LB'], primaryPosition: 'DEF', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'Atalanta BC', age: 32, height: 183, preferredFoot: 'Left', marketValue: '€6m' },
{ id: 5, name: 'Amar Dedić', positions: ['RB', 'LB'], primaryPosition: 'DEF', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'SL Benfica', age: 23, height: 180, preferredFoot: 'Right', marketValue: '€15m' },
{ id: 6, name: 'Nihad Mujakić', positions: ['CB'], primaryPosition: 'DEF', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'Gaziantep FK', age: 27, height: 189, preferredFoot: 'Right', marketValue: '€1.2m' },
{ id: 7, name: 'Nikola Katić', positions: ['CB'], primaryPosition: 'DEF', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'FC Schalke 04', age: 29, height: 194, preferredFoot: 'Right', marketValue: '€1.8m' },
{ id: 8, name: 'Tarik Muharemović', positions: ['CB'], primaryPosition: 'DEF', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'US Sassuolo', age: 22, height: 187, preferredFoot: 'Left', marketValue: '€20m' },
{ id: 9, name: 'Stjepan Radeljić', positions: ['CB'], primaryPosition: 'DEF', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'HNK Rijeka', age: 28, height: 198, preferredFoot: 'Right', marketValue: '€2.8m' },
{ id: 10, name: 'Dennis Hadžikadunić', positions: ['CB'], primaryPosition: 'DEF', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'UC Sampdoria', age: 27, height: 191, preferredFoot: 'Right', marketValue: '€1.3m' },
{ id: 11, name: 'Nidal Čelik', positions: ['CB'], primaryPosition: 'DEF', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'RC Lens', age: 18, height: 192, preferredFoot: 'Right', marketValue: '€4m' },

// Pomocnicy
{ id: 12, name: 'Amir Hadžiahmetović', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'Hull City', age: 28, height: 179, preferredFoot: 'Right', marketValue: '€4.2m' },
{ id: 13, name: 'Ivan Šunjić', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'Pafos FC', age: 28, height: 184, preferredFoot: 'Right', marketValue: '€1.8m' },
{ id: 14, name: 'Ivan Bašić', positions: ['CM'], primaryPosition: 'MID', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'FK Astana', age: 23, height: 178, preferredFoot: 'Right', marketValue: '€1m' },
{ id: 15, name: 'Dženis Burnić', positions: ['CM'], primaryPosition: 'MID', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'Karlsruher SC', age: 27, height: 181, preferredFoot: 'Left', marketValue: '€1m' },
{ id: 16, name: 'Ermin Mahmić', positions: ['CM'], primaryPosition: 'MID', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'Slovan Liberec', age: 21, height: 183, preferredFoot: 'Right', marketValue: '€650k' },
{ id: 17, name: 'Benjamin Tahirović', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'Brøndby IF', age: 22, height: 191, preferredFoot: 'Right', marketValue: '€4.5m' },
{ id: 18, name: 'Amar Memić', positions: ['CM'], primaryPosition: 'MID', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'Viktoria Pilzno', age: 24, height: 179, preferredFoot: 'Right', marketValue: '€1.5m' },
{ id: 19, name: 'Armin Gigović', positions: ['CM'], primaryPosition: 'MID', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'BSC Young Boys', age: 23, height: 187, preferredFoot: 'Right', marketValue: '€5m' },
{ id: 20, name: 'Kerim Alajbegović', positions: ['CAM', 'RAM', 'LAM', 'CF', 'LW'], primaryPosition: 'MID', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'Red Bull Salzburg', age: 17, height: 176, preferredFoot: 'Right', marketValue: '€1.2m' },
{ id: 21, name: 'Esmir Bajraktarević', positions: ['CAM', 'RAM', 'LAM', 'CF', 'RW'], primaryPosition: 'MID', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'PSV Eindhoven', age: 20, height: 175, preferredFoot: 'Left', marketValue: '€7m' },

// Napastnicy
{ id: 22, name: 'Ermedin Demirović', positions: ['ST'], primaryPosition: 'FWD', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'VfB Stuttgart', age: 28, height: 185, preferredFoot: 'Right', marketValue: '€28m' },
{ id: 23, name: 'Jovo Lukić', positions: ['ST'], primaryPosition: 'FWD', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'Universitatea Kluż', age: 26, height: 187, preferredFoot: 'Right', marketValue: '€1.5m' },
{ id: 24, name: 'Samed Baždar', positions: ['ST'], primaryPosition: 'FWD', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'Jagiellonia Białystok', age: 21, height: 186, preferredFoot: 'Right', marketValue: '€4m' },
{ id: 25, name: 'Haris Tabaković', positions: ['ST'], primaryPosition: 'FWD', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'Borussia Mönchengladbach', age: 31, height: 194, preferredFoot: 'Right', marketValue: '€3m' },
{ id: 26, name: 'Edin Džeko', positions: ['ST'], primaryPosition: 'FWD', country: 'Bośnia i Hercegowina', flag: '🇧🇦', image: null, club: 'FC Schalke 04', age: 40, height: 193, preferredFoot: 'Right', marketValue: '€500k' },


//==================== Haiti ====================
{ id: 27, name: 'Johny Placide', positions: ['GK'], primaryPosition: 'GK', country: 'Haiti', flag: '🇭🇹', image: null, club: 'SC Bastia', age: 37, height: 181, foot: 'Right', value: '200k €' },
{ id: 28, name: 'Alexandre Pierre', positions: ['GK'], primaryPosition: 'GK', country: 'Haiti', flag: '🇭🇹', image: null, club: 'FC Sochaux', age: 24, height: 190, foot: 'Right', value: '300k €' },
{ id: 29, name: 'Josué Duverger', positions: ['GK'], primaryPosition: 'GK', country: 'Haiti', flag: '🇭🇹', image: null, club: 'FC Cosmos Koblenz', age: 24, height: 193, foot: 'Right', value: '150k €' },

{ id: 30, name: 'Carlens Arcus', positions: ['RB', 'RWB'], primaryPosition: 'DEF', country: 'Haiti', flag: '🇭🇹', image: null, club: 'Angers SCO', age: 29, height: 180, foot: 'Right', value: '1.5m €' },
{ id: 31, name: 'Wilguens Paugain', positions: ['CB'], primaryPosition: 'DEF', country: 'Haiti', flag: '🇭🇹', image: null, club: 'SV Zulte Waregem', age: 23, height: 188, foot: 'Right', value: '350k €' },
{ id: 32, name: 'Duke Lacroix', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'Haiti', flag: '🇭🇹', image: null, club: 'Colorado Springs Switchbacks', age: 31, height: 173, foot: 'Left', value: '250k €' },
{ id: 33, name: 'Martin Expérience', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'Haiti', flag: '🇭🇹', image: null, club: 'AS Nancy', age: 24, height: 178, foot: 'Left', value: '400k €' },
{ id: 34, name: 'Jean-Kévin Duverne', positions: ['CB'], primaryPosition: 'DEF', country: 'Haiti', flag: '🇭🇹', image: null, club: 'KAA Gent', age: 28, height: 184, foot: 'Right', value: '2.5m €' },
{ id: 35, name: 'Ricardo Adé', positions: ['CB'], primaryPosition: 'DEF', country: 'Haiti', flag: '🇭🇹', image: null, club: 'LDU Quito', age: 35, height: 188, foot: 'Right', value: '500k €' },
{ id: 36, name: 'Hannes Delcroix', positions: ['CB'], primaryPosition: 'DEF', country: 'Haiti', flag: '🇭🇹', image: null, club: 'FC Lugano', age: 26, height: 187, foot: 'Left', value: '2m €' },
{ id: 37, name: 'Keeto Thermoncy', positions: ['CB'], primaryPosition: 'DEF', country: 'Haiti', flag: '🇭🇹', image: null, club: 'BSC Young Boys U21', age: 20, height: 186, foot: 'Right', value: '150k €' },

{ id: 38, name: 'Carl-Fred Sainté', positions: ['CM'], primaryPosition: 'MID', country: 'Haiti', flag: '🇭🇹', image: null, club: 'El Paso Locomotive', age: 22, height: 175, foot: 'Right', value: '350k €' },
{ id: 39, name: 'Leverton Pierre', positions: ['CM'], primaryPosition: 'MID', country: 'Haiti', flag: '🇭🇹', image: null, club: 'FC Vizela', age: 27, height: 180, foot: 'Right', value: '600k €' },
{ id: 40, name: 'Danley Jean Jacques', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Haiti', flag: '🇭🇹', image: null, club: 'Philadelphia Union', age: 25, height: 178, foot: 'Right', value: '1.2m €' },
{ id: 41, name: 'Jean-Ricner Bellegarde', positions: ['CM', 'CAM', 'RAM', 'LAM'], primaryPosition: 'MID', country: 'Haiti', flag: '🇭🇹', image: null, club: 'Wolverhampton Wanderers', age: 27, height: 172, foot: 'Right', value: '12m €' },
{ id: 42, name: 'Woodensky Pierre', positions: ['CM'], primaryPosition: 'MID', country: 'Haiti', flag: '🇭🇹', image: null, club: 'Violette AC', age: 24, height: 177, foot: 'Right', value: '100k €' },
{ id: 43, name: 'Dominique Simon', positions: ['CM'], primaryPosition: 'MID', country: 'Haiti', flag: '🇭🇹', image: null, club: 'Tatran Preszów', age: 28, height: 179, foot: 'Right', value: '150k €' },

{ id: 44, name: 'Louicius Deedson', positions: ['LW', 'ST'], primaryPosition: 'FWD', country: 'Haiti', flag: '🇭🇹', image: null, club: 'FC Dallas', age: 24, height: 178, foot: 'Right', value: '2m €' },
{ id: 45, name: 'Josué Casimir', positions: ['RW'], primaryPosition: 'FWD', country: 'Haiti', flag: '🇭🇹', image: null, club: 'AJ Auxerre', age: 23, height: 176, foot: 'Right', value: '1m €' },
{ id: 46, name: 'Derrick Etienne Jr.', positions: ['LW', 'RW'], primaryPosition: 'FWD', country: 'Haiti', flag: '🇭🇹', image: null, club: 'Toronto FC', age: 28, height: 178, foot: 'Right', value: '1.5m €' },
{ id: 47, name: 'Ruben Providence', positions: ['LW'], primaryPosition: 'FWD', country: 'Haiti', flag: '🇭🇹', image: null, club: 'Almere City', age: 23, height: 181, foot: 'Left', value: '700k €' },
{ id: 48, name: 'Duckens Nazon', positions: ['ST'], primaryPosition: 'FWD', country: 'Haiti', flag: '🇭🇹', image: null, club: 'Esteghlal FC', age: 31, height: 181, foot: 'Right', value: '800k €' },
{ id: 49, name: 'Frantzdy Pierrot', positions: ['ST'], primaryPosition: 'FWD', country: 'Haiti', flag: '🇭🇹', image: null, club: 'Çaykur Rizespor', age: 30, height: 194, foot: 'Right', value: '3m €' },
{ id: 50, name: 'Wilson Isidor', positions: ['ST'], primaryPosition: 'FWD', country: 'Haiti', flag: '🇭🇹', image: null, club: 'Sunderland', age: 25, height: 186, foot: 'Right', value: '6m €' },
{ id: 51, name: 'Yassin Fortuné', positions: ['RW', 'ST'], primaryPosition: 'FWD', country: 'Haiti', flag: '🇭🇹', image: null, club: 'FC Vizela', age: 26, height: 183, foot: 'Right', value: '500k €' },
{ id: 52, name: 'Lenny Joseph', positions: ['ST'], primaryPosition: 'FWD', country: 'Haiti', flag: '🇭🇹', image: null, club: 'Ferencvárosi TC', age: 24, height: 185, foot: 'Right', value: '1.5m €' },


//==================== Wybrzeże Kości Słoniowej ====================
{ id: 53, name: 'Yahia Fofana', positions: ['GK'], primaryPosition: 'GK', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'Çaykur Rizespor', age: 24, height: 194, foot: 'Right', value: '8m €' },
{ id: 54, name: 'Mohamed Koné', positions: ['GK'], primaryPosition: 'GK', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'Royal Charleroi', age: 23, height: 196, foot: 'Right', value: '3m €' },
{ id: 55, name: 'Alban Lafont', positions: ['GK'], primaryPosition: 'GK', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'Panathinaikos AO', age: 26, height: 196, foot: 'Right', value: '9m €' },

{ id: 56, name: 'Emmanuel Agbadou', positions: ['CB'], primaryPosition: 'DEF', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'Beşiktaş JK', age: 27, height: 192, foot: 'Right', value: '9m €' },
{ id: 57, name: 'Clément Akpa', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'AJ Auxerre', age: 23, height: 181, foot: 'Left', value: '3m €' },
{ id: 58, name: 'Ousmane Diomande', positions: ['CB'], primaryPosition: 'DEF', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'Sporting CP', age: 21, height: 190, foot: 'Right', value: '45m €' },
{ id: 59, name: 'Guéla Doué', positions: ['RB', 'RWB'], primaryPosition: 'DEF', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'RC Strasbourg', age: 22, height: 187, foot: 'Right', value: '12m €' },
{ id: 60, name: 'Ghislain Konan', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'Gil Vicente FC', age: 29, height: 176, foot: 'Left', value: '2m €' },
{ id: 61, name: 'Odilon Kossounou', positions: ['CB'], primaryPosition: 'DEF', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'Atalanta BC', age: 24, height: 191, foot: 'Right', value: '25m €' },
{ id: 62, name: 'Evan Ndicka', positions: ['CB'], primaryPosition: 'DEF', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'AS Roma', age: 25, height: 192, foot: 'Left', value: '30m €' },
{ id: 63, name: 'Wilfried Singo', positions: ['RB', 'CB'], primaryPosition: 'DEF', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'Galatasaray SK', age: 24, height: 190, foot: 'Right', value: '25m €' },

{ id: 64, name: 'Seko Fofana', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'FC Porto', age: 30, height: 185, foot: 'Right', value: '15m €' },
{ id: 65, name: 'Parfait Guiagon', positions: ['CAM', 'RAM', 'LAM', 'CF', 'RW'], primaryPosition: 'MID', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'Royal Charleroi', age: 24, height: 176, foot: 'Right', value: '2m €' },
{ id: 66, name: 'Christ Inao Oulaï', positions: ['CM'], primaryPosition: 'MID', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'Trabzonspor', age: 20, height: 184, foot: 'Right', value: '4m €' },
{ id: 67, name: 'Franck Kessié', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'Al-Ahli', age: 29, height: 183, foot: 'Right', value: '18m €' },
{ id: 68, name: 'Ibrahim Sangaré', positions: ['CDM'], primaryPosition: 'MID', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'Nottingham Forest', age: 27, height: 191, foot: 'Right', value: '28m €' },
{ id: 69, name: 'Jean Michaël Seri', positions: ['CM'], primaryPosition: 'MID', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'NK Maribor', age: 33, height: 168, foot: 'Right', value: '1m €' },

{ id: 70, name: 'Simon Adingra', positions: ['LW', 'RW'], primaryPosition: 'FWD', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'AS Monaco', age: 23, height: 175, foot: 'Right', value: '30m €' },
{ id: 71, name: 'Ange-Yoan Bonny', positions: ['ST'], primaryPosition: 'FWD', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'Inter Mediolan', age: 21, height: 189, foot: 'Right', value: '20m €' },
{ id: 72, name: 'Amad Diallo', positions: ['RW', 'CAM', 'RAM', 'LAM'], primaryPosition: 'FWD', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'Manchester United', age: 23, height: 173, foot: 'Left', value: '40m €' },
{ id: 73, name: 'Oumar Diakité', positions: ['ST'], primaryPosition: 'FWD', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'Cercle Brugge', age: 21, height: 182, foot: 'Right', value: '8m €' },
{ id: 74, name: 'Yan Diomande', positions: ['LW'], primaryPosition: 'FWD', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'RB Leipzig', age: 18, height: 178, foot: 'Right', value: '5m €' },
{ id: 75, name: 'Evann Guessand', positions: ['ST', 'RW'], primaryPosition: 'FWD', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'Crystal Palace', age: 24, height: 188, foot: 'Right', value: '25m €' },
{ id: 76, name: 'Nicolas Pépé', positions: ['RW', 'LW'], primaryPosition: 'FWD', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'Villarreal CF', age: 31, height: 183, foot: 'Left', value: '5m €' },
{ id: 77, name: 'Bazoumana Touré', positions: ['LW'], primaryPosition: 'FWD', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'TSG Hoffenheim', age: 19, height: 177, foot: 'Right', value: '10m €' },
{ id: 78, name: 'Elye Wahi', positions: ['ST'], primaryPosition: 'FWD', country: 'Wybrzeże Kości Słoniowej', flag: '🇨🇮', image: null, club: 'OGC Nice', age: 22, height: 184, foot: 'Right', value: '30m €' },

//==================== Japonia ====================
{ id: 79, name: 'Tomoki Hayakawa', positions: ['GK'], primaryPosition: 'GK', country: 'Japonia', flag: '🇯🇵', image: null, club: 'Kashima Antlers', age: 26, height: 191, foot: 'Right', value: '1m €' },
{ id: 80, name: 'Keisuke Ōsako', positions: ['GK'], primaryPosition: 'GK', country: 'Japonia', flag: '🇯🇵', image: null, club: 'Sanfrecce Hiroszima', age: 25, height: 188, foot: 'Right', value: '900k €' },
{ id: 81, name: 'Zion Suzuki', positions: ['GK'], primaryPosition: 'GK', country: 'Japonia', flag: '🇯🇵', image: null, club: 'Parma Calcio', age: 23, height: 190, foot: 'Right', value: '12m €' },

{ id: 82, name: 'Yūto Nagatomo', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'Japonia', flag: '🇯🇵', image: null, club: 'FC Tokyo', age: 39, height: 170, foot: 'Right', value: '300k €' },
{ id: 83, name: 'Shōgo Taniguchi', positions: ['CB'], primaryPosition: 'DEF', country: 'Japonia', flag: '🇯🇵', image: null, club: 'Sint-Truidense VV', age: 33, height: 185, foot: 'Right', value: '1.2m €' },
{ id: 84, name: 'Kō Itakura', positions: ['CB'], primaryPosition: 'DEF', country: 'Japonia', flag: '🇯🇵', image: null, club: 'AFC Ajax', age: 28, height: 188, foot: 'Right', value: '18m €' },
{ id: 85, name: 'Tsuyoshi Watanabe', positions: ['CB'], primaryPosition: 'DEF', country: 'Japonia', flag: '🇯🇵', image: null, club: 'Feyenoord', age: 28, height: 184, foot: 'Right', value: '12m €' },
{ id: 86, name: 'Hiroki Itō', positions: ['CB', 'LB'], primaryPosition: 'DEF', country: 'Japonia', flag: '🇯🇵', image: null, club: 'Bayern Monachium', age: 26, height: 188, foot: 'Left', value: '35m €' },
{ id: 87, name: 'Ayumu Seko', positions: ['CB'], primaryPosition: 'DEF', country: 'Japonia', flag: '🇯🇵', image: null, club: 'Le Havre AC', age: 24, height: 186, foot: 'Right', value: '3m €' },
{ id: 88, name: 'Yukinari Sugawara', positions: ['RB', 'RWB'], primaryPosition: 'DEF', country: 'Japonia', flag: '🇯🇵', image: null, club: 'Werder Brema', age: 25, height: 179, foot: 'Right', value: '10m €' },
{ id: 89, name: 'Junnosuke Suzuki', positions: ['RB', 'RWB'], primaryPosition: 'DEF', country: 'Japonia', flag: '🇯🇵', image: null, club: 'FC Kopenhaga', age: 22, height: 180, foot: 'Right', value: '2m €' },

{ id: 90, name: 'Wataru Endō', positions: ['CDM', 'CM'], primaryPosition: 'MID', country: 'Japonia', flag: '🇯🇵', image: null, club: 'Liverpool', age: 32, height: 178, foot: 'Right', value: '15m €' },
{ id: 91, name: 'Junya Itō', positions: ['RW'], primaryPosition: 'MID', country: 'Japonia', flag: '🇯🇵', image: null, club: 'KRC Genk', age: 32, height: 176, foot: 'Right', value: '6m €' },
{ id: 92, name: 'Daichi Kamada', positions: ['CAM', 'RAM', 'LAM', 'CF', 'CM'], primaryPosition: 'MID', country: 'Japonia', flag: '🇯🇵', image: null, club: 'Crystal Palace', age: 29, height: 184, foot: 'Right', value: '18m €' },
{ id: 93, name: 'Ritsu Dōan', positions: ['RW', 'LW'], primaryPosition: 'MID', country: 'Japonia', flag: '🇯🇵', image: null, club: 'Eintracht Frankfurt', age: 26, height: 172, foot: 'Left', value: '22m €' },
{ id: 94, name: 'Ao Tanaka', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Japonia', flag: '🇯🇵', image: null, club: 'Leeds United', age: 27, height: 177, foot: 'Right', value: '12m €' },
{ id: 95, name: 'Keito Nakamura', positions: ['LW'], primaryPosition: 'MID', country: 'Japonia', flag: '🇯🇵', image: null, club: 'Stade de Reims', age: 24, height: 180, foot: 'Right', value: '15m €' },
{ id: 96, name: 'Kaishū Sano', positions: ['CDM'], primaryPosition: 'MID', country: 'Japonia', flag: '🇯🇵', image: null, club: '1. FSV Mainz 05', age: 23, height: 181, foot: 'Right', value: '5m €' },
{ id: 97, name: 'Takefusa Kubo', positions: ['RW', 'CAM', 'RAM', 'LAM'], primaryPosition: 'MID', country: 'Japonia', flag: '🇯🇵', image: null, club: 'Real Sociedad', age: 24, height: 173, foot: 'Left', value: '60m €' },

{ id: 98, name: 'Kōki Ogawa', positions: ['ST'], primaryPosition: 'FWD', country: 'Japonia', flag: '🇯🇵', image: null, club: 'NEC Nijmegen', age: 27, height: 186, foot: 'Right', value: '4m €' },
{ id: 99, name: 'Daizen Maeda', positions: ['ST', 'LW'], primaryPosition: 'FWD', country: 'Japonia', flag: '🇯🇵', image: null, club: 'Celtic', age: 27, height: 173, foot: 'Left', value: '18m €' },
{ id: 100, name: 'Ayase Ueda', positions: ['ST'], primaryPosition: 'FWD', country: 'Japonia', flag: '🇯🇵', image: null, club: 'Feyenoord', age: 27, height: 182, foot: 'Right', value: '10m €' },
{ id: 101, name: 'Yuito Suzuki', positions: ['RW', 'LW'], primaryPosition: 'FWD', country: 'Japonia', flag: '🇯🇵', image: null, club: 'SC Freiburg', age: 23, height: 178, foot: 'Right', value: '8m €' },
{ id: 102, name: 'Kento Shiogai', positions: ['ST'], primaryPosition: 'FWD', country: 'Japonia', flag: '🇯🇵', image: null, club: 'VfL Wolfsburg', age: 21, height: 185, foot: 'Right', value: '6m €' },
{ id: 103, name: 'Keisuke Gotō', positions: ['ST'], primaryPosition: 'FWD', country: 'Japonia', flag: '🇯🇵', image: null, club: 'Sint-Truidense VV', age: 24, height: 183, foot: 'Right', value: '3m €' },

// ==================== SZWECJA ====================

// Bramkarze
{ id: 104, name: 'Viktor Johansson', positions: ['GK'], primaryPosition: 'GK', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Stoke City', age: 26, height: 187, foot: 'Right', value: '6m €' },
{ id: 105, name: 'Kristoffer Nordfeldt', positions: ['GK'], primaryPosition: 'GK', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'AIK Fotboll', age: 35, height: 190, foot: 'Right', value: '700k €' },
{ id: 106, name: 'Jacob Widell Zetterström', positions: ['GK'], primaryPosition: 'GK', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Derby County', age: 26, height: 198, foot: 'Right', value: '4m €' },

// Obrońcy
{ id: 107, name: 'Hjalmar Ekdal', positions: ['CB'], primaryPosition: 'DEF', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Burnley', age: 26, height: 191, foot: 'Right', value: '7m €' },
{ id: 108, name: 'Gabriel Gudmundsson', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Leeds United', age: 26, height: 181, foot: 'Left', value: '10m €' },
{ id: 109, name: 'Isak Hien', positions: ['CB'], primaryPosition: 'DEF', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Atalanta BC', age: 26, height: 191, foot: 'Right', value: '22m €' },
{ id: 110, name: 'Emil Holm', positions: ['RB', 'RWB'], primaryPosition: 'DEF', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Juventus', age: 25, height: 191, foot: 'Right', value: '18m €' },
{ id: 111, name: 'Gustaf Lagerbielke', positions: ['CB'], primaryPosition: 'DEF', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'SC Braga', age: 25, height: 193, foot: 'Right', value: '5m €' },
{ id: 112, name: 'Victor Lindelöf', positions: ['CB'], primaryPosition: 'DEF', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Aston Villa', age: 31, height: 187, foot: 'Right', value: '15m €' },
{ id: 113, name: 'Eric Smith', positions: ['CB', 'CDM'], primaryPosition: 'DEF', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'FC St. Pauli', age: 28, height: 190, foot: 'Right', value: '6m €' },
{ id: 114, name: 'Carl Starfelt', positions: ['CB'], primaryPosition: 'DEF', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Celta Vigo', age: 30, height: 187, foot: 'Right', value: '7m €' },
{ id: 115, name: 'Elliot Stroud', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Mjällby AIF', age: 23, height: 178, foot: 'Left', value: '2m €' },
{ id: 116, name: 'Daniel Svensson', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Borussia Dortmund', age: 22, height: 182, foot: 'Left', value: '12m €' },

// Pomocnicy
{ id: 117, name: 'Taha Ali', positions: ['RW', 'LW'], primaryPosition: 'MID', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Malmö FF', age: 26, height: 175, foot: 'Right', value: '3m €' },
{ id: 118, name: 'Yasin Ayari', positions: ['CM'], primaryPosition: 'MID', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Brighton & Hove Albion', age: 21, height: 172, foot: 'Right', value: '15m €' },
{ id: 119, name: 'Lucas Bergvall', positions: ['CM', 'CAM', 'RAM', 'LAM'], primaryPosition: 'MID', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Tottenham Hotspur', age: 19, height: 186, foot: 'Right', value: '35m €' },
{ id: 120, name: 'Jesper Karlström', positions: ['CDM'], primaryPosition: 'MID', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Udinese Calcio', age: 30, height: 181, foot: 'Right', value: '4m €' },
{ id: 121, name: 'Ken Sema', positions: ['LM', 'LW'], primaryPosition: 'MID', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Pafos FC', age: 31, height: 177, foot: 'Left', value: '2m €' },
{ id: 122, name: 'Mattias Svanberg', positions: ['CM'], primaryPosition: 'MID', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'VfL Wolfsburg', age: 26, height: 185, foot: 'Right', value: '20m €' },
{ id: 123, name: 'Besfort Zeneli', positions: ['CM'], primaryPosition: 'MID', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Royale Union Saint-Gilloise', age: 22, height: 178, foot: 'Right', value: '6m €' },

// Napastnicy
{ id: 124, name: 'Alexander Bernhardsson', positions: ['ST', 'RW'], primaryPosition: 'FWD', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Holstein Kiel', age: 26, height: 183, foot: 'Right', value: '5m €' },
{ id: 125, name: 'Anthony Elanga', positions: ['RW', 'LW'], primaryPosition: 'FWD', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Newcastle United', age: 23, height: 178, foot: 'Right', value: '28m €' },
{ id: 126, name: 'Viktor Gyökeres', positions: ['ST'], primaryPosition: 'FWD', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Arsenal', age: 27, height: 187, foot: 'Right', value: '90m €' },
{ id: 127, name: 'Alexander Isak', positions: ['ST'], primaryPosition: 'FWD', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Liverpool', age: 25, height: 192, foot: 'Right', value: '120m €' },
{ id: 128, name: 'Gustaf Nilsson', positions: ['ST'], primaryPosition: 'FWD', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Club Brugge', age: 27, height: 197, foot: 'Right', value: '8m €' },
{ id: 129, name: 'Benjamin Nygren', positions: ['RW', 'CAM', 'RAM', 'LAM'], primaryPosition: 'FWD', country: 'Szwecja', flag: '🇸🇪', image: null, club: 'Celtic', age: 24, height: 184, foot: 'Left', value: '7m €' },

// ==================== TUNEZJA ====================

// Bramkarze
{ id: 130, name: 'Aymen Dahmen', positions: ['GK'], primaryPosition: 'GK', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'Club Sportif Sfaxien', age: 27, height: 186, foot: 'Right', value: '3m €' },
{ id: 131, name: 'Sabri Ben Hessen', positions: ['GK'], primaryPosition: 'GK', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'Étoile Sportive du Sahel', age: 25, height: 189, foot: 'Right', value: '500k €' },
{ id: 132, name: 'Abdelmouhib Chamakh', positions: ['GK'], primaryPosition: 'GK', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'Club Africain', age: 24, height: 187, foot: 'Right', value: '300k €' },

// Obrońcy
{ id: 133, name: 'Montassar Talbi', positions: ['CB'], primaryPosition: 'DEF', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'FC Lorient', age: 27, height: 190, foot: 'Right', value: '10m €' },
{ id: 134, name: 'Dylan Bronn', positions: ['CB'], primaryPosition: 'DEF', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'Servette FC', age: 30, height: 185, foot: 'Right', value: '2m €' },
{ id: 135, name: 'Omar Rekik', positions: ['CB'], primaryPosition: 'DEF', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'NK Maribor', age: 23, height: 187, foot: 'Right', value: '1.5m €' },
{ id: 136, name: 'Adem Arous', positions: ['RB', 'RWB'], primaryPosition: 'DEF', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'Kasımpaşa SK', age: 24, height: 180, foot: 'Right', value: '2m €' },
{ id: 137, name: 'Raed Chikhaoui', positions: ['CB'], primaryPosition: 'DEF', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'US Monastir', age: 25, height: 186, foot: 'Right', value: '700k €' },
{ id: 138, name: 'Yan Valery', positions: ['RB', 'RWB'], primaryPosition: 'DEF', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'BSC Young Boys', age: 26, height: 180, foot: 'Right', value: '4m €' },
{ id: 139, name: 'Moutaz Neffati', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'IFK Norrköping', age: 21, height: 178, foot: 'Left', value: '1m €' },
{ id: 140, name: 'Ali Abdi', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'OGC Nice', age: 31, height: 179, foot: 'Left', value: '3m €' },
{ id: 141, name: 'Mohamed Amine Ben Hamida', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'Espérance Tunis', age: 29, height: 182, foot: 'Left', value: '1.2m €' },

// Pomocnicy
{ id: 142, name: 'Ellyes Skhiri', positions: ['CDM', 'CM'], primaryPosition: 'MID', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'Eintracht Frankfurt', age: 30, height: 185, foot: 'Right', value: '18m €' },
{ id: 143, name: 'Mohamed Belhadj Mahmoud', positions: ['CM'], primaryPosition: 'MID', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'FC Lugano', age: 25, height: 183, foot: 'Right', value: '2.5m €' },
{ id: 144, name: 'Rani Khedira', positions: ['CDM'], primaryPosition: 'MID', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'Union Berlin', age: 31, height: 188, foot: 'Right', value: '5m €' },
{ id: 145, name: 'Hannibal Mejbri', positions: ['CAM', 'RAM', 'LAM', 'CF', 'CM'], primaryPosition: 'MID', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'Burnley', age: 22, height: 178, foot: 'Right', value: '12m €' },
{ id: 146, name: 'Anis Ben Slimane', positions: ['CM', 'CAM', 'RAM', 'LAM'], primaryPosition: 'MID', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'Norwich City', age: 24, height: 185, foot: 'Right', value: '4m €' },
{ id: 147, name: 'Mortadha Ben Ouanes', positions: ['LM', 'LW'], primaryPosition: 'MID', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'Kasımpaşa SK', age: 30, height: 181, foot: 'Left', value: '1.5m €' },
{ id: 148, name: 'Ismaël Gharbi', positions: ['CAM', 'RAM', 'LAM', 'CF', 'LW'], primaryPosition: 'MID', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'FC Augsburg', age: 21, height: 174, foot: 'Right', value: '6m €' },

// Napastnicy
{ id: 149, name: 'Khalil Ayari', positions: ['ST'], primaryPosition: 'FWD', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'Paris Saint-Germain U21', age: 19, height: 182, foot: 'Right', value: '1m €' },
{ id: 150, name: 'Sebastian Tounekti', positions: ['LW', 'RW'], primaryPosition: 'FWD', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'Celtic', age: 22, height: 177, foot: 'Right', value: '2.5m €' },
{ id: 151, name: 'Elias Achouri', positions: ['LW', 'RW'], primaryPosition: 'FWD', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'FC Kopenhaga', age: 25, height: 183, foot: 'Right', value: '5m €' },
{ id: 152, name: 'Firas Chaouat', positions: ['ST'], primaryPosition: 'FWD', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'Club Africain', age: 27, height: 185, foot: 'Right', value: '1m €' },
{ id: 153, name: 'Hazem Mastouri', positions: ['ST'], primaryPosition: 'FWD', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'Dinamo Machaczkała', age: 24, height: 188, foot: 'Right', value: '900k €' },
{ id: 154, name: 'Elias Saad', positions: ['LW'], primaryPosition: 'FWD', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'Hannover 96', age: 25, height: 181, foot: 'Right', value: '4m €' },
{ id: 155, name: 'Rayan Elloumi', positions: ['RW'], primaryPosition: 'FWD', country: 'Tunezja', flag: '🇹🇳', image: null, club: 'Vancouver Whitecaps', age: 21, height: 178, foot: 'Left', value: '1.2m €' },

//==================== Belgia ====================
{ id: 156, name: 'Thibaut Courtois', positions: ['GK'], primaryPosition: 'GK', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Real Madryt', age: 34, height: 200, foot: 'Left', value: '28m €' },
{ id: 157, name: 'Senne Lammens', positions: ['GK'], primaryPosition: 'GK', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Manchester United', age: 23, height: 193, foot: 'Right', value: '7m €' },
{ id: 158, name: 'Mike Penders', positions: ['GK'], primaryPosition: 'GK', country: 'Belgia', flag: '🇧🇪', image: null, club: 'RC Strasbourg', age: 20, height: 196, foot: 'Right', value: '3m €' },

{ id: 159, name: 'Timothy Castagne', positions: ['RB', 'LB'], primaryPosition: 'DEF', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Fulham', age: 31, height: 185, foot: 'Right', value: '18m €' },
{ id: 160, name: 'Zeno Debast', positions: ['CB'], primaryPosition: 'DEF', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Sporting CP', age: 22, height: 189, foot: 'Right', value: '25m €' },
{ id: 161, name: 'Maxim De Cuyper', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Brighton & Hove Albion', age: 25, height: 182, foot: 'Left', value: '22m €' },
{ id: 162, name: 'Koni De Winter', positions: ['CB'], primaryPosition: 'DEF', country: 'Belgia', flag: '🇧🇪', image: null, club: 'AC Milan', age: 24, height: 187, foot: 'Right', value: '14m €' },
{ id: 163, name: 'Brandon Mechele', positions: ['CB'], primaryPosition: 'DEF', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Club Brugge', age: 33, height: 188, foot: 'Right', value: '6m €' },
{ id: 164, name: 'Thomas Meunier', positions: ['RB', 'RWB'], primaryPosition: 'DEF', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Lille OSC', age: 34, height: 191, foot: 'Right', value: '4m €' },
{ id: 165, name: 'Nathan Ngoy', positions: ['CB'], primaryPosition: 'DEF', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Lille OSC', age: 22, height: 186, foot: 'Right', value: '8m €' },
{ id: 166, name: 'Joaquin Seys', positions: ['CB', 'RB'], primaryPosition: 'DEF', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Club Brugge', age: 20, height: 184, foot: 'Right', value: '5m €' },
{ id: 167, name: 'Arthur Theate', positions: ['CB', 'LB'], primaryPosition: 'DEF', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Eintracht Frankfurt', age: 25, height: 185, foot: 'Left', value: '30m €' },

{ id: 168, name: 'Kevin De Bruyne', positions: ['CM', 'CAM', 'RAM', 'LAM'], primaryPosition: 'MID', country: 'Belgia', flag: '🇧🇪', image: null, club: 'SSC Napoli', age: 34, height: 181, foot: 'Right', value: '22m €' },
{ id: 169, name: 'Amadou Onana', positions: ['CDM', 'CM'], primaryPosition: 'MID', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Aston Villa', age: 24, height: 195, foot: 'Right', value: '45m €' },
{ id: 170, name: 'Nicolas Raskin', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Rangers', age: 25, height: 178, foot: 'Right', value: '15m €' },
{ id: 171, name: 'Youri Tielemans', positions: ['CM'], primaryPosition: 'MID', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Aston Villa', age: 29, height: 176, foot: 'Right', value: '32m €' },
{ id: 172, name: 'Hans Vanaken', positions: ['CAM', 'RAM', 'LAM', 'CF', 'CM'], primaryPosition: 'MID', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Club Brugge', age: 33, height: 195, foot: 'Right', value: '10m €' },
{ id: 173, name: 'Axel Witsel', positions: ['CDM', 'CM'], primaryPosition: 'MID', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Girona FC', age: 37, height: 186, foot: 'Right', value: '3m €' },

{ id: 174, name: 'Charles De Ketelaere', positions: ['SS', 'CAM', 'RAM', 'LAM'], primaryPosition: 'FWD', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Atalanta BC', age: 25, height: 192, foot: 'Left', value: '40m €' },
{ id: 175, name: 'Jérémy Doku', positions: ['LW', 'RW'], primaryPosition: 'FWD', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Manchester City', age: 24, height: 171, foot: 'Right', value: '70m €' },
{ id: 176, name: 'Matias Fernandez-Pardo', positions: ['RW', 'LW'], primaryPosition: 'FWD', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Lille OSC', age: 20, height: 180, foot: 'Right', value: '12m €' },
{ id: 177, name: 'Romelu Lukaku', positions: ['ST'], primaryPosition: 'FWD', country: 'Belgia', flag: '🇧🇪', image: null, club: 'SSC Napoli', age: 33, height: 191, foot: 'Left', value: '25m €' },
{ id: 178, name: 'Dodi Lukebakio', positions: ['RW', 'LW'], primaryPosition: 'FWD', country: 'Belgia', flag: '🇧🇪', image: null, club: 'SL Benfica', age: 28, height: 187, foot: 'Left', value: '20m €' },
{ id: 179, name: 'Diego Moreira', positions: ['LW', 'LM'], primaryPosition: 'FWD', country: 'Belgia', flag: '🇧🇪', image: null, club: 'RC Strasbourg', age: 21, height: 179, foot: 'Left', value: '10m €' },
{ id: 180, name: 'Alexis Saelemaekers', positions: ['RW', 'RM'], primaryPosition: 'FWD', country: 'Belgia', flag: '🇧🇪', image: null, club: 'AC Milan', age: 26, height: 180, foot: 'Right', value: '18m €' },
{ id: 181, name: 'Leandro Trossard', positions: ['LW', 'RW'], primaryPosition: 'FWD', country: 'Belgia', flag: '🇧🇪', image: null, club: 'Arsenal', age: 31, height: 172, foot: 'Right', value: '28m €' },


//==================== Nowa Zelandia ====================
{ id: 182, name: 'Max Crocombe', positions: ['GK'], primaryPosition: 'GK', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Millwall', age: 31, height: 188, foot: 'Right', value: '1.2m €' },
{ id: 183, name: 'Alex Paulsen', positions: ['GK'], primaryPosition: 'GK', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Lechia Gdańsk', age: 22, height: 191, foot: 'Right', value: '2.5m €' },
{ id: 184, name: 'Michael Woud', positions: ['GK'], primaryPosition: 'GK', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Auckland FC', age: 26, height: 194, foot: 'Right', value: '900k €' },

{ id: 185, name: 'Tim Payne', positions: ['RB', 'RWB'], primaryPosition: 'DEF', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Wellington Phoenix', age: 31, height: 178, foot: 'Right', value: '800k €' },
{ id: 186, name: 'Francis de Vries', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Auckland FC', age: 29, height: 180, foot: 'Left', value: '700k €' },
{ id: 187, name: 'Tyler Bindon', positions: ['CB'], primaryPosition: 'DEF', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Sheffield United', age: 20, height: 192, foot: 'Right', value: '4m €' },
{ id: 188, name: 'Michael Boxall', positions: ['CB'], primaryPosition: 'DEF', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Minnesota United', age: 36, height: 188, foot: 'Right', value: '1.5m €' },
{ id: 189, name: 'Elijah Just', positions: ['RB', 'RM'], primaryPosition: 'DEF', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Motherwell', age: 25, height: 180, foot: 'Right', value: '1.8m €' },
{ id: 190, name: 'Liberato Cacace', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Wrexham', age: 25, height: 177, foot: 'Left', value: '5m €' },
{ id: 191, name: 'Nando Pijnaker', positions: ['CB'], primaryPosition: 'DEF', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Auckland FC', age: 27, height: 190, foot: 'Left', value: '1m €' },
{ id: 192, name: 'Finn Surman', positions: ['CB'], primaryPosition: 'DEF', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Portland Timbers', age: 22, height: 193, foot: 'Right', value: '3m €' },
{ id: 193, name: 'Callan Elliot', positions: ['RB', 'RWB'], primaryPosition: 'DEF', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Auckland FC', age: 26, height: 181, foot: 'Right', value: '800k €' },
{ id: 194, name: 'Tommy Smith', positions: ['CB'], primaryPosition: 'DEF', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Braintree Town', age: 34, height: 187, foot: 'Right', value: '300k €' },

{ id: 195, name: 'Joe Bell', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Viking FK', age: 27, height: 180, foot: 'Right', value: '2.5m €' },
{ id: 196, name: 'Matthew Garbett', positions: ['CM'], primaryPosition: 'MID', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Peterborough United', age: 23, height: 179, foot: 'Right', value: '1.8m €' },
{ id: 197, name: 'Marko Stamenic', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Swansea City', age: 23, height: 188, foot: 'Right', value: '4m €' },
{ id: 198, name: 'Sarpreet Singh', positions: ['CAM', 'RAM', 'LAM', 'CF', 'CM'], primaryPosition: 'MID', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Wellington Phoenix', age: 26, height: 178, foot: 'Left', value: '1.5m €' },
{ id: 199, name: 'Alex Rufer', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Wellington Phoenix', age: 29, height: 183, foot: 'Right', value: '1.2m €' },
{ id: 200, name: 'Ben Old', positions: ['CAM', 'RAM', 'LAM', 'CF', 'LM'], primaryPosition: 'MID', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'AS Saint-Étienne', age: 23, height: 175, foot: 'Right', value: '3.5m €' },
{ id: 201, name: 'Callum McCowatt', positions: ['CAM', 'RAM', 'LAM', 'CF', 'RW'], primaryPosition: 'MID', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Silkeborg IF', age: 27, height: 182, foot: 'Right', value: '2m €' },
{ id: 202, name: 'Ryan Thomas', positions: ['CM'], primaryPosition: 'MID', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'PEC Zwolle', age: 30, height: 174, foot: 'Right', value: '900k €' },
{ id: 203, name: 'Lachlan Bayliss', positions: ['CM'], primaryPosition: 'MID', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Newcastle Jets', age: 21, height: 178, foot: 'Right', value: '600k €' },

{ id: 204, name: 'Chris Wood', positions: ['ST'], primaryPosition: 'FWD', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Nottingham Forest', age: 33, height: 191, foot: 'Right', value: '15m €' },
{ id: 205, name: 'Kosta Barbarouses', positions: ['ST', 'RW'], primaryPosition: 'FWD', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Western Sydney Wanderers', age: 35, height: 176, foot: 'Right', value: '700k €' },
{ id: 206, name: 'Ben Waine', positions: ['ST'], primaryPosition: 'FWD', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Port Vale', age: 24, height: 185, foot: 'Right', value: '1.2m €' },
{ id: 207, name: 'Jesse Randall', positions: ['ST'], primaryPosition: 'FWD', country: 'Nowa Zelandia', flag: '🇳🇿', image: null, club: 'Auckland FC', age: 22, height: 180, foot: 'Right', value: '500k €' },

// ==================== FRANCJA ====================

// Bramkarze
{ id: 208, name: 'Mike Maignan', positions: ['GK'], primaryPosition: 'GK', country: 'Francja', flag: '🇫🇷', image: null, club: 'AC Milan', age: 30, height: 191, foot: 'Right', value: '45m €' },
{ id: 209, name: 'Robin Risser', positions: ['GK'], primaryPosition: 'GK', country: 'Francja', flag: '🇫🇷', image: null, club: 'RC Lens', age: 20, height: 195, foot: 'Right', value: '2m €' },
{ id: 210, name: 'Brice Samba', positions: ['GK'], primaryPosition: 'GK', country: 'Francja', flag: '🇫🇷', image: null, club: 'Stade Rennais', age: 31, height: 186, foot: 'Right', value: '12m €' },

// Obrońcy
{ id: 211, name: 'Lucas Digne', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'Francja', flag: '🇫🇷', image: null, club: 'Aston Villa', age: 32, height: 178, foot: 'Left', value: '18m €' },
{ id: 212, name: 'Malo Gusto', positions: ['RB', 'RWB'], primaryPosition: 'DEF', country: 'Francja', flag: '🇫🇷', image: null, club: 'Chelsea', age: 22, height: 178, foot: 'Right', value: '35m €' },
{ id: 213, name: 'Lucas Hernández', positions: ['CB', 'LB'], primaryPosition: 'DEF', country: 'Francja', flag: '🇫🇷', image: null, club: 'Paris Saint-Germain', age: 29, height: 182, foot: 'Left', value: '40m €' },
{ id: 214, name: 'Theo Hernández', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'Francja', flag: '🇫🇷', image: null, club: 'Al-Hilal', age: 28, height: 184, foot: 'Left', value: '55m €' },
{ id: 215, name: 'Ibrahima Konaté', positions: ['CB'], primaryPosition: 'DEF', country: 'Francja', flag: '🇫🇷', image: null, club: 'Liverpool', age: 26, height: 194, foot: 'Right', value: '60m €' },
{ id: 216, name: 'Jules Koundé', positions: ['CB', 'RB'], primaryPosition: 'DEF', country: 'Francja', flag: '🇫🇷', image: null, club: 'FC Barcelona', age: 26, height: 180, foot: 'Right', value: '65m €' },
{ id: 217, name: 'Maxence Lacroix', positions: ['CB'], primaryPosition: 'DEF', country: 'Francja', flag: '🇫🇷', image: null, club: 'Crystal Palace', age: 25, height: 190, foot: 'Right', value: '35m €' },
{ id: 218, name: 'William Saliba', positions: ['CB'], primaryPosition: 'DEF', country: 'Francja', flag: '🇫🇷', image: null, club: 'Arsenal', age: 25, height: 192, foot: 'Right', value: '80m €' },
{ id: 219, name: 'Dayot Upamecano', positions: ['CB'], primaryPosition: 'DEF', country: 'Francja', flag: '🇫🇷', image: null, club: 'Bayern Monachium', age: 27, height: 186, foot: 'Right', value: '55m €' },

// Pomocnicy
{ id: 220, name: "N’Golo Kanté", positions: ['CDM', 'CM'], primaryPosition: 'MID', country: 'Francja', flag: '🇫🇷', image: null, club: 'Fenerbahçe SK', age: 34, height: 168, foot: 'Right', value: '10m €' },
{ id: 221, name: 'Manu Koné', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Francja', flag: '🇫🇷', image: null, club: 'AS Roma', age: 24, height: 185, foot: 'Right', value: '45m €' },
{ id: 222, name: 'Adrien Rabiot', positions: ['CM'], primaryPosition: 'MID', country: 'Francja', flag: '🇫🇷', image: null, club: 'AC Milan', age: 30, height: 188, foot: 'Left', value: '25m €' },
{ id: 223, name: 'Aurélien Tchouaméni', positions: ['CDM', 'CM'], primaryPosition: 'MID', country: 'Francja', flag: '🇫🇷', image: null, club: 'Real Madryt', age: 25, height: 187, foot: 'Right', value: '90m €' },
{ id: 224, name: 'Warren Zaïre-Emery', positions: ['CM'], primaryPosition: 'MID', country: 'Francja', flag: '🇫🇷', image: null, club: 'Paris Saint-Germain', age: 19, height: 178, foot: 'Right', value: '85m €' },

// Napastnicy
{ id: 225, name: 'Maghnes Akliouche', positions: ['RW', 'CAM', 'RAM', 'LAM'], primaryPosition: 'FWD', country: 'Francja', flag: '🇫🇷', image: null, club: 'AS Monaco', age: 23, height: 178, foot: 'Left', value: '40m €' },
{ id: 226, name: 'Bradley Barcola', positions: ['LW'], primaryPosition: 'FWD', country: 'Francja', flag: '🇫🇷', image: null, club: 'Paris Saint-Germain', age: 23, height: 182, foot: 'Right', value: '70m €' },
{ id: 227, name: 'Rayan Cherki', positions: ['CAM', 'RAM', 'LAM', 'CF', 'RW'], primaryPosition: 'FWD', country: 'Francja', flag: '🇫🇷', image: null, club: 'Manchester City', age: 22, height: 177, foot: 'Left', value: '55m €' },
{ id: 228, name: 'Ousmane Dembélé', positions: ['RW', 'LW'], primaryPosition: 'FWD', country: 'Francja', flag: '🇫🇷', image: null, club: 'Paris Saint-Germain', age: 28, height: 178, foot: 'Right', value: '65m €' },
{ id: 229, name: 'Désiré Doué', positions: ['LW', 'CAM', 'RAM', 'LAM'], primaryPosition: 'FWD', country: 'Francja', flag: '🇫🇷', image: null, club: 'Paris Saint-Germain', age: 20, height: 181, foot: 'Right', value: '60m €' },
{ id: 230, name: 'Jean-Philippe Mateta', positions: ['ST'], primaryPosition: 'FWD', country: 'Francja', flag: '🇫🇷', image: null, club: 'Crystal Palace', age: 28, height: 192, foot: 'Right', value: '35m €' },
{ id: 231, name: 'Kylian Mbappé', positions: ['ST', 'LW'], primaryPosition: 'FWD', country: 'Francja', flag: '🇫🇷', image: null, club: 'Real Madryt', age: 27, height: 178, foot: 'Right', value: '180m €' },
{ id: 232, name: 'Michael Olise', positions: ['RW', 'CAM', 'RAM', 'LAM'], primaryPosition: 'FWD', country: 'Francja', flag: '🇫🇷', image: null, club: 'Bayern Monachium', age: 24, height: 184, foot: 'Left', value: '110m €' },
{ id: 233, name: 'Marcus Thuram', positions: ['ST', 'LW'], primaryPosition: 'FWD', country: 'Francja', flag: '🇫🇷', image: null, club: 'Inter Mediolan', age: 28, height: 192, foot: 'Right', value: '75m €' },
  
// ==================== KOREA POŁUDNIOWA ====================

// Bramkarze
{ id: 234, name: 'Jo Hyeon-woo', positions: ['GK'], primaryPosition: 'GK', country: 'Korea Południowa', flag: '🇰🇷', image: null, club: 'Ulsan HD', age: 33, height: 189, foot: 'Right', value: '2m €' },
{ id: 235, name: 'Kim Seung-gyu', positions: ['GK'], primaryPosition: 'GK', country: 'Korea Południowa', flag: '🇰🇷', image: null, club: 'FC Tokyo', age: 35, height: 187, foot: 'Right', value: '1.5m €' },
{ id: 236, name: 'Song Bum-keun', positions: ['GK'], primaryPosition: 'GK', country: 'Korea Południowa', flag: '🇰🇷', image: null, club: 'Jeonbuk Hyundai Motors', age: 28, height: 192, foot: 'Right', value: '1.2m €' },

// Obrońcy
{ id: 237, name: 'Kim Min-jae', positions: ['CB'], primaryPosition: 'DEF', country: 'Korea Południowa', flag: '🇰🇷', image: null, club: 'Bayern Monachium', age: 29, height: 190, foot: 'Right', value: '55m €' },
{ id: 238, name: 'Cho Yu-min', positions: ['CB'], primaryPosition: 'DEF', country: 'Korea Południowa', flag: '🇰🇷', image: null, club: 'Sharjah FC', age: 29, height: 183, foot: 'Right', value: '1.8m €' },
{ id: 239, name: 'Lee Han-beom', positions: ['CB'], primaryPosition: 'DEF', country: 'Korea Południowa', flag: '🇰🇷', image: null, club: 'FC Midtjylland', age: 23, height: 187, foot: 'Right', value: '3m €' },
{ id: 240, name: 'Kim Tae-hyeon', positions: ['CB'], primaryPosition: 'DEF', country: 'Korea Południowa', flag: '🇰🇷', image: null, club: 'Kashima Antlers', age: 25, height: 185, foot: 'Right', value: '1.5m €' },
{ id: 241, name: 'Park Jin-seob', positions: ['CB'], primaryPosition: 'DEF', country: 'Korea Południowa', flag: '🇰🇷', image: null, club: 'Zhejiang FC', age: 30, height: 182, foot: 'Right', value: '1.2m €' },
{ id: 242, name: 'Lee Ki-hyuk', positions: ['CB'], primaryPosition: 'DEF', country: 'Korea Południowa', flag: '🇰🇷', image: null, club: 'Gangwon FC', age: 25, height: 180, foot: 'Right', value: '900k €' },
{ id: 243, name: 'Lee Tae-seok', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'Korea Południowa', flag: '🇰🇷', image: null, club: 'Austria Wiedeń', age: 23, height: 178, foot: 'Left', value: '2.5m €' },
{ id: 244, name: 'Seol Young-woo', positions: ['RB', 'RWB'], primaryPosition: 'DEF', country: 'Korea Południowa', flag: '🇰🇷', image: null, club: 'Crvena zvezda', age: 27, height: 180, foot: 'Right', value: '6m €' },
{ id: 245, name: 'Jens Castrop', positions: ['CM', 'RB'], primaryPosition: 'MID', country: 'Korea Południowa', flag: '🇰🇷', image: null, club: 'Borussia Mönchengladbach', age: 22, height: 178, foot: 'Right', value: '5m €' },
{ id: 246, name: 'Kim Moon-hwan', positions: ['RB'], primaryPosition: 'DEF', country: 'Korea Południowa', flag: '🇰🇷', image: null, club: 'Daejeon Hana Citizen', age: 30, height: 175, foot: 'Right', value: '1.5m €' },

// Pomocnicy
{ id: 247, name: 'Yang Hyun-jun', positions: ['RW', 'LW'], primaryPosition: 'MID', country: 'Korea Południowa', flag: '🇰🇷', image: null, club: 'Celtic', age: 23, height: 176, foot: 'Right', value: '6m €' },
{ id: 248, name: 'Paik Seung-ho', positions: ['CM'], primaryPosition: 'MID', country: 'Korea Południowa', flag: '🇰🇷', image: null, club: 'Birmingham City', age: 28, height: 182, foot: 'Right', value: '2.5m €' },
{ id: 249, name: 'Hwang In-beom', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Korea Południowa', flag: '🇰🇷', image: null, club: 'Feyenoord', age: 29, height: 177, foot: 'Right', value: '10m €' },
{ id: 250, name: 'Kim Jin-gyu', positions: ['CM'], primaryPosition: 'MID', country: 'Korea Południowa', flag: '🇰🇷', image: null, club: 'Jeonbuk Hyundai Motors', age: 28, height: 180, foot: 'Right', value: '1.5m €' },
{ id: 251, name: 'Bae Jun-ho', positions: ['CM', 'LW'], primaryPosition: 'MID', country: 'Korea Południowa', flag: '🇰🇷', image: null, club: 'Stoke City', age: 22, height: 179, foot: 'Left', value: '5m €' },
{ id: 252, name: 'Eom Ji-sung', positions: ['LW', 'RW'], primaryPosition: 'MID', country: 'Korea Południowa', flag: '🇰🇷', image: null, club: 'Swansea City', age: 23, height: 176, foot: 'Right', value: '3.5m €' },
{ id: 253, name: 'Hwang Hee-chan', positions: ['ST', 'LW'], primaryPosition: 'FWD', country: 'Korea Południowa', flag: '🇰🇷', image: null, club: 'Wolverhampton Wanderers', age: 30, height: 177, foot: 'Right', value: '25m €' },
{ id: 254, name: 'Lee Dong-gyeong', positions: ['CAM'], primaryPosition: 'MID', country: 'Korea Południowa', flag: '🇰🇷', image: null, club: 'Ulsan HD', age: 28, height: 174, foot: 'Left', value: '2m €' },
{ id: 255, name: 'Lee Jae-sung', positions: ['CM', 'CAM'], primaryPosition: 'MID', country: 'Korea Południowa', flag: '🇰🇷', image: null, club: 'Mainz 05', age: 33, height: 180, foot: 'Left', value: '5m €' },
{ id: 256, name: 'Lee Kang-in', positions: ['CAM', 'RW', 'LW'], primaryPosition: 'MID', country: 'Korea Południowa', flag: '🇰🇷', image: null, club: 'Paris Saint-Germain', age: 25, height: 173, foot: 'Left', value: '45m €' },

// Napastnicy
{ id: 257, name: 'Oh Hyeon-gyu', positions: ['ST'], primaryPosition: 'FWD', country: 'Korea Południowa', flag: '🇰🇷', image: null, club: 'Beşiktaş JK', age: 24, height: 185, foot: 'Right', value: '7m €' },
{ id: 258, name: 'Son Heung-min', positions: ['ST', 'LW'], primaryPosition: 'FWD', country: 'Korea Południowa', flag: '🇰🇷', image: null, club: 'Los Angeles FC', age: 33, height: 183, foot: 'Right', value: '35m €' },
{ id: 259, name: 'Cho Gue-sung', positions: ['ST'], primaryPosition: 'FWD', country: 'Korea Południowa', flag: '🇰🇷', image: null, club: 'FC Midtjylland', age: 27, height: 189, foot: 'Right', value: '9m €' },

// ==================== BRAZYLIA ====================

// Bramkarze
{ id: 260, name: 'Alisson', positions: ['GK'], primaryPosition: 'GK', country: 'Brazylia', flag: '🇧🇷', image: null, club: 'Liverpool', age: 33, height: 193, foot: 'Right', value: '35m €' },
{ id: 261, name: 'Ederson', positions: ['GK'], primaryPosition: 'GK', country: 'Brazylia', flag: '🇧🇷', image: null, club: 'Fenerbahçe SK', age: 32, height: 188, foot: 'Left', value: '30m €' },
{ id: 262, name: 'Weverton', positions: ['GK'], primaryPosition: 'GK', country: 'Brazylia', flag: '🇧🇷', image: null, club: 'Grêmio', age: 38, height: 189, foot: 'Right', value: '2m €' },

// Obrońcy
{ id: 263, name: 'Marquinhos', positions: ['CB'], primaryPosition: 'DEF', country: 'Brazylia', flag: '🇧🇷', image: null, club: 'Paris Saint-Germain', age: 31, height: 183, foot: 'Right', value: '55m €' },
{ id: 264, name: 'Danilo Luiz', positions: ['CB', 'RB'], primaryPosition: 'DEF', country: 'Brazylia', flag: '🇧🇷', image: null, club: 'Flamengo', age: 34, height: 184, foot: 'Right', value: '8m €' },
{ id: 265, name: 'Alex Sandro', positions: ['LB'], primaryPosition: 'DEF', country: 'Brazylia', flag: '🇧🇷', image: null, club: 'Flamengo', age: 35, height: 180, foot: 'Left', value: '5m €' },
{ id: 266, name: 'Gabriel Magalhães', positions: ['CB'], primaryPosition: 'DEF', country: 'Brazylia', flag: '🇧🇷', image: null, club: 'Arsenal', age: 27, height: 190, foot: 'Left', value: '70m €' },
{ id: 267, name: 'Bremer', positions: ['CB'], primaryPosition: 'DEF', country: 'Brazylia', flag: '🇧🇷', image: null, club: 'Juventus', age: 28, height: 188, foot: 'Right', value: '60m €' },
{ id: 268, name: 'Wesley', positions: ['RB'], primaryPosition: 'DEF', country: 'Brazylia', flag: '🇧🇷', image: null, club: 'AS Roma', age: 22, height: 176, foot: 'Right', value: '25m €' },
{ id: 269, name: 'Roger Ibañez', positions: ['CB'], primaryPosition: 'DEF', country: 'Brazylia', flag: '🇧🇷', image: null, club: 'Al-Ahli', age: 27, height: 185, foot: 'Right', value: '20m €' },
{ id: 270, name: 'Douglas Santos', positions: ['LB'], primaryPosition: 'DEF', country: 'Brazylia', flag: '🇧🇷', image: null, club: 'Zenit Petersburg', age: 30, height: 174, foot: 'Left', value: '12m €' },
{ id: 271, name: 'Léo Pereira', positions: ['CB'], primaryPosition: 'DEF', country: 'Brazylia', flag: '🇧🇷', image: null, club: 'Flamengo', age: 29, height: 189, foot: 'Right', value: '18m €' },

// Pomocnicy
{ id: 272, name: 'Casemiro', positions: ['CDM', 'CM'], primaryPosition: 'MID', country: 'Brazylia', flag: '🇧🇷', image: null, club: 'Manchester United', age: 33, height: 185, foot: 'Right', value: '25m €' },
{ id: 273, name: 'Lucas Paquetá', positions: ['CM', 'CAM', 'RAM', 'LAM', 'CF',], primaryPosition: 'MID', country: 'Brazylia', flag: '🇧🇷', image: null, club: 'Flamengo', age: 28, height: 180, foot: 'Left', value: '60m €' },
{ id: 274, name: 'Bruno Guimarães', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Brazylia', flag: '🇧🇷', image: null, club: 'Newcastle United', age: 27, height: 182, foot: 'Right', value: '85m €' },
{ id: 275, name: 'Fabinho', positions: ['CDM'], primaryPosition: 'MID', country: 'Brazylia', flag: '🇧🇷', image: null, club: 'Al-Ittihad Club', age: 32, height: 188, foot: 'Right', value: '18m €' },
{ id: 276, name: 'Danilo Santos', positions: ['CM'], primaryPosition: 'MID', country: 'Brazylia', flag: '🇧🇷', image: null, club: 'Botafogo', age: 24, height: 178, foot: 'Right', value: '10m €' },

// Napastnicy
{ id: 277, name: 'Neymar', positions: ['LW', 'CAM'], primaryPosition: 'FWD', country: 'Brazylia', flag: '🇧🇷', image: null, club: 'Santos FC', age: 33, height: 175, foot: 'Right', value: '45m €' },
{ id: 278, name: 'Vinícius Júnior', positions: ['LW'], primaryPosition: 'FWD', country: 'Brazylia', flag: '🇧🇷', image: null, club: 'Real Madryt', age: 25, height: 176, foot: 'Right', value: '180m €' },
{ id: 279, name: 'Raphinha', positions: ['RW'], primaryPosition: 'FWD', country: 'Brazylia', flag: '🇧🇷', image: null, club: 'FC Barcelona', age: 29, height: 176, foot: 'Left', value: '75m €' },
{ id: 280, name: 'Gabriel Martinelli', positions: ['LW'], primaryPosition: 'FWD', country: 'Brazylia', flag: '🇧🇷', image: null, club: 'Arsenal', age: 24, height: 178, foot: 'Right', value: '85m €' },
{ id: 281, name: 'Matheus Cunha', positions: ['ST', 'LW'], primaryPosition: 'FWD', country: 'Brazylia', flag: '🇧🇷', image: null, club: 'Manchester United', age: 26, height: 183, foot: 'Right', value: '70m €' },
{ id: 282, name: 'Endrick', positions: ['ST'], primaryPosition: 'FWD', country: 'Brazylia', flag: '🇧🇷', image: null, club: 'Olympique Lyonnais', age: 19, height: 173, foot: 'Left', value: '55m €' },
{ id: 283, name: 'Luiz Henrique', positions: ['RW'], primaryPosition: 'FWD', country: 'Brazylia', flag: '🇧🇷', image: null, club: 'Zenit Petersburg', age: 24, height: 182, foot: 'Left', value: '35m €' },
{ id: 284, name: 'Igor Thiago', positions: ['ST'], primaryPosition: 'FWD', country: 'Brazylia', flag: '🇧🇷', image: null, club: 'Brentford', age: 24, height: 185, foot: 'Right', value: '30m €' },
{ id: 285, name: 'Rayan', positions: ['ST'], primaryPosition: 'FWD', country: 'Brazylia', flag: '🇧🇷', image: null, club: 'Bournemouth', age: 19, height: 180, foot: 'Right', value: '20m €' },

// ==================== SZKOCJA ====================

// Bramkarze
{ id: 286, name: 'Craig Gordon', positions: ['GK'], primaryPosition: 'GK', country: 'Szkocja', flag: '🇬🇧', image: null, club: 'Heart of Midlothian', age: 43, height: 193, foot: 'Right', value: '300k €' },
{ id: 287, name: 'Angus Gunn', positions: ['GK'], primaryPosition: 'GK', country: 'Szkocja', flag: '🇬🇧', image: null, club: 'Nottingham Forest', age: 30, height: 196, foot: 'Right', value: '4m €' },
{ id: 288, name: 'Liam Kelly', positions: ['GK'], primaryPosition: 'GK', country: 'Szkocja', flag: '🇬🇧', image: null, club: 'Rangers', age: 30, height: 190, foot: 'Right', value: '2m €' },

// Obrońcy
{ id: 289, name: 'Andrew Robertson', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'Szkocja', flag: '🇬🇧', image: null, club: 'Liverpool', age: 31, height: 178, foot: 'Left', value: '25m €' },
{ id: 290, name: 'Grant Hanley', positions: ['CB'], primaryPosition: 'DEF', country: 'Szkocja', flag: '🇬🇧', image: null, club: 'Hibernian', age: 33, height: 188, foot: 'Right', value: '1m €' },
{ id: 291, name: 'Kieran Tierney', positions: ['LB', 'CB'], primaryPosition: 'DEF', country: 'Szkocja', flag: '🇬🇧', image: null, club: 'Celtic', age: 28, height: 178, foot: 'Left', value: '20m €' },
{ id: 292, name: 'Scott McKenna', positions: ['CB'], primaryPosition: 'DEF', country: 'Szkocja', flag: '🇬🇧', image: null, club: 'Dinamo Zagrzeb', age: 28, height: 189, foot: 'Left', value: '6m €' },
{ id: 293, name: 'Jack Hendry', positions: ['CB'], primaryPosition: 'DEF', country: 'Szkocja', flag: '🇬🇧', image: null, club: 'Ettifaq FC', age: 29, height: 188, foot: 'Right', value: '8m €' },
{ id: 294, name: 'Nathan Patterson', positions: ['RB'], primaryPosition: 'DEF', country: 'Szkocja', flag: '🇬🇧', image: null, club: 'Everton', age: 24, height: 183, foot: 'Right', value: '18m €' },
{ id: 295, name: 'Anthony Ralston', positions: ['RB'], primaryPosition: 'DEF', country: 'Szkocja', flag: '🇬🇧', image: null, club: 'Celtic', age: 27, height: 178, foot: 'Right', value: '4m €' },
{ id: 296, name: 'John Souttar', positions: ['CB'], primaryPosition: 'DEF', country: 'Szkocja', flag: '🇬🇧', image: null, club: 'Rangers', age: 29, height: 191, foot: 'Right', value: '3m €' },
{ id: 297, name: 'Aaron Hickey', positions: ['RB', 'LB'], primaryPosition: 'DEF', country: 'Szkocja', flag: '🇬🇧', image: null, club: 'Brentford', age: 23, height: 183, foot: 'Right', value: '28m €' },
{ id: 298, name: 'Dominic Hyam', positions: ['CB'], primaryPosition: 'DEF', country: 'Szkocja', flag: '🇬🇧', image: null, club: 'Wrexham', age: 30, height: 188, foot: 'Right', value: '3m €' },

// Pomocnicy
{ id: 299, name: 'John McGinn', positions: ['CM', 'CAM', 'RAM', 'LAM', 'CF',], primaryPosition: 'MID', country: 'Szkocja', flag: '🇬🇧', image: null, club: 'Aston Villa', age: 31, height: 178, foot: 'Left', value: '35m €' },
{ id: 300, name: 'Scott McTominay', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Szkocja', flag: '🇬🇧', image: null, club: 'SSC Napoli', age: 29, height: 193, foot: 'Right', value: '45m €' },
{ id: 301, name: 'Ryan Christie', positions: ['CM', 'CAM'], primaryPosition: 'MID', country: 'Szkocja', flag: '🇬🇧', image: null, club: 'Bournemouth', age: 30, height: 178, foot: 'Right', value: '10m €' },
{ id: 302, name: 'Kenny McLean', positions: ['CM'], primaryPosition: 'MID', country: 'Szkocja', flag: '🇬🇧', image: null, club: 'Norwich City', age: 33, height: 180, foot: 'Left', value: '3m €' },
{ id: 303, name: 'Billy Gilmour', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Szkocja', flag: '🇬🇧', image: null, club: 'SSC Napoli', age: 24, height: 170, foot: 'Right', value: '25m €' },
{ id: 304, name: 'Lewis Ferguson', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Szkocja', flag: '🇬🇧', image: null, club: 'Bologna FC', age: 26, height: 183, foot: 'Right', value: '28m €' },
{ id: 305, name: 'Ben Gannon-Doak', positions: ['RW', 'RM'], primaryPosition: 'MID', country: 'Szkocja', flag: '🇬🇧', image: null, club: 'Bournemouth', age: 20, height: 175, foot: 'Left', value: '12m €' },
{ id: 306, name: 'Findlay Curtis', positions: ['CM'], primaryPosition: 'MID', country: 'Szkocja', flag: '🇬🇧', image: null, club: 'Kilmarnock', age: 19, height: 178, foot: 'Right', value: '1m €' },

// Napastnicy
{ id: 307, name: 'Lyndon Dykes', positions: ['ST'], primaryPosition: 'FWD', country: 'Szkocja', flag: '🇬🇧', image: null, club: 'Charlton Athletic', age: 30, height: 188, foot: 'Right', value: '3m €' },
{ id: 308, name: 'Ché Adams', positions: ['ST'], primaryPosition: 'FWD', country: 'Szkocja', flag: '🇬🇧', image: null, club: 'Torino FC', age: 29, height: 180, foot: 'Right', value: '12m €' },
{ id: 309, name: 'Lawrence Shankland', positions: ['ST'], primaryPosition: 'FWD', country: 'Szkocja', flag: '🇬🇧', image: null, club: 'Heart of Midlothian', age: 30, height: 185, foot: 'Right', value: '6m €' },
{ id: 310, name: 'George Hirst', positions: ['ST'], primaryPosition: 'FWD', country: 'Szkocja', flag: '🇬🇧', image: null, club: 'Ipswich Town', age: 26, height: 191, foot: 'Right', value: '4m €' },
{ id: 311, name: 'Ross Stewart', positions: ['ST'], primaryPosition: 'FWD', country: 'Szkocja', flag: '🇬🇧', image: null, club: 'Southampton', age: 29, height: 191, foot: 'Right', value: '8m €' },

// ==================== CURAÇAO ====================

// Bramkarze
{ id: 312, name: 'Eloy Room', positions: ['GK'], primaryPosition: 'GK', country: 'Curaçao', flag: '🇨🇼', image: null, club: 'Miami FC', age: 36, height: 187, foot: 'Right', value: '400k €' },
{ id: 313, name: 'Trevor Doornbusch', positions: ['GK'], primaryPosition: 'GK', country: 'Curaçao', flag: '🇨🇼', image: null, club: 'VVV Venlo', age: 26, height: 192, foot: 'Right', value: '300k €' },
{ id: 314, name: 'Tyrick Bodak', positions: ['GK'], primaryPosition: 'GK', country: 'Curaçao', flag: '🇨🇼', image: null, club: 'SC Telstar', age: 23, height: 188, foot: 'Right', value: '200k €' },

// Obrońcy
{ id: 315, name: 'Juriën Gaari', positions: ['RB'], primaryPosition: 'DEF', country: 'Curaçao', flag: '🇨🇼', image: null, club: 'Abha Club', age: 31, height: 179, foot: 'Right', value: '500k €' },
{ id: 316, name: 'Roshon van Eijma', positions: ['CB'], primaryPosition: 'DEF', country: 'Curaçao', flag: '🇨🇼', image: null, club: 'RKC Waalwijk', age: 26, height: 186, foot: 'Right', value: '700k €' },
{ id: 317, name: 'Sherel Floranus', positions: ['RB', 'LB'], primaryPosition: 'DEF', country: 'Curaçao', flag: '🇨🇼', image: null, club: 'PEC Zwolle', age: 26, height: 180, foot: 'Right', value: '900k €' },
{ id: 318, name: 'Joshua Brenet', positions: ['RB', 'LB'], primaryPosition: 'DEF', country: 'Curaçao', flag: '🇨🇼', image: null, club: 'Kayserispor', age: 31, height: 180, foot: 'Right', value: '1.2m €' },
{ id: 319, name: 'Shurandy Sambo', positions: ['RB'], primaryPosition: 'DEF', country: 'Curaçao', flag: '🇨🇼', image: null, club: 'Sparta Rotterdam', age: 24, height: 176, foot: 'Right', value: '2.5m €' },
{ id: 320, name: 'Armando Obispo', positions: ['CB'], primaryPosition: 'DEF', country: 'Curaçao', flag: '🇨🇼', image: null, club: 'PSV Eindhoven', age: 26, height: 185, foot: 'Left', value: '7m €' },
{ id: 321, name: 'Riechedly Bazoer', positions: ['CB', 'CDM'], primaryPosition: 'DEF', country: 'Curaçao', flag: '🇨🇼', image: null, club: 'Konyaspor', age: 28, height: 188, foot: 'Right', value: '3m €' },
{ id: 322, name: 'Deveron Fonville', positions: ['CB'], primaryPosition: 'DEF', country: 'Curaçao', flag: '🇨🇼', image: null, club: 'NEC Nijmegen', age: 22, height: 184, foot: 'Right', value: '500k €' },

// Pomocnicy
{ id: 323, name: 'Leandro Bacuna', positions: ['CM', 'RM'], primaryPosition: 'MID', country: 'Curaçao', flag: '🇨🇼', image: null, club: 'Iğdır FK', age: 33, height: 185, foot: 'Right', value: '1.5m €' },
{ id: 324, name: 'Juninho Bacuna', positions: ['CM', 'CAM', 'RAM', 'LAM', 'CF',], primaryPosition: 'MID', country: 'Curaçao', flag: '🇨🇼', image: null, club: 'FC Volendam', age: 27, height: 178, foot: 'Right', value: '2.5m €' },
{ id: 325, name: 'Godfried Roemeratoe', positions: ['CDM', 'CM'], primaryPosition: 'MID', country: 'Curaçao', flag: '🇨🇼', image: null, club: 'RKC Waalwijk', age: 26, height: 182, foot: 'Right', value: '900k €' },
{ id: 326, name: 'Kevin Felida', positions: ['CM'], primaryPosition: 'MID', country: 'Curaçao', flag: '🇨🇼', image: null, club: 'FC Den Bosch', age: 25, height: 180, foot: 'Right', value: '700k €' },
{ id: 327, name: 'Livano Comenencia', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Curaçao', flag: '🇨🇼', image: null, club: 'FC Zürich', age: 21, height: 177, foot: 'Right', value: '2m €' },
{ id: 328, name: "Ar'jany Martha", positions: ['LW', 'LM'], primaryPosition: 'MID', country: 'Curaçao', flag: '🇨🇼', image: null, club: 'Rotherham United', age: 22, height: 174, foot: 'Right', value: '1.2m €' },
{ id: 329, name: 'Tyrese Noslin', positions: ['LW', 'RW'], primaryPosition: 'MID', country: 'Curaçao', flag: '🇨🇼', image: null, club: 'SC Telstar', age: 23, height: 176, foot: 'Right', value: '800k €' },

// Napastnicy
{ id: 330, name: 'Kenji Gorré', positions: ['LW', 'RW'], primaryPosition: 'FWD', country: 'Curaçao', flag: '🇨🇼', image: null, club: 'Maccabi Hajfa', age: 30, height: 175, foot: 'Right', value: '1.5m €' },
{ id: 331, name: 'Brandley Kuwas', positions: ['RW'], primaryPosition: 'FWD', country: 'Curaçao', flag: '🇨🇼', image: null, club: 'FC Volendam', age: 32, height: 178, foot: 'Left', value: '1m €' },
{ id: 332, name: 'Gervane Kastaneer', positions: ['ST', 'RW'], primaryPosition: 'FWD', country: 'Curaçao', flag: '🇨🇼', image: null, club: 'Terengganu FC', age: 29, height: 183, foot: 'Right', value: '700k €' },
{ id: 333, name: 'Jeremy Antonisse', positions: ['LW', 'ST'], primaryPosition: 'FWD', country: 'Curaçao', flag: '🇨🇼', image: null, club: 'AE Kifisia', age: 23, height: 180, foot: 'Right', value: '900k €' },
{ id: 334, name: 'Jearl Margaritha', positions: ['ST', 'LW'], primaryPosition: 'FWD', country: 'Curaçao', flag: '🇨🇼', image: null, club: 'SK Beveren', age: 25, height: 182, foot: 'Right', value: '1.2m €' },
{ id: 335, name: 'Jürgen Locadia', positions: ['ST'], primaryPosition: 'FWD', country: 'Curaçao', flag: '🇨🇼', image: null, club: 'Miami FC', age: 31, height: 187, foot: 'Right', value: '600k €' },
{ id: 336, name: 'Sontje Hansen', positions: ['ST', 'RW'], primaryPosition: 'FWD', country: 'Curaçao', flag: '🇨🇼', image: null, club: 'Middlesbrough', age: 23, height: 175, foot: 'Left', value: '2.5m €' },
{ id: 337, name: 'Tahith Chong', positions: ['RW', 'LW'], primaryPosition: 'FWD', country: 'Curaçao', flag: '🇨🇼', image: null, club: 'Sheffield United', age: 25, height: 185, foot: 'Left', value: '3m €' },

// ==================== Republika Zielonego Przylądka ====================

// Bramkarze
{ id: 338, name: 'Vozinha', positions: ['GK'], primaryPosition: 'GK', country: 'Republika Zielonego Przylądka', flag: '🇨🇻', image: null, club: 'GD Chaves', age: 39, height: 185, foot: 'Right', value: '0.2m €' },
{ id: 339, name: 'Márcio Rosa', positions: ['GK'], primaryPosition: 'GK', country: 'Republika Zielonego Przylądka', flag: '🇨🇻', image: null, club: 'FK Montana', age: 29, height: 188, foot: 'Right', value: '0.1m €' },
{ id: 340, name: 'CJ dos Santos', positions: ['GK'], primaryPosition: 'GK', country: 'Republika Zielonego Przylądka', flag: '🇨🇻', image: null, club: 'San Diego FC', age: 25, height: 191, foot: 'Right', value: '0.3m €' },

// Obrońcy
{ id: 341, name: 'Steven Moreira', positions: ['RB'], primaryPosition: 'DEF', country: 'Republika Zielonego Przylądka', flag: '🇨🇻', image: null, club: 'Columbus Crew', age: 31, height: 179, foot: 'Right', value: '2.5m €' },
{ id: 342, name: 'Wagner Pina', positions: ['RB'], primaryPosition: 'DEF', country: 'Republika Zielonego Przylądka', flag: '🇨🇻', image: null, club: 'Trabzonspor', age: 23, height: 178, foot: 'Right', value: '1.8m €' },
{ id: 343, name: 'João Paulo Fernandes', positions: ['CB'], primaryPosition: 'DEF', country: 'Republika Zielonego Przylądka', flag: '🇨🇻', image: null, club: 'FCSB', age: 28, height: 186, foot: 'Right', value: '1.2m €' },
{ id: 344, name: 'Sidny Lopes Cabral', positions: ['CB'], primaryPosition: 'DEF', country: 'Republika Zielonego Przylądka', flag: '🇨🇻', image: null, club: 'SL Benfica', age: 23, height: 183, foot: 'Right', value: '2m €' },
{ id: 345, name: 'Logan Costa', positions: ['CB'], primaryPosition: 'DEF', country: 'Republika Zielonego Przylądka', flag: '🇨🇻', image: null, club: 'Villarreal CF', age: 25, height: 187, foot: 'Right', value: '20m €' },
{ id: 346, name: 'Roberto Lopes', positions: ['CB'], primaryPosition: 'DEF', country: 'Republika Zielonego Przylądka', flag: '🇨🇻', image: null, club: 'Shamrock Rovers', age: 33, height: 184, foot: 'Right', value: '0.6m €' },
{ id: 347, name: 'Kelvin Pires', positions: ['LB'], primaryPosition: 'DEF', country: 'Republika Zielonego Przylądka', flag: '🇨🇻', image: null, club: 'SJK', age: 26, height: 180, foot: 'Left', value: '0.5m €' },
{ id: 348, name: 'Stopira', positions: ['LB'], primaryPosition: 'DEF', country: 'Republika Zielonego Przylądka', flag: '🇨🇻', image: null, club: 'Torreense', age: 38, height: 175, foot: 'Left', value: '0.1m €' },
{ id: 349, name: 'Diney', positions: ['CB'], primaryPosition: 'DEF', country: 'Republika Zielonego Przylądka', flag: '🇨🇻', image: null, club: 'Al Bataeh', age: 31, height: 186, foot: 'Right', value: '0.3m €' },

// Pomocnicy
{ id: 350, name: 'Jamiro Monteiro', positions: ['CM', 'CAM', 'RAM', 'LAM', 'CF',], primaryPosition: 'MID', country: 'Republika Zielonego Przylądka', flag: '🇨🇻', image: null, club: 'PEC Zwolle', age: 32, height: 176, foot: 'Right', value: '1.5m €' },
{ id: 351, name: 'Telmo Arcanjo', positions: ['CM'], primaryPosition: 'MID', country: 'Republika Zielonego Przylądka', flag: '🇨🇻', image: null, club: 'Vitória SC', age: 24, height: 178, foot: 'Right', value: '1.2m €' },
{ id: 352, name: 'Yannick Semedo', positions: ['CM'], primaryPosition: 'MID', country: 'Republika Zielonego Przylądka', flag: '🇨🇻', image: null, club: 'Farense', age: 30, height: 177, foot: 'Right', value: '0.4m €' },
{ id: 353, name: 'Laros Duarte', positions: ['CM'], primaryPosition: 'MID', country: 'Republika Zielonego Przylądka', flag: '🇨🇻', image: null, club: 'Puskás Akadémia', age: 29, height: 179, foot: 'Right', value: '0.8m €' },
{ id: 354, name: 'Deroy Duarte', positions: ['CM'], primaryPosition: 'MID', country: 'Republika Zielonego Przylądka', flag: '🇨🇻', image: null, club: 'Łudogorec', age: 26, height: 180, foot: 'Right', value: '1.2m €' },
{ id: 355, name: 'Kevin Pina', positions: ['CDM'], primaryPosition: 'MID', country: 'Republika Zielonego Przylądka', flag: '🇨🇻', image: null, club: 'FK Krasnodar', age: 29, height: 182, foot: 'Right', value: '3m €' },

// Napastnicy
{ id: 356, name: 'Ryan Mendes', positions: ['LW'], primaryPosition: 'FWD', country: 'Republika Zielonego Przylądka', flag: '🇨🇻', image: null, club: 'Iğdır FK', age: 36, height: 177, foot: 'Right', value: '0.7m €' },
{ id: 357, name: 'Willy Semedo', positions: ['RW'], primaryPosition: 'FWD', country: 'Republika Zielonego Przylądka', flag: '🇨🇻', image: null, club: 'Omonia Nikozja', age: 31, height: 178, foot: 'Right', value: '0.6m €' },
{ id: 358, name: 'Garry Rodrigues', positions: ['LW', 'RW'], primaryPosition: 'FWD', country: 'Republika Zielonego Przylądka', flag: '🇨🇻', image: null, club: 'Apollon Limassol', age: 35, height: 180, foot: 'Right', value: '0.5m €' },
{ id: 359, name: 'Jovane Cabral', positions: ['LW'], primaryPosition: 'FWD', country: 'Republika Zielonego Przylądka', flag: '🇨🇻', image: null, club: 'Estrela Amadora', age: 27, height: 182, foot: 'Right', value: '1.8m €' },
{ id: 360, name: 'Nuno da Costa', positions: ['ST'], primaryPosition: 'FWD', country: 'Republika Zielonego Przylądka', flag: '🇨🇻', image: null, club: 'Başakşehir', age: 35, height: 184, foot: 'Right', value: '0.4m €' },
{ id: 361, name: 'Dailon Livramento', positions: ['ST'], primaryPosition: 'FWD', country: 'Republika Zielonego Przylądka', flag: '🇨🇻', image: null, club: 'Casa Pia', age: 25, height: 186, foot: 'Right', value: '1.5m €' },
{ id: 362, name: 'Gilson Benchimol', positions: ['ST'], primaryPosition: 'FWD', country: 'Republika Zielonego Przylądka', flag: '🇨🇻', image: null, club: 'Akron Togliatti', age: 24, height: 185, foot: 'Right', value: '0.9m €' },
{ id: 363, name: 'Hélio Varela', positions: ['LW'], primaryPosition: 'FWD', country: 'Republika Zielonego Przylądka', flag: '🇨🇻', image: null, club: 'Maccabi Tel Aviv', age: 24, height: 181, foot: 'Right', value: '1.2m €' },

// ==================== AUSTRIA ====================

// Bramkarze
{ id: 364, name: 'Alexander Schlager', positions: ['GK'], primaryPosition: 'GK', country: 'Austria', flag: '🇦🇹', image: null, club: 'Red Bull Salzburg', age: 30, height: 184, foot: 'Right', value: '8m €' },
{ id: 365, name: 'Florian Wiegele', positions: ['GK'], primaryPosition: 'GK', country: 'Austria', flag: '🇦🇹', image: null, club: 'Viktoria Pilzno', age: 24, height: 193, foot: 'Right', value: '0.5m €' },
{ id: 366, name: 'Patrick Pentz', positions: ['GK'], primaryPosition: 'GK', country: 'Austria', flag: '🇦🇹', image: null, club: 'Brøndby IF', age: 29, height: 187, foot: 'Right', value: '3m €' },

// Obrońcy
{ id: 367, name: 'David Affengruber', positions: ['CB'], primaryPosition: 'DEF', country: 'Austria', flag: '🇦🇹', image: null, club: 'Elche CF', age: 24, height: 187, foot: 'Right', value: '2m €' },
{ id: 368, name: 'Kevin Danso', positions: ['CB'], primaryPosition: 'DEF', country: 'Austria', flag: '🇦🇹', image: null, club: 'Tottenham Hotspur', age: 27, height: 190, foot: 'Right', value: '25m €' },
{ id: 369, name: 'Stefan Posch', positions: ['CB', 'RB'], primaryPosition: 'DEF', country: 'Austria', flag: '🇦🇹', image: null, club: 'Mainz 05', age: 28, height: 189, foot: 'Right', value: '12m €' },
{ id: 370, name: 'David Alaba', positions: ['CB', 'LB'], primaryPosition: 'DEF', country: 'Austria', flag: '🇦🇹', image: null, club: 'Real Madryt', age: 33, height: 180, foot: 'Left', value: '10m €' },
{ id: 371, name: 'Philipp Lienhart', positions: ['CB'], primaryPosition: 'DEF', country: 'Austria', flag: '🇦🇹', image: null, club: 'SC Freiburg', age: 29, height: 189, foot: 'Right', value: '18m €' },
{ id: 372, name: 'Phillipp Mwene', positions: ['RB', 'LB'], primaryPosition: 'DEF', country: 'Austria', flag: '🇦🇹', image: null, club: 'Mainz 05', age: 31, height: 170, foot: 'Right', value: '3m €' },
{ id: 373, name: 'Alexander Prass', positions: ['LB', 'LM'], primaryPosition: 'DEF', country: 'Austria', flag: '🇦🇹', image: null, club: 'TSG Hoffenheim', age: 25, height: 180, foot: 'Left', value: '10m €' },
{ id: 374, name: 'Marco Friedl', positions: ['CB', 'LB'], primaryPosition: 'DEF', country: 'Austria', flag: '🇦🇹', image: null, club: 'Werder Brema', age: 28, height: 187, foot: 'Left', value: '8m €' },
{ id: 375, name: 'Michael Svoboda', positions: ['CB'], primaryPosition: 'DEF', country: 'Austria', flag: '🇦🇹', image: null, club: 'Venezia FC', age: 27, height: 194, foot: 'Right', value: '1.5m €' },

// Pomocnicy
{ id: 376, name: 'Xaver Schlager', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Austria', flag: '🇦🇹', image: null, club: 'RB Leipzig', age: 28, height: 174, foot: 'Right', value: '28m €' },
{ id: 377, name: 'Nicolas Seiwald', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Austria', flag: '🇦🇹', image: null, club: 'RB Leipzig', age: 24, height: 179, foot: 'Right', value: '22m €' },
{ id: 378, name: 'Marcel Sabitzer', positions: ['CM', 'CAM', 'RAM', 'LAM', 'CF',], primaryPosition: 'MID', country: 'Austria', flag: '🇦🇹', image: null, club: 'Borussia Dortmund', age: 31, height: 178, foot: 'Right', value: '18m €' },
{ id: 379, name: 'Florian Grillitsch', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Austria', flag: '🇦🇹', image: null, club: 'SC Braga', age: 30, height: 187, foot: 'Right', value: '7m €' },
{ id: 380, name: 'Carney Chukwuemeka', positions: ['CM', 'CAM', 'RAM', 'LAM', 'CF',], primaryPosition: 'MID', country: 'Austria', flag: '🇦🇹', image: null, club: 'Borussia Dortmund', age: 22, height: 188, foot: 'Right', value: '18m €' },
{ id: 381, name: 'Romano Schmid', positions: ['CM', 'CAM', 'RAM', 'LAM', 'CF',], primaryPosition: 'MID', country: 'Austria', flag: '🇦🇹', image: null, club: 'Werder Brema', age: 26, height: 168, foot: 'Right', value: '12m €' },
{ id: 382, name: 'Christoph Baumgartner', positions: ['CAM', 'RAM', 'LAM', 'CF', 'CM'], primaryPosition: 'MID', country: 'Austria', flag: '🇦🇹', image: null, club: 'RB Leipzig', age: 26, height: 180, foot: 'Right', value: '30m €' },
{ id: 383, name: 'Konrad Laimer', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Austria', flag: '🇦🇹', image: null, club: 'Bayern Monachium', age: 28, height: 180, foot: 'Right', value: '25m €' },
{ id: 384, name: 'Patrick Wimmer', positions: ['RW', 'RM'], primaryPosition: 'MID', country: 'Austria', flag: '🇦🇹', image: null, club: 'VfL Wolfsburg', age: 25, height: 182, foot: 'Left', value: '20m €' },
{ id: 385, name: 'Paul Wanner', positions: ['CAM', 'RAM', 'LAM', 'CF', 'CM'], primaryPosition: 'MID', country: 'Austria', flag: '🇦🇹', image: null, club: 'PSV Eindhoven', age: 20, height: 185, foot: 'Left', value: '12m €' },
{ id: 386, name: 'Alessandro Schöpf', positions: ['CM', 'CAM', 'RAM', 'LAM', 'CF',], primaryPosition: 'MID', country: 'Austria', flag: '🇦🇹', image: null, club: 'Wolfsberger AC', age: 32, height: 178, foot: 'Right', value: '1.2m €' },

// Napastnicy
{ id: 387, name: 'Marko Arnautović', positions: ['ST'], primaryPosition: 'FWD', country: 'Austria', flag: '🇦🇹', image: null, club: 'Crvena zvezda', age: 37, height: 192, foot: 'Right', value: '3m €' },
{ id: 388, name: 'Michael Gregoritsch', positions: ['ST'], primaryPosition: 'FWD', country: 'Austria', flag: '🇦🇹', image: null, club: 'FC Augsburg', age: 31, height: 193, foot: 'Left', value: '6m €' },
{ id: 389, name: 'Saša Kalajdžić', positions: ['ST'], primaryPosition: 'FWD', country: 'Austria', flag: '🇦🇹', image: null, club: 'LASK Linz', age: 28, height: 200, foot: 'Right', value: '10m €' },

// ==================== PORTUGALIA ====================

// Bramkarze
{ id: 390, name: 'Diogo Costa', positions: ['GK'], primaryPosition: 'GK', country: 'Portugalia', flag: '🇵🇹', image: null, club: 'FC Porto', age: 26, height: 186, foot: 'Right', value: '60m €' },
{ id: 391, name: 'José Sá', positions: ['GK'], primaryPosition: 'GK', country: 'Portugalia', flag: '🇵🇹', image: null, club: 'Wolverhampton Wanderers', age: 33, height: 192, foot: 'Right', value: '18m €' },
{ id: 392, name: 'Rui Silva', positions: ['GK'], primaryPosition: 'GK', country: 'Portugalia', flag: '🇵🇹', image: null, club: 'Sporting CP', age: 32, height: 191, foot: 'Right', value: '8m €' },

// Obrońcy
{ id: 393, name: 'Diogo Dalot', positions: ['RB', 'RWB'], primaryPosition: 'DEF', country: 'Portugalia', flag: '🇵🇹', image: null, club: 'Manchester United', age: 27, height: 183, foot: 'Right', value: '45m €' },
{ id: 394, name: 'Matheus Nunes', positions: ['RB', 'RM'], primaryPosition: 'MID', country: 'Portugalia', flag: '🇵🇹', image: null, club: 'Manchester City', age: 27, height: 183, foot: 'Right', value: '55m €' },
{ id: 395, name: 'Nélson Semedo', positions: ['RB', 'RWB'], primaryPosition: 'DEF', country: 'Portugalia', flag: '🇵🇹', image: null, club: 'Fenerbahçe SK', age: 32, height: 177, foot: 'Right', value: '10m €' },
{ id: 396, name: 'João Cancelo', positions: ['RB', 'LB'], primaryPosition: 'DEF', country: 'Portugalia', flag: '🇵🇹', image: null, club: 'FC Barcelona', age: 32, height: 182, foot: 'Right', value: '25m €' },
{ id: 397, name: 'Nuno Mendes', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'Portugalia', flag: '🇵🇹', image: null, club: 'Paris Saint-Germain', age: 23, height: 180, foot: 'Left', value: '70m €' },
{ id: 398, name: 'Gonçalo Inácio', positions: ['CB'], primaryPosition: 'DEF', country: 'Portugalia', flag: '🇵🇹', image: null, club: 'Sporting CP', age: 24, height: 185, foot: 'Left', value: '45m €' },
{ id: 399, name: 'Renato Veiga', positions: ['CB'], primaryPosition: 'DEF', country: 'Portugalia', flag: '🇵🇹', image: null, club: 'Villarreal CF', age: 22, height: 190, foot: 'Left', value: '15m €' },
{ id: 400, name: 'Rúben Dias', positions: ['CB'], primaryPosition: 'DEF', country: 'Portugalia', flag: '🇵🇹', image: null, club: 'Manchester City', age: 29, height: 187, foot: 'Right', value: '80m €' },
{ id: 401, name: 'Tomás Araújo', positions: ['CB'], primaryPosition: 'DEF', country: 'Portugalia', flag: '🇵🇹', image: null, club: 'SL Benfica', age: 23, height: 187, foot: 'Right', value: '35m €' },

// Pomocnicy
{ id: 402, name: 'Rúben Neves', positions: ['CDM', 'CM'], primaryPosition: 'MID', country: 'Portugalia', flag: '🇵🇹', image: null, club: 'Al-Hilal', age: 29, height: 180, foot: 'Right', value: '25m €' },
{ id: 403, name: 'Samú Costa', positions: ['CDM'], primaryPosition: 'MID', country: 'Portugalia', flag: '🇵🇹', image: null, club: 'RCD Mallorca', age: 25, height: 183, foot: 'Right', value: '15m €' },
{ id: 404, name: 'João Neves', positions: ['CM'], primaryPosition: 'MID', country: 'Portugalia', flag: '🇵🇹', image: null, club: 'Paris Saint-Germain', age: 21, height: 174, foot: 'Right', value: '80m €' },
{ id: 405, name: 'Vitinha', positions: ['CM'], primaryPosition: 'MID', country: 'Portugalia', flag: '🇵🇹', image: null, club: 'Paris Saint-Germain', age: 26, height: 172, foot: 'Right', value: '80m €' },
{ id: 406, name: 'Bruno Fernandes', positions: ['CAM', 'RAM', 'LAM', 'CF', 'CM'], primaryPosition: 'MID', country: 'Portugalia', flag: '🇵🇹', image: null, club: 'Manchester United', age: 31, height: 179, foot: 'Right', value: '65m €' },
{ id: 407, name: 'Bernardo Silva', positions: ['CAM', 'RAM', 'LAM', 'CF', 'CM', 'RW'], primaryPosition: 'MID', country: 'Portugalia', flag: '🇵🇹', image: null, club: 'Manchester City', age: 31, height: 173, foot: 'Left', value: '60m €' },

// Napastnicy
{ id: 408, name: 'João Félix', positions: ['ST', 'LW'], primaryPosition: 'FWD', country: 'Portugalia', flag: '🇵🇹', image: null, club: 'Al-Nassr', age: 26, height: 181, foot: 'Right', value: '35m €' },
{ id: 409, name: 'Francisco Trincão', positions: ['RW', 'LW'], primaryPosition: 'FWD', country: 'Portugalia', flag: '🇵🇹', image: null, club: 'Sporting CP', age: 26, height: 184, foot: 'Left', value: '40m €' },
{ id: 410, name: 'Francisco Conceição', positions: ['RW'], primaryPosition: 'FWD', country: 'Portugalia', flag: '🇵🇹', image: null, club: 'Juventus', age: 23, height: 170, foot: 'Left', value: '35m €' },
{ id: 411, name: 'Pedro Neto', positions: ['RW', 'LW'], primaryPosition: 'FWD', country: 'Portugalia', flag: '🇵🇹', image: null, club: 'Chelsea', age: 26, height: 172, foot: 'Left', value: '55m €' },
{ id: 412, name: 'Rafael Leão', positions: ['LW'], primaryPosition: 'FWD', country: 'Portugalia', flag: '🇵🇹', image: null, club: 'AC Milan', age: 26, height: 188, foot: 'Right', value: '90m €' },
{ id: 413, name: 'Gonçalo Guedes', positions: ['LW', 'ST'], primaryPosition: 'FWD', country: 'Portugalia', flag: '🇵🇹', image: null, club: 'Real Sociedad', age: 29, height: 179, foot: 'Right', value: '10m €' },
{ id: 414, name: 'Gonçalo Ramos', positions: ['ST'], primaryPosition: 'FWD', country: 'Portugalia', flag: '🇵🇹', image: null, club: 'Paris Saint-Germain', age: 24, height: 185, foot: 'Right', value: '60m €' },
{ id: 415, name: 'Cristiano Ronaldo', positions: ['ST'], primaryPosition: 'FWD', country: 'Portugalia', flag: '🇵🇹', image: null, club: 'Al-Nassr', age: 41, height: 187, foot: 'Right', value: '12m €' },


// ==================== DEMOKRATYCZNA REPUBLIKA KONGA ====================

// Bramkarze
{ id: 416, name: 'Lionel Mpasi', positions: ['GK'], primaryPosition: 'GK', country: 'DR Konga', flag: '🇨🇩', image: null, club: 'Le Havre AC', age: 31, height: 185, foot: 'Right', value: '1.5m €' },
{ id: 417, name: 'Timothy Fayulu', positions: ['GK'], primaryPosition: 'GK', country: 'DR Konga', flag: '🇨🇩', image: null, club: 'FC Noah', age: 27, height: 190, foot: 'Right', value: '800k €' },
{ id: 418, name: 'Matthieu Epolo', positions: ['GK'], primaryPosition: 'GK', country: 'DR Konga', flag: '🇨🇩', image: null, club: 'Standard Liège', age: 20, height: 189, foot: 'Right', value: '2m €' },

// Obrońcy
{ id: 419, name: 'Chancel Mbemba', positions: ['CB'], primaryPosition: 'DEF', country: 'DR Konga', flag: '🇨🇩', image: null, club: 'Lille OSC', age: 31, height: 182, foot: 'Right', value: '6m €' },
{ id: 420, name: 'Arthur Masuaku', positions: ['LB'], primaryPosition: 'DEF', country: 'DR Konga', flag: '🇨🇩', image: null, club: 'Besiktas JK', age: 31, height: 179, foot: 'Left', value: '3m €' },
{ id: 421, name: 'Gédéon Kalulu', positions: ['RB'], primaryPosition: 'DEF', country: 'DR Konga', flag: '🇨🇩', image: null, club: 'Aris Limassol', age: 27, height: 175, foot: 'Right', value: '2m €' },
{ id: 422, name: 'Joris Kayembe', positions: ['LB', 'LWB'], primaryPosition: 'DEF', country: 'DR Konga', flag: '🇨🇩', image: null, club: 'KRC Genk', age: 30, height: 182, foot: 'Left', value: '3.5m €' },
{ id: 423, name: 'Dylan Batubinsika', positions: ['CB'], primaryPosition: 'DEF', country: 'DR Konga', flag: '🇨🇩', image: null, club: 'Saint-Étienne', age: 29, height: 187, foot: 'Right', value: '3m €' },
{ id: 424, name: 'Axel Tuanzebe', positions: ['CB'], primaryPosition: 'DEF', country: 'DR Konga', flag: '🇨🇩', image: null, club: 'Burnley', age: 27, height: 185, foot: 'Right', value: '2.5m €' },
{ id: 425, name: 'Aaron Wan-Bissaka', positions: ['RB'], primaryPosition: 'DEF', country: 'DR Konga', flag: '🇨🇩', image: null, club: 'West Ham United', age: 27, height: 183, foot: 'Right', value: '25m €' },
{ id: 426, name: 'Steve Kapuadi', positions: ['CB'], primaryPosition: 'DEF', country: 'DR Konga', flag: '🇨🇩', image: null, club: 'Widzew Łódź', age: 27, height: 195, foot: 'Left', value: '1.2m €' },

// Pomocnicy
{ id: 427, name: 'Meschak Elia', positions: ['RW', 'RM'], primaryPosition: 'MID', country: 'DR Konga', flag: '🇨🇩', image: null, club: 'Alanyaspor', age: 27, height: 173, foot: 'Right', value: '4m €' },
{ id: 428, name: 'Samuel Moutoussamy', positions: ['CM'], primaryPosition: 'MID', country: 'DR Konga', flag: '🇨🇩', image: null, club: 'Atromitos', age: 29, height: 177, foot: 'Right', value: '2m €' },
{ id: 429, name: 'Edo Kayembe', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'DR Konga', flag: '🇨🇩', image: null, club: 'Watford', age: 27, height: 191, foot: 'Right', value: '6m €' },
{ id: 430, name: 'Théo Bongonda', positions: ['LW', 'RW'], primaryPosition: 'MID', country: 'DR Konga', flag: '🇨🇩', image: null, club: 'Spartak Moscow', age: 29, height: 173, foot: 'Right', value: '7m €' },
{ id: 431, name: 'Charles Pickel', positions: ['CDM', 'CM'], primaryPosition: 'MID', country: 'DR Konga', flag: '🇨🇩', image: null, club: 'Espanyol', age: 28, height: 185, foot: 'Right', value: '3m €' },
{ id: 432, name: 'Gaël Kakuta', positions: ['CAM', 'RAM', 'LAM', 'CF',], primaryPosition: 'MID', country: 'DR Konga', flag: '🇨🇩', image: null, club: 'Amiens SC', age: 33, height: 173, foot: 'Right', value: '1m €' },
{ id: 433, name: 'Noah Sadiki', positions: ['CM'], primaryPosition: 'MID', country: 'DR Konga', flag: '🇨🇩', image: null, club: 'Union Saint-Gilloise', age: 20, height: 176, foot: 'Right', value: '10m €' },
{ id: 434, name: 'Nathanaël Mbuku', positions: ['RW', 'LW'], primaryPosition: 'MID', country: 'DR Konga', flag: '🇨🇩', image: null, club: 'Montpellier', age: 23, height: 170, foot: 'Right', value: '4m €' },
{ id: 435, name: "Ngal'ayel Mukau", positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'DR Konga', flag: '🇨🇩', image: null, club: 'Lille OSC', age: 20, height: 184, foot: 'Right', value: '8m €' },
{ id: 436, name: 'Brian Cipenga', positions: ['CM'], primaryPosition: 'MID', country: 'DR Konga', flag: '🇨🇩', image: null, club: 'CD Castellón', age: 26, height: 178, foot: 'Right', value: '700k €' },
{ id: 437, name: 'Aaron Tshibola', positions: ['CM'], primaryPosition: 'MID', country: 'DR Konga', flag: '🇨🇩', image: null, club: 'Kilmarnock', age: 30, height: 188, foot: 'Right', value: '500k €' },

// Napastnicy
{ id: 438, name: 'Cédric Bakambu', positions: ['ST'], primaryPosition: 'FWD', country: 'DR Konga', flag: '🇨🇩', image: null, club: 'Real Betis', age: 34, height: 182, foot: 'Right', value: '2.5m €' },
{ id: 439, name: 'Fiston Mayele', positions: ['ST'], primaryPosition: 'FWD', country: 'DR Konga', flag: '🇨🇩', image: null, club: 'Pyramids FC', age: 31, height: 180, foot: 'Right', value: '3m €' },
{ id: 440, name: 'Yoane Wissa', positions: ['ST', 'LW'], primaryPosition: 'FWD', country: 'DR Konga', flag: '🇨🇩', image: null, club: 'Brentford', age: 29, height: 176, foot: 'Right', value: '40m €' },
{ id: 441, name: 'Simon Banza', positions: ['ST'], primaryPosition: 'FWD', country: 'DR Konga', flag: '🇨🇩', image: null, club: 'Al-Jazira', age: 29, height: 189, foot: 'Right', value: '8m €' },

// ==================== CHORWACJA ====================

// Bramkarze
{ id: 442, name: 'Dominik Livaković', positions: ['GK'], primaryPosition: 'GK', country: 'Chorwacja', flag: '🇭🇷', image: null, club: 'Dinamo Zagrzeb', age: 30, height: 188, foot: 'Right', value: '20m €' },
{ id: 443, name: 'Dominik Kotarski', positions: ['GK'], primaryPosition: 'GK', country: 'Chorwacja', flag: '🇭🇷', image: null, club: 'FC København', age: 25, height: 190, foot: 'Right', value: '10m €' },
{ id: 444, name: 'Ivor Pandur', positions: ['GK'], primaryPosition: 'GK', country: 'Chorwacja', flag: '🇭🇷', image: null, club: 'Hull City', age: 25, height: 194, foot: 'Right', value: '3m €' },

// Obrońcy
{ id: 445, name: 'Joško Gvardiol', positions: ['CB', 'LB'], primaryPosition: 'DEF', country: 'Chorwacja', flag: '🇭🇷', image: null, club: 'Manchester City', age: 23, height: 185, foot: 'Left', value: '80m €' },
{ id: 446, name: 'Duje Ćaleta-Car', positions: ['CB'], primaryPosition: 'DEF', country: 'Chorwacja', flag: '🇭🇷', image: null, club: 'Real Sociedad', age: 29, height: 192, foot: 'Right', value: '12m €' },
{ id: 447, name: 'Josip Šutalo', positions: ['CB'], primaryPosition: 'DEF', country: 'Chorwacja', flag: '🇭🇷', image: null, club: 'AFC Ajax', age: 25, height: 188, foot: 'Right', value: '25m €' },
{ id: 448, name: 'Josip Stanišić', positions: ['CB', 'RB'], primaryPosition: 'DEF', country: 'Chorwacja', flag: '🇭🇷', image: null, club: 'Bayern Monachium', age: 25, height: 184, foot: 'Right', value: '28m €' },
{ id: 449, name: 'Marin Pongračić', positions: ['CB'], primaryPosition: 'DEF', country: 'Chorwacja', flag: '🇭🇷', image: null, club: 'ACF Fiorentina', age: 27, height: 193, foot: 'Right', value: '10m €' },
{ id: 450, name: 'Martin Erlić', positions: ['CB'], primaryPosition: 'DEF', country: 'Chorwacja', flag: '🇭🇷', image: null, club: 'FC Midtjylland', age: 28, height: 192, foot: 'Right', value: '8m €' },
{ id: 451, name: 'Luka Vušković', positions: ['CB'], primaryPosition: 'DEF', country: 'Chorwacja', flag: '🇭🇷', image: null, club: 'Hamburger SV', age: 18, height: 193, foot: 'Left', value: '20m €' },

// Pomocnicy
{ id: 452, name: 'Luka Modrić', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Chorwacja', flag: '🇭🇷', image: null, club: 'AC Milan', age: 40, height: 172, foot: 'Right', value: '5m €' },
{ id: 453, name: 'Mateo Kovačić', positions: ['CM'], primaryPosition: 'MID', country: 'Chorwacja', flag: '🇭🇷', image: null, club: 'Manchester City', age: 31, height: 176, foot: 'Right', value: '40m €' },
{ id: 454, name: 'Mario Pašalić', positions: ['CM', 'CAM', 'RAM', 'LAM', 'CF',], primaryPosition: 'MID', country: 'Chorwacja', flag: '🇭🇷', image: null, club: 'Atalanta BC', age: 30, height: 186, foot: 'Right', value: '25m €' },
{ id: 455, name: 'Nikola Vlašić', positions: ['CAM', 'RAM', 'LAM', 'CF', 'CM'], primaryPosition: 'MID', country: 'Chorwacja', flag: '🇭🇷', image: null, club: 'Torino FC', age: 28, height: 178, foot: 'Right', value: '18m €' },
{ id: 456, name: 'Luka Sučić', positions: ['CM'], primaryPosition: 'MID', country: 'Chorwacja', flag: '🇭🇷', image: null, club: 'Real Sociedad', age: 22, height: 184, foot: 'Left', value: '30m €' },
{ id: 457, name: 'Martin Baturina', positions: ['CAM', 'RAM', 'LAM', 'CF',], primaryPosition: 'MID', country: 'Chorwacja', flag: '🇭🇷', image: null, club: 'Como 1907', age: 22, height: 172, foot: 'Left', value: '25m €' },
{ id: 458, name: 'Kristijan Jakić', positions: ['CDM', 'CM'], primaryPosition: 'MID', country: 'Chorwacja', flag: '🇭🇷', image: null, club: 'FC Augsburg', age: 28, height: 182, foot: 'Right', value: '10m €' },
{ id: 459, name: 'Petar Sučić', positions: ['CM'], primaryPosition: 'MID', country: 'Chorwacja', flag: '🇭🇷', image: null, club: 'Inter Mediolan', age: 22, height: 185, foot: 'Right', value: '35m €' },
{ id: 460, name: 'Nikola Moro', positions: ['CM', 'CDM'], primaryPosition: 'MID', country: 'Chorwacja', flag: '🇭🇷', image: null, club: 'Bologna FC', age: 27, height: 183, foot: 'Right', value: '12m €' },
{ id: 461, name: 'Toni Fruk', positions: ['CM', 'CAM', 'RAM', 'LAM', 'CF',], primaryPosition: 'MID', country: 'Chorwacja', flag: '🇭🇷', image: null, club: 'HNK Rijeka', age: 24, height: 181, foot: 'Right', value: '6m €' },

// Napastnicy
{ id: 462, name: 'Ivan Perišić', positions: ['LW', 'RW'], primaryPosition: 'FWD', country: 'Chorwacja', flag: '🇭🇷', image: null, club: 'PSV Eindhoven', age: 36, height: 186, foot: 'Right', value: '4m €' },
{ id: 463, name: 'Andrej Kramarić', positions: ['ST', 'CAM', 'RAM', 'LAM', 'CF',], primaryPosition: 'FWD', country: 'Chorwacja', flag: '🇭🇷', image: null, club: 'TSG Hoffenheim', age: 34, height: 177, foot: 'Right', value: '10m €' },
{ id: 464, name: 'Ante Budimir', positions: ['ST'], primaryPosition: 'FWD', country: 'Chorwacja', flag: '🇭🇷', image: null, club: 'CA Osasuna', age: 33, height: 190, foot: 'Right', value: '8m €' },
{ id: 465, name: 'Marco Pašalić', positions: ['RW', 'LW'], primaryPosition: 'FWD', country: 'Chorwacja', flag: '🇭🇷', image: null, club: 'Orlando City', age: 25, height: 182, foot: 'Left', value: '7m €' },
{ id: 466, name: 'Petar Musa', positions: ['ST'], primaryPosition: 'FWD', country: 'Chorwacja', flag: '🇭🇷', image: null, club: 'FC Dallas', age: 27, height: 188, foot: 'Right', value: '12m €' },
{ id: 467, name: 'Igor Matanović', positions: ['ST'], primaryPosition: 'FWD', country: 'Chorwacja', flag: '🇭🇷', image: null, club: 'SC Freiburg', age: 22, height: 194, foot: 'Right', value: '8m €' },

];
};

export const getPlayers = () => PLAYERS;
export const getPlayerById = (id) => PLAYERS.find(p => p.id === id);
export const getPlayersByPosition = (position) => PLAYERS.filter(p => p.positions.includes(position));
export const getPlayersByCountry = (country) => PLAYERS.filter(p => p.country === country);