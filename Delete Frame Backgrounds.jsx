const magicWandTool = (x, y) => {
    const idslct = app.charIDToTypeID("slct")
    const desc1 = new ActionDescriptor()
    const idnull = app.charIDToTypeID("null")
    const ref1 = new ActionReference()
    const idmagicWandTool = app.stringIDToTypeID("magicWandTool")
    ref1.putClass(idmagicWandTool)
    desc1.putReference(idnull, ref1)
    app.executeAction(idslct, desc1, DialogModes.NO)
    const idAddT = app.charIDToTypeID("AddT")
    const desc2 = new ActionDescriptor()
    const ref2 = new ActionReference()
    const idChnl = app.charIDToTypeID("Chnl")
    const idfsel = app.charIDToTypeID("fsel")
    ref2.putProperty(idChnl, idfsel)
    desc2.putReference(idnull, ref2)
    const idT = app.charIDToTypeID("T   ")
    const desc3 = new ActionDescriptor()
    const idHrzn = app.charIDToTypeID("Hrzn")
    let idPxl = app.charIDToTypeID("#Pxl")
    desc3.putUnitDouble(idHrzn, idPxl, x)
    const idVrtc = app.charIDToTypeID("Vrtc")
    idPxl = app.charIDToTypeID("#Pxl")
    desc3.putUnitDouble(idVrtc, idPxl, y)
    const idPnt = app.charIDToTypeID("Pnt ")
    desc2.putObject(idT, idPnt, desc3)
    const idTlrn = app.charIDToTypeID("Tlrn")
    desc2.putInteger(idTlrn, 36)
    const idAntA = app.charIDToTypeID("AntA")
    desc2.putBoolean(idAntA, true)
    app.executeAction(idAddT, desc2, DialogModes.NO)
}

const removeBackground = () => {
    const document = app.activeDocument
    if ((document.activeLayer).isBackgroundLayer) document.activeLayer.name = "Layer 0"
    const originalRulerUnits = app.preferences.rulerUnits
    app.preferences.rulerUnits = Units.PIXELS
    document.selection.deselect()
    const height = document.height
    const width = document.width
    magicWandTool(10, 10)
    magicWandTool(width-10, 10)
    magicWandTool(width-10, height-10)
    magicWandTool(10, height-10)
    document.selection.clear()
    document.selection.deselect()
    app.preferences.rulerUnits = originalRulerUnits
}

const selectionFrame = (index) => {
    const animationFrame = app.stringIDToTypeID("animationFrameClass")
    const select = app.charIDToTypeID("slct")
    const desc = new ActionDescriptor()
    const nullID = app.charIDToTypeID("null")
    const ref = new ActionReference()
    ref.putIndex(animationFrame, index)
    desc.putReference(nullID, ref)
    app.executeAction(select, desc, DialogModes.NO)
}

let counter = 1
for (let i = app.activeDocument.layers.length - 1; i >= 0; i--) {
    try {
        selectionFrame(counter)
    } catch {
        // No timeline
    }
    const layer = app.activeDocument.layers[i]
    app.activeDocument.activeLayer = layer
    removeBackground()
    counter++
}
