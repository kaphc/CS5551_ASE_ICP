var_input_language=(EditText)findViewById(R.id.input_language);
        var_target_language=(EditText)findViewById(R.id.target_language);
        var_source_text=(EditText)findViewById(R.id.source_text);
        translated_text=(EditText)findViewById(R.id.translated_text);
        var_translate=(Button)findViewById(R.id.translate_button);
        var_log_out=(Button)findViewById(R.id.log_out);

        var_translate.setOnClickListener(new View.OnClickListener(){
@Override
public void onClick(View view){
        String translation_option=meMap.get(var_input_language.getText().toString().trim())+"-"+meMap.get(var_target_language.getText().toString().trim());
final OkHttpClient client=new OkHttpClient();
final String url=API_URL_first+var_source_text.getText().toString().trim()+API_URL_second+translation_option+API_URL_third;

        try{
        Request request=new Request.Builder()
        .url(url)
        .build();
        client.newCall(request).enqueue(new Callback(){
@Override
public void onFailure(Call call,IOException e){
        System.out.println(e.getMessage());
        }

@Override
public void onResponse(Call call,Response response)throws IOException{
final JSONObject jsonResult;
final String result=response.body().string();
        System.out.println("**********"+result);
        try{
        jsonResult=new JSONObject(result);
        JSONArray convertedTextArray=jsonResult.getJSONArray("text");
final String convertedText=convertedTextArray.get(0).toString();
        Log.d("okHttp",jsonResult.toString());
        runOnUiThread(new Runnable(){
@Override
public void run(){
        translated_text.setText(convertedText);
        }
        });
        }catch(JSONException e){
        e.printStackTrace();
        }
        }
        });
        }catch(Exception ex){
        translated_text.setText(ex.getMessage());

        }
        }
        });

        var_log_out.setOnClickListener(new View.OnClickListener(){
@Override
public void onClick(View view){
        Intent launchactivity=new Intent(TranslateActivity.this,LoginActivity.class);
        startActivity(launchactivity);
        }

        });