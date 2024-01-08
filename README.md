
 # 🍭・Track Order Correios
A npm package created to fetch data from one or more packages registered in the Brazilian postal service.
 -  Developed through the use of web scraping techniques, this npm library was created to extract tracking information from the website [https://www.linkcorreios.com.br/](https://www.linkcorreios.com.br/).
</br>
</br>
<center>
<a href="https://www.npmjs.com/package/trackorder-correios"><img src="https://nodei.co/npm/trackorder-correios.png"></a>
</center>

## 🍙・Usage:

```js
const { getInfoPackage, getInfoPackages } =  require("trackorder-correios")

//Get infos from one order code
getInfoPackage("NL984562784BR").then(data=>{
	console.log(data)
})

//Get infos from onde or more order codes
getInfoPackages(["NL984562784BR", "NM002338920BR"]).then(data=>{
	console.log(data)
})
```
###   🍣 GetInfoPackage Data Return:
```json
{
  orderCode: 'NL984562784BR',
  inTransit: false,
  delivered: true,
  postedDate: 2023-11-05T09:00:00.000Z,
  lastUpdateDate: 2023-11-20T14:48:00.000Z,
  updates: [
    {
      status: 'Objeto entregue ao destinatário',
      date: 2023-11-20T14:48:00.000Z,
      localeCity: 'Campinas / SP',
      locale: 'Unidade de Distribuição - Campinas / SP',
      transitInfos: null
    },
    {
      status: 'Objeto saiu para entrega ao destinatário',
      date: 2023-11-17T12:29:00.000Z,
      localeCity: 'Campinas / SP',
      locale: 'Unidade de Distribuição - Campinas / SP',
      transitInfos: null
    },
    {
      status: 'Objeto em transferência - por favor aguarde',
      date: 2023-11-17T02:03:00.000Z,
      localeCity: 'São Paulo / SP',
      locale: 'Unidade de Tratamento - São Paulo / SP',
      transitInfos: transitInfos: {
	      origin: 'Unidade de Tratamento - São Paulo / SP',
	      destination: 'Unidade de Distribuição - Campinas / SP'
      }
    },
    {
      status: 'Objeto em transferência - por favor aguarde',
      date: 2023-11-09T19:20:00.000Z,
      localeCity: 'Curitiba / PR',
      locale: 'Unidade de Logística Integrada - Curitiba / PR',
      transitInfos: {
	      origin: 'Unidade de Logística Integrada - Curitiba / PR',
	      destination: 'Unidade de Tratamento - São Paulo / SP'
	  }
    },
    {
      status: 'Saída do Centro Internacional',
      date: 2023-11-09T19:20:00.000Z,
      localeCity: 'Curitiba / PR',
      locale: 'Unidade de Logística Integrada - Curitiba / PR',
      transitInfos: null
    },
    {
      status: 'Objeto recebido pelos Correios do Brasil',
      date: 2023-11-08T23:04:00.000Z,
      localeCity: 'Curitiba / PR',
      locale: 'Unidade de Logística Integrada - Curitiba / PR',
      transitInfos: null
    },
    {
      status: 'Objeto postado',
      date: 2023-11-05T22:00:00.000Z,
      localeCity: null,
      locale: 'País -  /',
      transitInfos: null
    },
    {
      status: 'Informações eletrônicas enviadas para análise da autoridade aduaneira',
      date: 2023-11-05T09:00:00.000Z,
      localeCity: 'Curitiba / PR',
      locale: 'Unidade de Logística Integrada - Curitiba / PR',
      transitInfos: null
    }
  ]
}
```
###   🥡 GetInfoPackages Data Return:
```json
[
  {
    orderCode: 'NL984562784BR',
    inTransit: false,
    delivered: true,
    postedDate: 2023-11-05T09:00:00.000Z,    
    lastUpdateDate: 2023-11-20T14:48:00.000Z,
    updates: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ]
  },
  {
    orderCode: 'NM002338920BR',
    inTransit: false,
    delivered: true,
    postedDate: 2023-11-29T12:40:00.000Z,
    lastUpdateDate: 2023-12-13T16:48:00.000Z,
    updates: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object]
    ]
  }
]
```
###   🍥 Data object errors return:
```js
//Not Found Order Code in system
{
  orderCode: 'ItsmeMario',
  isOrderCode: false,
  error: Error: Not found code.
      at getInfoPackage (D:\Importante\Projetos\Testes\test\node_modules\trackorder-correios\dist\index.js:27:19)
      at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
}
```
```js
//Order Code not declared in function
{
  orderCode: '',
  isOrderCode: false,
  error: Error: Order code is required.
      at getInfoPackage (D:\Importante\Projetos\Testes\test\node_modules\trackorder-correios\dist\index.js:19:19)
      at Object.<anonymous> (D:\Importante\Projetos\Testes\test\index.js:4:1)
      at Module._compile (node:internal/modules/cjs/loader:1256:14)
      at Module._extensions..js (node:internal/modules/cjs/loader:1310:10)
      at Module.load (node:internal/modules/cjs/loader:1119:32)
      at Module._load (node:internal/modules/cjs/loader:960:12)
      at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:86:12)
      at node:internal/main/run_main_module:23:47
}
```

## 🍬・Created By misss_aubrey
Package created by me for study purposes and out of necessity for building another project.