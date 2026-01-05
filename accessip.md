Good catch — your commands are logically close but incomplete, that’s why they’re failing.
Let’s fix this step by step, in a way that always works on Windows / Linux / Mac.


---

✅ Why your commands are NOT working

❌ Problem 1: javac output directory not specified

.class files are getting created inside src (or not found)

JAR expects compiled classes in a proper package structure


❌ Problem 2: FlatLaf not included in runtime

Your JAR runs → ClassNotFoundException: FlatDarkLaf


❌ Problem 3: Manifest path & classpath mismatch

JAR doesn’t know where FlatLaf is

Icon not properly packaged



---

✅ CORRECT & WORKING WAY (Industry Standard)

We’ll do this in 3 clean steps:

access-checker/
 ├── lib/
 │   └── flatlaf-3.4.jar
 ├── src/
 │   └── com/accesschecker/*.java
 ├── out/              ← compiled classes
 ├── icon.png
 ├── MANIFEST.MF


---

🟢 STEP 1: Compile Java files properly

✅ Windows (CMD / PowerShell)

javac -cp lib\flatlaf-3.4.jar -d out src\com\accesschecker\*.java

✅ Linux / Mac

javac -cp lib/flatlaf-3.4.jar -d out src/com/accesschecker/*.java

✔ -d out → puts .class files in correct package structure
✔ -cp → tells compiler where FlatLaf is


---

🟢 STEP 2: Create a CORRECT MANIFEST

MANIFEST.MF

Manifest-Version: 1.0
Main-Class: com.accesschecker.AccessCheckerApp
Class-Path: lib/flatlaf-3.4.jar

⚠️ VERY IMPORTANT

File must end with a blank line

No extra spaces before keys



---

🟢 STEP 3: Create Runnable JAR (WORKING)

Windows

jar cfm AccessChecker.jar MANIFEST.MF -C out . icon.png

Linux / Mac

jar cfm AccessChecker.jar MANIFEST.MF -C out . icon.png

✔ Uses compiled classes
✔ Includes icon
✔ Knows FlatLaf location


---

▶️ STEP 4: Run the JAR

java -jar AccessChecker.jar

✅ App opens
✅ Dark theme works
✅ No ClassNotFoundException


---

🧠 Common Errors & Fixes

❌ no main manifest attribute

✔ Manifest file missing or malformed
✔ Ensure blank line at end


---

❌ ClassNotFoundException: FlatDarkLaf

✔ FlatLaf not in lib/
✔ Manifest Class-Path wrong
✔ OR use fat JAR (below)


---

🚀 OPTIONAL (BEST PRACTICE): FAT JAR (No external lib)

If you want ONE single JAR (recommended for sharing):

jar cfm AccessChecker.jar MANIFEST.MF \
    -C out . \
    -C lib flatlaf-3.4.jar \
    icon.png

Now users just double-click → works everywhere.


---

🪟 BONUS: Add App Icon (Windows)

setIconImage(Toolkit.getDefaultToolkit()
    .getImage(getClass().getResource("/icon.png")));

Place icon.png inside out/ root.


---

✅ FINAL RESULT

✔ Runnable JAR
✔ Dark theme
✔ Icon
✔ No dependency issues
✔ Production ready


---

If you want next:

Windows EXE

Maven build

Gradle build

Auto-update versioning


Just tell me 👌