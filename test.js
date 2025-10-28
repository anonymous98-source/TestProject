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