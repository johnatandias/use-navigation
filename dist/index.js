import { useState, useEffect } from 'react';
var useNavigation = function () {
    useEffect(function () {
        document.addEventListener('keydown', onKeyDown);
        setNavigation(0);
        return function () { return document.removeEventListener('keydown', onKeyDown); };
    }, []);
    var _a = useState({ type: null, index: null }), current = _a[0], setCurrent = _a[1];
    var getAllElements = function () { return document.querySelectorAll('[nav-selectable]'); };
    var getTheIndexOfTheSelectedElement = function () {
        var element = document.querySelector('[nav-selected=true]');
        return element && element.hasAttribute('nav-index')
            ? parseInt(element.getAttribute('nav-index') || '0')
            : 0;
    };
    var setNavigation = function (index) { return selectElement(getAllElements()[index] || document.body); };
    var onKeyDown = function (evt) {
        if (evt.key !== 'ArrowDown' && evt.key !== 'ArrowUp')
            return;
        var allElements = getAllElements();
        var currentIndex = getTheIndexOfTheSelectedElement();
        var setIndex;
        switch (evt.key) {
            case 'ArrowDown':
                var goToFirstElement = currentIndex + 1 > allElements.length - 1;
                setIndex = goToFirstElement ? 0 : currentIndex + 1;
                return selectElement(allElements[setIndex] || allElements[0], setIndex);
            case 'ArrowUp':
                var goToLastElement = currentIndex === 0;
                setIndex = goToLastElement ? allElements.length - 1 : currentIndex - 1;
                return selectElement(allElements[setIndex] || allElements[0], setIndex);
            default:
                break;
        }
    };
    var selectElement = function (selectElement, setIndex) {
        if (setIndex === void 0) { setIndex = 0; }
        if (selectElement) {
            [].forEach.call(getAllElements(), function (element, index) {
                element.setAttribute('nav-selected', (element === selectElement).toString());
                element.setAttribute('nav-index', (index).toString());
            });
            setCurrent({ type: selectElement.tagName, index: setIndex });
        }
        else {
            setNavigation(0);
        }
    };
    return [current, setNavigation];
};
export default useNavigation;
