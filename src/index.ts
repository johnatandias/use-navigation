// @ts-ignore
import { useState, useEffect } from 'react';

const useNavigation = (): [number, () => void, () => void] => {
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    setNavigation(0);

    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const onKeyDown = (event: KeyboardEvent) => {
    const goToDown = event.key === 'ArrowDown';
    const goToUp = event.key === 'ArrowUp';
    if (!goToDown && !goToUp) return;

    const action = event.key.replace('Arrow', '') as 'Down' | 'Up';
    handleNavigation[action]();
  }

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const getAllElements = (): NodeListOf<Element> => (
    document.querySelectorAll('[nav-selectable]')
  );

  const getTheIndexOfTheSelectedElement = (): number => {
    const element = document.querySelector('[nav-selected=true]');
    return element && element.hasAttribute('nav-index')
      ? parseInt(element.getAttribute('nav-index') || '0')
      : 0;
  }

  const setNavigation = (currentIndex: number): void => (
    selectElement(getAllElements()[currentIndex] || document.body)
  );

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

  const selectPrevious = (): void => handleNavigation.Up();
  const selectNext = (): void => handleNavigation.Down();

  const selectElement = (selectElement: Element, setIndex = 0) => {
    if (selectElement) {
      [].forEach.call(getAllElements(), (element: HTMLElement, index: number) => {
        const selected = element === selectElement;
        element.setAttribute('nav-selected', (selected).toString())
        element.setAttribute('nav-index', (index).toString())

        if (selected && element.nodeName === 'input') {
          element.focus();
        }
      });
      setCurrentIndex(setIndex);
    } else {
      setNavigation(0);
    }
  }

  return [
    currentIndex,
    selectPrevious,
    selectNext,
  ];
};

export default useNavigation;
