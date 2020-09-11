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

export const createContainer = (obj) => {
    if (obj.children.length !== 0 && 'tagName' in obj.parent && obj.parent.tagName !== 'DIV' && obj.parent.tagName !== 'BODY' ||
        obj.children.length !== 0 && 'type' in obj.parent && obj.parent.type !== 'div') {
        throw new Error("The key 'children' must be empty if the key 'type' value is not 'div'")
    } 

    return obj.children.reduce((parent, child) => {
        if (child.children.length === 0 || child.children.length === 0 && child.parent.id === undefined) {
            parent.appendChild(toElement(child.parent))
        } else {
            parent.appendChild(toElement(createContainer(child)))
            addContainerToState(parent)
        }
        return parent
    }, toElement(obj.parent))
}

const addContainerToState = (element) => {
    if (element.tagName === 'BODY') return
    if (element.tagName === 'DIV' && !isContainerExist(element.id)) {
        state.containers.push(element)
    }
}

const toElement = (obj) => (obj.tagName === 'BODY' || obj.tagName === 'DIV') ? obj : createElement(obj)

const deleteAttributes = (attributes, keys) => Object.fromEntries(Object.entries(attributes).filter(([k, v]) => !keys.includes(k)))

export const getContainer = (id) => state.containers.find((element) => element.id === id).container.element

export const isContainerExist = (id) => state.containers.every((element) => element.id === id)