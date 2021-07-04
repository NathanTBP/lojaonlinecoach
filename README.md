# lojaonlinecoach
<p align="center">O projeto busca construir uma aplicação web no formato de uma loja online, na qual serão ofertados serviços de "coach de games"</p>

## Requerimentos:

O sistema deve permitir o login de usuários, que será definido a partir de um email único e senha.

O sistema deve permitir o cadastro de novos alunos, a partir de seu nome, nickname email senha e dados adicionais como rede social ou telefone. 

O sistema deve permitir a venda dos serviços de coaching para jogos, mais especificamente para “League of Legends” e “Teamfight Tactics”, eles serão divididos em 4 tipos, sendo que os 3 primeiros se referem a vídeo aulas já gravadas e dependem da faixa de habilidade do aluno no jogo em questão (iniciante, intermediário ou avançado) e o último se tratando de aulas ao vivo com os professores. Cada tipo de aula possui um valor fixo e o aluno poderá colocar no carrinho e adquirir quantas quiser de cada tipo e, após compradas ele poderá selecionar quais ele gostaria dentre todas as oferecidas pelos professores ou marcar horários individuais dependendo do tipo adquirido.
O sistema deve possuir 3 tipos de usuários: Administrador, Professor e Aluno.

Um administrador é um usuário único  que deve ser responsável por manter o funcionamento adequado da plataforma. Para isso, ele tem acesso a listagem de todos os alunos, aulas, professores e preços e pode realizar as seguintes modificações:
Excluir videoaulas - para prevenir que os professores usem o armazenamento de forma inadequada, o administrador pode ver e excluir conteúdo da nuvem de dados.
Criar e editar novos professores - para manter o site atualizado e com mais opções de profissionais, cabe ao administrador criar os perfis de professores inserindo pessoalmente os dados.
Alterar valores das aulas - para controlar os preços de acordo com a demanda ou fazer promoções, o administrador pode alterar o valor das aulas de acordo com o nível (iniciante, intermediário, avançado) ou aula ao vivo.
Dados gravados:  Cada administrador possui um Nome, email e senha.

