class RecipeService {
  constructor() {
    this.recipes = [
      {
        id: 1,
        title: "Mediterranean Chickpea Salad",
        description: "A refreshing, protein-packed salad tossed in a lemon-olive oil dressing.",
        servings: 2,
        prep: 10,
        cook: 0,
        image: "/images/mediterranean-chickpea-salad.jpg",
        ingredients: [
          "chickpeas",
          "cherry tomatoes",
          "cucumber",
          "feta cheese",
          "olive oil",
          "lemon juice",
          "fresh herbs",
          "salt",
          "pepper"
        ]
      },
      {
        id: 2,
        title: "Avocado & Tomato Wholegrain Toast",
        description: "Creamy avocado spread over toasted wholegrain bread, topped with juicy tomatoes.",
        servings: 1,
        prep: 5,
        cook: 5,
        image: "/images/avocado-tomato-toast.jpg",
        ingredients: [
          "wholegrain bread",
          "avocado",
          "tomato",
          "olive oil",
          "salt",
          "pepper",
          "lemon juice"
        ]
      },
      {
        id: 3,
        title: "One-Pan Lemon Garlic Salmon",
        description: "A 15-minute weeknight dinner of flaky salmon and tender asparagus.",
        servings: 2,
        prep: 5,
        cook: 12,
        image: "/images/one-pan-lemon-garlic-salmon.jpg",
        ingredients: [
          "salmon fillets",
          "asparagus",
          "olive oil",
          "garlic",
          "lemon",
          "fresh herbs",
          "butter",
          "salt",
          "pepper"
        ]
      },
      {
        id: 4,
        title: "Quinoa Veggie Power Bowl",
        description: "A balanced bowl of fluffy quinoa, roasted veggies and healthy fats.",
        servings: 2,
        prep: 10,
        cook: 15,
        image: "/images/quinoa-veggie-power-bowl.jpg",
        ingredients: [
          "quinoa",
          "mixed vegetables",
          "chickpeas",
          "tahini",
          "lemon juice",
          "olive oil",
          "maple syrup",
          "mixed seeds"
        ]
      },
      {
        id: 5,
        title: "Sweet Potato Black Bean Tacos",
        description: "Smoky roasted sweet potatoes and black beans tucked into warm tortillas.",
        servings: 3,
        prep: 10,
        cook: 15,
        image: "/images/sweet-potato-black-bean-tacos.jpg",
        ingredients: [
          "corn tortillas",
          "sweet potatoes",
          "black beans",
          "olive oil",
          "smoked paprika",
          "cumin",
          "salsa",
          "cilantro",
          "lime"
        ]
      },
      {
        id: 6,
        title: "Greek Yogurt Berry Parfait",
        description: "Layers of creamy yogurt, fresh berries and crunchy oats for a high-protein snack.",
        servings: 1,
        prep: 5,
        cook: 0,
        image: "/images/greek-yogurt-berry-parfait.jpg",
        ingredients: [
          "greek yogurt",
          "mixed berries",
          "granola",
          "honey",
          "chia seeds",
          "fresh mint",
          "coconut flakes"
        ]
      },
      {
        id: 7,
        title: "Lentil & Spinach Soup",
        description: "A hearty 30-minute soup rich in plant protein and iron.",
        servings: 4,
        prep: 10,
        cook: 20,
        image: "/images/lentil-spinach-soup.jpg",
        ingredients: [
          "dried lentils",
          "onion",
          "carrots",
          "garlic",
          "vegetable broth",
          "fresh spinach",
          "olive oil",
          "cumin",
          "turmeric"
        ]
      },
      {
        id: 8,
        title: "Banana Oat Pancakes",
        description: "Flour-free pancakes sweetened naturally with ripe bananas.",
        servings: 2,
        prep: 5,
        cook: 10,
        image: "/images/banana-oat-pancakes.jpg",
        ingredients: [
          "bananas",
          "rolled oats",
          "eggs",
          "milk",
          "vanilla extract",
          "cinnamon",
          "honey",
          "butter",
          "fresh berries"
        ]
      }
    ];
  }

  getAllRecipes() {
    return this.recipes;
  }

  getFilteredRecipes(filters) {
    let filteredRecipes = [...this.recipes];

    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      filteredRecipes = filteredRecipes.filter(recipe => 
        recipe.title.toLowerCase().includes(searchTerm) ||
        recipe.description.toLowerCase().includes(searchTerm) ||
        recipe.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(searchTerm)
        )
      );
    }

    if (filters.maxPrepTime) {
      filteredRecipes = filteredRecipes.filter(recipe => 
        recipe.prep <= parseInt(filters.maxPrepTime)
      );
    }

    if (filters.maxCookTime) {
      filteredRecipes = filteredRecipes.filter(recipe => 
        recipe.cook <= parseInt(filters.maxCookTime)
      );
    }

    return filteredRecipes;
  }

  getRecipeById(id) {
    return this.recipes.find(recipe => recipe.id === id);
  }
}

export default new RecipeService();
