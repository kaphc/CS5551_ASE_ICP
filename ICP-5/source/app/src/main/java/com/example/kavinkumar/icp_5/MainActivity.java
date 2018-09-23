package com.example.kavinkumar.icp_5;

import android.app.Dialog;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GoogleApiAvailability;

public class MainActivity extends AppCompatActivity {

    private static final String activity_name = "MainActivity";
    private static final int error_request = 9001;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        if (testService()) {
            init();
        }
    }

    public boolean testService() {
        Log.d(activity_name, "testService(): testing the service");
        int isAvailable = GoogleApiAvailability.getInstance().isGooglePlayServicesAvailable(MainActivity.this);
        if (isAvailable == ConnectionResult.SUCCESS) {
            Log.d(activity_name, "testService(): service ok");
            return true;
        } else if (GoogleApiAvailability.getInstance().isUserResolvableError(isAvailable)) {
            Log.d(activity_name, "testService(): error can be handled");
            Dialog dialog = GoogleApiAvailability.getInstance().getErrorDialog(MainActivity.this, isAvailable, error_request);
            dialog.show();
        } else {
            Toast.makeText(this, "testService(): map request is failed", Toast.LENGTH_SHORT).show();
        }
        return false;
    }

    private void init() {
        Button map_button = findViewById(R.id.map_button);
        map_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, MapActivity.class);
                startActivity(intent);
            }
        });
    }
}
