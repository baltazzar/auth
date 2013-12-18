<div class="auth-block">
	<div class="panel panel-default">
		<div class="panel-heading">&nbsp;</div>
		<div class="panel-body">
			<form class="auth-login-form clearfix">
				<div class="col-md-12 auth-sigla text-center">{{ authAppSigla }}</div>
				<div class="col-md-12">
					<div class="alert alert-danger auth-message hide"></div>
				</div>
				<div class="col-md-12">
					<div class="form-group">
						<label class="auth-username-label">{{ authUsernameLabel }}:</label>
						<input type="text" class="form-control input-sm auth-username">
					</div>
				</div>
				<div class="col-md-12">
					<div class="form-group">
						<label class="auth-password-label">{{ authPasswordLabel }}:</label>
						<input type="password" class="form-control input-sm auth-password">
					</div>
				</div>
				<div class="col-md-12">
					<button class="btn btn-success btn-block pull-right auth-confirm">{{ authConfirmLabel }}</button>
				</div>
			</form>
		</div>
	</div>
</div>