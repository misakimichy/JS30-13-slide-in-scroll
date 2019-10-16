// this function runs at most every 20ms
// this function is a lodash's 'debounce' method: https://lodash.com/docs/
const debounce = (func, wait = 20, immediate = true) => {
    let timeout;
    return (e, ...args) => {
        let context = e.currentTarget;
        const later = (args) => {
            timeout = null;
            if(!timeout) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if(callNow) func.apply(context, args);
    };
};

(function(){
    const images = document.querySelectorAll(".slide-in");

    const checkSlide = (e) => {
        images.forEach(image => {
            // track the half height of image
            const imageHalf = (window.scrollY + window.innerHeight) - image.height / 2;
            console.log(imageHalf);
            // track the bottom of image
            const imageBottom = image.offsetTop + image.height;
            const isHalfShown = imageHalf > image.offsetTop;
            const isNotScrolled = window.scrollY < imageBottom;
            (isHalfShown && isNotScrolled) ? image.classList.add("active") : image.classList.remove("active")
        });
    };

    window.addEventListener('scroll', debounce(checkSlide));
}());