import requests as animeCharacterDB

fetchInformation = animeCharacterDB.get('https://raw.githubusercontent.com/serin3/AniChaLibra/master/src/ar/animeCharacters/animeChDB.json')

animechdb = fetchInformation.text

print(animechdb)