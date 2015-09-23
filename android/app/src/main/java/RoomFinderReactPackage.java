package com.facebook.react.uiapp;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.List;

/**
 * {@link ReactPackage} that register native modules for RoomFinder App.
 */
public class RoomFinderReactPackage implements ReactPackage {

	@Override
	public List<NativeModule> createNativeModules(
			ReactApplicationContext reactContext) {
		List<NativeModule> modules = new ArrayList<>();
		modules.add(new com.facebook.react.uiapp.LoginModule(reactContext));
		return modules;
	}

	@Override
	public List<Class<? extends JavaScriptModule>> createJSModules() {
		return new ArrayList<>();
	}

	@Override
	public List<ViewManager> createViewManagers(ReactApplicationContext reactApplicationContext) {
		return new ArrayList<>();
	}
}
