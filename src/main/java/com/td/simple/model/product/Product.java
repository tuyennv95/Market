package com.td.simple.model.product;

import com.td.simple.model.BaseEntity;
import com.td.simple.utils.StringUtils;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "products")
public class Product extends BaseEntity<String> {

    private String id;

    private String code;

    private String name;

    /**
     * Tạo textsearch
     */
    public void makeTextSearch() {
        String textSearch = this.code +
                " " +
                this.name;

        textSearch = textSearch.toLowerCase();
        textSearch = StringUtils.unAccent(textSearch);

        this.setTextSearch(textSearch);
    }
}
