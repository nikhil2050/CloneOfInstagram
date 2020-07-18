Youtube Reference: https://www.youtube.com/watch?v=f7T48W0cwXM

Firebase Setup:

1. Goto Console
2. Add project 
3. Project Name: clone-of-instagram-react

4. Configure Google Analytics: NK Projects Analytics >> Create Project

5. Click 'Web' icon 
    Register app nickname: clone-of-instagram-react
    Tick 'Set up Firebase Hosting for this app' >> Register app

    Copy and paste these scripts into the bottom of your <body> tag, but before you use any Firebase services: 
        <!-- The core Firebase JS SDK is always required and must be listed first -->
        <script src="/__/firebase/7.16.0/firebase-app.js"></script>

        <!-- TODO: Add SDKs for Firebase products that you want to use
            https://firebase.google.com/docs/web/setup#available-libraries -->
        <script src="/__/firebase/7.16.0/firebase-analytics.js"></script>

        <!-- Initialize Firebase -->
        <script src="/__/firebase/init.js"></script>

    Install Firebase CLI:
        To host your site with Firebase Hosting, you need the Firebase CLI (a command line tool).

        Run the following npm command to install the CLI or update to the latest CLI version.
            npm install -g firebase-tools

    Deploy to Firebase Hosting:
        You can deploy now or later. To deploy now, open a terminal window, then navigate to or create a root directory for your web app.
        Sign in to Google
            firebase login
        
        Initiate your project
        Run this command from your app’s root directory:
            firebase init
    
        When you’re ready, deploy your web app
        Put your static files (e.g., HTML, CSS, JS) in your app’s deploy directory (the default is “public”). Then, run this command from your app’s root directory:
            firebase deploy

        After deploying, view your app at clone-of-instagram-react.web.app

6. Database >> Create database >> Start in TEST MODE

7. Start collection >> Colection ID: "posts"
    DATABASE has COLLECTIONS
    COLLECTION has DOCUMENTS

8. Fill :
    Field=caption;  Type=string;    Value=cleverQazi
    Field=username;  Type=string;    Value=Wow it works 😊
    Field=imageUrl;  Type=string;    Value=https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/320px-React-icon.svg.png

9. Project Settings >> Firebase SDK snippet >> Copy "Config"

Firebase Authentication:
1. Firebase >> Authentication tab >> Set up sign-in method
2. Select "Email/Password" >> Enable

# ##################################################################
Firebase Deployment 

From CLI:
1.  > firebase login
2.  > firebase init
3. Choose:
        Hosting: Configure and deploy Firebase Hosting sites
4. Choose: 
        Use and existing project for this directory: clone-of-instagram (clone-of-instagram react)
5. Choose:
        What do you want to use as your public directory? build
6. Choose:
        Configure as a single-page app (rewrite all urls to /index.html)? Y
7. See /build and /firebase.json have been created in project.
8. Bundle the app in most efficient way
        npm run build
9. > firebase deploy

NOTE: If bash: firebase: command not found
    > npm get prefix
    > C:/Users/10643821/AppData/Roaming/npm/firebase login

# ##################################################################
Library:
1. Firebase:
    npm i firebase

2. Material UI:
    npm install @material-ui/core

3. React Instagram Embed (https://www.npmjs.com/package/react-instagram-embed):
    npm i react-instagram-embed
