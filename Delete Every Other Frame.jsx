const selectFrame = (index) => {
    const animationFrame = app.stringIDToTypeID("animationFrameClass")
    const nullID = app.charIDToTypeID("null")
    const select = app.charIDToTypeID("slct")
    const desc = new ActionDescriptor()
    const ref = new ActionReference()
    ref.putIndex(animationFrame, index)
    desc.putReference(nullID, ref)
    app.executeAction(select, desc, DialogModes.NO)
}

const deleteFrame = () => {
    const animationFrame = app.stringIDToTypeID("animationFrameClass")
    const nullID = app.charIDToTypeID("null")
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
