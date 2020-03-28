// @ts-ignore
import { useState, useEffect } from 'react';

interface IHandleNavigation {
  currentIndex: number,
  allElements: NodeListOf<Element>
};

const useNavigation = (): [number, (currentIndex: number) => void] => {
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    setNavigation(0);

    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const [current, setCurrent] = useState<number>(0);

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
    ArrowDown: ({ currentIndex, allElements }: IHandleNavigation) => {
      const goToFirstElement = currentIndex + 1 > allElements.length - 1;
      const setIndex = goToFirstElement ? 0 : currentIndex + 1;
      selectElement(allElements[setIndex] || allElements[0], setIndex);
    },
    ArrowUp: ({ currentIndex, allElements }: IHandleNavigation) => {
      const goToLastElement = currentIndex === 0;
      const setIndex = goToLastElement ? allElements.length - 1 : currentIndex - 1;
      selectElement(allElements[setIndex] || allElements[0], setIndex);
    }
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const goToDown = event.key === 'ArrowDown';
    const goToUp = event.key === 'ArrowUp';
    if (!goToDown && !goToUp) return;

    const key = event.key as 'ArrowDown' | 'ArrowUp';

    const allElements = getAllElements();
    const currentIndex = getTheIndexOfTheSelectedElement();
    handleNavigation[key]({ currentIndex, allElements });
  }

  const selectElement = (selectElement: Element, setIndex = 0) => {
    if (selectElement) {
      [].forEach.call(getAllElements(), (element: Element, index: number) => {
        element.setAttribute('nav-selected', (element === selectElement).toString())
        element.setAttribute('nav-index', (index).toString())
      });
      setCurrent(setIndex);
    } else {
      setNavigation(0);
    }
  }

  return [current, setNavigation];
};

export default useNavigation;
