require('module-alias/register')
const http               = require('http'),
      ContainerAPI       = require('@ContainerAPI'),
      ContainerServer    = http.createServer(ContainerAPI),
      ContainerPort      = process.env.PORT || 8081,
      LOCAL              = '0.0.0.0';

ContainerServer.listen(ContainerPort, LOCAL, () => {
  console.log(`ContainerAPI running on ${ContainerPort}`);
})