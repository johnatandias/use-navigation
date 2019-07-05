"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useNavigation = () => {
    react_1.useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        setNavigation(0);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, []);
    const [current, setCurrent] = react_1.useState({ type: null, index: null });
    const getAllElements = () => document.querySelectorAll('[nav-selectable]');
    const getTheIndexOfTheSelectedElement = () => {
        const element = document.querySelector('[nav-selected=true]');
        return element && element.hasAttribute('nav-index')
            ? parseInt(element.getAttribute('nav-index') || '0')
            : 0;
    };
    const setNavigation = (index) => selectElement(getAllElements()[index] || document.body);
    const onKeyDown = (evt) => {
        if (evt.key !== 'ArrowDown' && evt.key !== 'ArrowUp')
            return;
        const allElements = getAllElements();
        const currentIndex = getTheIndexOfTheSelectedElement();
        let setIndex;
        switch (evt.key) {
            case 'ArrowDown':
                const goToFirstElement = currentIndex + 1 > allElements.length - 1;
                setIndex = goToFirstElement ? 0 : currentIndex + 1;
                return selectElement(allElements[setIndex] || allElements[0], setIndex);
            case 'ArrowUp':
                const goToLastElement = currentIndex === 0;
                setIndex = goToLastElement ? allElements.length - 1 : currentIndex - 1;
                return selectElement(allElements[setIndex] || allElements[0], setIndex);
            default:
                break;
        }
    };
    const selectElement = (selectElement, setIndex = 0) => {
        if (selectElement) {
            [].forEach.call(getAllElements(), (element, index) => {
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
exports.default = useNavigation;
//# sourceMappingURL=index.js.map