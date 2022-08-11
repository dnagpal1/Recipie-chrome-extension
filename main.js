// console.log("hello world");
/*TODO
1. GET API
2. find words on page that match meal categories from returned API
3. do something with meal category(tooltip, popup box, other)
*/
document.addEventListener("DOMContentLoaded", () => {
  url = "https://www.themealdb.com/api/json/v1/1/categories.php";

  //   fetchFunction(url);
  const ingredientBtn = document.getElementById("ingredient-button");

  ingredientBtn.addEventListener("click", (click) => {
    const ingredientInput = document.getElementById("ingredient-input").value;
    click.preventDefault();
    // console.log(ingredientInput);
    fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientInput}`
    )
      .then((Result) => Result.json())
      .then((outputObj) => {
        const mealTitle = document.createElement("h2");
        const mealImg = document.createElement("img");
        mealTitle.innerText = outputObj.meals[0].strMeal;
        mealImg.setAttribute("src", `${outputObj.meals[0].strMealThumb}`);

        const container = document.querySelector(".container");
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
        container.appendChild(mealTitle);
        container.appendChild(mealImg);
        mealImg.style.height = "400px";
        mealImg.style.width = "100%";
        const videoBtn = document.createElement("input");
        videoBtn.setAttribute("type", "submit");
        videoBtn.setAttribute("value", "Get Video");
        container.appendChild(videoBtn);
        videoBtn.addEventListener("click", () => {
          fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${outputObj.meals[0].idMeal}`
          )
            .then((Result) => Result.json())
            .then((output) => {
              const youtubeLink = output.meals[0].strYoutube;
              const videoId = getId(youtubeLink);
              const videoEl = document.createElement("iframe");
              const mealPic = document.querySelector("img");
              const container = document.querySelector(".container");
              videoEl.setAttribute(
                "src",
                `https://www.youtube.com/embed/${videoId}`
              );
              container.replaceChild(videoEl, mealPic);
              //make a new back button that reloads the page
              const reloadBtn = document.createElement("input");
              reloadBtn.setAttribute("type", "submit");
              reloadBtn.setAttribute("value", "Go Back");
              //   videoBtn.remove();
              //   container.appendChild(reloadBtn);
              container.replaceChild(reloadBtn, videoBtn);
              reloadBtn.addEventListener("click", () => {
                location.reload();
              });
              //reloadBtn.onclick = location.reload();

              // mealPic.remove();

              //   console.log(array);
            })
            .catch((errorMsg) => {
              console.log(errorMsg);
            });
        });
      })
      .catch((errorMsg) => {
        console.log(errorMsg);
      });
  });
});

function fetchFunction(url) {
  fetch(url)
    .then((Result) => Result.json())
    .then((array) => {
      //   console.log(array);
    })
    .catch((errorMsg) => {
      console.log(errorMsg);
    });
}

function getId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
}
