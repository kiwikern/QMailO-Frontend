# QmailoFrontend


QMailO helps you organize your `.qmail` files. For it to work, you need to set up the [QMailO Server](https://github.com/kiwikern/QMailO) as well. This web app was designed with Uberspace in mind.
The app is available in English and German.
<p align="center">
  <img src="https://user-images.githubusercontent.com/2671139/36565035-8ad77908-181f-11e8-9ab7-b8d673e32aa0.gif">
</p>


## Setup
* Set up your [QMailO Server](https://github.com/kiwikern/QMailO).
* Download the [latest release](https://github.com/kiwikern/QMailO-Frontend/releases/latest) and unzip the language version of your choice to the folder served by your web server.
* Forward all requests to `api/*` to your QMailO server, e. g. `localhost:30000`, anything else to `index.html`.
  * There is a `.htaccess` included with a sample configuration. If you don't want to use it, you can just delete it.

### Uberspace
* If you're using Uberspace, you can easily create a [subdomain](https://wiki.uberspace.de/domain:subdomain) for your QMailO Frontend.
* Just create a folder with your subdomain name in `/var/www/virtual/$USER/` and unzip the language version of your choice of the [latest release](https://github.com/kiwikern/QMailO-Frontend/releases/latest) into it.
  * Example: `mkdir /var/www/virtual/$USER/qmailo.kimkern.de`
* [Include your new subdomain](https://wiki.uberspace.de/webserver:https#aenderungen_am_let_s_encrypt_zertifikat) in your LetsEncrypt certificate.
* If your QMailO server is running under a different port than 30000, edit the included `.htaccess` file:
  * `RewriteRule ^api/(.*) http://localhost:30000/$1 [P]`

## Development

* Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
* Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.
* For further information about the Angular CLI, run `npm run ng -- --help`.
