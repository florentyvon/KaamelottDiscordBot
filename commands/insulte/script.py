# coding: utf8
import json

json_data=open('C:/Users/Florent YVON/Documents/projects/KaamelottDiscordBot/commands/insulte/data.json')
#print(json_data)

data = json.load(json_data)
#print(data)

databis = {}
for key in data:
    value = {}
    value['text'] = data[key]
    value['audio'] = "d"
    databis[key] = {}
    databis[key].update(value)

print(databis)



with open('C:/Users/Florent YVON/Documents/projects/KaamelottDiscordBot/commands/insulte/insultstemp.json', 'w') as outfile:
    outfile.write(json.dumps(databis, ensure_ascii=False))

json_data.close()