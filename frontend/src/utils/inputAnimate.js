const focusIn = (e) => {
    const inFocus = e.target;
    const toAnimate = e.target.nextElementSibling;

    if (inFocus.value.length === 0 && !toAnimate.classList.contains('active')) {
        toAnimate.classList.add('active');
    }
}

const focusOut = (e) => {
    const inBlur = e.target;
    const toReturn = e.target.nextElementSibling;

    if (inBlur.value.length === 0 && toReturn.classList.contains('active')) {
        toReturn.classList.remove('active');
    }
}

export {focusIn, focusOut}