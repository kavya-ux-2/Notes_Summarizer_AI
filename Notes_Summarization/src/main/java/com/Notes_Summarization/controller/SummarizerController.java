package com.Notes_Summarization.controller;

import com.Notes_Summarization.dto.SummarizeRequest;
import com.Notes_Summarization.dto.SummarizeResponse;
import com.Notes_Summarization.service.OpenAiService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allow frontend to call this
public class SummarizerController {

    private final OpenAiService openAiService;

    public SummarizerController(OpenAiService openAiService) {
        this.openAiService = openAiService;
    }

    @PostMapping("/summarize")
    public SummarizeResponse summarize(@RequestBody SummarizeRequest request) throws Exception {
        String summary = openAiService.summarize(request.getContent());
        return new SummarizeResponse(summary);
    }
}
