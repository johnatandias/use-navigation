# useNavigation

KaiOS navigation with React Hooks

### Installation

```bash
yarn add use-navigation
```

### Usage:

```javascript
import React from 'react';
import useNavigation from 'use-navigation';
import './App.css';

const App = () => {
  const [current, setNavigation] = useNavigation();

  return (
    <div>
      <header>
        <span>Example</span>
      </header>

      <div nav-selectable="true">A</div>
      <div nav-selectable="true">B</div>
      <div>Not selectable</div>
      <div nav-selectable="true">C</div>
    </div>
  );
};

export default App;
```

In your css file, you can apply a style for the current item

```css
div[nav-selected='true'] {
  background-color: black;
  color: white;
}
```

To know the current index by javascript, you get this way:

```javascript
const currentElement = document.querySelector('[nav-selected=true]');
const currentIndex = parseInt(currentElement.getAttribute('nav-index'));
```
