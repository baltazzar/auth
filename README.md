AUTH
====

> Módulo front-end de autenticação para aplicações web.

### Instalação

```
volo install -f baltazzar/auth
```

### Modo de Usar

1 - Deixe seu arquivo `main.js` semelhante ao exemplo abaixo:

```js
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

```js
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

```js
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

```js
define(function(require, exports, module){
	var Marionette = require('marionette');

	module.exports = Marionette.ItemView.extend({
		template: 'app/home.tpl',
		protected: true
	});
});
```

### Opções de Configuração

Exemplo:

```js
Auth.init({
	appSigla      : 'MYAPP',
	paramUsername : 'j_username',
	paramPassword : 'j_password',
	usernameLabel : 'Username',
	passwordLabel : 'Password',
	confirmLabel  : 'Entrar no Sistema',
	loginUrl      : 'http://www.myapp.com/login',
	logoutUrl     : 'http://www.myapp.com/logout',
	loggedUserUrl : 'http://www.myapp.com/usuario_logado',
	loggedUserEl  : '.usuario-logado'
});
```

#### appSigla

Default: "App"

Sigla da aplicação que aparecerá no formulário de login.

#### paramUsername

Default: ""

Nome do campo de usuário que o endpoint de login backend está esperando receber.

#### paramPassword

Default: ""

Nome do campo de senha que o endpoint de login backend está esperando receber.

#### usernameLabel

Default: "Usuário"

Label do campo de usuário do formulário de login.

#### passwordLabel

Default: "Senha"

Label do campo de senha do formulário de login.

#### confirmLabel

Default: "Confirmar"

Label do botão de submit do formulário de login.

#### loginUrl

Default: ""

Url de login do endpoint backend.

#### logoutUrl

Default: ""

Url de logout do endpoint backend.

#### loggedUserUrl

Default: ""

Url no endpoint backend que verifica se o usuário está logado.

#### loggedUserEl

Default: ""

Seletor jQuery onde será inserido o componente de usuário logado, contendo o nome completo do usuário e o botão de logout.

### Customização

Algumas classes `css` são expostas para customização do formulário de login e do componente de usuário logado:

#### .auth-block

Element: `div`

Classe responsável pela customização da div principal do formulário.

#### .auth-login-form

Element: `form`

Classe responsável pela customização do formulário.

#### .auth-sigla

Element: `div`

Classe responsável pela customização da sigla da aplicação.

#### .auth-message

Element: `div`

Classe responsável pela customização do elemento onde são exibidas as mensagens de erro de login.

#### .auth-username-label

Element: `label`

Classe responsável pela customização do label do campo usuário.

#### .auth-username

Element: `input`

Classe responsável pela customização do campo de usuário.

#### .auth-password-label

Element: `label`

Classe responsável pela customização do label do campo senha.

#### .auth-password

Element: `input`

Classe responsável pela customização do campo de senha.

#### .auth-confirm

Element: `button`

Classe responsável pela customização do botão de envio do formulário.

#### .auth-logged-user

Element: `p`

Classe responsável pela customização do nome do usuário logado.

#### .auth-logout

Element: `button`

Classe responsável pela customização do botão de logout.