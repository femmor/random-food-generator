const getMealButton = document.getElementById("getMeal");
const mealContainer = document.getElementById("meal");

getMealButton.addEventListener("click", () => {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(res => res.json())
    .then(res => {
      createMeal(res.meals[0]);
    })
    .catch(e => {
      console.warn(e);
    });
});

const createMeal = meal => {
  const ingredients = [];

  // Get all ingredients from the object. Up to 20
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      // Stop if there are no more ingredients
      break;
    }
  }

  const newInnerHTML = `
		<div class="row">
            <div class="col-md-5 mt-2 mb-4">
            <div class="card">
            <img src="${meal.strMealThumb}" class='img-fluid' alt="Meal Image">
            <div class="card-body">
                ${
                  meal.strCategory
                    ? `<p><strong>Category:</strong> ${meal.strCategory}</p>`
                    : ""
                }
				${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ""}
				${
          meal.strTags
            ? `<p><strong>Tags:</strong> ${meal.strTags
                .split(",")
                .join(", ")}</p>`
            : ""
        }
            </div>
            </div>
				<hr>
				<h4>Ingredients:</h4>
				<ul class="list-group">
					${ingredients
            .map(ingredient => `<li class="list-group-item">${ingredient}</li>`)
            .join("")}
                </ul>
                
			</div>
			<div class="col-md-7 mt-2 mb-4">
				<h4>${meal.strMeal}</h4>
                <p>${meal.strInstructions}</p>
                <hr>
                ${
                  meal.strYoutube
                    ? `
                <h4 class="mt-3">Video Recipe</h4>
                <div class="videoWrapper">
                    <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/${meal.strYoutube.slice(
                      -11
                    )}" allowfullscreen></iframe>
                </div>
            </div>
		</div>`
                    : ""
                }
    `;

  mealContainer.innerHTML = newInnerHTML;
};
