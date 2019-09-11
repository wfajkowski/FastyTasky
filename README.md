FastyTasky - the CodersCamp course project.

Installation:
Just run "npm install" command in the root project folder.

Usage:
1. To build production sources with Webpack and Babel run "npm run build" command.
2. To run dev server run "npm run dev" command. Then You can run app under http://localhost:8080 address.
3. To set backend up and running just run "npm start" in the console (in another terminal).

Remember that development mode compiles changes dynamically on the local machine and these changes are not saved to dist folder automatically.
To apply changes to the dist folder, run the command "npm run build".

To run the server the project uses nodemon. You can install it globally by "npm i -g nodemon"

To connect to the cloud MongoDB you need to set environment variable:
1. Copy "sample.env" as ".env" (.env is added to gitignore)
2. Replace "pwd" password string with a correct one - secret password ;)