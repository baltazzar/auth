define(function(require, exports, module){

	var Marionette = require('marionette'),
		LoginView = require('./views/login'),
		Handlebars = require('handlebars');

	require(['./templates']);

	module.exports = {
		init: function(options) {
			this.paramUsername = options.paramUsername;
			this.paramPassword = options.paramPassword;
			this.usernameLabel = options.usernameLabel || 'Usuário';
			this.passwordLabel = options.passwordLabel || 'Senha';
			this.confirmLabel = options.confirmLabel || 'Confirmar';
			this.loginUrl = options.loginUrl;
			this.logoutUrl = options.logoutUrl;
			this.loggedUserUrl = options.loggedUserUrl;
			this.loggedUserEl = options.loggedUserEl;
			this.appSigla = options.appSigla || 'App';

			this.protectViews(options.app);
			this.setLoggedUserEl();
		},

		showLoginView: function() {
			return new LoginView({
				authAppSigla: this.appSigla,
				authUsernameLabel: this.usernameLabel,
				authPasswordLabel: this.passwordLabel,
				authConfirmLabel: this.confirmLabel
			});
		},

		protectViews: function(App) {
			var Auth = this;
			Marionette.Region.prototype.open = function(view) {
				var Region = this;
				if(view.protected) {
					Auth.isLogged(function(res) {
						if(res.status) {
							Region.$el.empty().append(view.el);
							Auth.setLoggedUserEl(res.data.nome);
						} else {
							Backbone.history.navigate('login', {trigger: true});
						}
					});
				} else {
					Region.$el.empty().append(view.el);
				}
			};
		},

		setLoggedUserEl: function(nome) {
			var	partial = Handlebars.partials['auth/_loggedUser.tpl']({loggedUser: nome}),
				that = this;

			$(this.loggedUserEl).html(partial);

			$('.auth-logout').on('click', function(ev) {
				that.doLogout();
			});
		},

		doLogin: function(username, password, mensagemEl) {
			var loginData = {},
				that = this;

			loginData[this.paramUsername] = username;
			loginData[this.paramPassword] = password;

			$.ajax({
				method: 'POST',
				url: that.loginUrl,
				async: false,
				cache: false,
				dataType: 'JSON',
				data: loginData,
				success: function(res) {
					if(res.status) {
						Backbone.history.navigate('', {trigger: true});
					} else {
						mensagemEl.html(res.message).removeClass('hide').fadeIn().delay(3000).fadeOut();
					}
				}
			});
		},

		doLogout: function() {
			var resposta = confirm('Deseja sair do sistema?'),
				that = this;
			if(resposta) {
				$.ajax({
					url: that.logoutUrl,
					async: false,
					cache: false,
					dataType: 'JSON',
					success: function(res) {
						if(res.status) {
							Backbone.history.navigate('login', {trigger: true});
						}
					}
				});
			}
		},

		isLogged: function(callback) {
			var that = this;

			$.ajax({
				url: that.loggedUserUrl,
				async: false,
				cache: false,
				dataType: 'JSON',
				success: function(res) {
					callback(res);
				}
			});
		}
	};
});