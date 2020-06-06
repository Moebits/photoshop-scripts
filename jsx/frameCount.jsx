"use strict";
var getFrameCount = function () {
    /*Only works in video timeline mode*/
    var convertAnimation = app.stringIDToTypeID("convertAnimation");
    var descriptor = new ActionDescriptor();
    app.executeAction(convertAnimation, descriptor, DialogModes.NO);
    /*Get the frame count*/
    var action = new ActionReference();
    action.putProperty(app.charIDToTypeID("Prpr"), app.stringIDToTypeID("frameCount"));
    action.putClass(app.stringIDToTypeID("timeline"));
    var ret = app.executeActionGet(action);
    var frameCount = ret.getInteger(app.stringIDToTypeID("frameCount"));
    /*Undo timeline conversion*/
    var convertTimeline = app.stringIDToTypeID("convertTimeline");
    var desc = new ActionDescriptor();
    app.executeAction(convertTimeline, desc, DialogModes.NO);
    return frameCount;
};
var frameCount = getFrameCount();
alert(frameCount.toString());
