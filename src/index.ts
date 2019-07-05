import { useState, useEffect } from 'react';

interface ICurrent {
  type: string | null
  index: number | null
}

const useNavigation = () => {
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    setNavigation(0);

    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const [current, setCurrent] = useState<ICurrent>({ type: null, index: null });

  const getAllElements = (): NodeListOf<Element> => document.querySelectorAll('[nav-selectable]');

  const getTheIndexOfTheSelectedElement = (): number => {
    const element = document.querySelector('[nav-selected=true]');
    return element && element.hasAttribute('nav-index')
      ? parseInt(element.getAttribute('nav-index') || '0')
      : 0;
  }

  const setNavigation = (index: number) => selectElement(getAllElements()[index] || document.body);

  const onKeyDown = (evt: KeyboardEvent) => {
    if (evt.key !== 'ArrowDown' && evt.key !== 'ArrowUp') return;

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
  }

  const selectElement = (selectElement: Element, setIndex = 0) => {
    if (selectElement) {
      [].forEach.call(getAllElements(), (element: Element, index: number) => {
        element.setAttribute('nav-selected', (element === selectElement).toString())
        element.setAttribute('nav-index', (index).toString())
      });
      setCurrent({ type: selectElement.tagName, index: setIndex });
    } else {
      setNavigation(0);
    }
  }

  return [current, setNavigation];
};

export default useNavigation;