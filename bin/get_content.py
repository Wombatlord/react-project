import os, json, requests

# Content retrieval script to be run as part of the build pipeline to bundle content for deployment.

# Assign source file contents to variables.
content_json = json.load(open('src/content.json', 'r'))
about_json = json.load(open('src/aboutPageContent.json', 'r'))

# Add source files to this array for iterative content retrieval.
sources = [content_json, about_json]

# Iterates through source files to retrieve content from the src field in each source.
# Append a dict with retrieved content assigned to "raw" key.
# Check the index of the sources array and serialise the key and data into the appropriate json file.
for index, source in enumerate(sources):
    
    result = []
    
    for content in source:
        result.append({**content, "raw":requests.get(content['src']).text})

        if result[-1].get("raw"):
            print('Downloaded: ', content['name'][:100])
    
    if index == 0:
        json.dump(result, open('src/assets/raw_content.json', 'w'), indent=4)
    
    if index == 1:
        json.dump(result, open('src/assets/about_content.json', 'w'), indent=4)
