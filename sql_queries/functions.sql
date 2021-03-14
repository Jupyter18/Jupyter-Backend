use jupiterdb;
DROP FUNCTION IF EXISTS leave_insert;
DELIMITER //

CREATE FUNCTION `leave_insert`(empid INT , l_date DATE , leave_id int) RETURNS VARCHAR(50)
    DETERMINISTIC
BEGIN
		DECLARE pay INT;
        DECLARE max_leave INT;
        DECLARE taken INT;
        DECLARE applied INT;
        SELECT pay_grade_id INTO pay FROM employee_data WHERE emp_id=empid;
		SELECT leave_amount INTO max_leave FROM paygrade_leave WHERE leave_type_id = leave_id AND pay_grade_id = pay;
        SELECT count(*)  INTO taken FROM leave_application WHERE leave_type_id = leave_id AND emp_id = empid AND is_approved= 1;
        SELECT count(*)  INTO applied FROM leave_application WHERE leave_type_id = leave_id AND emp_id = empid AND is_approved is NULL AND leave_date >= curdate();
		IF (max_leave <= (taken+applied)) THEN
			Return "Alloweed Leave Count exceeded";
		END IF;
		INSERT INTO `leave_application` (emp_id,leave_date,leave_type_id) VALUES (empid, l_date,leave_id);
		RETURN "SUCESSFUL";
END //
DELIMITER ;
