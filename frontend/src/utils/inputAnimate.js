const focusIn = (e) => {
    const inFocus = e.target;
    const toAnimate = e.target.nextElementSibling;

    if (inFocus.localName !== 'input') return;

    if (inFocus.value.length === 0 && !toAnimate.classList.contains('active')) {
        toAnimate.classList.add('active');
    }
}

const focusOut = (e) => {
    const inBlur = e.target;
    const toReturn = e.target.nextElementSibling;

    if (inBlur.localName !== 'input') return;

    if (inBlur.value.length === 0 && toReturn.classList.contains('active') && inBlur !== undefined) {
        toReturn.classList.remove('active');
    }
}

export {focusIn, focusOut}