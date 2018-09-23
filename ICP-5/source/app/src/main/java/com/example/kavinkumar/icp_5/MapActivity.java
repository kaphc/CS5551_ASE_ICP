package com.example.kavinkumar.icp_5;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.graphics.Typeface;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.View;
import android.view.inputmethod.EditorInfo;
import android.widget.AutoCompleteTextView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.places.Places;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLngBounds;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class MapActivity extends AppCompatActivity implements OnMapReadyCallback, GoogleApiClient.OnConnectionFailedListener {

    private AutoCompleteTextView searchtext;
    private GoogleApiClient mGoogleApiClient;
    private GoogleMap mMap;
    private FusedLocationProviderClient mFusedLocationProviderClient;
    private PlaceAutocompleteAdapter mplaceAutocompleteAdapter;

    private static final String fine_location = Manifest.permission.ACCESS_FINE_LOCATION;
    private static final String course_location = Manifest.permission.ACCESS_COARSE_LOCATION;

    private static final String TAG = "MapActivity";
    private boolean mlocationPermission = false;
    private static final int LOCATION_PERMISSION_REQUEST_CODE = 1234;
    private static final float DEFAULT_ZOOM = 15f;

    private static final LatLngBounds LAT_LNG_BOUNDS = new LatLngBounds(
            new LatLng(-40, -168), new LatLng(71, 136)
    );

    @Override
    public void onMapReady(GoogleMap googleMap) {
        Toast.makeText(this, "Showing your Location", Toast.LENGTH_SHORT).show();
        mMap = googleMap;
        if (mlocationPermission) {
            getDeviceLocation();
            if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                return;
            }
            mMap.setMyLocationEnabled(true);
        }
    }

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_map);
        searchtext = (AutoCompleteTextView) findViewById(R.id.input_search);
        getLocationPermission();
        init();
    }

    private void init() {
        Log.d(TAG, "init(): to create a google map");
        mGoogleApiClient = new GoogleApiClient
                .Builder(this)
                .addApi(Places.GEO_DATA_API)
                .addApi(Places.PLACE_DETECTION_API)
                .enableAutoManage(this, this)
                .build();
        mplaceAutocompleteAdapter = new PlaceAutocompleteAdapter(this, Places.getGeoDataClient(this, null),
                LAT_LNG_BOUNDS, null);
        searchtext.setAdapter(mplaceAutocompleteAdapter);
        searchtext.setOnEditorActionListener(new TextView.OnEditorActionListener() {
            @Override
            public boolean onEditorAction(TextView v, int actionId, KeyEvent keyEvent) {
                if (actionId == EditorInfo.IME_ACTION_DONE
                        || actionId == EditorInfo.IME_ACTION_SEARCH
                        || keyEvent.getAction() == KeyEvent.ACTION_DOWN
                        || keyEvent.getAction() == KeyEvent.KEYCODE_ENTER) {
                    geoLocate();
                }
                return false;
            }
        });
    }

    private void geoLocate() {
        Log.d(TAG, "geoLocate(): to locate the input address in google map");
        String searchString = searchtext.getText().toString();
        Geocoder geocoder = new Geocoder(MapActivity.this);
        List<Address> list = new ArrayList<>();
        try {
            list = geocoder.getFromLocationName(searchString, 1);
        } catch (IOException e) {
            e.printStackTrace();
        }
        if (list.size() > 0) {
            Address address = list.get(0);
            moveCamera(new LatLng(address.getLatitude(), address.getLongitude()), DEFAULT_ZOOM);
            Toast.makeText(this, "Showing " + searchString, Toast.LENGTH_SHORT).show();
        }
    }

    private void getDeviceLocation() {
        Log.d(TAG, "getDeviceLocation(): getting device current loction");
        mFusedLocationProviderClient = LocationServices.getFusedLocationProviderClient(this);
        try {
            if (mlocationPermission) {
                Task location = mFusedLocationProviderClient.getLastLocation();
                location.addOnCompleteListener(new OnCompleteListener() {
                    @Override
                    public void onComplete(@NonNull Task task) {
                        if (task.isSuccessful()) {
                            Log.d(TAG, "onComplete() : foundlocation");
                            Location currentLocation = (Location) task.getResult();
                            moveCamera(new LatLng(currentLocation.getLatitude(), currentLocation.getLongitude()), DEFAULT_ZOOM);
                        } else {
                            Log.d(TAG, "onComplete() : unable to loacte current location");
                            Toast.makeText(MapActivity.this, "unable to loacte current location", Toast.LENGTH_SHORT).show();
                        }
                    }
                });
            }
        } catch (SecurityException e) {
            Log.e(TAG, "getDeviceLocation() : SecurityException" + e.getMessage());
        }
    }

    private void moveCamera(LatLng latLng, float zoom) {
        Log.d(TAG, "moveCamera(): moving the camera to lat:" + latLng.latitude + ", lng: " + latLng.longitude);
        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(latLng, zoom));
        mMap.setInfoWindowAdapter(new GoogleMap.InfoWindowAdapter() {
            @Override
            public View getInfoWindow(Marker arg0) {
                return null;
            }

            @Override
            public View getInfoContents(Marker marker) {
                Context context = getApplicationContext();
                LinearLayout info = new LinearLayout(context);
                info.setOrientation(LinearLayout.VERTICAL);
                TextView title = new TextView(context);
                title.setTextColor(Color.BLACK);
                title.setGravity(Gravity.CENTER);
                title.setTypeface(null, Typeface.BOLD);
                title.setText(marker.getTitle());
                TextView snippet = new TextView(context);
                snippet.setTextColor(Color.GRAY);
                snippet.setText(marker.getSnippet());
                info.addView(title);
                info.addView(snippet);
                return info;
            }
        });
        MarkerOptions options = new MarkerOptions().position(latLng).title("USER ADDRESS:").snippet("Latitude   : " + latLng.latitude + "\nLongitude: " + latLng.longitude);
        mMap.addMarker(options);
        TextView textView = (TextView) findViewById(R.id.latlng);
        textView.setText("Latitude  : " + latLng.latitude + "\nLongitude: " + latLng.longitude);
    }

    private void initMap() {
        Log.d(TAG, "initMap(): initializing map");
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager().
                findFragmentById(R.id.map);
        mapFragment.getMapAsync(MapActivity.this);
    }

    private void getLocationPermission() {
        Log.d(TAG, "getLocationPermission(): getting location permission");
        String[] permissions = {Manifest.permission.ACCESS_FINE_LOCATION,
                Manifest.permission.ACCESS_COARSE_LOCATION};
        if (ContextCompat.checkSelfPermission(this.getApplicationContext(),
                fine_location) == PackageManager.PERMISSION_GRANTED) {
            if (ContextCompat.checkSelfPermission(this.getApplicationContext(),
                    course_location) == PackageManager.PERMISSION_GRANTED) {
                mlocationPermission = true;
                initMap();
            } else {
                ActivityCompat.requestPermissions(this, permissions,
                        LOCATION_PERMISSION_REQUEST_CODE);
            }
        } else {
            ActivityCompat.requestPermissions(this, permissions,
                    LOCATION_PERMISSION_REQUEST_CODE);
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions,
                                           @NonNull int[] grantResults) {
        Log.d(TAG, "onRequestPermissionsResult() : request permissions");
        mlocationPermission = false;

        switch (requestCode) {
            case LOCATION_PERMISSION_REQUEST_CODE: {
                if (grantResults.length > 0) {
                    for (int i = 0; i < grantResults.length; i++) {
                        if (grantResults[i] != PackageManager.PERMISSION_GRANTED) {
                            mlocationPermission = false;
                            return;
                        }
                    }
                    mlocationPermission = true;
                    initMap();
                }
            }
        }
    }

    @Override
    public void onConnectionFailed(@NonNull ConnectionResult connectionResult) {

    }
}

