package com.facebook.react.uiapp;

import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.Map;

public class LoginModule extends ReactContextBaseJavaModule {

	private static ReactContext sReactContext;
	private static Callback sCallback;

	public LoginModule(ReactApplicationContext reactContext) {
		super(reactContext);
		sReactContext = reactContext;
	}

	public String getName() {
		return "LoginModule";
	}

	public static void sendEvent(Map<String, String> params) {
		WritableMap map = Arguments.createMap();
		for (Map.Entry<String, String> entry : params.entrySet()) {
			map.putString(entry.getKey(), entry.getValue());
			Log.d("Log------------> ", entry.getKey());

		}
//		sCallback.invoke(map);
		sReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("login", map);
	}

	@ReactMethod
	public void login(Callback callback) {
		sCallback = callback;
		ReactApplicationContext reactApplicationContext = getReactApplicationContext();
		Intent i = new Intent(reactApplicationContext, com.facebook.react.uiapp.LoginActivity.class);
		i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
		reactApplicationContext.startActivity(i);
	}

}
