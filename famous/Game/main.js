// main.js (Simplified Example)
const APP_ID = "daa34a39-f0cb-4210-bebb-65facd69140b"; // Paste your App ID
const client = new Photon.Realtime.LoadBalancingClient(Photon.ConnectionProtocol.Wss, APP_ID, "1.0");

function joinGame() {
    const roomCode = document.getElementById("roomInput").value.toUpperCase();
    const playerName = document.getElementById("nameInput").value;

    client.onStateChange = (state) => {
        if (state === Photon.Realtime.ClientState.Joined) {
            console.log("Successfully joined room!");
            // Show the game controls once we've joined
            document.getElementById("gameControls").style.display = "block";
        }
    }

    client.connectToNameServer();
    client.OpJoinRoom(roomCode, { actorName: playerName });
}

function submitAnswer() {
    const answer = document.getElementById("answerInput").value;
    // Send the answer to the Unity game
    // Event Code 1 can mean "Player Submitted Answer"
    client.raiseEvent(1, { answer: answer });
    console.log("Sent answer: " + answer);
}