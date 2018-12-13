# coding: utf8
import json

json_data=open('C:/Users/Florent YVON/Documents/projects/KaamelottDiscordBot/sounds/sounds.json')
#print(json_data)

data = json.load(json_data)
#print(data)

for key in data:
    if('Livre II,' in key['episode']):
        key['book'] = 2;
        key['ep_title'] = key['episode'][15:]
        key['episode'] = key['episode'][10:12]
    if('Livre I,' in key['episode']):
        key['book'] = 1;
        key['ep_title'] = key['episode'][14:]
        key['episode'] = key['episode'][9:11]
    if('Livre III,' in key['episode']):
        key['book'] = 3;
        key['ep_title'] = key['episode'][16:]
        key['episode'] = key['episode'][11:13]
    if('Livre IV,' in key['episode']):
        key['book'] = 4;
        key['ep_title'] = key['episode'][15:]
        key['episode'] = key['episode'][10:12]
    if('Livre V,' in key['episode']):
        key['book'] = 5;
        key['ep_title'] = key['episode'][14:]
        key['episode'] = key['episode'][9:11]
    if('Livre VI,' in key['episode']):
        key['book'] = 6;
        key['ep_title'] = key['episode'][15:]
        key['episode'] = key['episode'][10:12]

with open('C:/Users/Florent YVON\Documents/sounds.json', 'w') as outfile:
    outfile.write(json.dumps(data, ensure_ascii=False))

json_data.close()