/*
MIDI Velocity Gate (v0.1.0)

This Gate has two posible modes:
	- Simple: Filter out MIDI notes with velocities lower than the given threshold.
	- Advanced: Same as Simple but we also filter out notes that have been repeated faster than the set amount of milliseconds.

Developed by: Lef Filippakis
Source: https://github.com/Lef-F/logic-midi-gate
*/

var instructions = new Array(
	"README...",
	"Hello stranger, lookin' good today. ;)",
	"I see you plugged in the MIDI Velocity Gate!",
	"It has the following two modes of operation:",
	"1. Simple:",
	"     Do not play any note whose velocity is below the selected threshold.",
	"2. Advanced:",
	"     Same as Simple but do not play the note also if it was last played less that the set time (ms).",
	"Enjoy!"
);
var PluginParameters = [
	{
		name: "Instructions",
		type: "menu",
		defaultValue: 0,
		valueStrings: instructions
	},
	{
		name: "Mode",
		type: "menu",
		defaultValue: 0,
		valueStrings: ["Simple", "Advanced"]
	},
    {
        name: "Gate Velocity Threshold",
        defaultValue: 0,
        minValue: 0,
        maxValue: 127,
        numberOfSteps: 127, // FYI setting this number to be exactly (the number of integers between min and max) - 1 will make the parameter and integer too
        type: "lin",
    },
	{
		name: "Min Repetition Time",
		type: "lin",
		minValue: 1,
		maxValue: 500,
		defaultValue: 100,
		numberOfSteps: 499,
		unit: "ms",
		hidden: true,
	}
];

var prevMode = 0; // Simple mode by default
var timeSinceLastPitchEvent = new Array(127); // used to keep track of the time when a specific pitch was last played

function HandleMIDI(event)
{
	if (event instanceof NoteOn) {
		if (
			(GetParameter("Mode") == 0) // enter simple mode
			&& (event.velocity > GetParameter("Gate Velocity Threshold"))
		) {
			event.send();
		}
		else if (GetParameter("Mode") == 1) { // enter advanced mode
			timeNow = Date.now();
			pitch = event.pitch;
			if (timeSinceLastPitchEvent[pitch] == undefined) {
				// if the note was seen for the first time, play it and store the current time
				event.send();
				timeSinceLastPitchEvent[pitch] = timeNow;
			}
			else if ((timeNow - timeSinceLastPitchEvent[pitch]) > GetParameter("Min Repetition Time")) {
				// if the note has been played before, check if enough milliseconds have passed before playing it 
				// and then update the latest time played
				event.send();
				timeSinceLastPitchEvent[pitch] = timeNow;
			}
		}
	}
	else {
		// if it's not a NoteOn event, send it
		// FYI if you don't do this, strange things happen in Logic Pro
		event.send();
	}

}

function ParameterChanged(param, value) {
	switch (param) {
		case 1:
			// Toggle if we should show the advanced or the simple mode
			if (value != prevMode) {
				prevMode = value
				if (value == 0) {
					PluginParameters[3].hidden = true;
				}
				else if (value == 1) {
					PluginParameters[3].hidden = false;
				}
				UpdatePluginParameters();
			}
	}

}
