package com.td.simple.utils;

import com.td.simple.common.Sequences;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Service
public class NextSequenceService {

    private final MongoOperations mongo;

    public NextSequenceService(MongoOperations mongo) {
        this.mongo = mongo;
    }

    private int getNextSequence(String seqName) {
        return getSequence(seqName, 1);
    }

    private int getSequence(String seqName, int size) {
        Query query = query(where("_id").is(seqName));

        Update update = new Update();

        update.inc("seq", size);

        Sequences counter =
                mongo.findAndModify(query, update, options().returnNew(true).upsert(true), Sequences.class);

        return counter.getSeq();
    }

    /**
     * Kiểm tra xem mã nhân viên này đã có bao nhiêu người trùng
     */
    public int getCountEmployeesCodeHrm(String employeeCode) {
        Query query = query(where("_id").is("employee_" + employeeCode));

        Sequences sequences = mongo.findOne(query, Sequences.class);

        return sequences != null ? sequences.getSeq() : 0;
    }

    public int incCountEmployeeCodeHrm(String employeeCode) {
        Query query = query(where("_id").is("employee_" + employeeCode));

        // Loại bỏ các số xấu
        int count = getCountEmployeesCodeHrm(employeeCode);
        int inc = count == 48 || count == 52 ? 2 : 1;

        Update update = new Update();

        update.inc("seq", inc);

        Sequences counter =
                mongo.findAndModify(query, update, options().returnNew(true).upsert(true), Sequences.class);

        assert counter != null;
        return counter.getSeq();
    }

    // str: Ký hiệu code
    // size = 4: B0001, 6: B000001
    public String genCodeCommon(String seqName, String str, int size) {
        return str + String.format("%0" + size + "d", getNextSequence(seqName));
    }
}
