import os, json, requests

content_json = json.load(open('src/content.json', 'r'))

result = {}
for content in content_json:
    result[content['name']] = requests.get(content['src']).text
    if result[content['name']]:
        print('Downloaded', content['name'][:100])

json.dump(result, open('src/assets/raw_content.json', 'w'), indent=4)
    
