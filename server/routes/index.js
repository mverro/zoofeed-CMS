const animalFoodRoutes = require("./animalFoodRoutes");
const animalRoutes = require("./animalRoutes");
const animalUserRoutes = require("./animalUserRoutes");
const classTypeRoutes = require("./classTypeRoutes");
const foodRoutes = require("./foodRoutes");
const HabitatRoutes = require("./habitatRoutes");
const homeRoutes = require("./homeRoutes");
const roleRoutes = require("./roleRoutes");
const userRoutes = require("./userRoutes");
const cartRoutes = require("./cartRoutes");
const cartFoodRoutes = require("./cartFoodRoutes");
const ticketRoutes = require("./ticketRoutes");
const cartTicketRoutes = require("./cartTicketRoutes");
const orderRoutes = require("./orderRoutes");
const paymentRoutes = require("./paymentRoutes");
const userTicketRoutes = require("./userTicketRoutes")

const route = require("express").Router();

route.use("/", homeRoutes);
route.use("/api/animals", animalRoutes);
route.use("/api/foods", foodRoutes);
route.use("/api/animalfoods", animalFoodRoutes);
route.use("/api/classtypes", classTypeRoutes);
route.use("/api/habitats", HabitatRoutes);
route.use("/api/users", userRoutes);
route.use("/api/animaluser", animalUserRoutes);
route.use("/api/role", roleRoutes);
route.use("/api/cart", cartRoutes);
route.use("/api/cartfood", cartFoodRoutes);
route.use("/api/ticket", ticketRoutes);
route.use("/api/cartTicket" ,cartTicketRoutes);
route.use('/api/order', orderRoutes);
route.use('/api/payment', paymentRoutes);
route.use('/api/userTicket',userTicketRoutes);

module.exports = route;
