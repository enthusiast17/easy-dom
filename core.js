/*
    State
*/

import state from './state.js'


/*
    Element
*/

export const createElement = (obj) => {
    const element = document.createElement(obj.type)
    obj = deleteAttributes(obj, ['type'])
    changeElementAttributes(element, obj)
    return element
}

export const changeElementAttributes = (element, attributes) => Object.assign(element, attributes)


/*
    Container
*/

export const createContainer = (obj) => {
    const parseObject = (obj) => {
        if (obj.children.length !== 0 && 'tagName' in obj.parent && obj.parent.tagName !== 'DIV' && obj.parent.tagName !== 'BODY' ||
        obj.children.length !== 0 && 'type' in obj.parent && obj.parent.type !== 'div') {
            throw new Error("The key 'children' must be empty if the key 'type' value is not 'div'")
        } 

        return obj.children.reduce((parent, child) => {
            if (child.children.length === 0) {
                parent.appendChild(toElement(child.parent))
            } else {
                parent.appendChild(toElement(parseObject(child)))
                addContainerToState(parent)
            }
            return parent
        }, toElement(obj.parent))
    }
    
    parseObject(obj)
}

const addContainerToState = (element) => {
    if (element.tagName === 'BODY') return
    if (element.tagName === 'DIV' && !isContainerExist(element.id)) {
        state.containers.push({
            'id': obj.id,
            'container': {
                'isHidden': () => element.style.display === 'none' || element.style.display === '' || element.style.display === undefined,
                'hide': () => element.style.display = 'none',
                'show': (type) => element.style.display = type
            }, 
            'element': element, 
        })
    }
}

const toElement = (obj) => {
    if (obj.tagName === 'BODY' || obj.tagName === 'DIV') return obj
    return createElement(obj)
}

const deleteAttributes = (attributes, keys) => Object.fromEntries(Object.entries(attributes).filter(([k, v]) => !keys.includes(k)))

export const getContainer = (id) => state.containers.find((element) => element.id === id).container

export const getContainerElement = (id) => state.containers.find((element) => element.id === id).element

export const isContainerExist = (id) => state.containers.every((element) => element.id === id)

export const renderContainers = () => state.containers.forEach((element) => element.parent.appendChild(element.element))