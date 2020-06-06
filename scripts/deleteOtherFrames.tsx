const document = app.activeDocument
let animationFrame = app.stringIDToTypeID("animationFrameClass")
let nullID = app.charIDToTypeID("null")

const selectFrame = (index: number) => {
    const select = app.charIDToTypeID("slct")
    const desc = new ActionDescriptor()
    const ref = new ActionReference()
    ref.putIndex(animationFrame, index)
    desc.putReference(nullID, ref)
    app.executeAction(select, desc, DialogModes.NO)
}

const deleteFrame = () => {
    const deletetion = app.charIDToTypeID("Dlt ")
    const desc = new ActionDescriptor()
    const ref = new ActionReference()
    const order = app.charIDToTypeID("Ordn")
    const target = app.charIDToTypeID("Trgt")
    ref.putEnumerated(animationFrame, order, target)
    desc.putReference(nullID, ref)
    app.executeAction(deletetion, desc, DialogModes.NO)
}

let i = 1
while (true) {
    try {
        selectFrame(i+1)
        deleteFrame()
        i++
    } catch {
        break
    }
}
