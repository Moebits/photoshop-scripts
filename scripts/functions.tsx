/*Selecting range (shift click)*/
const selectContinous = (layers: Layer[]) => {
    const selection = app.charIDToTypeID("slct")
    const desc = new ActionDescriptor()
    const nullID = app.charIDToTypeID("null")
    const ref = new ActionReference()
    const idLyr = app.charIDToTypeID("Lyr ")
    ref.putName(idLyr, layers[layers.length - 1].name)
    desc.putReference(nullID, ref)
    const selectionModifier = app.stringIDToTypeID("selectionModifier")
    const selectionModifierType = app.stringIDToTypeID("selectionModifierType")
    const addToSelectionContinuous = app.stringIDToTypeID("addToSelectionContinuous")
    desc.putEnumerated(selectionModifier, selectionModifierType, addToSelectionContinuous)
    const idMkVs = app.charIDToTypeID("MkVs")
    desc.putBoolean(idMkVs, false)
    const idLyrI = app.charIDToTypeID("LyrI")
    const list = new ActionList()
    for (let i = 0; i < layers.length; i++) {
        list.putInteger(layers[i].id)
    }
    desc.putList(idLyrI, list)
    app.executeAction(selection, desc, DialogModes.NO)
}