Os professores são responsáveis por criar, editar, excluir e disponibilizar vídeo aulas e material para suas aulas (como PDF's e imagens) inserindo os dados adequados para identificá-los. Eles devem também informar os horários (divididos em intervalos de 30 minutos) em que se dispõem a realizar aulas ao vivo e podem editar o próprio perfil/card. Cada professor possui um card com as suas principais informações (nome,nick,rating,jogo,especialidade,foto e descrição) e deve sempre manter esses dados atualizados para visualização dos alunos. 
Dados gravados: Nome, Nickname,  email,senha, telefone, ”Nickname”, Rating, Jogo, Especialidade (como posição ou personagem principal), foto, lista de aulas marcadas, tabela de horários, lista de vídeos adicionados.

Os alunos são os usuários finais do sistema, eles podem criar uma conta e , após isso, ele poderá visualizar um resumo de todas as vídeo aulas gravadas e comprar, via cartão de crédito, créditos que o permitirá "desbloquear" tais aulas completas do site. O aluno poderá também comprar créditos para solicitar aulas ao vivo e, após comprados ele poderá solicitar um dia e horário dentro dos disponíveis entre os professores do jogo requisitado.
Tanto ao comprar créditos quanto ao adquirir aulas (ao vivo ou não) eles recebem um email de confirmação informando o conteúdo adquirido.
Dados gravados: Nome, email (único), senha, telefone (opcional), número de vídeo aulas iniciantes restantes,número de vídeo aulas intermediárias restantes,número de vídeo aulas avançadas restantes,número de aulas ao vivo restantes,
lista de aulas já adquiridas (por id) e horario das aulas ao vivo marcadas.
 
Após formar um pacote (com número e tipos de aula) e adicioná-lo ao carrinho, o aluno pode efetuar o pagamento através de cartão de crédito e um e-mail automático será enviado ao aluno informando a confirmação do pacote adquirido.
 
Nesta tela, constarão o preço de cada item e para quais "rankings" de jogadores as aulas são aconselhadas.
 
Tendo adquirido os créditos, o aluno pode ir a página de aulas e desbloquear a vídeo aula que possui maior interesse, ou solicitar um horário dentro dos disponíveis pelos professores e receberá um email de confirmação logo em seguida.
 
Caso seja uma aula gravada, o aluno tera seu email incluido no compartilhamento do material no Drive e essa aquisição não poderá ser desfeita. Caso a aula seja ao vivo, o horário será escolhido, a tabela do professor sera atualizada e o aluno poderá cancelar seu horário se tiver pelo menos 24 horas de antecedência. 
 
A respeito das aulas, elas serão  armazenadas em nuvem com gerenciamento de acesso (como Google Drive/Onedrive), porém cada aula possuirá armazenada no site :
Nome da Aula, id (para facilitar a listagem), foto (referente ao conteúdo da aula, como uma thumbnail ou um gráfico), descrição da aula, quantidade vendida, nome e nick do professor responsável.  Obs: o sistema deve exibir o card do professor ao passar o mouse por cima de seu nome. 
 
Do ponto de vista do professor, seus horários serão armazenados em tabelas de 31 linhas, que representam os dias do mês e 48 colunas, sendo intervalos de 30 em 30 minutos do dia. Ele deverá selecionar os horários disponíveis para ele em cada mês (podendo alterar desde que não hajam aulas marcadas). Essa tabela aceita 4 valores (ainda não determinado, indisponível, disponível, aula marcada) e, para cada aula marcada sera adicionada ordenadamente em uma lista com todas as aulas de cada professor. Serão duas tabelas dessas para cada professor, uma representando o mes atual e outra representando o mês que vem. Na virada do mês, a tabela do mês que vem se torna o mês atual e os dados do mes que passou são limpos e colocados a disposição novamente.
 
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
Até o momento, os servidores do banco de dados são locais e contidos no arquivo db.json.

Atualmente, ainda não foram implementadas algumas funcionalidades, como o lembre-me, dados de uso e o esqueci a senha do login, o encaminhamento de emails automático que serão completamente resolvidos ao implementar o servidor.

* Plano de testes:

Os testes feitos pela equipe foram divididos em 2 tipos: Testes de usabilidade, testes de dados.
Para os testes de usabilidade, cada membro percorreu as páginas do site, buscando e verificando erros quanto a diagramação e responsibilidade do site.
Já nos testes de dados, foi utilizado um json server , também disponibilizado pelo gerenciador de pacotes npm (https://www.npmjs.com/package/json-server) integrado a 
plataforma do Postman (https://web.postman.co/) que era responsável por fazer requisições HTTP como GET,POST, etc. Após fazer as alterações, foi conferido se os dados eram 
atualizados na página.

* Resultado dos testes:

Nos testes de usabilidade, foram corrigidos os pontos revisados na primeira entrega do projeto e algumas telas sofreram alterações devido a uma melhor interação com o framework VUE.
Nos testes de dados, foi verificado que a estrutura de banco de dados funcionava e as requisições http eram bem resolvidas (resultados em imagens disponíveis na pasta mockups, 
a primeira imagem é um print da ação feita no postman, e a segunda é a visualização do resultado no localhost json)

* Como rodar?:
Primeiramente, instale o servidor database json pelo comando:
npm install json-server;
Após instalar, entre no diretório do projeto, seguido de /database e utilize o seguinte comando para iniciar o servidor de database:
json-server --watch db.json;
Abra outro terminal e passe para o passo seguinte.
Para rodar o site, é preciso ter instalado o node.js (https://nodejs.org/en/) e o gerenciador de pacotes de node (npm) https://www.npmjs.com/package/npm
Basta fazer download dos arquivos e, na pasta principal, executar os seguintes comandos:
npm install;
npm run serve;

Para windows, é necessário fornecer permissão para rodar o script não assinado, para isso basta rodar o comando na pasta com permissão de administrador
Set-ExecutionPolicy RemoteSigned

Lembrando que o site usa o framework vue.js (https://vuejs.org/)

* Problemas:


* Comentários:

Atualmente estão prontos os elementos que tratam das visões do usuário, tudo, incluindo o banco de dados e os dados de login está armezenado internamente nos arquivos.
