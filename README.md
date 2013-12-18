AUTH
====

> Módulo front-end de autenticação para aplicações web.

### Instalação

```
volo install -f baltazzar/auth
```

### Modo de Usar

1 - Deixe seu arquivo `main.js` semelhante ao exemplo abaixo:

```javascript
require.config({
	waitSeconds: 0,
	urlArgs: "v=@@versao",
	paths: {
		'auth' : 'libs/auth'
		...
	},
	shim: {
		...
		'auth' : ['handlebars']
	}
});

require(['router', 'config', 'utils', 'auth', 'app', 'infra'], function(AppRouter, Config, Utils, Auth, App) {
	AppRouter.registerRoutes();

	Utils.loadModule(Config.app, function(App) {
		_.each(Config.loadOnInit, function(modulo) {
			Utils.loadModule(Config.modulos[modulo]);
		});
	});

	// Configuração do Módulo Auth
	Auth.init({
		appSigla      : 'MYAPP',
		paramUsername : 'username',
		paramPassword : 'password',
		loginUrl      : 'http://www.myapp.com/login',
		logoutUrl     : 'http://www.myapp.com/logout',
		loggedUserUrl : 'http://www.myapp.com/usuario_logado',
		loggedUserEl  : '.usuario-logado'
	});
});
```

**Importante!** o módulo `auth` deve ser especificado antes do `app`.

2 - Configure as rotas de `login` e `logout` no arquivo `config.js` conforme exemplo:

```javascript
define(function(require, exports, module) {
	module.exports = {

		'app': {
			'controller': 'app',
			'routes': {
				''       : 'index',
				'*404'   : 'pagina404',
				'login'  : 'login',
				'logout' : 'logout'
			}
		},

		'modulos': {},

		'loadOnInit': [], // módulos carregados na inicialização da aplicação
		'BASE_URL': 'http://CAMINHO_DA_APLICACAO/api'
	}
});
```

**Importante!** as rotas devem ter os nomes `login` e `logout`.

3 - Configure os métodos de `login` e `logout` no arquivo `app.js`:

```javascript
...
var Auth = require('auth');
...

exports.login = function() {
	this.showView('main', Auth.showLoginView());
},

exports.logout = function() {
	Auth.doLogout();
}
```

4 - Insira o atributo `protected` nas views que deseja proteger de acessos não autorizados:

```javascript
define(function(require, exports, module){
	var Marionette = require('marionette');

	module.exports = Marionette.ItemView.extend({
		template: 'app/home.tpl',
		protected: true
	});
});
```

### TODO

- Detalhar todos os parâmetros de configuração;
- Detalhar as classes `css` expostas para personalização do formulário de login.