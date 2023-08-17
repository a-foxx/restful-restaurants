const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

// data
let ALL_RESTAURANTS = [
  { id: "0b65fe74-03a9-4b37-ab09-1c8d23189273", name: "Taco Express" },
  { id: "869c848c-7a58-4ed6-ab88-72ee2e8e677c", name: "Pho Vinason" },
  { id: "213ca4a4-97ce-4783-917b-f94ef8315778", name: "Rondo Japanese" },
  { id: "2334b925-802e-4161-b5dd-de53315c9325", name: "SpiceBox Indian Food" },
  { id: "3e075c8e-7489-4fb6-b029-43a0a1b8936c", name: "Dick's Burgers" },
  { id: "e8036613-4b72-46f6-ab5e-edd2fc7c4fe4", name: "Fremont Bowl Sushi" },
  { id: "7f4a4fe2-58eb-4833-9e93-2dfdd1a1d91f", name: "Cafe Turko" },
];

// Getting a list of restaurants
router.get("/", (req, res) => {
  res.json(ALL_RESTAURANTS);
});

// Getting a specific restaurant
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const restaurant = ALL_RESTAURANTS.find((restaurant) => restaurant.id === id);

  if (!restaurant) {
    res.sendStatus(404);
    return;
  }

  res.json(restaurant);
});

// Adding a new restaurant
router.post("/", (req, res) => {
  const { body } = req;
  const { name } = body;

  const newId = uuidv4();
  const newRestaurant = {
    id: newId,
    name,
  };

  ALL_RESTAURANTS.push(newRestaurant);

  res.json(newRestaurant);
});

// Deleting a restaurant.
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const newListOfRestaurants = ALL_RESTAURANTS.filter(
    (restaurant) => restaurant.id !== id
  );

  if (ALL_RESTAURANTS.length === newListOfRestaurants.length) {
    res.sendStatus(404);
    return;
  }

  ALL_RESTAURANTS = newListOfRestaurants;

  res.sendStatus(200);
});

// Updating the name of a restaurant.
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { newName } = req.body;

  const restaurant = ALL_RESTAURANTS.find((restaurant) => restaurant.id === id);

  if (!restaurant) {
    res.sendStatus(404);
    return;
  }

  restaurant.name = newName;

  res.sendStatus(200);
});


exports.router = router;
exports.restaurants = ALL_RESTAURANTS;
