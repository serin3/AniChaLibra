import requests as animeCharacterDB

fetchInformation = animeCharacterDB.get('animeChDB.json')

animechdb = fetchInformation

print(animechdb)