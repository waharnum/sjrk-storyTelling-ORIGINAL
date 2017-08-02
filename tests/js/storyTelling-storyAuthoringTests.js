/*
Copyright 2017 OCAD University
Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.
You may obtain a copy of the ECL 2.0 License and BSD License at
https://raw.githubusercontent.com/waharnum/sjrk-storyTelling/master/LICENSE.txt
*/

/* global fluid */

(function ($, fluid) {

    "use strict";

    fluid.defaults("sjrk.storyTelling.testStoryAuthoring", {
        gradeNames: ["sjrk.storyTelling.storyAuthoring"],
        components: {
            templateLoader: {
                options: {
                    resources: {
                        componentTemplate: "../../src/templates/storyTelling.html"
                    }
                }
            },
            storyEditor: {
                options: {
                    components: {
                        templateLoader: {
                            options: {
                                resources: {
                                    componentTemplate: "../../src/templates/storyEdit.html"
                                }
                            }
                        }
                    }
                }
            },
            storyViewer: {
                options: {
                    components: {
                        templateLoader: {
                            options: {
                                resources: {
                                    componentTemplate: "../../src/templates/storyView.html"
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    fluid.defaults("sjrk.storyTelling.storyAuthoringTester", {
        gradeNames: ["fluid.test.testCaseHolder"],
        modules: [{
            name: "Test story authoring interface.",
            tests: [{
                name: "Test viewer rendering events",
                expect: 4,
                sequence: [{
                    "listener": "jqUnit.assert",
                    "args": "onStoryEditorReady event fired.",
                    "event": "{storyAuthoringTest storyAuthoring}.events.onStoryEditorReady"
                },
                {
                    "jQueryTrigger": "click",
                    "element": "{storyAuthoring}.storyEditor.dom.storySubmit"
                },
                {
                    "event": "{storyAuthoring}.events.onStorySubmitRequestedFromEditorNoView",
                    listener: "jqUnit.assert",
                    args: ["onStorySubmitRequestedFromEditorNoView event fired"]
                },
                {
                    "event": "{storyAuthoring}.events.onStoryViewerReady",
                    listener: "jqUnit.assert",
                    args: ["onStoryViewerReady event fired"]
                },
                {
                    "jQueryTrigger": "click",
                    "element": "{storyAuthoring}.storyEditor.dom.storySubmit"
                },
                {
                    "event":
                    "{storyAuthoring}.events.onStorySubmitRequestedFromEditorViewExists",
                    listener: "jqUnit.assert",
                    args: "onStorySubmitRequestedFromEditorViewExists event fired."
                }]
            }]
        }]
    });



    fluid.defaults("sjrk.storyTelling.storyAuthoringTest", {
        gradeNames: ["fluid.test.testEnvironment"],
        components: {
            storyAuthoring: {
                type: "sjrk.storyTelling.testStoryAuthoring",
                container: "#testStoryAuthoring",
                createOnEvent: "{storyAuthoringTester}.events.onTestCaseStart"
            },
            storyAuthoringTester: {
                type: "sjrk.storyTelling.storyAuthoringTester"
            }
        }
    });

    $(document).ready(function () {
        fluid.test.runTests([
            "sjrk.storyTelling.storyAuthoringTest"
        ]);
    });

})(jQuery, fluid);