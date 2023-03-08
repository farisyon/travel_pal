const form = document.querySelector('.meal-form');
const foodContainer = document.querySelector('.food-container');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const mealInput = document.querySelector('#meal');
  const meal = mealInput.value;

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    .then(response => response.json())
    .then(data => {
      const meal = data.meals[0];
      const { strMeal, strMealThumb, strInstructions, strYoutube } = meal;
      const ingredients = [];

      for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
          ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
          break;
        }
      }

      const mealHtml = `
        <div class="food-item">
          <img src="${strMealThumb}" alt="${strMeal}">
          <h3>${strMeal}</h3>
          <h4>Ingredients:</h4>
          <ul>${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
          <h4>Instructions:</h4>
          <p>${strInstructions}</p>
          <h4>Video:</h4>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/${strYoutube.slice(-11)}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      `;

      foodContainer.innerHTML = mealHtml;
    })
    .catch(error => console.log(error));
});
