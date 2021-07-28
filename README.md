# Loja Online de Coach de Jogos
<p align="center">O projeto busca construir uma aplicação web no formato de uma loja online, na qual serão ofertados serviços de "coach de games"</p>

## Requerimentos:

O sistema deve permitir o login de usuários, que será definido a partir de um email único e senha.

O sistema deve permitir o cadastro de novos alunos (usuários), a partir de seu nome, nickname email senha e dados adicionais telefone ou foto.

O sistema deve permitir a venda dos serviços de coaching para jogos, mais especificamente para “League of Legends” e “Teamfight Tactics”, eles serão divididos em 4 tipos, sendo que os 3 primeiros se referem a vídeo aulas já gravadas e dependem da faixa de habilidade do aluno no jogo em questão (iniciante, intermediário ou avançado) e o último se tratando de aulas ao vivo com os professores. Cada tipo de aula possui um valor fixo e é representada por a imagem de uma moeda de bronze, prata ouro ou com um 'C' e o aluno poderá colocar no carrinho e adquirir quantas quiser de cada tipo e, após compradas ele poderá selecionar quais ele gostaria dentre todas as oferecidas pelos professores ou marcar horários individuais dependendo do tipo adquirido.

O sistema deve possuir 2 tipos de usuários:  Professor/Administrador e Aluno.

Um Professor/Administrador é um usuário único  que deve ser responsável por manter o funcionamento adequado da plataforma, além de criar, editar, excluir e disponibilizar vídeo aulas inserindo os dados adequados para identificá-los. Para isso, ele tem acesso a listagem de todos os alunos, aulas, professores e preços e pode realizar as seguintes modificações:
Excluir videoaulas - para prevenir que os professores usem o armazenamento de forma inadequada, o administrador pode ver e excluir conteúdo da nuvem de dados.
Verificar o cadastro de alunos - por motivos semelhante, eles podem verificar os dados dos alunos para contatá-los se necessário
Alterar valores das aulas - para controlar os preços de acordo com a demanda ou fazer promoções, o administrador pode alterar o valor das aulas de acordo com o nível (iniciante, intermediário, avançado) ou aula ao vivo.
Criar aulas - através do contato fornecido pelo aluno, o professor deve poder criar as videoaulas, além de marcar as aulas ao vivo.


Os alunos são os usuários finais do sistema, eles podem criar uma conta e , após isso, ele poderá visualizar um resumo de todas as vídeo aulas gravadas e comprar, via cartão de crédito, créditos que o permitirá "desbloquear" tais aulas completas do site. O aluno poderá também comprar créditos para solicitar aulas ao vivo e, após comprados ele poderá solicitar um dia e horário dentro dos disponíveis entre os professores do jogo requisitado.
Tanto ao comprar créditos quanto ao adquirir aulas (ao vivo ou não) eles recebem um email de confirmação informando o conteúdo adquirido.
Dados gravados: Nome, email (único), senha, telefone (opcional), número de vídeo aulas iniciantes restantes,número de vídeo aulas intermediárias restantes,número de vídeo aulas avançadas restantes,número de aulas ao vivo restantes,
lista de aulas já adquiridas (por id) e horario das aulas ao vivo marcadas.
 
Após formar um pacote (com número e tipos de aula) e adicioná-lo ao carrinho, o aluno pode efetuar o pagamento através de cartão de crédito e um e-mail automático será enviado ao aluno informando a confirmação do pacote adquirido.
 
Nesta tela, constarão o preço de cada item e para quais "rankings" de jogadores as aulas são aconselhadas.
 
Tendo adquirido os créditos, o aluno pode ir a página de aulas e desbloquear a vídeo aula que possui maior interesse, ou solicitar um horário dentro dos disponíveis pelos professores e receberá um email de confirmação logo em seguida.
 
Caso seja uma aula gravada, o aluno tera seu email incluido no compartilhamento do material no Drive (tarefa que deve ser realizada pelo professor) e essa aquisição não poderá ser desfeita. Caso a aula seja ao vivo, o horário será escolhido, a tabela do professor sera atualizada e o aluno poderá cancelar seu horário se tiver pelo menos 24 horas de antecedência. 
 
A respeito das aulas, elas serão  armazenadas em nuvem com gerenciamento de acesso (como Google Drive/Onedrive), porém cada aula possuirá armazenada no site :
Nome da Aula, id (para facilitar a listagem), foto (referente ao conteúdo da aula, como uma thumbnail ou um gráfico), descrição da aula, quantidade vendida, nome e nick do professor responsável.
  
O sistema deve ser acessível, responsivo e constar com boa usabilidade.

## Descrição do Projeto:

O projeto busca a elaboração e implementação de uma plataforma online que venderá serviços conhecidos como “coach de games”, uma forma de auxiliar novos jogadores a melhorar em um determinado jogo através de um conjunto de aulas, análises e conversas com os alunos de maneira a ajudá-lo a compreender e dominar o jogo em diferentes aspectos e situações.
A plataforma, além de vender os cursos, também funcionará como suporte para a realização das aulas, armazenando materiais como vídeos e documentos e os disponibilizando aos alunos que adquirirem as respectivas aulas.

