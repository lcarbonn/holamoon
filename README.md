# Holamoon

Le projet propose la gestion Holacratique de Lune Bleue

j'ai créé un board nextcloud : https://nextcloud.lunebleue.coop/index.php/apps/deck/#/board/11




## Build Setup

``` bash
# install dependencies
$ npm install

# install firebase tools
npm install -g firebase-tools

# serve with hot reload at localhost:3000
$ npm run dev

# serve with hot reload at 'your local ip address':3000 for access from mobile
$ npm run dev -- --hostname=0.0.0.0

# generate static project in production
$ npm run generate

```

## deployment
``` bash
# deploy on firebase (hosting and functions)
$ firebase deploy (this will call npm run generate before deployement)

# deploy only functions
# faire un $ npm install dans le repertoire functions
$ firebase deploy --only functions

# Pour que la fonction d'envoi de mails fonctionne, il faut renseigner un smtp dans les variables d'environnement des fonctions :
$ firebase functions:config:set smtp.password=xxx smtp.user=xxx smtp.host=xxx smtp.port=xxx smtp.from=xxx
```

## liens

liens sur les bonnes pratiques vue.js : https://github.com/learn-vuejs/vue-patterns/tree/master/docs/useful-links

exemple de functions firebase :  https://github.com/firebase/functions-samples

aide sur les formulaires : https://vuematerial.io/components/form


Si vous avez des questions n'hésitez pas.......

Bisous bisous...

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

