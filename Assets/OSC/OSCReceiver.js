
public var RemoteIP : String = "127.0.0.1"; //127.0.0.1 signifies a local host (if testing locally
public var SendToPort : int = 9000; //the port you will be sending from
public var ListenerPort : int = 8050; //the port you will be listening on
public var controller : Transform;
public var gameReceiver : GameObject; //the tag of the object on stage that you want to manipulate
private var handler : Osc;

//VARIABLES YOU WANT TO BE ANIMATED
private var pitch : float = 0;
private var roll : float = 0;
private var gamma : float = 0;
private var currentRotation : Vector3 = new Vector3(0,0,0);
private var newRotation : Vector3 = new Vector3(0,0,0);
private var yRot : int = 0; //the rotation around the y axis

public function Start ()
{
	//Initializes on start up to listen for messages
	//make sure this game object has both UDPPackIO and OSC script attached

	var udp : UDPPacketIO = GetComponent("UDPPacketIO");
	udp.init(RemoteIP, SendToPort, ListenerPort);
	handler = GetComponent("Osc");
	handler.init(udp);
	handler.SetAllMessageHandler(AllMessageHandler);
}

function Update () {

    currentRotation = Vector3.Lerp(currentRotation, newRotation, Time.deltaTime*6);
    gameReceiver.transform.eulerAngles = currentRotation;
}

//These functions are called when messages are received
//Access values via: oscMessage.Values[0], oscMessage.Values[1], etc

public function AllMessageHandler(oscMessage: OscMessage){

	var msgString = Osc.OscMessageToString(oscMessage); //the message and value combined
	var msgAddress = oscMessage.Address; //the message parameters
	var msgValue = oscMessage.Values[0]; //the message value
	//Debug.Log(msgString); //log the message and values coming from OSC

	//FUNCTIONS YOU WANT CALLED WHEN A SPECIFIC MESSAGE IS RECEIVED
	switch (msgAddress){
	    case "/accxyz":
	        //Debug.Log("X value: " + oscMessage.Values[0] + "Y value: " + oscMessage.Values[1] + "Z value" + oscMessage.Values[2]);
	        var accX : float =  oscMessage.Values[0];
	        var accY : float =  oscMessage.Values[1];
	        var accZ : float =  oscMessage.Values[2];

	        pitch = Mathf.Atan(accX / Mathf.Sqrt(Mathf.Pow(accY, 2) + Mathf.Pow(accZ, 2)));
	        roll = Mathf.Atan(accY / Mathf.Sqrt(Mathf.Pow(accX, 2) + Mathf.Pow(accZ, 2)));
	        gamma = Mathf.Atan(Mathf.Sqrt(Mathf.Pow(accY, 2) + Mathf.Pow(accX, 2))/ accZ);

	        newRotation = new Vector3(pitch, 0, roll)*20;
	        break;
	    case  "/gyro":
	        Debug.Log("Receives gyro: X is - " + oscMessage.Values[0]);
		default:
			//Debug.Log("Receives something");
			//Rotate(msgValue);
			break;
	}

}


//FUNCTIONS CALLED BY MATCHING A SPECIFIC MESSAGE IN THE ALLMESSAGEHANDLER FUNCTION
public function Rotate(msgValue) : void //rotate the cube around its axis
{
	yRot = msgValue;
}

