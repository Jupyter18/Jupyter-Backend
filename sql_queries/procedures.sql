DROP PROCEDURE IF EXISTS `add_employee`;

DELIMITER $$
CREATE PROCEDURE `add_employee`(
	first_name varchar(15), last_name varchar(15),
	birth_date date ,marital_status varchar(10),  email varchar(45), gender varchar(2) , 
    job_title_id int , pay_grade_id int, employment_status_id int, department_id int, branch_id int,
    is_supervisor boolean, supervisor_id varchar(10) , contact_no char(10)
)
BEGIN
	START TRANSACTION;
		INSERT INTO employee_data (first_name, last_name,birth_date,marital_status,email, gender, 
        job_title_id, pay_grade_id, employment_status_id, department_id, branch_id,is_supervisor, supervisor_id)
        VALUES (first_name, last_name,birth_date,marital_status,email, gender, 
        job_title_id, pay_grade_id, employment_status_id, department_id, branch_id,is_supervisor, supervisor_id);
	
        INSERT INTO employee_contact(phone_number, emp_id) VALUES (contact_no,last_insert_id());
		
        IF gender = "M" THEN
			INSERT INTO leave_summary(emp_id,leave_type_id,leave_count) VALUES (last_insert_id(),1,0),(last_insert_id(),2,0),(last_insert_id(),4,0);
		ELSE
			INSERT INTO leave_summary(emp_id,leave_type_id,leave_count) VALUES (last_insert_id(),1,0),(last_insert_id(),2,0),(last_insert_id(),3,0),(last_insert_id(),4,0);
		END IF;
        select emp_id, email,  FLOOR(RAND()*(100000-10000)+10000) as pass from employee_data where emp_id=last_insert_id(); 
    COMMIT;

END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS GetAllEmp_branch;
DELIMITER //
CREATE PROCEDURE GetAllEmp_branch(IN id INT)
	BEGIN
		select emp_id, first_name,last_name,birth_date,marital_status,email,gender,job_name,pay_level,category,department_name,branch_name,is_supervisor,supervisor_id 
		from employee_data
        inner join job_title using(job_title_id) 
        inner join pay_grade using(pay_grade_id) 
        inner join employment_status using(employment_status_id) 
		inner join department using(department_id) 
        inner join branch using (branch_id) 
        WHERE branch_id=id AND is_deleted = 0;
	END//
DELIMITER ;

DROP PROCEDURE IF EXISTS GetEmp_profile;
DELIMITER //
CREATE PROCEDURE GetEmp_profile(IN empid INT)
	BEGIN
		select emp_id, first_name,last_name,birth_date,marital_status,email,gender,job_name,pay_level,category,department_name,branch_name,is_supervisor,supervisor_id 
		from employee_data
        inner join job_title using(job_title_id) 
        inner join pay_grade using(pay_grade_id) 
        inner join employment_status using(employment_status_id) 
		inner join department using(department_id) 
        inner join branch using (branch_id) 
        WHERE emp_id=empid;
	END//
DELIMITER ;

DROP PROCEDURE IF EXISTS GetLeaveDetails;
DELIMITER //
CREATE PROCEDURE GetLeaveDetails(IN superId INT)
	BEGIN
		select emp_id, first_name,last_name,leave_application.date,leave_type_id,is_approved,leave_count,leave_amount,email
		from employee_data
        inner join leave_application using(emp_id) 
        inner join paygrade_leave using(pay_grade_id) 
        inner join leave_summary using(emp_id) 
        WHERE supervisor_id = superId and is_approved = 0;
	END//
DELIMITER ;