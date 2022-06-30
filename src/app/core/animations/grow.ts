import {
    transition,
    trigger,
    style,
    animate,
} from '@angular/animations';

export const grow =
    trigger("grow", [
        // Note the trigger name
        transition(":enter", [
            // :enter is alias to 'void => *'
            style({ height: "0", overflow: "hidden" }),
            animate(250, style({ height: screen.height - 250 + "px" }))
        ]),
        transition(":leave", [
            // :leave is alias to '* => void'
            animate(250, style({ height: 0, overflow: "hidden" }))
        ])
    ])