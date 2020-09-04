# easy-dom

```markdown
ATTENTION! This library is not completed yet.
```

Just a little library to manipulate DOM.

Example code:
```js
createContainer(
    {
        parent: document.body,
        children: [
            {
                parent: {
                    type: 'div',
                    id: 'pause-menu',
                    className: 'box',
                    style: 'display: none;',
                },
                children: [
                    {
                        parent: {
                            type: 'p',
                            textContent: 'Pause',
                        },
                        children: []
                    },
                    {
                        parent: {
                            type: 'button',
                            id: 'continue',
                            textContent: 'Continue',
                        },
                        children: []
                    },
                    {
                        parent: {
                            type: 'button',
                            id: 'restart',
                            textContent: 'Restart',
                        },
                        children: []
                    },
                    {
                        parent: {
                            type: 'button',
                            id: 'exit',
                            textContent: 'Exit',
                        },
                        children: []
                    }
                ]
            },
        ]
    }
)

```
