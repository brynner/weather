# weather
Weather Web App made with AngularJS

## Português
O conceito do projeto é balancear entre simplicidade e elegância, por isso a interface foi criada com design responsivo e permite que o usuário escolha uma cidade de modo intuitivo. No primeiro acesso a aplicação já carrega informações de uma cidade pré-definida, e ao clicar no campo da cidade ou digitar uma nova é exibido um Autocomplete do Google Places. Ao trocar uma cidade por outra a aplicação grava a informação em cache local do navegador, e com isso ao acessar novamente a página a última cidade é mostrada. Ao definir uma cidade a API de previsão do tempo da Open Weather Map é acionada para exibição das informações do tempo atual, previsão e gráfico de variação para os próximos dias. Além disso a API traz um código que define cada condição de tempo, e a aplicação que desenvolvi identifica o grupo no qual pertence cada código e sugere algo para o usuário fazer. Exemplo: 'light rain' e 'moderate rain' pertencem ao grupo 'Rain' - 5xx, e para essas condições a nossa aplicação sugere ficar em casa assistindo Netflix :) 

Para uma próxima versão: 
- Identificação automática da cidade ao acessar a aplicação. 
- Mostrar diferentes backgrounds de acordo com as condições do tempo. 

## Weather Conditions
https://openweathermap.org/weather-conditions

## Demo
Checkout the demo: [http://f7b.work.s3-website-us-east-1.amazonaws.com/weather/](http://f7b.work.s3-website-us-east-1.amazonaws.com/weather/)

## Stack
HTML5, CSS3 (and SASS), Javascript, AngularJS, APIs, Webpack, Gulp.

APIS:
* Google Place Autocomplete
* Open Weather Map

This app has some dependencies:
* AngularJS
* Bootstrap (only CSS)
* Chart.js
* AngularChart
* SweetAlert