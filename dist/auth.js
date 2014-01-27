/**
 * Baltazzar Auth
 * Versão: 0.1.4
 * Módulo front-end de autenticação para aplicações web.
 * Autor: Victor Bastos
 */
define('views/login',['require','exports','module','marionette'],function(require, exports, module){
	var Marionette = require('marionette');

	module.exports = Marionette.ItemView.extend({
		template: 'auth/login.tpl',

		events: {
			'submit .auth-login-form': 'doLogin'
		},

		initialize: function(options) {
			this.model = new Backbone.Model(options);
		},

		doLogin: function(ev) {
			ev.preventDefault();
			var username = this.$('.auth-username').val(),
				password = this.$('.auth-password').val(),
				mensagemEl = this.$('.auth-message');

			require(['../auth'], function(Auth) {
				Auth.doLogin(username, password, mensagemEl);
			});
		}
	});
});
this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

Handlebars.registerPartial("auth/_loggedUser.tpl", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"pull-right\">\r\n	<p class=\"navbar-text auth-logged-user\">\r\n		";
  if (stack1 = helpers.loggedUser) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.loggedUser); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\r\n	</p>\r\n	<button class=\"btn btn-xs btn-warning auth-logout\" style=\"margin-top:14px; margin-right:10px;\">Sair</button>\r\n</div>\r\n";
  return buffer;
  }));

this["Handlebars"]["templates"]["auth/login.tpl"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"auth-block\">\r\n	<div class=\"panel panel-default\">\r\n		<div class=\"panel-heading\">&nbsp;</div>\r\n		<div class=\"panel-body\">\r\n			<form class=\"auth-login-form clearfix\">\r\n				<div class=\"col-md-12 auth-sigla text-center\">";
  if (stack1 = helpers.authAppSigla) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.authAppSigla); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\r\n				<div class=\"col-md-12\">\r\n					<div class=\"alert alert-danger auth-message hide\"></div>\r\n				</div>\r\n				<div class=\"col-md-12\">\r\n					<div class=\"form-group\">\r\n						<label class=\"auth-username-label\">";
  if (stack1 = helpers.authUsernameLabel) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.authUsernameLabel); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + ":</label>\r\n						<input type=\"text\" class=\"form-control input-sm auth-username\">\r\n					</div>\r\n				</div>\r\n				<div class=\"col-md-12\">\r\n					<div class=\"form-group\">\r\n						<label class=\"auth-password-label\">";
  if (stack1 = helpers.authPasswordLabel) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.authPasswordLabel); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + ":</label>\r\n						<input type=\"password\" class=\"form-control input-sm auth-password\">\r\n					</div>\r\n				</div>\r\n				<div class=\"col-md-12\">\r\n					<button class=\"btn btn-success btn-block pull-right auth-confirm\">";
  if (stack1 = helpers.authConfirmLabel) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.authConfirmLabel); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</button>\r\n				</div>\r\n			</form>\r\n		</div>\r\n	</div>\r\n</div>";
  return buffer;
  });
define("templates", function(){});

define('auth',['require','exports','module','marionette','./views/login','handlebars'],function(require, exports, module){

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

			this.protectViews();
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

		protectViews: function() {
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
				Backbone.history.navigate('logout', {trigger: true});
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
			var	that = this;

			$.ajax({
				method: 'POST',
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