#!/usr/bin/env bash
python bin/get_content.py
react-scripts build

# copy the built project to the staging environment for deployment to firebase
cp -r ~/code/react-project/build/* ~/code/jsdevsite/public
