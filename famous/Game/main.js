// main.js (Updated Example)
const APP_ID = "daa34a39-f0cb-4210-bebb-65facd69140b"; // Your App ID
const ROOM_NAME = "testserver"; // The room we will always join

const client = new Photon.Realtime.LoadBalancingClient(Photon.ConnectionProtocol.Wss, APP_ID, "1.0");

function joinGame() {
    const playerName = document.getElementById("nameInput").value;

    // This function is called whenever the client's state changes.
    client.onStateChange = (state) => {
        console.log("Photon State Change:", Photon.Realtime.ClientState[state]);

        // Once connected to the Name Server, we can join our room.
        if (state === Photon.Realtime.ClientState.ConnectedToNameServer) {
            console.log("Connected to Name Server, trying to join room:", ROOM_NAME);
            client.OpJoinRoom(ROOM_NAME, { actorName: playerName });
        }

        // Once we have successfully joined the room, show the game controls.
        if (state === Photon.Realtime.ClientState.Joined) {
            console.log("Successfully joined room!");
            document.getElementById("gameControls").style.display = "block";
        }
    }

    // Start the connection process. The onStateChange listener will handle the rest.
    client.connectToNameServer();
}

function submitAnswer() {
    const answer = document.getElementById("answerInput").value;
    // Send the answer to the Unity game
    // Event Code 1 can mean "Player Submitted Answer"
    client.raiseEvent(1, { answer: answer });
    console.log("Sent answer: " + answer);
}