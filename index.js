const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data.json");

// localhost = 127.0.0.1
const MONGODB_URI = "mongodb://127.0.0.1:27017/Recipe-app";

// Connection to the database "recipe-app"
 mongoose
  .connect(MONGODB_URI)
  .then(async (x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    let objectToAdd = {
      title: "Test 1",
      level: "Amateur Chef",
      ingredients: [
        "1/2 cup rice vinegar",
        "5 tablespoons honey",
        "1/3 cup soy sauce (such as Silver Swan®)",
        "1/4 cup Asian (toasted) sesame oil",
        "3 tablespoons Asian chili garlic sauce",
        "3 tablespoons minced garlic",
        "salt to taste",
        "8 skinless, boneless chicken thighs",
      ],
      cuisine: "Asian",
      dishType: "main_course",
      image:
        "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: "Chef LePapu",
    };
    let recipe1 = await Recipe.create(objectToAdd);

    console.log("Title of recipe: " + recipe1.title);

    let recipes = await Recipe.insertMany(data);
    recipes.map((recipe) => {
      console.log("Title of recipe: " + recipe.title);
    });
    console.log(recipes);

    const query = { title: "Rigatoni alla Genovese" };
    await Recipe.findOneAndUpdate(query, { duration: 100 })
      .then((patata) => console.log("Rigatoni alla Genovese duration updated"))
      .catch((error) =>
        console.error(
          "Error in updating Rigatoni alla Genovese duration",
          error
        )
      );

    await Recipe.deleteOne({ title: "Carrot Cake" })
      .then((patata) => console.log("Carrot Cake deleted"))
      .catch((error) => console.error(error));

      

    // try {
    //   await Recipe.deleteOne({ title: "Carrot Cake" })
    //   console.log("Carrot Cake deleted") 
    // } catch (error) {
    //   console.error(error)
    // }

    mongoose.connection.close() 
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
