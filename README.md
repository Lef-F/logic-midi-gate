# MIDI Gate

MIDI Gate is a [Scripter plug-in](https://support.apple.com/guide/logicpro/scripter-api-overview-lgce3905a48c/10.7/mac/11.0) for Apple's [Logic Pro](https://www.apple.com/logic-pro/) Digital Audio Workstation.

Its purpose is to cut-off any MIDI notes that are below a certain threshold velocity.
This may be useful in situations where a MIDI controller fires some unintended MIDI notes e.g. as a result of vibration in e-drums.

This plug-in was conceived together with my friend and professional audio engineer Dimitris "Frost" Sakellaris during a [YouTube livestream](https://youtu.be/Nwwru-srsLE?t=1665) exactly because there were additional sensors being triggered by vibrations when I was recording on my e-drums.

## How to use

This Scripter plugin acts as a regular Noise Gate but for MIDI notes and their velocities or timing.
This plugin has two posible modes:

- **Simple:** Filter out MIDI notes with velocities lower than the given threshold.
- **Advanced:** Same as Simple but we also filter out notes that have been repeated faster than the set amount of milliseconds.

### Simple

In **Simple** mode you only get to set the **Gate Velocity Threshold** parameter.
The value you set it to will be the minimum required velocity from any incoming MIDI note, in order for it to be played.

### Advanced

In **Advanced** mode you get an additional parameter **Min Repetition Time**.
This allows you to set the minimum allowed time (in milliseconds) between two notes of the same pitch.
This way you can e.g. skip playing a note that was played less than 10 milliseconds ago (or 1/100 of a second ago).

## How to install

There's two ways to add Scripter plug-ins in your Logic Pro session:

- You can copy-paste the JavaScript code from the [`midi-gate.js`](/midi-gate.js) file into the Scripter editor.
- You can download and install the `.pst` file from the [latest release](https://github.com/Lef-F/logic-midi-gate/releases).