* Diagramas de navegação:
A navbar está fixada em qualquer navegação da página, assim é possível o usuário voltar para a home-page ou ir para páginas como, por exemplo, a loja-page.
![alt text](https://github.com/NathanTBP/lojaonlinecoach/blob/main/navdiagram.png?raw=true)
* Comentários sobre o código:

A implementação do site foi feita através de html5 para o corpo do site, css3 para a estilização com utilização da biblioteca w3s, uso do framework VUE para controle do javascript, 
renderização de páginas para o modelo de Single Page Aplication e funcionalidades como automatização de email e gerência de dados e visões por diferentes usuários. 
Node.js foi usado para a configuração do servidor, que foi integrado através do MongoDB em um banco pequeno e gratuito fornecio pela Mongo.

* Plano de testes:

Os testes feitos pela equipe foram divididos em 2 tipos:testes de dados e, posteriormente  Testes de usabilidade, 

Nos testes de dados, foi utilizado um json server , também disponibilizado pelo gerenciador de pacotes npm (https://www.npmjs.com/package/json-server) integrado a 
plataforma do Postman (https://web.postman.co/) que era responsável por fazer requisições HTTP como GET,POST, etc e os dados e cabeçalhos eram mandados ao servidor hosteado localmente e comparado com os valores salvos no banco de dados MongoDB, após o correto funcionamento do servidor, puderam ser realizado os testes de usabilidade nos quais, cada membro percorreu as páginas do site, buscando e verificando erros quanto a diagramação e responsibilidade do site. Após fazer as alterações, foi conferido se os dados eram 
atualizados na página e se ficavam salvos de forma permanente no banco, podendo ser alterados se necessario.

* Resultado dos testes:

Nos testes de usabilidade, foram corrigidos os pontos revisados na primeira entrega do projeto e algumas telas sofreram alterações devido a uma melhor interação com o framework VUE.
Nos testes de dados, foi verificado que a estrutura de banco de dados funcionava e as requisições http eram bem resolvidas (resultados em imagens disponíveis na pasta mockups, 
a primeira imagem é um print da ação feita no postman, e a segunda é a visualização do resultado no localhost json).

* Como rodar?:
* 
Para rodar o site, é preciso ter instalado o node.js (https://nodejs.org/en/) e o gerenciador de pacotes de node (npm) https://www.npmjs.com/package/npm
Basta fazer download dos arquivos ou clone do GitHub e, na pasta principal, executar os seguintes comandos:

> npm install

> npm start

Para windows, é necessário fornecer permissão para rodar o script não assinado, para isso basta rodar o comando na pasta com permissão de administrador
Set-ExecutionPolicy RemoteSigned

Lembrando que o site usa o framework vue.js (https://vuejs.org/)

É possivel fazer acessar o site pelo seguinte url: https://loja-online-coach.herokuapp.com/#/, porém o servidor local ainda deve ser executado.

* Problemas:

Algumas das funcionalidades extras pensadas no início do projeto não foram implementadas para evitar demasiadas complicações que poderiam acarretar em extensão do prazo de entrega, que não podia ser feito.

Na página de contato, é feito a verificação dos inputs, entretanto, ao clicar no botão Enviar, não ocorre nada.

Ao tentar acessar páginas que exigem permissões como a página de usuário(aluno) e a página de admin(professor) sem ter feito o login, após realizar o login, o conteúdo das páginas não é completamente carregado, sendo necessário navegar entre as páginas, ou seja, ir para outra página e voltar para a desejada para poder acessar corretamente a página com os dados.

Em carrinho, a verificação dos inputs do cartão de crédito são feitos de maneira simples, verificando se os inputs não são nulos e se a entrada de número de cartão possui apenas números por exemplo.

Não conseguimos fazer o deploy do servidor. Embora o site esteja funcional, ele requer o servidor ligado na máquina local.

* Resultado dos novos Testes:

O código foi constantemente testado enquanto foi desenvolvido. A cada desenvolvimento de uma função pertinente ou geração de um bloco de código em HTMl, foi verificado seu correto funcionamento para que não ocorre um efeito cascata de erros. Desse modo, apesar de trabalhoso a execução de vários testes enquanto o desenvolvimento, provavelmente se não fosse feito desta maneira, acarretaria em um efeito bola de neve de erros e seria muito mais trabalhoso para a correção de erros.

Após a finalização do código, foi simulado o acesso ao site por um usuário de modo que fosse testado as possibilidades de ações que um usuário pudesse executar durante a navegação do site. Assim, foi testado todas as opções de navegação que o navbar possui, bem como suas derividas. Nesta ocasião, não é possível que o usuário, enquanto não logado no site, não possa executar a compra de moedas, nem de desbloqueamento de video aulas e acesso à marcar aulas ao vivo com o coach. Além disso, foi testado diversos inputs para o registro e login do usuário para encontrar possíveis bugs como cadastro com inputs em branco obrigatórios ou login no site com conta inexistente.

Por seguinte, foi executado um cadastramento do usuário, o login do mesmo na conta criada e as fduncionalidades permitidas após o login. Assim, foi possível assegurar que as funcionalidades de compra de créditos e de desbloqueio estivessem funcionando corretamente, com o usuário podendo realizar a compra de créditos no carrinho apenas se houver produto no carrinho e se todos os dados de cartão de crédito foram preenchdidos. Além disso, foi testado se o aluno pudesse desbloquear video aulas ou marcar aulas ao vivo com coach mesmo sem moedas ou após esgotá-las, sem sucesso.

Dessa forma, apesar dos testes serem manuais, foi possível assegurar o funcionamento do site desenvolvido de modo correto, mas não sendo possível o teste da capacidade de usuários simultâneos, bem como a reação do site com mais de um usuário simultâneo e o comportamento do mesmo com falhas de conexão com o usuário e/ou com o banco.

* Comentários:

O código foi modularizado em diferentes arquivos e pastas, para separar arquivos do servidor (presentes na pasta database) e os arquivos eo VUE, imagens e etc na pasta src.

Há uma conta de admin/professor cujo login é dadoa a seguir: 

> login: admin@usp.br

> senha: 123

E uma conta de aluno para teste: 

> login mvellosa@usp.br

>senha: batata123

Mas é possível realizar registro no site para executar os testes.
