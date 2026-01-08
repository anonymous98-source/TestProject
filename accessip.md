Perfect 👍 — this is a clean UI improvement, and we’ll do it properly and predictably.

You want:

1. Buttons on the next line after Timeout


2. Add “Copy to Clipboard” button


3. Proper alignment (no drifting, no overlap)



We’ll fix this in a way that won’t break again.


---

✅ FINAL BUTTON LAYOUT (WHAT WE’LL DO)

Layout rows:

Row 1:  Timeout (ms): [ 3000 ]
Row 2:  [ Check ] [ Export CSV ] [ Copy Result ] [ Reset ]

All buttons:

Same size

Same baseline

Even spacing

Centered horizontally



---

🔴 IMPORTANT DESIGN DECISION (WHY THIS WILL WORK)

Instead of manually guessing X values again, we’ll:

Keep absolute layout for main UI

Use a dedicated button panel for alignment


This avoids all alignment issues forever.


---

✅ STEP 1: REMOVE OLD BUTTON CODE

❌ Delete your existing button creation and setBounds() calls
(Do not keep any old button positioning code)


---

✅ STEP 2: ADD THIS BUTTON PANEL CODE

Place this after timeout field setup in initUI().

// ---------- BUTTON PANEL (NEXT LINE AFTER TIMEOUT) ----------
JPanel buttonPanel = new JPanel(new FlowLayout(FlowLayout.CENTER, 15, 0));
buttonPanel.setBounds(0, 380, 960, 40); // full width, next line
buttonPanel.setOpaque(false);

// Buttons
JButton checkBtn = new JButton("Check");
JButton exportBtn = new JButton("Export CSV");
JButton copyBtn = new JButton("Copy Result");
JButton resetBtn = new JButton("Reset");

// Uniform button size
Dimension btnSize = new Dimension(120, 32);
checkBtn.setPreferredSize(btnSize);
exportBtn.setPreferredSize(btnSize);
copyBtn.setPreferredSize(btnSize);
resetBtn.setPreferredSize(btnSize);

// Optional: consistent font
Font btnFont = new Font("Segoe UI", Font.PLAIN, 13);
checkBtn.setFont(btnFont);
exportBtn.setFont(btnFont);
copyBtn.setFont(btnFont);
resetBtn.setFont(btnFont);

// Add buttons to panel
buttonPanel.add(checkBtn);
buttonPanel.add(exportBtn);
buttonPanel.add(copyBtn);
buttonPanel.add(resetBtn);

// Add panel to main panel
panel.add(buttonPanel);

✔ Buttons are now on next line
✔ Always aligned
✔ No clipping
✔ Looks clean in FlatLaf Dark


---

✅ STEP 3: ADD BUTTON ACTIONS

Check button

checkBtn.addActionListener(e -> runChecks());

Export CSV button

exportBtn.addActionListener(e -> exportCSV());

Reset button

resetBtn.addActionListener(e -> resetAll());


---

✅ STEP 4: COPY TO CLIPBOARD LOGIC

Add this method to AccessCheckerApp

private void copyToClipboard() {
    String text = resultPane.getText();
    if (text == null || text.isBlank()) {
        JOptionPane.showMessageDialog(this, "No result to copy");
        return;
    }

    Toolkit.getDefaultToolkit()
            .getSystemClipboard()
            .setContents(new java.awt.datatransfer.StringSelection(text), null);

    JOptionPane.showMessageDialog(this, "Result copied to clipboard");
}

Wire it to the button

copyBtn.addActionListener(e -> copyToClipboard());


---

✅ FINAL VISUAL RESULT

Timeout (ms): [ 3000 ]

[  Check  ] [ Export CSV ] [ Copy Result ] [  Reset  ]

Balanced

Professional

No overlap

No misalignment

Keyboard & mouse friendly



---

🧠 WHY THIS IS THE RIGHT APPROACH

Absolute layout for structure ✔

FlowLayout for grouped controls ✔

FlatLaf-compatible ✔

Scales with DPI ✔

Easy to extend later ✔



---

🚀 OPTIONAL NEXT (If you want)

Disable buttons while scan is running

Keyboard shortcut: Ctrl+C for copy

Icons on buttons

Tooltip help on buttons


Just tell me 👍