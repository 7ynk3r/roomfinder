package com.facebook.react.uiapp;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.util.HashMap;
import java.util.Map;

public class LoginActivity extends Activity {

	private static final String GOOGLE_CLIENT_ID_ARG = "googleClientId";

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		String googleClientId = getIntent().getExtras().getString(GOOGLE_CLIENT_ID_ARG);
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
		webview.loadUrl("https://accounts.google.com/o/oauth2/auth?client_id=" + googleClientId + "&redirect_uri=http%3A%2F%2Flocalhost&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar&approval_prompt=force&access_type=offline");
	}

	private void notifyLogin(Map<String, String> result) {
		com.facebook.react.uiapp.LoginModule.sendEvent(result);
	}

	public static Intent newIntent(Context context, String googleClientId) {
		Intent intent = new Intent(context, com.facebook.react.uiapp.LoginActivity.class);
		intent.putExtra(GOOGLE_CLIENT_ID_ARG, googleClientId);
		return intent;
	}
}
