/*
    State
*/

import state from './state.js'


/*
    Element
*/

export const createElement = (obj) => {
    const element = document.createElement(obj.type)
    if (obj.eventListener !== undefined) element.addEventListener(obj.eventListener.type, obj.eventListener.callback)
    obj = deleteAttributes(obj, ['type', 'eventListener'])
    changeElementAttributes(element, obj)
    return element
}

export const changeElementAttributes = (element, attributes) => Object.assign(element, attributes)


/*
    Container
*/

export const createContainer = (obj) => obj.children.reduce((parent, child) => {
    if (child.children.length === 0 || child.children.length === 0 && child.parent.id === undefined) {
        parent.appendChild(toElement(child.parent))
    } else {
        parent.appendChild(toElement(createContainer(child)))
    }
    addContainerToState(parent)
    return parent
}, toElement(obj.parent))

const addContainerToState = (element) => {
    if (element.tagName === 'BODY') return
    if (element.tagName === 'DIV' && !isContainerExist(element.id)) {
        state.containers.push(element)
    }
}

const toElement = (obj) => ('tagName' in obj) ? obj : createElement(obj)

const deleteAttributes = (attributes, keys) => Object.fromEntries(Object.entries(attributes).filter(([k, v]) => !keys.includes(k)))

export const getContainer = (id) => state.containers.find((element) => element.id === id)

export const isContainerExist = (id) => state.containers.some((element) => element.id === id)