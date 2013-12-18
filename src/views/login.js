define(function(require, exports, module){
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