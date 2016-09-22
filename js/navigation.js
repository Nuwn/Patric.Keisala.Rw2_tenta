/* js/navigation.js */

var open = 0;
function openNav() {
    var dropdown = document.getElementsByClassName('dropdown');
    if (!open) {
        dropdown[0].style.display = "block";
        open = 1;
    } else if (open){
        dropdown[0].style.display = "none";
        open = 0;
    }
    
}