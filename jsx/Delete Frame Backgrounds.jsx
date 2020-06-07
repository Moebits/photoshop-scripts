"use strict";
var magicWandTool = function (x, y) {
    var idslct = app.charIDToTypeID("slct");
    var desc1 = new ActionDescriptor();
    var idnull = app.charIDToTypeID("null");
    var ref1 = new ActionReference();
    var idmagicWandTool = app.stringIDToTypeID("magicWandTool");
    ref1.putClass(idmagicWandTool);
    desc1.putReference(idnull, ref1);
    app.executeAction(idslct, desc1, DialogModes.NO);
    var idAddT = app.charIDToTypeID("AddT");
    var desc2 = new ActionDescriptor();
    var ref2 = new ActionReference();
    var idChnl = app.charIDToTypeID("Chnl");
    var idfsel = app.charIDToTypeID("fsel");
    ref2.putProperty(idChnl, idfsel);
    desc2.putReference(idnull, ref2);
    var idT = app.charIDToTypeID("T   ");
    var desc3 = new ActionDescriptor();
    var idHrzn = app.charIDToTypeID("Hrzn");
    var idPxl = app.charIDToTypeID("#Pxl");
    desc3.putUnitDouble(idHrzn, idPxl, x);
    var idVrtc = app.charIDToTypeID("Vrtc");
    idPxl = app.charIDToTypeID("#Pxl");
    desc3.putUnitDouble(idVrtc, idPxl, y);
    var idPnt = app.charIDToTypeID("Pnt ");
    desc2.putObject(idT, idPnt, desc3);
    var idTlrn = app.charIDToTypeID("Tlrn");
    desc2.putInteger(idTlrn, 36);
    var idAntA = app.charIDToTypeID("AntA");
    desc2.putBoolean(idAntA, true);
    app.executeAction(idAddT, desc2, DialogModes.NO);
};
var removeBackground = function () {
    var document = app.activeDocument;
    if (document.activeLayer.isBackgroundLayer)
        document.activeLayer.name = "Layer 0";
    var originalRulerUnits = app.preferences.rulerUnits;
    app.preferences.rulerUnits = Units.PIXELS;
    document.selection.deselect();
    var height = document.height;
    var width = document.width;
    magicWandTool(10, 10);
    magicWandTool(width - 10, 10);
    magicWandTool(width - 10, height - 10);
    magicWandTool(10, height - 10);
    document.selection.clear();
    document.selection.deselect();
    app.preferences.rulerUnits = originalRulerUnits;
};
var selectionFrame = function (index) {
    var animationFrame = app.stringIDToTypeID("animationFrameClass");
    var select = app.charIDToTypeID("slct");
    var desc = new ActionDescriptor();
    var nullID = app.charIDToTypeID("null");
    var ref = new ActionReference();
    ref.putIndex(animationFrame, index);
    desc.putReference(nullID, ref);
    app.executeAction(select, desc, DialogModes.NO);
};
var counter = 1;
for (var i_1 = app.activeDocument.layers.length - 1; i_1 >= 0; i_1--) {
    try {
        selectionFrame(counter);
    }
    catch (_a) {
        // No timeline
    }
    var layer = app.activeDocument.layers[i_1];
    app.activeDocument.activeLayer = layer;
    removeBackground();
    counter++;
}
