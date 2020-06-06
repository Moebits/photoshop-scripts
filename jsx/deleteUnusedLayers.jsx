"use strict";
var document = app.activeDocument;
var index = document.layers.length - 1;
var unusedLayers = [];
while (index >= 0) {
    var layer = document.layers[index];
    if (!layer.visible) {
        unusedLayers.push(layer);
    }
    index--;
}
var selectAFrame = function (index) {
    var animationFrame = app.stringIDToTypeID("animationFrameClass");
    var select = app.charIDToTypeID("slct");
    var desc = new ActionDescriptor();
    var nullID = app.charIDToTypeID("null");
    var ref = new ActionReference();
    ref.putIndex(animationFrame, index);
    desc.putReference(nullID, ref);
    app.executeAction(select, desc, DialogModes.NO);
};
var arrayRemove = function (arr, val) {
    for (var i_1 = 0; i_1 < arr.length; i_1++) {
        if (arr[i_1] === val) {
            arr.splice(i_1, 1);
            i_1--;
        }
    }
};
var spliceLayers = function () {
    for (var i_2 = 0; i_2 < document.layers.length; i_2++) {
        var layer = document.layers[i_2];
        if (layer.visible) {
            arrayRemove(unusedLayers, layer);
        }
    }
};
/*Adding to selection (ctrl click)*/
var addToSelection = function (layer, selection) {
    selection.push(layer);
    var select = app.charIDToTypeID("slct");
    var desc = new ActionDescriptor();
    var nullID = app.charIDToTypeID("null");
    var ref = new ActionReference();
    var idLyr = app.charIDToTypeID("Lyr ");
    ref.putName(idLyr, layer.name);
    desc.putReference(nullID, ref);
    var selectionModifier = app.stringIDToTypeID("selectionModifier");
    var selectionModifierType = app.stringIDToTypeID("selectionModifierType");
    var addToSelection = app.stringIDToTypeID("addToSelection");
    desc.putEnumerated(selectionModifier, selectionModifierType, addToSelection);
    var MkVs = app.charIDToTypeID("MkVs");
    desc.putBoolean(MkVs, false);
    var idLyrI = app.charIDToTypeID("LyrI");
    var list = new ActionList();
    for (var i_3 = 0; i_3 < selection.length; i_3++) {
        list.putInteger(selection[i_3].id);
    }
    desc.putList(idLyrI, list);
    app.executeAction(select, desc, DialogModes.NO);
    return selection;
};
var massSelect = function (layers) {
    var selection = [];
    var i = 0;
    while (layers.length !== selection.length) {
        selection = addToSelection(layers[i], selection);
        i++;
    }
};
var massDelete = function (layers) {
    var deletion = app.charIDToTypeID("Dlt ");
    var desc = new ActionDescriptor();
    var nullID = app.charIDToTypeID("null");
    var ref = new ActionReference();
    var layer = app.charIDToTypeID("Lyr ");
    var order = app.charIDToTypeID("Ordn");
    var target = app.charIDToTypeID("Trgt");
    ref.putEnumerated(layer, order, target);
    desc.putReference(nullID, ref);
    var layerI = app.charIDToTypeID("LyrI");
    var list = new ActionList();
    for (var i_4 = 0; i_4 < layers.length; i_4++) {
        list.putInteger(layers[i_4].id);
    }
    desc.putList(layerI, list);
    app.executeAction(deletion, desc, DialogModes.NO);
};
var frameIndex = 1;
while (true) {
    try {
        selectAFrame(frameIndex);
        spliceLayers();
        frameIndex++;
    }
    catch (_a) {
        break;
    }
}
var foo = [];
for (var i_5 = 0; i_5 < unusedLayers.length; i_5++) {
    foo.push(unusedLayers[i_5].id);
}
alert(foo.toString());
document.activeLayer = unusedLayers[0];
massSelect(unusedLayers);
massDelete(unusedLayers);
