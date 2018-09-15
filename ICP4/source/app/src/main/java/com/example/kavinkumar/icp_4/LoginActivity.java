package com.example.kavinkumar.icp_4;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

import android.widget.EditText;
import android.widget.Button;
import android.widget.Toast;


public class LoginActivity extends AppCompatActivity {

    EditText var_username;
    EditText var_password;
    Button var_log_in;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login_activity);

        var_username = (EditText) findViewById(R.id.username);
        var_password = (EditText) findViewById(R.id.password);
        var_log_in = (Button) findViewById(R.id.log_in);

        var_log_in.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String username_value = var_username.getText().toString().trim();
                String password_value = var_password.getText().toString().trim();
                if(username_value.isEmpty()){
                    Toast.makeText(LoginActivity.this,"Please Enter Username", Toast.LENGTH_SHORT).show();
                }
                if(password_value.isEmpty()){
                    Toast.makeText(LoginActivity.this,"Please Enter Password", Toast.LENGTH_SHORT).show();
                }
                if (username_value.equals("kavin") && password_value.equals("kumar")) {
                    Toast.makeText(LoginActivity.this, "Login Successful", Toast.LENGTH_SHORT).show();
                    Intent launchactivity = new Intent(LoginActivity.this, TranslateActivity.class);
                    startActivity(launchactivity);
                } else {
                    Toast.makeText(LoginActivity.this, "Invalid Username/Password", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }
}
