package com.axesseq;

import android.bluetooth.BluetoothDevice;
import android.content.IntentFilter;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class CustomModule extends ReactContextBaseJavaModule {
    private  static ReactApplicationContext reactContext;

    static  Callback successCallback;
    CustomModule(ReactApplicationContext context){
        super(context);
        reactContext = context;

    }

    @ReactMethod
    public void show(Callback successCallback){

        this.successCallback = successCallback;


    }


    @NonNull
    @Override
    public String getName() {
        return "CustomModule";
    }
}
