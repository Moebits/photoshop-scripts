const document = app.activeDocument

let index = document.layers.length - 1
let unusedLayers = []

while (index >= 0) {
    const layer = document.layers[index]
    if (!layer.visible) {
        unusedLayers.push(layer)
    }
    index--
}

const selectAFrame = (index) => {
    const animationFrame = app.stringIDToTypeID("animationFrameClass")
    const select = app.charIDToTypeID("slct")
    const desc = new ActionDescriptor()
    const nullID = app.charIDToTypeID("null")
    const ref = new ActionReference()
    ref.putIndex(animationFrame, index)
    desc.putReference(nullID, ref)
    app.executeAction(select, desc, DialogModes.NO)
}

const arrayRemove = (arr, val) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
          arr.splice(i, 1)
          i--
        }
     }
}

const spliceLayers = (start) => {
    let wrap = true
    for (let i = document.layers.length - start; i > 0; i--) {
        const layer = document.layers[i]
        if (layer.visible) {
            arrayRemove(unusedLayers, layer)
            break
        }
        if (i === 1) {
            if (wrap) i = document.layers.length - 1
            wrap = false
        }
    }
}

/*Adding to selection (ctrl click)*/
const addToSelection = (layer, selection) => {
    selection.push(layer)
    const select = app.charIDToTypeID("slct")
    const desc = new ActionDescriptor()
    const nullID = app.charIDToTypeID("null")
    const ref = new ActionReference()
    const idLyr = app.charIDToTypeID("Lyr ")
    ref.putName(idLyr, layer.name)
    desc.putReference(nullID, ref)
    const selectionModifier = app.stringIDToTypeID("selectionModifier")
    const selectionModifierType = app.stringIDToTypeID("selectionModifierType")
    const addToSelection = app.stringIDToTypeID("addToSelection")
    desc.putEnumerated(selectionModifier, selectionModifierType, addToSelection)
    const MkVs = app.charIDToTypeID("MkVs")
    desc.putBoolean(MkVs, false)
    const idLyrI = app.charIDToTypeID("LyrI")
    const list = new ActionList()
    for (let i = 0; i < selection.length; i++) {
        list.putInteger(selection[i].id)
    }
    desc.putList(idLyrI, list)
    app.executeAction(select, desc, DialogModes.NO)
    return selection
}

const massSelect = (layers) => {
    let selection = []
    let i = 0
    while (layers.length !== selection.length) {
        selection = addToSelection(layers[i], selection)
        i++
    }
}

const massDelete = (layers) => {
    const deletion = app.charIDToTypeID("Dlt ")
    const desc = new ActionDescriptor()
    const nullID = app.charIDToTypeID("null")
    const ref = new ActionReference()
    const layer = app.charIDToTypeID("Lyr ")
    const order = app.charIDToTypeID("Ordn")
    const target = app.charIDToTypeID("Trgt")
    ref.putEnumerated(layer, order, target)
    desc.putReference(nullID, ref)
    const layerI = app.charIDToTypeID("LyrI")
    const list = new ActionList()
    for (let i = 0; i < layers.length; i++) {
        list.putInteger(layers[i].id)
    }
    desc.putList(layerI, list)
    app.executeAction(deletion, desc, DialogModes.NO)
}

let frameIndex = 1
while (true) {
    try {
        selectAFrame(frameIndex)
        spliceLayers(frameIndex)
        frameIndex++
    } catch {
        break
    }
}

let foo = []
for (let i = 0; i < unusedLayers.length; i++) {
    foo.push(unusedLayers[i].id)
}
alert(foo.toString())

document.activeLayer = unusedLayers[0]
massSelect(unusedLayers)
massDelete(unusedLayers)
