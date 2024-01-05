# Twitter clone

## Server
https://twitter-clone-5f4ac.web.app/

## Stacks
* Environment
  - Visual Studio Code
  - github
  
* config
  - NPM
  
* Development
  - React
  - Vite
  - React Router
  - Styled component
  - Typescript
  - Firebase

## Requirements

* Node.js 20.9.0
* Npm 9.7.1
* React 18.2.0
* React-router-dom 18.2.0
* vite 5.0.0"
* Typescript 5.2.2
* Firebase 10.1.0

## Installation
<pre>
<code>// ** start
$ npm install
$ npm run dev
  
// ** deploy
$ npm run deploy</code>
</pre>

## Architecture

<pre>
<code>
│   App.tsx
│   firebase.ts
│   main.tsx
│   vite-env.d.ts
│
├───components
│       auth-component.tsx
│       github-btn.tsx
│       Header.tsx
│       layout.tsx
│       loading-screen.tsx
│       post-tweet-form.tsx
│       protected-route.tsx
│       timeline.tsx
│       tweet.tsx
│
└───routes
        create-account.tsx
        edit-tweet.tsx
        find-password.tsx
        home.tsx
        login.tsx
        profile.tsx
    </code>
    </pre>
