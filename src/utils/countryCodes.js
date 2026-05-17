// src/utils/countryCodes.js
export const getCountryCode = (countryName) => {
  const codes = {

    // DODAJ POLSKIE NAZWY (takie jak w players.js)
    'Meksyk': 'MX',
    'Kanada': 'CA',
    'Stany Zjednoczone': 'US',
    'Panama': 'PA',
    'Curaçao': 'CW',
    'Haiti': 'HT',
    'Iran': 'IR',
    'Korea Południowa': 'KR',
    'Japonia': 'JP',
    'Uzbekistan': 'UZ',
    'Jordania': 'JO',
    'Australia': 'AU',
    'Katar': 'QA',
    'Arabia Saudyjska': 'SA',
    'Egipt': 'EG',
    'Senegal': 'SN',
    'Republika Południowej Afryki': 'ZA',
    'Republika Zielonego Przylądka': 'CV',
    'Maroko': 'MA',
    'Wybrzeże Kości Słoniowej': 'CI',
    'Algieria': 'DZ',
    'Tunezja': 'TN',
    'Ghana': 'GH',
    'Argentyna': 'AR',
    'Ekwador': 'EC',
    'Kolumbia': 'CO',
    'Urugwaj': 'UY',
    'Brazylia': 'BR',
    'Paragwaj': 'PY',
    'Nowa Zelandia': 'NZ',
    'Niemcy': 'DE',
    'Szwajcaria': 'CH',
    'Szkocja': 'GB',
    'Francja': 'FR',
    'Hiszpania': 'ES',
    'Portugalia': 'PT',
    'Holandia': 'NL',
    'Austria': 'AT',
    'Norwegia': 'NO',
    'Belgia': 'BE',
    'Anglia': 'GB',
    'Chorwacja': 'HR',
    'Bośnia i Hercegowina': 'BA',
    'Szwecja': 'SE',
    'Turcja': 'TR',
    'Czechy': 'CZ',
    'Demokratyczna Republika Konga': 'CD',
    'Irak': 'IQ'
  };
  
  const code = codes[countryName];
  if (!code) {
    console.warn(`⚠️ Brak kodu dla kraju: "${countryName}"`);
    return 'UN';
  }
  return code;
};