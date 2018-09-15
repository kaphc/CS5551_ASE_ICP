package com.example.kavinkumar.icp_4;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.EditText;
import android.widget.Button;
import android.widget.MultiAutoCompleteTextView;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import okhttp3.Call;
import android.widget.ArrayAdapter;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.ResponseBody;

public class TranslateActivity extends AppCompatActivity {

    String[] languages = {"Azerbaijan", "Albanian", "Amharic", "English", "Arabic", "Armenian",
            "Afrikaans", "Basque", "Mongolian", "Bashkir", "German", "Tamil"};
    String API_URL_first = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20151023T145251Z.bf1ca7097253ff7e.c0b0a88bea31ba51f72504cc0cc42cf891ed90d2&text=";
    String API_URL_second = "&lang=";
    String API_URL_third = "&[format=plain]&[options=1]&[callback=set]";
    AutoCompleteTextView text;
    EditText var_input_language;
    EditText var_target_language;
    EditText var_source_text;
    EditText translated_text;
    Button var_translate;
    Button var_log_out;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.translate_activity);
        final HashMap<String, String> meMap = new HashMap<>();
        meMap.put("Azerbaijan", "az");
        meMap.put("Albanian", "sq");
        meMap.put("Amharic", "am");
        meMap.put("English", "en");
        meMap.put("Arabic", "ar");
        meMap.put("Armenian", "hy");
        meMap.put("Afrikaans", "af");
        meMap.put("Basque", "eu");
        meMap.put("Mongolian", "mn");
        meMap.put("Bashkir", "ba");
        meMap.put("German", "de");
        meMap.put("Tamil", "ta");

        var_input_language = (EditText) findViewById(R.id.input_language);
        var_target_language = (EditText) findViewById(R.id.target_language);
        var_source_text = (EditText) findViewById(R.id.source_text);
        translated_text = (EditText) findViewById(R.id.translated_text);
        var_translate = (Button) findViewById(R.id.translate_button);
        var_log_out = (Button) findViewById(R.id.log_out);

        var_translate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String translation_option = meMap.get(var_input_language.getText().toString().trim()) + "-" + meMap.get(var_target_language.getText().toString().trim());
                final OkHttpClient client = new OkHttpClient();
                final String url = API_URL_first + var_source_text.getText().toString().trim() + API_URL_second + translation_option + API_URL_third;

                try {
                    Request request = new Request.Builder()
                            .url(url)
                            .build();
                    System.out.println("**********" + url);
                    client.newCall(request).enqueue(new Callback() {
                        @Override
                        public void onFailure(Call call, IOException e) {
                            System.out.println(e.getMessage());
                        }

                        @Override
                        public void onResponse(Call call, Response response) throws IOException {
                            final JSONObject jsonResult;
                            final String result = response.body().string();
                            System.out.println("**********" + result);
                            try {
                                jsonResult = new JSONObject(result);
                                JSONArray convertedTextArray = jsonResult.getJSONArray("text");
                                final String convertedText = convertedTextArray.get(0).toString();
                                Log.d("okHttp", jsonResult.toString());
                                runOnUiThread(new Runnable() {
                                    @Override
                                    public void run() {
                                        translated_text.setText(convertedText);
                                    }
                                });
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }
                    });
                } catch (Exception ex) {
                    translated_text.setText(ex.getMessage());

                }
            }
        });

        var_log_out.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent launchactivity = new Intent(TranslateActivity.this, LoginActivity.class);
                startActivity(launchactivity);
            }

        });
    }
}
