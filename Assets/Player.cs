using UnityEngine;
using System.Collections;

public class Player : MonoBehaviour {

    public static float accX;
    public static float accY;
    public static float accZ;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
        inclinatePlane();
        if(Input.GetMouseButtonUp(0))
        {
            GameObject hello = Instantiate(Resources.Load("Sphere")) as GameObject;
            hello.transform.position = new Vector3(Random.Range(-10, 10), Random.Range(1, 2), Random.Range(-10,10));
            hello.GetComponent<Renderer>().material.SetColor("_Color", new Color(255 / Random.Range(1, 255), 255 / Random.Range(1, 255), 255 / Random.Range(1, 255)));
        }
	}

    static void inclinatePlane()
    {
        float alpha = Mathf.Atan(accX / Mathf.Sqrt(Mathf.Pow(accY, 2) + Mathf.Pow(accZ, 2)));
        float beta = Mathf.Atan(accY / Mathf.Sqrt(Mathf.Pow(accX, 2) + Mathf.Pow(accZ, 2)));
        float gamma = Mathf.Atan(accZ / Mathf.Sqrt(Mathf.Pow(accY, 2) + Mathf.Pow(accX, 2)));
    }

}
