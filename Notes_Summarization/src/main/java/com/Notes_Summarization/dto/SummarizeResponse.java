package com.Notes_Summarization.dto;



public class SummarizeResponse {
    private String summary;

    public SummarizeResponse(String summary) {
        this.summary = summary;
    }

    public String getSummary() {
        return summary;
    }
}
