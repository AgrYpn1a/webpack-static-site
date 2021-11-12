# WebPack - Static Website Template
Easy to use webPack setup for building static single or multi page website.

### Features
#
**[F]** Live reload - You can run it with dev server and have the WebPack automatically detect changes and refresh the page in browser.
**[F]** Build & bundle - Make website ready for production with a single script.  
**[F]** Use SASS or plain CSS - Comes with already integrated support for SASS.  
**[F]** Easy to integrate any `node module` 

### How to
#
#### - How to add a page?
Make a new folder in the `pages/` dir and name it the same way you would name your page, let's call it `mypage` in the example. Now in that folder create a entry point so that WebPack knows how to process your page - create new file `mypage.js`. In this file you should write your imports, using the `import` from JS ES6. Imports are any additional `.js` or `.css` or `.scss` files that you create for your page. For the real example you can see the existing **about** or **contact** page in the repository.

### Setup
#
1. Clone using `git clone https://github.com/rtojagic/webpack-static-site.git` or Download as ZIP.
2. Run `npm install` to install all the required dependencies
3. Run `npm run dev` to start the dev server with live reload
4. Use `npm run build` to prepare the website for production
 - This will create `dist/` folder with packaged content that you can easily host and serve on your server.
