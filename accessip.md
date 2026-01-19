public class FileHashGenerator extends JFrame {

    private JTextField fileField;
    private JComboBox<HashAlgorithm> algoBox;
    private JTextArea resultArea;
    private JProgressBar progressBar;
    private File selectedFile;

    public FileHashGenerator() {
        setTitle("File Hash Generator");
        setSize(650, 420);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(EXIT_ON_CLOSE);

        initUI();
    }

    private void initUI() {
        JPanel root = new JPanel(new BorderLayout(15, 15));
        root.setBorder(new EmptyBorder(15, 15, 15, 15));
        setContentPane(root);

        JPanel filePanel = new JPanel(new BorderLayout(10, 10));
        fileField = new JTextField();
        fileField.setEditable(false);

        JButton browseBtn = new JButton("Browse");
        browseBtn.addActionListener(e -> chooseFile());

        filePanel.add(fileField, BorderLayout.CENTER);
        filePanel.add(browseBtn, BorderLayout.EAST);

        root.add(filePanel, BorderLayout.NORTH);

        JPanel centerPanel = new JPanel();
        centerPanel.setLayout(new BoxLayout(centerPanel, BoxLayout.Y_AXIS));
        centerPanel.setBorder(new EmptyBorder(10, 0, 10, 0));

        JPanel algoPanel = new JPanel(new FlowLayout(FlowLayout.LEFT, 15, 5));
        algoBox = new JComboBox<>(HashAlgorithm.values());

        JButton generateBtn = new JButton("Generate Hash");
        generateBtn.addActionListener(e -> generateHash());

        algoPanel.add(new JLabel("Algorithm:"));
        algoPanel.add(algoBox);
        algoPanel.add(generateBtn);

        centerPanel.add(algoPanel);
        centerPanel.add(Box.createVerticalStrut(10));

        resultArea = new JTextArea(4, 40);
        resultArea.setEditable(false);
        resultArea.setLineWrap(true);
        resultArea.setWrapStyleWord(true);

        JScrollPane resultScroll = new JScrollPane(resultArea);
        resultScroll.setBorder(
                BorderFactory.createTitledBorder("Result Hash")
        );

        centerPanel.add(resultScroll);
        centerPanel.add(Box.createVerticalStrut(15));

        progressBar = new JProgressBar(0, 100);
        progressBar.setStringPainted(true);
        centerPanel.add(progressBar);

        root.add(centerPanel, BorderLayout.CENTER);

        JPanel bottomPanel = new JPanel(new BorderLayout(10, 10));

        JButton copyBtn = new JButton("Copy to Clipboard");
        copyBtn.addActionListener(e -> copyHash());

        JLabel footer = new JLabel("© rugved.dev");
        footer.setForeground(Color.GRAY);

        bottomPanel.add(copyBtn, BorderLayout.WEST);
        bottomPanel.add(footer, BorderLayout.EAST);

        root.add(bottomPanel, BorderLayout.SOUTH);
    }

    private void chooseFile() {
        JFileChooser chooser = new JFileChooser();
        if (chooser.showOpenDialog(this) == JFileChooser.APPROVE_OPTION) {
            selectedFile = chooser.getSelectedFile();
            fileField.setText(selectedFile.getAbsolutePath());
        }
    }

    private void generateHash() {
        if (selectedFile == null) {
            JOptionPane.showMessageDialog(this, "Please select a file.");
            return;
        }

        resultArea.setText("");
        progressBar.setValue(0);

        SwingWorker<String, Integer> worker = new SwingWorker<>() {
            @Override
            protected String doInBackground() throws Exception {
                return HashService.generateHash(
                        selectedFile,
                        ((HashAlgorithm) algoBox.getSelectedItem()).getAlgorithm(),
                        this::setProgress
                );
            }

            @Override
            protected void done() {
                try {
                    // System.out.println("Selected Algo :: " + algoBox.getSelectedItem());
                    System.out.println("Generated Hash :: " + get());
                    resultArea.setText(algoBox.getSelectedItem() + " : " + get());
                } catch (Exception e) {
                    JOptionPane.showMessageDialog(
                            FileHashGenerator.this,
                            "Error: " + e.getMessage()
                    );
                }
            }
        };

        worker.addPropertyChangeListener(evt -> {
            if ("progress".equals(evt.getPropertyName())) {
                progressBar.setValue((Integer) evt.getNewValue());
            }
        });

        worker.execute();
    }

    private void copyHash() {
        if (!resultArea.getText().isEmpty()) {
            Toolkit.getDefaultToolkit()
                    .getSystemClipboard()
                    .setContents(
                            new StringSelection(resultArea.getText()),
                            null
                    );
        }
    }
}
