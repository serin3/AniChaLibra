import requests as animeCharacterDB

fetchInformation = animeCharacterDB.get('https://github.com/serin3/AniChaLibra/blob/master/src/fr/animeCharacters/animeChDB.json')

animechdb = fetchInformation

print(animechdb)