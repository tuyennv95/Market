package com.td.simple.common;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "system_sequences")
@Data
public class Sequences {

    @Id
    private String id;

//    @Indexed
//    private String tenant;

    private String group;

    private int seq;
}
