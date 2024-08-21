const cards = document.querySelectorAll(".card")
const filterButtons = document.querySelectorAll(".filterBtn")


filterButtons.forEach(btn => {
    btn.addEventListener("click", function() {
        filterButtons.forEach(btn => {
            btn.classList.remove('active')
        })

        btn.classList.add("active")        
    })
});


function filterSelection(query) {
 
    cards.forEach(element => {
        if (query === "all"){
            element.classList.add("show");
        }
        else if (query === element.getAttribute("data-type")) {
            element.classList.add("show");
        } 
        else {
            element.classList.remove("show");
        }
        
    });        

}



filterSelection("all");

