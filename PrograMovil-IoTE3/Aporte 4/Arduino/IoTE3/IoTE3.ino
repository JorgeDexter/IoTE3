#include <Firebase_ESP_Client.h>
#include <WiFi.h>
#include <addons/TokenHelper.h>
#include <ArduinoJson.h>
#define FIREBASE_USE_PSRAM

// Conectar a una red WiFi 
const char* WIFI_SSID = "a";  // Nombre de la red
const char* WIFI_PASSWORD = "jorgeluis";  // Contraseña de la red

// Recursos de Firebase
const char* API_KEY = "AIzaSyBt-6e1-7fG-1q7x8-xtq6UevoyNlHO9Oc";
const char* FIREBASE_PROJECT_ID = "iote3-9f55c";

// Configurar un email y contraseña en Authentication de Firebase
const char* USER_EMAIL = "jorgemacancela527@gmail.com";
const char* USER_PASSWORD = "JORGELUIS";

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

// Pines de los LEDs
const int LED1_PIN = 12;  // Cambia esto al pin que estés utilizando para LED1
const int LED2_PIN = 13;  // Cambia esto al pin que estés utilizando para LED2
const int LED3_PIN = 14;  // Cambia esto al pin que estés utilizando para LED3


void setup() {
  Serial.begin(115200);
  Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);

  // Inicializar conexión WiFi y Firebase
  setupWiFi();
  setupFirebase();

  // Configurar pines de los LEDs
  pinMode(LED1_PIN, OUTPUT);
  pinMode(LED2_PIN, OUTPUT);
  pinMode(LED3_PIN, OUTPUT);
}
void setupFirebase() {
  config.api_key = API_KEY;
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;
  config.token_status_callback = tokenStatusCallback;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void setupWiFi() {
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Connected to WiFi");
}
void loop() {
  String path = "controlLed";  // Ruta de colección
  FirebaseJson json;

  if (Firebase.Firestore.getDocument(&fbdo, FIREBASE_PROJECT_ID, "", path.c_str(), "")) {

    StaticJsonDocument<1024> doc;
    DeserializationError error = deserializeJson(doc, fbdo.payload().c_str());

    if (!error) {
      for (JsonObject document : doc["documents"].as<JsonArray>()) {
        const char* document_name = document["name"];  // ID del documento
        const bool state = document["fields"]["encender"]["booleanValue"];  // Estado del LED

        // Controlar el estado de los LEDs según los datos de Firebase
        if (strstr(document_name, "LED1") != nullptr) {
          digitalWrite(LED1_PIN, state ? HIGH : LOW);  // Encender o apagar LED1
        }
        if (strstr(document_name, "LED2") != nullptr) {
          digitalWrite(LED2_PIN, state ? HIGH : LOW);  // Encender o apagar LED2
        }
        if (strstr(document_name, "LED3") != nullptr) {
          digitalWrite(LED3_PIN, state ? HIGH : LOW);  // Encender o apagar LED3
        }
      }

    }
  }
}



