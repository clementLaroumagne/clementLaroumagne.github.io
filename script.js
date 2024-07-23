//window.location.href = "/clement";

let cursor = document.querySelector('.div__flou');

window.addEventListener('mousemove', function(e) {
    var x = e.clientX;
    var y = e.clientY;
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';
});

window.addEventListener('mousedown', function() {
    cursor.style.transform = 'scale(0.7)';
});

window.addEventListener('mouseup', function() {
    cursor.style.transform = 'scale(1)';
});

//if desktop user
if (window.innerWidth > 768) {
    cursor.classList.add('desktop');
}
