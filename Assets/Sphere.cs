using UnityEngine;
using System.Collections;

public class Sphere : MonoBehaviour {

	// Use this for initialization
	void Start () {
        this.GetComponent<Rigidbody>().AddForce(Vector3.right);
	}
	
	// Update is called once per frame
	void Update () {
	    
	}
}
