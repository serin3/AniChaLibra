import requests as animeCharacterDB

fetchInformation = animeCharacterDB.get('https://github.com/serin3/AniChaLibra/tree/master/src/en/animeCharacters')

animechdb = fetchInformation

print(animechdb)