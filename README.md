# BoredAPI_VueJS_ActivityGenerator
 Activity Generator web app in VueJS using Bored API


## What this application is about:
```
This Front-end web application lets you randomly generate and activity to do when you are bored.
Is also lets you set parameters to find more specific types of activities.

It uses the Bored API to generate the data.
Axios to handle the requests and
VueJS with Vue Router for the Front-end code.

The initial design that was made before coding is also supplied to
show some of my process.

Copyright: ©TimScheepens

Bored API: https://www.boredapi.com/

```


## Project setup:
```

You need the following for this project:
- Git (to clone the project of course)
- npm (package manager) 
(I used npm version 6.13.4)
- VueJS
(I used version 2.6.11)
- Vue CLI (command line interface)
(I used version 4.4.4)
- Vue Router
(I used version 3.2.0)
- optional plugins
    - VueJS browser plugin
    - Vetur plugin for VScode




------------------------------------------------------
Best way to setup project:
------------------------------------------------------
<!-- Make sure you have NPM installed or download and install from: https://nodejs.org -->

<!-- Make sure you have Git installed or download and install from: https://git-scm.com/downloads -->

<!-- Clone github repository into a folder of choice  -->
git clone (project clone url here)

<!-- Go to project folder in terminal: -->
cd (your path here)/activity_generator_app

<!-- Install dependencies -->
npm install

<!-- Run application -->
npm run serve





------------------------------------------------------
Install steps as NEW project  (not recommended):
------------------------------------------------------

<!-- Make sure you have NPM installed or download and install from: https://nodejs.org -->

<!-- Make sure you have Git installed or download and install from: https://git-scm.com/downloads -->

<!-- install VueJS Command Line Interface -->
npm install -g @vue/cli

<!-- install VueJS -->
npm install vue
    
<!-- create new project -->
vue create activity_generator_project
    - choose "Vue Router" at options at least.

<!-- install Axios for XMLHttpRequests requests -->
cd activity_generator_app
    npm install axios

<!-- Remove al files except the 'node_modules' folder -->

<!-- Clone github repository to this directory -->

<!-- Because I put the project one level deeper and this is an unusual way to install,
you have to copy the 'node_modules' folder you created earlier into 
the 'BoredAPI_VueJS_ActivityGenerator/activity_generator_app' folder for it to work. -->

<!-- Go to correct folder in terminal -->
'cd' into the ../BoredAPI_VueJS_ActivityGenerator/activity_generator_app folder

<!-- Run application: -->
npm run serve

```


