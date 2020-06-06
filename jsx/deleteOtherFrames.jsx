"use strict";
var selectFrame = function (index) {
    var animationFrame = app.stringIDToTypeID("animationFrameClass");
    var nullID = app.charIDToTypeID("null");
    var select = app.charIDToTypeID("slct");
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putIndex(animationFrame, index);
    desc.putReference(nullID, ref);
    app.executeAction(select, desc, DialogModes.NO);
};
var deleteFrame = function () {
    var animationFrame = app.stringIDToTypeID("animationFrameClass");
    var nullID = app.charIDToTypeID("null");
    var deletetion = app.charIDToTypeID("Dlt ");
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    var order = app.charIDToTypeID("Ordn");
    var target = app.charIDToTypeID("Trgt");
    ref.putEnumerated(animationFrame, order, target);
    desc.putReference(nullID, ref);
    app.executeAction(deletetion, desc, DialogModes.NO);
};
var i = 1;
while (true) {
    try {
        selectFrame(i + 1);
        deleteFrame();
        i++;
    }
    catch (_a) {
        break;
    }
}
