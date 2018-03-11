require('module-alias/register');
const http = require('http'),
      AppManagerAPI = require('@AppManagerAPI'),
      InventoryManagerServer = http.Server(AppManagerAPI),
      InventoryManagerPORT = process.env.PORT || 3001,
      LOCAL = '0.0.0.0';
InventoryManagerServer.listen(InventoryManagerPORT, LOCAL, () => console.log(`BudgetManagerAPI running on ${InventoryManagerPORT}`));