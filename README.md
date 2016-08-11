# Teste para candidatos à vaga de Front-End developer
> [![Logo iColabora](http://www.icolabora.com.br/vagas/imgs/icolabora.png)](https://www.icolabora.com.br/vagas)
>
> Todos que os interessados que fizerem pull request receberão um feedback da iColabora.<br>
> Essa prova consiste em testar seus conhecimentos com <b>HTML, CSS, JavaScript, SQL</b> entre outras coisas. <br>
> O conjunto de interfaces disponibilizado leva em média <b>6 horas</b> para ser implementado;

## Instruções:

1. Faça um fork deste repositório;
2. Estude o modelo de processo <i>Processo_Teste_Front.png</i>;
3. Estude os requisitos para elaboração do formulário e das métricas;
3. Implemente o HTML/CSS das telas com base no layout disponível;
4. Para a interação das interfaces utilize preferencialmente jQuery;
5. Após terminar seu teste submeta um pull request e aguarde seu feedback.


**PS1:** O formulário não deve submeter nenhuma url.<br>
**PS2:** A url da página não pode ser recarregada em momento algum.<br>
**PS3:** Usamos o mesmo teste para todos os níveis de front: **junior**, **pleno** ou **senior**, mas procuramos adequar nossa exigência na avaliação com cada um desses níveis sem, por exemplo, exigir excelência de quem está começando.

### Você pode:

* Utilizar qualquer linguagem de pré-processador CSS ou CSS puro;
* Utilizar um task runner de sua preferência;
* Utilizar bibliotecas CSS como compass, bourbon, animateCSS ou outras.

### Esperamos que você:

* Realize as consultas no banco de dados que fornecemos;
* Torne dinâmica as buscas e preenchimentos dos campos do formulário;
* Faça um visual bacana;
* Minifique seu CSS e deixe-o na pasta "CSS";
* Minifique seu javascript e deixe-o na pasta "js";
* Faça commit também dos arquivos não minificados;
* Dê suporte a IE10+, Chrome, Safari e Firefox;

### Ganhe pontos extras por:

* Desenvolver HTML semântico;
* Componentizar seu CSS;
* Ser fiel as especificações dos arquivos;
* Validar os campos do seu formulário antes de habilitar o botão de envio;
* UX/UI.

## Material:

* Todos os layouts necessários estão disponíveis na pasta raíz;
* Modelo do processo de negócio disponível com o nome <i>Processo_Teste_Front.png</i> na pasta raíz;
* Para consultas acerca da BPM acesse o Activiti User Guide: http://www.activiti.org/userguide/#bpmnConstructs.
* Utilize o webservice de consulta de CEP's: https://viacep.com.br/
* Modelo do banco de dados relacional pode ser encontrado em <i>modelo_relacional.png</i> na pasta raíz;
* Biblioteca para criação de querys MySQL via JavaScript com o nome <i>mysql_lib.js</i> na pasta raíz;

## Especificação
* Deve ser desenvolvido um conjunto de interfaces (formulário e métricas) para a automação do processo de 'Shipment of a hardware retailer';
* Use a criatividade para preencher os espaços em branco nos arquivos fornecidos;
* Para tal, implemente o HTML/CSS/JS do formulário associado a tarefa <i>'Check if extra insurance is necessary'</i> (arquivo: <i>task.psd</i>) com os seguintes campos:
  * <b>Dados do Pedido</b> (Devem existir 4 materiais, de sua escolha, vinculados ao pedido do teste):
    * Número de Pedido;
    * Material;
    * Marca;
    * Data de compra;
    * Quantidade do Material;
    * Preço total;
  * <b>Dados do Insumo</b> (Devem existir 2 insumos, de sua escolha, vinculados ao pedido do teste. Além disso, deve ser possível inserir mais insumos): 
    * Marca;
    * Descrição;
    * Quantidade;
    * Preço;
  * <b>Dados do Solicitante</b> (Use o webservice para a consulta de CEP):
    * Nome Completo;
    * Telefone;
    * CPF;
    * CEP;
    * Endereço;
    * Complemento;
    * Cidade;
    * Estado;
  * <b>Dados da Entrega</b> (Pode ser utilizado o mesmo endereço presente nos dados do solicitante):
    * CEP;
    * Endereço;
    * Complemento;
    * Cidade;
    * Estado;
  * <b>Cálculos</b>:
    * Total do pedido ((preço dos insumos x quantidades) + (preço do material x quantidades));
  * <b>Busca</b>:
    * Deve ser permitido inserir um numero de pedido e após a consulta, preencher automaticamente todos os campos do formulário;
* Implemente o HTML/CSS/JS do dashboard com os seguintes gráficos e tabelas (arquivo: <i>dashboard.psd</i>):
  * [GRÁFICO] - Quantidade de pedidos por dia;
  * [GRÁFICO] - Pedidos por solicitante;
  * [TABELA] - Pedidos pendentes;
* Utilizando a biblioteca <i>mysql_lib.js</i>:
  * Carregue o arquivo <i>mysql_lib.js</i> no seu HTML: 
  ```html 
  <script src="mysql_lib.js" type="text/javascript"></script>
  ```

  * Chame a função `mysqlQuery` passando como parametro a query que você deseja realizar, em formato SQL, e uma função para a captura do retorno, da seguinte forma:


  ```javascript
    var mysql_query = "SELECT * FROM solicitantes WHERE id = 1";

    mysqlQuery(mysql_query, function(result){
      // mostra o resultado da query
      console.log(result);
    });
  ``` 
  * **Para mais informações, baixe a pasta `exemplo-query` para um exemplo de como utilizar a biblioteca, ou acesse o link no [jsbin](http://jsbin.com/vefeyelofi/edit?html,output)**

## Submissão

Para iniciar o teste, faça um fork deste repositório, crie uma branch com o seu nome completo e depois envie-nos o pull request.
Se você apenas clonar o repositório não vai conseguir fazer push e depois vai ser mais complicado fazer o pull request.

**Boa sorte! =D**
