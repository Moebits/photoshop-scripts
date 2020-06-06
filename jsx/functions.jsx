"use strict";
/*Selecting range (shift click)*/
var selectContinous = function (layers) {
    var selection = app.charIDToTypeID("slct");
    var desc = new ActionDescriptor();
    var nullID = app.charIDToTypeID("null");
    var ref = new ActionReference();
    var idLyr = app.charIDToTypeID("Lyr ");
    ref.putName(idLyr, layers[layers.length - 1].name);
    desc.putReference(nullID, ref);
    var selectionModifier = app.stringIDToTypeID("selectionModifier");
    var selectionModifierType = app.stringIDToTypeID("selectionModifierType");
    var addToSelectionContinuous = app.stringIDToTypeID("addToSelectionContinuous");
    desc.putEnumerated(selectionModifier, selectionModifierType, addToSelectionContinuous);
    var idMkVs = app.charIDToTypeID("MkVs");
    desc.putBoolean(idMkVs, false);
    var idLyrI = app.charIDToTypeID("LyrI");
    var list = new ActionList();
    for (var i_1 = 0; i_1 < layers.length; i_1++) {
        list.putInteger(layers[i_1].id);
    }
    desc.putList(idLyrI, list);
    app.executeAction(selection, desc, DialogModes.NO);
};
