package com.Notes_Summarization.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.net.URI;
import java.net.http.*;
import java.nio.charset.StandardCharsets;
import java.time.Duration;

@Service
public class OpenAiService {

    @Value("${openai.api.key}")
    private String openAiApiKey;

    public String summarize(String input) throws Exception {
        String endpoint = "https://api.openai.com/v1/chat/completions";

        String payload = """
                {
                    "model": "gpt-3.5-turbo",
                    "messages": [
                        { "role": "system", "content": "You are an expert note summarizer. Summarize the text concisely." },
                        { "role": "user", "content": "%s" }
                    ]
                }
                """.formatted(input);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(endpoint))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + openAiApiKey)
                .timeout(Duration.ofSeconds(20))
                .POST(HttpRequest.BodyPublishers.ofString(payload, StandardCharsets.UTF_8))
                .build();

        HttpClient client = HttpClient.newHttpClient();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        String fullResponse = response.body();
        // Optional: parse properly with Jackson or minimal parse below:
        String result = fullResponse.split("\"content\":\"")[1].split("\"")[0].replace("\\n", "\n");

        return result;
    }
}
