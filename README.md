#AUTH
> Componente para autenticação de usuários baseado no novo Permisys e para o boilerplate 2.0 (com o browserify).

> Realizar testes completos através do arquivo test/index.html (console.log).


##INFO
> Componente:
>> 	- baltazzar.auth em dist/auth.js ou dist/auth.min.js (versão minificada)
>>	- A versão auth.js já contém todas as libs necessárias incluídas, a versão minificada possui apenas as referências para estas libs


> Métodos:
>>	- baltazzar.auth.init : Método utilizado apenas na inicialização da aplicação para setar variáveis globais do componente (obrigatório)
>>	- baltazzar.auth.loginView : Renderiza a view com o bloco de login (customizável) e executa ação de login do usuário
>>	- baltazzar.auth.logout : Executa a rotina de logout do usuário
>>	- baltazzar.auth.isLogged : Verifica se o usuário se encontra logado ou deslogado


> Dependências (libs):
>>	- jQuery, versão 1.11 (ou superior)
>>	- underscore, versão 1.6
>>	- backbone, versão 1.1.2


> Dependencias (css):
>>	- bootstrap.min.css, versão 3.1.1 - bootstrap cdn
