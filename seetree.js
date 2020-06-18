console.log('seetreeloaded');

const mapDOM = (selector) => {
  let target = null;
  try {
    target = document.querySelector(selector);
  } catch (error) {

  }

  const root = (target !== null && target.nodeType === 1)
    ? target
    : document.body;

  const traverse = (element, tree=[], level=0) => {
    if (element.nodeType === 1) {
      const classNames = element.className
        ? '.' + element.className.trim().replace(/[\s]+/g, '.')
        : '';
      const id = element.id ? '#' + element.id : '';
      const tabs = '&nbsp;&nbsp;'.repeat(level);
      const line = tabs + element.localName + id + classNames + '\n';
      tree.push(line);
    }

    if (element.children.length) {
      Array.from(element.children).forEach(child => {
        if (child.nodeType === 1) {
          traverse(child, tree, level+1);
        }
      })
    }

    return tree;
  };

  const tree = traverse(root, []);

  browser.runtime.sendMessage({
    direction: 'seetree-devtool',
    content: tree,
  });
};

browser.runtime.onMessage.addListener((message) => {
  if (message.command === 'map') {
    mapDOM(message.selector)
  }
});
