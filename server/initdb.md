npx sequelize-cli model:generate --name cart --attributes userId:integer,qty:integer
npx sequelize-cli model:generate --name cartFood --attributes cartId:integer,foodId:integer
npx sequelize-cli model:generate --name cartTicket --attributes cartId:integer,ticketId:integer
npx sequelize-cli model:generate --name ticket --attributes ticketTypeId:integer,status:boolean,stock:integer
npx sequelize-cli model:generate --name ticketType --attributes category:string,price:integer
npx sequelize-cli model:generate --name order --attributes cartId:integer
npx sequelize-cli model:generate --name payment --attributes userId:integer,orderId:integer,methode:string,status:boolean

npx sequelize-cli model:generate --name userTicket --attributes userId:integer,ticketTypeId:integer,barcode:string,status:boolean
