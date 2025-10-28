{
    "requestType": "CREATE",
    "requestorUserId": "1015698",
    "requestPayload": "{\"roleName\":\"This Role\",\"description\":\"This is demo role\",\"selectedPermissions\":[{\"id\":16,\"title\":\"State Master\",\"icon\":\"Domain\",\"order\":16},{\"id\":10,\"title\":\"Branch Requests\",\"icon\":\"AssuredWorkload\",\"order\":10},{\"id\":23,\"title\":\"Role Management Requests\",\"icon\":\"Badge\",\"order\":23},{\"id\":25,\"title\":\"Process Status\",\"icon\":\"Memory\",\"order\":25},{\"id\":12,\"title\":\"User Management\",\"icon\":\"User\",\"order\":12}]}"
}


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonExtractExample {
    public static void main(String[] args) throws Exception {
        String json = "{\n" +
                "    \"requestType\": \"CREATE\",\n" +
                "    \"requestorUserId\": \"1015698\",\n" +
                "    \"requestPayload\": \"{\\\"roleName\\\":\\\"This Role\\\",\\\"description\\\":\\\"This is demo role\\\",\\\"selectedPermissions\\\":[{\\\"id\\\":16,\\\"title\\\":\\\"State Master\\\",\\\"icon\\\":\\\"Domain\\\",\\\"order\\\":16},{\\\"id\\\":10,\\\"title\\\":\\\"Branch Requests\\\",\\\"icon\\\":\\\"AssuredWorkload\\\",\\\"order\\\":10},{\\\"id\\\":23,\\\"title\\\":\\\"Role Management Requests\\\",\\\"icon\\\":\\\"Badge\\\",\\\"order\\\":23},{\\\"id\\\":25,\\\"title\\\":\\\"Process Status\\\",\\\"icon\\\":\\\"Memory\\\",\\\"order\\\":25},{\\\"id\\\":12,\\\"title\\\":\\\"User Management\\\",\\\"icon\\\":\\\"User\\\",\\\"order\\\":12}]}\"\n" +
                "}";

        ObjectMapper mapper = new ObjectMapper();

        // 1. Parse outer JSON
        JsonNode rootNode = mapper.readTree(json);

        // 2. Get requestPayload as a string
        String payloadString = rootNode.get("requestPayload").asText();

        // 3. Parse the inner JSON
        JsonNode payloadNode = mapper.readTree(payloadString);

        // 4. Extract fields
        String roleName = payloadNode.get("roleName").asText();
        String description = payloadNode.get("description").asText();

        System.out.println("Role Name: " + roleName);
        System.out.println("Description: " + description);

        // 5. Loop over array
        JsonNode permissionsArray = payloadNode.get("selectedPermissions");
        for (JsonNode permission : permissionsArray) {
            int id = permission.get("id").asInt();
            String title = permission.get("title").asText();
            System.out.println("Permission ID: " + id + ", Title: " + title);
        }
    }
}



import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class ParsePayloadOnly {
    public static void main(String[] args) throws Exception {
        String payloadString = "{\n" +
                "  \"roleName\": \"This Role\",\n" +
                "  \"description\": \"This is demo role\",\n" +
                "  \"selectedPermissions\": [\n" +
                "    { \"id\": 16, \"title\": \"State Master\", \"icon\": \"Domain\", \"order\": 16 },\n" +
                "    { \"id\": 10, \"title\": \"Branch Requests\", \"icon\": \"AssuredWorkload\", \"order\": 10 },\n" +
                "    { \"id\": 23, \"title\": \"Role Management Requests\", \"icon\": \"Badge\", \"order\": 23 },\n" +
                "    { \"id\": 25, \"title\": \"Process Status\", \"icon\": \"Memory\", \"order\": 25 },\n" +
                "    { \"id\": 12, \"title\": \"User Management\", \"icon\": \"User\", \"order\": 12 }\n" +
                "  ]\n" +
                "}";

        ObjectMapper mapper = new ObjectMapper();

        // Parse the JSON string
        JsonNode payloadNode = mapper.readTree(payloadString);

        // Extract simple fields
        String roleName = payloadNode.get("roleName").asText();
        String description = payloadNode.get("description").asText();

        System.out.println("Role Name: " + roleName);
        System.out.println("Description: " + description);

        // Extract array elements
        JsonNode permissions = payloadNode.get("selectedPermissions");
        for (JsonNode permission : permissions) {
            int id = permission.get("id").asInt();
            String title = permission.get("title").asText();
            String icon = permission.get("icon").asText();
            int order = permission.get("order").asInt();
            System.out.println("ID: " + id + ", Title: " + title + ", Icon: " + icon + ", Order: " + order);
        }
    }
}