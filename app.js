// VARIABLES
const content = document.getElementById("content")
const cuisines = []
const flags = document.querySelectorAll(".flag")
const form = document.getElementById("form")

// fill cuisines array to random display 
document.querySelectorAll("li").forEach((li) => {
    cuisines.push(li.id)
})

const random_cuisine = get_random_cuisine()
let fetch_result = []
// -------------
getCuisineData()

flags.forEach((flag) => {
    flag.addEventListener('click', () => {
        getCuisineData(flag.id)
    })
})

// SEARCH and filter
form.addEventListener('input', (e) => {

    const search_text = e.target.value.toLowerCase()
    const filtered_meals = fetch_result.filter((meal) => {
        return meal.strMeal.toLowerCase().includes(search_text)
    })

    displayCuisines(filtered_meals)

})


// FUNCTIONS
async function getCuisineData(cuisine = random_cuisine) {
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`)
        if (!res.ok) { throw new Error("Could not fetch data") }
        const data = await res.json()
        fetch_result = data.meals
        // console.log(fetch_result)

        displayCuisines(fetch_result)
        // return fetch_result
    } catch (error) {
        console.log(error)
    }
}

function displayCuisines(meals) {

    content.innerHTML = ''

    function format_name(str) {
        return str.split(" ").join("-")
    }

    meals.forEach(meal => {
        const meal_card = document.createElement("div")
        meal_card.setAttribute("class", "card card-shadow-lg")
        meal_card.setAttribute("style", "width: 18rem; height:26rem")

        const url = `https://www.themealdb.com/meal/${meal.idMeal}-${format_name(meal.strMeal)}-Recipe`

        meal_card.innerHTML = `
            <img src=${meal.strMealThumb} class="card-img-top" alt="food picture">
            <div class="card-body d-flex flex-column justify-content-around">
                <h5 class="card-title">${meal.strMeal}</h5>
                <a href=${url} class="btn btn-danger">See Details</a>
            </div>`

        content.appendChild(meal_card)

    })

}

function get_random_cuisine() {
    const index = Math.round(Math.random() * 4)
    return cuisines[index]
}