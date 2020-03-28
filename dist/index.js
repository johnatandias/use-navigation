"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
;
const useNavigation = () => {
    react_1.useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        setNavigation(0);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, []);
    const [current, setCurrent] = react_1.useState(0);
    const getAllElements = () => (document.querySelectorAll('[nav-selectable]'));
    const getTheIndexOfTheSelectedElement = () => {
        const element = document.querySelector('[nav-selected=true]');
        return element && element.hasAttribute('nav-index')
            ? parseInt(element.getAttribute('nav-index') || '0')
            : 0;
    };
    const setNavigation = (currentIndex) => (selectElement(getAllElements()[currentIndex] || document.body));
    const handleNavigation = {
        ArrowDown: ({ currentIndex, allElements }) => {
            const goToFirstElement = currentIndex + 1 > allElements.length - 1;
            const setIndex = goToFirstElement ? 0 : currentIndex + 1;
            selectElement(allElements[setIndex] || allElements[0], setIndex);
        },
        ArrowUp: ({ currentIndex, allElements }) => {
            const goToLastElement = currentIndex === 0;
            const setIndex = goToLastElement ? allElements.length - 1 : currentIndex - 1;
            selectElement(allElements[setIndex] || allElements[0], setIndex);
        }
    };
    const onKeyDown = (event) => {
        const goToDown = event.key === 'ArrowDown';
        const goToUp = event.key === 'ArrowUp';
        if (!goToDown && !goToUp)
            return;
        const key = event.key;
        const allElements = getAllElements();
        const currentIndex = getTheIndexOfTheSelectedElement();
        handleNavigation[key]({ currentIndex, allElements });
    };
    const selectElement = (selectElement, setIndex = 0) => {
        if (selectElement) {
            [].forEach.call(getAllElements(), (element, index) => {
                element.setAttribute('nav-selected', (element === selectElement).toString());
                element.setAttribute('nav-index', (index).toString());
            });
            setCurrent(setIndex);
        }
        else {
            setNavigation(0);
        }
    };
    return [current, setNavigation];
};
exports.default = useNavigation;
