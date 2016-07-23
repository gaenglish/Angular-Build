# Angular-Build
A starter template for building angular apps with gulp.


## Summary
This template gives you just about everything you need to get started building web-sites with Angular, Angular Material, and Sass.

The template is an extenstion of the [material-start](https://github.com/angular/material-start) project.  A gulp build process has been added to combine and minify javascript files.  [Sass](http://sass-lang.com/) has also been incorporated for generating CSS.

[Font Awesome](http://fontawesome.io/) is added into the build as a bonus.

## Installation
Installation is easy.  Run ```npm install``` to download all the dependencies needed to run and build your site.

```
$ npm install
```

## Build
After running the build, everything you need to deploy to your web server will be located in the ```dist``` folder.

```
$ gulp build
```

## Developement
This template comes with it's own server for running the site locally for developement.  As you save your work, the browser will refresh to reflect your changes.

```
$ gulp watch
```

## Directory Layout

```
src/                    --> source files for the application
  app/                  --> Angular files.  JavaScipt files in this directory will get compiled.
    components/        	--> app specific modules
  assets/               --> static files (e.g. images, svg)
  sass/                 --> Sass files. Sass files get compiled.
  index.html            --> app layout file (the main html template file of the app)
```

Visit [scotch.io](https://scotch.io/tutorials/angularjs-best-practices-directory-structure) to read about the Angular directory structure used in this template.