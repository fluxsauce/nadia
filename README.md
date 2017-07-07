# Nadia’s Garden Restaurant

This project is a Node.js and express example site created in conjunction with the lynda.com course "Node.js: Testing and Code Quality" by Jonathan Peck.

The backend intentionally contains mistakes, such as weak validation on email addresses. Inconsistencies in coding style are also intentional.

## Getting Started

```bash
npm install
npm start
```

The server runs on port 3000.

There are three routes:

* http://localhost:3000/ - homepage
* http://localhost:3000/reservations - submit a reservation booking requests
* http://localhost:3000/admin - view all reservation booking requests; basic auth login/password `admin`

The server persists using a SQLite3 database named `database.sqlite` in the site root.

## Development

This project uses EditorConfig to standardize text editor configuration. Visit
http://editorconfig.org for details.

### Debugging

This project uses https://www.npmjs.com/package/debug for development logging. To start `nodemon` and enable logging:

```bash
npm run debug
```

If you're using Windows, see https://www.npmjs.com/package/debug#windows-note to set the `DEBUG=nadia:*` environmental variable.

## Credits

This is an adaptation of a WordPress site hosted at http://587672.youcanlearnit.net/

The original site was archived with wget, then unrelated functionality was stripped out until only the home reservation pages remained. JavaScript and Stylesheet files were reorganized into logical directories and untouched. Then, the HTML files were converted into Jade / Pug templates using http://html2jade.org/

In short, the front end should be pretty unchanged from the original.
