const originalUnit = app.preferences.rulerUnits
app.preferences.rulerUnits =  Units.INCHES

let docRef =  app.documents.add(2, 4)

let artLayerRef =  docRef.artLayers.add()
artLayerRef.kind =  LayerKind.TEXT

let textItemRef =  artLayerRef.textItem
textItemRef.contents = "Hello, World"

docRef = null as unknown as Document
artLayerRef = null as unknown as ArtLayer
textItemRef = null as unknown as TextItem
app.preferences.rulerUnits = originalUnit
