const getFrameCount = () => {
    /*Only works in video timeline mode*/
    const convertAnimation = app.stringIDToTypeID("convertAnimation")
    const descriptor = new ActionDescriptor()
    app.executeAction(convertAnimation, descriptor, DialogModes.NO)
    /*Get the frame count*/
    const action = new ActionReference()
    action.putProperty(app.charIDToTypeID("Prpr"), app.stringIDToTypeID("frameCount"))
    action.putClass(app.stringIDToTypeID("timeline"))
    const ret = app.executeActionGet(action)
    const frameCount = ret.getInteger(app.stringIDToTypeID("frameCount"))
    /*Undo timeline conversion*/
    const convertTimeline = app.stringIDToTypeID("convertTimeline")
    const desc = new ActionDescriptor()
    app.executeAction(convertTimeline, desc, DialogModes.NO)
    return frameCount
}

const frameCount = getFrameCount()
alert(frameCount.toString())
