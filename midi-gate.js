/*
With Scripter, you can use JavaScript to create your own custom MIDI processing 
effects, including slider controls for real-time interaction.

For detailed information about using Scripter, including code samples, 
see the MIDI plug-ins chapter of the Logic Pro X Effects or 
MainStage 3 Effects manual.
*/

// example: simple pass through and MIDI monitor

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
