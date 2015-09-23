package com.facebook.react.uiapp;

import android.app.Activity;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.util.HashMap;
import java.util.Map;

public class LoginActivity extends Activity {

	public static final String GOOGLE_LOGIN_URL = "https://accounts.google.com/o/oauth2/auth?client_id=894031461599-oljc38se5i9rakjljk3cn3b40rdb72dl.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost&response_type=code&scope=email%20openid%20profile";

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_login);
		WebView webview = (WebView) findViewById(R.id.webview);
		WebSettings settings = webview.getSettings();
		settings.setJavaScriptEnabled(true);
		webview.setScrollBarStyle(WebView.SCROLLBARS_OUTSIDE_OVERLAY);

		webview.setWebViewClient(new WebViewClient() {
			public boolean shouldOverrideUrlLoading(WebView view, String url) {
				Uri uri = Uri.parse(url);
				if ("localhost".equals(uri.getHost())) {
					Map<String, String> result = new HashMap<>();
					for (String name : uri.getQueryParameterNames()) {
						result.put(name, uri.getQueryParameter(name));
					}
					notifyLogin(result);
					LoginActivity.this.finish();
					return false;
				} else {
					view.loadUrl(url);
					return true;
				}
			}

			public void onPageFinished(WebView view, String url) {
				Log.i("TAG", "Finished loading URL: " + url);
			}
		});
		webview.loadUrl(GOOGLE_LOGIN_URL);
	}

	private void notifyLogin(Map<String, String> result) {
		com.facebook.react.uiapp.LoginModule.sendEvent(result);
	}

}
