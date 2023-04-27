import requests as animeCharacterDB

fetchInformation = animeCharacterDB.get('https://github.com/serin3/AniChaLibra/src/en/animeCharacters/animeChDB.json')

animechdb = fetchInformation

print(animechdb)