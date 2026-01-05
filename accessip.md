Perfect — this is the right fix 👍
Below is clean, production-safe code that removes ICMP completely and replaces it with TCP-based host reachability, which:

❌ Does NOT use InetAddress.isReachable()

❌ Produces NO Java 21 warnings

✅ Works behind corporate firewalls

✅ Works without admin privileges

✅ Gives consistent output



---

✅ Design Change (What we are implementing)

OLD (Problematic)

ICMP Ping  → InetAddress.isReachable()

NEW (Enterprise Safe)

Host Reachability → TCP connect to common ports

Ports used (in order):

443 → 80 → 22

If any one succeeds, host is reachable.


---

1️⃣ Updated NetworkChecker.java (FINAL)

package com.accesschecker;

import java.net.InetSocketAddress;
import java.net.Socket;

public class NetworkChecker {

    private static final int[] COMMON_PORTS = {443, 80, 22};

    /**
     * TCP-based host reachability check
     * Replaces ICMP ping completely
     */
    public static Result hostReachable(String host, int timeout) {
        for (int port : COMMON_PORTS) {
            try (Socket socket = new Socket()) {
                socket.connect(new InetSocketAddress(host, port), timeout);
                return new Result(
                        host,
                        true,
                        "HOST REACHABLE (TCP " + port + ")"
                );
            } catch (Exception ignored) {
                // try next port
            }
        }

        return new Result(
                host,
                false,
                "HOST UNREACHABLE (TCP 443/80/22)"
        );
    }

    /**
     * TCP Port check (unchanged)
     */
    public static Result tcp(String host, int port, int timeout) {
        try (Socket socket = new Socket()) {
            socket.connect(new InetSocketAddress(host, port), timeout);
            return new Result(
                    host + ":" + port,
                    true,
                    "PORT OPEN"
            );
        } catch (Exception e) {
            return new Result(
                    host + ":" + port,
                    false,
                    e.getMessage()
            );
        }
    }
}


---

2️⃣ UI Change (Radio Button Text)

Replace this:

pingBtn = new JRadioButton("ICMP Ping", true);

With this:

pingBtn = new JRadioButton("Host Reachability (TCP)", true);

(No behavior change for TCP Port radio button)


---

3️⃣ Update runChecks() Method (IMPORTANT)

Replace this block:

if (pingBtn.isSelected()) {
    r = NetworkChecker.ping(line.trim(), timeout);
}

With this:

if (pingBtn.isSelected()) {
    r = NetworkChecker.hostReachable(line.trim(), timeout);
}


---

4️⃣ Final runChecks() Method (Corrected)

private void runChecks() {
    results.clear();
    resultPane.setText("");
    progressBar.setValue(0);

    String[] lines = inputArea.getText().split("\\n");
    int timeout = Integer.parseInt(timeoutField.getText());

    SwingWorker<Void, Result> worker = new SwingWorker<>() {

        @Override
        protected Void doInBackground() {
            progressBar.setMaximum(lines.length);
            int count = 0;

            for (String line : lines) {
                if (line.isBlank()) continue;

                Result r;
                if (pingBtn.isSelected()) {
                    r = NetworkChecker.hostReachable(line.trim(), timeout);
                } else {
                    String[] p = line.trim().split(":");
                    r = NetworkChecker.tcp(
                            p[0],
                            Integer.parseInt(p[1]),
                            timeout
                    );
                }

                publish(r);
                progressBar.setValue(++count);
            }
            return null;
        }

        @Override
        protected void process(java.util.List<Result> chunks) {
            for (Result r : chunks) {
                results.add(r);
                appendColored(r);
            }
        }
    };

    worker.execute();
}


---

5️⃣ Result After This Change

✔ No JDK warnings
✔ Consistent output
✔ Works on Windows / Linux / Corporate VPN
✔ No admin rights needed
✔ Interview-safe explanation


---

🧠 How to Explain This Change (Very Important)

Say this:

> “ICMP ping is unreliable in enterprise environments due to firewall restrictions and Java’s deprecated native access. So I replaced it with TCP-based reachability checks on standard ports like 443 and 80, which gives consistent and production-safe results.”



That is exactly what senior engineers expect.


---

If you want next:

Multi-threaded scanning (10x faster)

Cancel button

Timeout validation

Auto-detect best port per host

Tooltips explaining failures


Just tell me 👍