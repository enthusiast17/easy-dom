/*
    State
*/
import state from './state.js'


/*
    Element
*/
export const createElement = (type) => document.createElement(type)

export const changeElementAttributes = (element, attributes) => Object.assign(element, attributes)


/*
    Container
*/
export const createContainer = (attributes) => {
    const element = createElement('div')
    const parent = attributes.parent || document.body
    attributes = deleteAttributes(attributes, ['type', 'parent', 'name'])
    changeElementAttributes(element, attributes)
    state.containers.push({
        'id': attributes.id,
        'container': {
            'isHidden': () => element.style.display === 'none' || element.style.display === '' || element.style.display === undefined,
            'hide': () => element.style.display = 'none',
            'show': (type) => element.style.display = type
        }, 
        'element': element, 
        'parent': parent
    })
}

const deleteAttributes = (attributes, keys) => Object.fromEntries(Object.entries(attributes).filter(([k, v]) => !keys.includes(k)))

export const getContainer = (id) => state.containers.find((element) => element.id === id).container

export const renderContainers = () => state.containers.forEach((element) => element.parent.appendChild(element.element))