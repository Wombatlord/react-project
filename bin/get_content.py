import os, json, requests

content_json = json.load(open('src/content.json', 'r'))

result = []

for content in content_json:
    result.append({**content, "raw": requests.get(content['src']).text})
    
    if result[-1].get("raw"):
        print('Downloaded', content['name'][:100])

json.dump(result, open('src/assets/raw_content.json', 'w'), indent=4)
    
