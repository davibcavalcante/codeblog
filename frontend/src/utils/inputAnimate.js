const focusIn = (e) => {
    if (e.target.localName !== 'input' || e.target.role === 'combobox') return;

    const inFocus = e.target;
    const toAnimate = e.target.nextElementSibling;

    if (inFocus.value.length === 0 && !toAnimate.classList.contains('active')) {
        toAnimate.classList.add('active');
    }
}

const focusOut = (e) => {
    if (e.target.localName !== 'input' || e.target.role === 'combobox') return;

    const inBlur = e.target;
    const toReturn = e.target.nextElementSibling;

    if (inBlur.value.length === 0 && toReturn.classList.contains('active') && inBlur !== undefined) {
        toReturn.classList.remove('active');
    }
}

export {focusIn, focusOut}