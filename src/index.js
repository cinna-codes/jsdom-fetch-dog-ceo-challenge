console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', function() {
    
    const dogImageContainer = document.getElementById("dog-image-container")
    const dogBreedsUl = document.getElementById("dog-breeds") // stable parent
    const dogSelect = document.getElementById("breed-dropdown")
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4" 
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'

    // Challenge 1
    fetch(imgUrl)
    .then(response => { return response.json() })
    .then(jsonObject => {
        const arrOfDogUrls = jsonObject.message
        arrOfDogUrls.forEach(url => {
            dogImageContainer.innerHTML += makeImageTagString(url)
        })
    })
    // Challenge 1

    // Challenge 2
    fetch(breedUrl)
    .then(response => response.json())
    .then(response => {
        const dogBreedsArr = Object.keys(response.message)
        dogBreedsArr.forEach((breed) => {
            dogBreedsUl.innerHTML += `<li>${breed}</li>`
        })
    })
    // Challenge 2

    // Challenge 3
    dogBreedsUl.addEventListener("click", function(event){ // find stable parent & attach event listener. gate it behind a condition (line 35)
        // console.log(event.target) // this checks what the "target" of the event is aka what it's affecting
        if (event.target.tagName === "LI") { // could also add `data-info="breed"` to line 27 & set this line to `if (event.target.dataset.info === "breed")`
            event.target.style.color = "blue"
        }
    })
    // Challenge 3

    // Challenge 4
    dogSelect.addEventListener("change", (event) => {
        fetch(breedUrl)
        .then(response => response.json())
        .then(response => {
            const dogBreedsArr = Object.keys(response.message)
            const filteredArr = dogBreedsArr.filter(breed => {
                return breed.startsWith(event.target.value)
            })

            dogBreedsUl.innerHTML = ""
            filteredArr.forEach((breed) => {
                dogBreedsUl.innerHTML += `<li>${breed}</li>`
            })
        })
    })
    // Challenge 4

// DOMContentLoaded
})

function makeImageTagString(url){
    return `<img src="${url}"/>`
}
