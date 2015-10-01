int moistVal;
int LDRVal;
float tempVal;

void setup() {
  Serial.begin(9600);
}

void loop() {
  moistVal = analogRead(A0);
  int humidity = (moistVal / 1024.0) * 100; // maps from 0-1024 to %

  tempVal = analogRead(A1);
  float voltage = (tempVal / 1024.0) * 5.0; // maps from 0-1024 ADC to 0-5 Volts
  float temperature = (voltage - .5) * 100 + 2; // wtf

  LDRVal = analogRead(A2);
  int light = LDRVal;
  
  Serial.print(humidity);
  // Serial.println(" % Humidity");
  Serial.print("|");
  
  Serial.print(temperature);
  // Serial.println(" C");
  Serial.print("|");
  
  Serial.print(light);
  /*Serial.print(" LUX ");
  if (LDRVal < 10) {
    Serial.println("- Dark");
  } else if (LDRVal < 200) {
    Serial.println("- Dim");
  } else if (LDRVal < 500) {
    Serial.println("- Light");
  } else if (LDRVal < 800) {
    Serial.println("- Bright");
  } else {
    Serial.println("- Very bright");
  }*/
  
  Serial.println();
  delay(2000);
}
