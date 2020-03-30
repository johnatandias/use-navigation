# useNavigation

KaiOS navigation with React Hooks

### Installation

```bash
yarn add use-navigation

# or

npm i use-navigation
```

### Usage:

```javascript
import React from 'react';
import useNavigation from 'use-navigation';

const App = () => {
  const [currentIndex, selectPrevious, selectNext] = useNavigation();

  return (
    <div>
      <header>
        <span>Example</span>
      </header>

      <div nav-selectable="true">A</div>
      <div nav-selectable="true">B</div>
      <div>Not selectable - Advertising for example</div>
      <div nav-selectable="true">C</div>
      <div nav-selectable="true">D</div>
      <div nav-selectable="true">E</div>
      <div nav-selectable="true">F</div>
    </div>
  );
};

export default App;
```

In your css file, you can apply a different style for the current item.
Make this for see the exemplo above

```css
div[nav-selected='true'] {
  background-color: black;
  color: white;
}
```
