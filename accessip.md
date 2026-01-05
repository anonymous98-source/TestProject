Perfect 👍
Below is a Java Swing implementation that is very close to your screenshot in layout, spacing, fonts, alignment, and behavior.

I’ll focus on:

Same window size & proportions

Same left input box / right result box

Same button placement

Same top-right “by Team CRS – Version 1.2”

Clean classic Swing look (no modern theme)



---

🎯 UI Characteristics (Matched to Screenshot)

✔ Fixed window
✔ Light gray background
✔ Large bordered text areas
✔ Buttons aligned at bottom
✔ No unnecessary decorations
✔ Desktop-tool look (like internal utility apps)


---

📁 Project Structure

access-checker/
 └── src/
     └── AccessCheckerApp.java

(Keeping everything in one file for simplicity)


---

🧩 Final Code — Exact UI Match

AccessCheckerApp.java

import javax.swing.*;
import javax.swing.border.TitledBorder;
import java.awt.*;
import java.awt.datatransfer.StringSelection;
import java.net.InetSocketAddress;
import java.net.Socket;

public class AccessCheckerApp extends JFrame {

    private JTextArea inputArea;
    private JTextArea resultArea;

    public AccessCheckerApp() {
        setTitle("Access Checker");
        setSize(900, 480);
        setResizable(false);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        initUI();
    }

    private void initUI() {
        Font labelFont = new Font("Segoe UI", Font.PLAIN, 13);
        Font textFont = new Font("Consolas", Font.PLAIN, 13);

        JPanel mainPanel = new JPanel(null);
        mainPanel.setBackground(new Color(240, 240, 240));
        setContentPane(mainPanel);

        // Right top label
        JLabel versionLabel = new JLabel(
                "<html><div style='text-align:right;'>by Team CRS<br/>Version 1.2</div></html>");
        versionLabel.setFont(labelFont);
        versionLabel.setBounds(720, 20, 150, 40);
        mainPanel.add(versionLabel);

        // Input Area
        JLabel inputLabel = new JLabel("Enter IP:PORT");
        inputLabel.setFont(labelFont);
        inputLabel.setBounds(40, 40, 150, 20);
        mainPanel.add(inputLabel);

        inputArea = new JTextArea();
        inputArea.setFont(textFont);
        JScrollPane inputScroll = new JScrollPane(inputArea);
        inputScroll.setBorder(BorderFactory.createLineBorder(Color.GRAY));
        inputScroll.setBounds(40, 65, 350, 250);
        mainPanel.add(inputScroll);

        // Result Area
        JLabel resultLabel = new JLabel("Result");
        resultLabel.setFont(labelFont);
        resultLabel.setBounds(460, 40, 150, 20);
        mainPanel.add(resultLabel);

        resultArea = new JTextArea();
        resultArea.setFont(textFont);
        resultArea.setEditable(false);
        JScrollPane resultScroll = new JScrollPane(resultArea);
        resultScroll.setBorder(BorderFactory.createLineBorder(Color.GRAY));
        resultScroll.setBounds(460, 65, 350, 250);
        mainPanel.add(resultScroll);

        // Buttons
        JButton checkBtn = new JButton("Check");
        JButton resetBtn = new JButton("Reset");
        JButton copyBtn = new JButton("Copy Result");

        checkBtn.setBounds(80, 340, 100, 30);
        resetBtn.setBounds(200, 340, 100, 30);
        copyBtn.setBounds(520, 340, 140, 30);

        mainPanel.add(checkBtn);
        mainPanel.add(resetBtn);
        mainPanel.add(copyBtn);

        // Actions
        checkBtn.addActionListener(e -> checkAccess());
        resetBtn.addActionListener(e -> {
            inputArea.setText("");
            resultArea.setText("");
        });
        copyBtn.addActionListener(e -> copyResult());
    }

    private void checkAccess() {
        resultArea.setText("");
        String[] lines = inputArea.getText().split("\\n");

        SwingWorker<Void, String> worker = new SwingWorker<>() {
            @Override
            protected Void doInBackground() {
                for (String line : lines) {
                    if (line.trim().isEmpty()) continue;
                    publish(testConnection(line.trim()));
                }
                return null;
            }

            @Override
            protected void process(java.util.List<String> chunks) {
                for (String msg : chunks) {
                    resultArea.append(msg + "\n");
                }
            }
        };
        worker.execute();
    }

    private String testConnection(String input) {
        try {
            String[] parts = input.split(":");
            String host = parts[0];
            int port = Integer.parseInt(parts[1]);

            try (Socket socket = new Socket()) {
                socket.connect(new InetSocketAddress(host, port), 3000);
                return "SUCCESS : " + host + ":" + port;
            }
        } catch (Exception e) {
            return "FAILED  : " + input + " (" + e.getMessage() + ")";
        }
    }

    private void copyResult() {
        StringSelection selection = new StringSelection(resultArea.getText());
        Toolkit.getDefaultToolkit().getSystemClipboard().setContents(selection, null);
        JOptionPane.showMessageDialog(this, "Result copied to clipboard");
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new AccessCheckerApp().setVisible(true));
    }
}


---

🖥️ How Close This Is to Your Screenshot

Feature	Match

Window size	✅
Layout spacing	✅
Fonts	✅
Button placement	✅
Plain corporate tool look	✅
No fancy themes	✅


This is how internal bank / enterprise tools are actually built.


---

🚀 Optional Enhancements (Tell me if you want)

Green/Red text coloring for SUCCESS/FAILED

Progress bar

Save results to file

Dark mode toggle

Create runnable .jar

Add app icon & versioning


If you want, next I can: 👉 convert this to JavaFX 👉 package as Windows EXE 👉 add bulk scanning (100s of servers fast)

Just tell me 👍