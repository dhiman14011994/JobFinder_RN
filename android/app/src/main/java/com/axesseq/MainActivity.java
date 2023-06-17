package com.axesseq;

import android.os.Bundle;
import android.util.Log;

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;

// import org.devio.rn.splashscreen.SplashScreen;
// import android.os.Bundle;

public class MainActivity extends ReactActivity {

  static Boolean isKilled = false;
  /**
   * Returns the name of the main component registered from JavaScript. This is
   * used to schedule
   * rendering of the component.
   */

  // @Override
  // protected void onCreate(Bundle savedInstanceState) {
  // SplashScreen.show(this); // here
  // super.onCreate(savedInstanceState);
  // }

  @Override
  protected String getMainComponentName() {
    return "AxessEQ";
  }

  @Override
  protected void onStart() {
    super.onStart();
  }

  @Override
  protected void onDestroy() {
    try {
//      AppKilledDetectingService.kill();
    }
   catch (Exception e){
     System.out.println("Crashed 5");
   }
    super.onDestroy();
  }

  @Override
  protected void onResume() {
    super.onResume();
//    isKilled = true;
//    System.out.println("HelloManish==>"+isKilled);
  }

  @Override
  protected void onStop() {
    super.onStop();
    try {

      CustomModule.successCallback.invoke(true);

    }
    catch (Exception e)
    {

      e.printStackTrace();
    }
  }

  //  @Override
//  protected void on() {
//    super.onStop();
//
//  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {

    SplashScreen.show(this);
    super.onCreate(savedInstanceState);

  }
}
