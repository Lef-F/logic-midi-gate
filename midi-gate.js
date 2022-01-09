/*
MIDI Velocity Gate

Developed by: Lef Filippakis
Source: https://github.com/Lef-F/logic-midi-gate/blob/main/midi-gate.js
*/
var PluginParameters = [
    {
        name:"Threshold",
        defaultValue: 0,
        minValue: 0,
        maxValue: 127,
        type: "lin",
    }
];

function HandleMIDI(event)
{
	if (
		(event instanceof NoteOn) 
		&& (event.velocity > GetParameter("Threshold"))
	) {	
		event.send();
	}
}
