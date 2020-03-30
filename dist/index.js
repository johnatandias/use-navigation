"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useNavigation = () => {
    react_1.useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        setNavigation(0);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, []);
    const onKeyDown = (event) => {
        const goToDown = event.key === 'ArrowDown';
        const goToUp = event.key === 'ArrowUp';
        if (!goToDown && !goToUp)
            return;
        const action = event.key.replace('Arrow', '');
        handleNavigation[action]();
    };
    const [currentIndex, setCurrentIndex] = react_1.useState(0);
    const getAllElements = () => (document.querySelectorAll('[nav-selectable]'));
    const getTheIndexOfTheSelectedElement = () => {
        const element = document.querySelector('[nav-selected=true]');
        return element && element.hasAttribute('nav-index')
            ? parseInt(element.getAttribute('nav-index') || '0')
            : 0;
    };
    const setNavigation = (currentIndex) => (selectElement(getAllElements()[currentIndex] || document.body));
    const handleNavigation = {
        Down: () => {
            const allElements = getAllElements();
            const currentIndex = getTheIndexOfTheSelectedElement();
            const goToFirstElement = currentIndex + 1 > allElements.length - 1;
            const setIndex = goToFirstElement ? 0 : currentIndex + 1;
            selectElement(allElements[setIndex] || allElements[0], setIndex);
        },
        Up: () => {
            const allElements = getAllElements();
            const currentIndex = getTheIndexOfTheSelectedElement();
            const goToLastElement = currentIndex === 0;
            const setIndex = goToLastElement ? allElements.length - 1 : currentIndex - 1;
            selectElement(allElements[setIndex] || allElements[0], setIndex);
        }
    };
    const selectPrevious = () => handleNavigation.Up();
    const selectNext = () => handleNavigation.Down();
    const selectElement = (selectElement, setIndex = 0) => {
        if (selectElement) {
            [].forEach.call(getAllElements(), (element, index) => {
                const selected = element === selectElement;
                element.setAttribute('nav-selected', (selected).toString());
                element.setAttribute('nav-index', (index).toString());
                if (selected && element.nodeName === 'input') {
                    element.focus();
                }
            });
            setCurrentIndex(setIndex);
        }
        else {
            setNavigation(0);
        }
    };
    return [
        currentIndex,
        selectPrevious,
        selectNext,
    ];
};
exports.default = useNavigation;
