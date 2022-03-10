package com.td.simple.model_dto.category;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Data
@NoArgsConstructor
public class CategoryViewDto implements Serializable {

    private String code;

    private String name;

    // Các loại của danh mục
    @ApiModelProperty(notes = "Chưa cần quan tâm")
    private Set<String> modes = new HashSet<>();

    // theo thứ tự ưu tiên giảm dần
    @ApiModelProperty(notes = "theo thứ tự ưu tiên, to đến nhỏ")
    private long orderNo;

    // Cấp level của danh mục.
    @ApiModelProperty(notes = "Cấp của danh mục, tính từ 0")
    private int level;

    // Danh mục cha
    @ApiModelProperty(notes = "Mã danh mục cha")
    private String parentCode;

    // Đường dẫn từ Root
    @ApiModelProperty(notes = "Chưa cần quan tâm")
    private String codePath;

    // Danh sách mã danh mục cha bên trên.
    @ApiModelProperty(notes = "Chưa cần quan tâm")
    private Set<String> ancestorsCodes = new HashSet<>();

    // Số danh mục con trực tiếp của phòng ban này.
    @ApiModelProperty(notes = "Số lượng con")
    private long childrenNo;

    @ApiModelProperty(notes = "Dữ liệu custom gì đó muốn truyền vào")
    private Map<String, Object> data;

    private String note;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private LocalDateTime createdDate;

    private String createdBy;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private LocalDateTime lastModifiedDate;

    private String lastModifiedBy;
}
