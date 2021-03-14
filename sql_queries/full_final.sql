DROP SCHEMA IF EXISTS `jupiterdb`;
create schema jupiterdb;
use jupiterdb;

DROP TABLE IF EXISTS `basic_settings`;

CREATE TABLE `basic_settings` (
  `reg_num` int NOT NULL,
  `name` varchar(20) NOT NULL,
  `address` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`reg_num`)
);

DROP TABLE IF EXISTS `branch`;

CREATE TABLE `branch` (
  `branch_id` int NOT NULL AUTO_INCREMENT,
  `branch_name` varchar(25) NOT NULL,
  PRIMARY KEY (`branch_id`),
  UNIQUE KEY `branch_name_UNIQUE` (`branch_name`)
);

DROP TABLE IF EXISTS `department`;

CREATE TABLE `department` (
  `department_id` int NOT NULL AUTO_INCREMENT,
  `department_name` varchar(25) NOT NULL,
  PRIMARY KEY (`department_id`),
  UNIQUE KEY `department_name_UNIQUE` (`department_name`)
);

DROP TABLE IF EXISTS `employment_status`;

CREATE TABLE `employment_status` (
  `employment_status_id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(50) NOT NULL,
  PRIMARY KEY (`employment_status_id`),
  UNIQUE KEY `category_UNIQUE` (`category`)
);

DROP TABLE IF EXISTS `job_title`;

CREATE TABLE `job_title` (
  `job_title_id` int NOT NULL AUTO_INCREMENT,
  `job_name` varchar(20) NOT NULL,
  PRIMARY KEY (`job_title_id`),
  UNIQUE KEY `job_name_UNIQUE` (`job_name`)
);

DROP TABLE IF EXISTS `leave_structure`;

CREATE TABLE `leave_structure` (
  `leave_type_id` int NOT NULL AUTO_INCREMENT,
  `leave_type` varchar(15) NOT NULL,
  PRIMARY KEY (`leave_type_id`),
  UNIQUE KEY `leave_type_UNIQUE` (`leave_type`)
);

DROP TABLE IF EXISTS `pay_grade`;

CREATE TABLE `pay_grade` (
  `pay_grade_id` int NOT NULL AUTO_INCREMENT,
  `pay_level` varchar(10) NOT NULL,
  PRIMARY KEY (`pay_grade_id`),
  UNIQUE KEY `pay_level_UNIQUE` (`pay_level`)
);

DROP TABLE IF EXISTS `employee_data`;

CREATE TABLE `employee_data` (
  `emp_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(15) NOT NULL,
  `last_name` varchar(15) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `marital_status` varchar(1) DEFAULT NULL CHECK (marital_status IN ('S','M')),
  `email` varchar(45) NOT NULL,
  `gender` varchar(1) NOT NULL  CHECK (gender IN ('M','F')),
  `job_title_id` int NOT NULL,
  `pay_grade_id` int NOT NULL,
  `employment_status_id` int NOT NULL, -- why default null
  `department_id` int NOT NULL,
  `branch_id` int NOT NULL,
  `is_supervisor` tinyint DEFAULT '0',
  `supervisor_id` int DEFAULT NULL,
  `is_deleted` tinyint DEFAULT '0',
  PRIMARY KEY (`emp_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  FOREIGN KEY (`job_title_id`) REFERENCES `job_title` (`job_title_id`),
  FOREIGN KEY (`pay_grade_id`) REFERENCES `pay_grade` (`pay_grade_id`),
  FOREIGN KEY (`employment_status_id`) REFERENCES `employment_status` (`employment_status_id`),
  FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`),
  FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`),
  FOREIGN KEY (`supervisor_id`) REFERENCES `employee_data` (`emp_id`) -- Should check
);

ALTER TABLE employee_data AUTO_INCREMENT=10000; 
CREATE UNIQUE INDEX mail ON employee_data (email);
CREATE INDEX fname USING BTREE ON employee_data (first_name);
CREATE INDEX superv ON employee_data (supervisor_id);

-- DROP TABLE IF EXISTS `session`;

-- CREATE TABLE `session` (
--   `session_id` varchar(50) NOT NULL,
--   `emp_id` int NOT NULL,
--   `expire_date` datetime NOT NULL,
--   `job_title` varchar(45) DEFAULT NULL,
--   PRIMARY KEY (`session_id`),
--   FOREIGN KEY (`emp_id`) REFERENCES `employee_data` (`emp_id`)
-- );

DROP TABLE IF EXISTS `employee_contact`;

CREATE TABLE `employee_contact` (
  `phone_number` char(10) NOT NULL,
  `emp_id` int NOT NULL,
  PRIMARY KEY (`phone_number`),
  FOREIGN KEY (`emp_id`) REFERENCES `employee_data` (`emp_id`)
);

CREATE INDEX empContact ON employee_contact (emp_id);

DROP TABLE IF EXISTS `paygrade_leave`;

CREATE TABLE `paygrade_leave` (
  `leave_type_id` int NOT NULL,
  `pay_grade_id` int NOT NULL,
  `leave_amount` int NOT NULL,
  PRIMARY KEY (`leave_type_id`,`pay_grade_id`),
  FOREIGN KEY (`pay_grade_id`) REFERENCES `pay_grade` (`pay_grade_id`),
  FOREIGN KEY (`leave_type_id`) REFERENCES `leave_structure` (`leave_type_id`)
);

DROP TABLE IF EXISTS `leave_summary`;

CREATE TABLE `leave_summary` (
  `emp_id` int NOT NULL,
  `leave_type_id` int NOT NULL,
  `leave_count` int DEFAULT 0,
  PRIMARY KEY (`emp_id`,`leave_type_id`),
  FOREIGN KEY (`emp_id`) REFERENCES `employee_data` (`emp_id`),
  FOREIGN KEY (`leave_type_id`) REFERENCES `leave_structure` (`leave_type_id`)
);

DROP TABLE IF EXISTS `leave_application`;

CREATE TABLE `leave_application` (
  `emp_id` int NOT NULL,
  `leave_date` date NOT NULL,
  `leave_type_id` int NOT NULL,
  `is_approved` tinyint DEFAULT NULL CHECK (is_approved IN (0,1,NULL)), -- check 
  PRIMARY KEY (`emp_id`,`leave_date`),
  FOREIGN KEY (`emp_id`) REFERENCES `employee_data` (`emp_id`),
  FOREIGN KEY (`leave_type_id`) REFERENCES `leave_structure` (`leave_type_id`),
  FOREIGN KEY (`emp_id`,`leave_type_id`) REFERENCES `leave_summary`(`emp_id`,`leave_type_id`)
) ;

DROP TABLE IF EXISTS `user_account`;

CREATE TABLE `user_account` (
  `emp_id` int NOT NULL,
  `password` varchar(450) NOT NULL,
  `is_admin` tinyint DEFAULT '0',
  PRIMARY KEY (`emp_id`),
  FOREIGN KEY (`emp_id`) REFERENCES `employee_data` (`emp_id`)
);

DROP TABLE IF EXISTS `custom_attribute`;

CREATE TABLE `custom_attribute` (
  `emp_id` int NOT NULL,
  `nationality` varchar(20) DEFAULT NULL,
  FOREIGN KEY (`emp_id`) REFERENCES `employee_data` (`emp_id`)
);

CREATE VIEW present_employee_data AS
SELECT emp_id, first_name, last_name, birth_date, 
marital_status, email, gender, job_title_id, pay_grade_id, 
employment_status_id, department_id, branch_id, is_supervisor, supervisor_id
FROM employee_data WHERE is_deleted = 0;

DROP FUNCTION IF EXISTS checkSuper;
DELIMITER //
CREATE FUNCTION checkSuper(i INT)
RETURNS TINYINT DETERMINISTIC
BEGIN
	DECLARE rtn TINYINT;
	IF EXISTS(SELECT emp_id FROM employee_data WHERE emp_id= i AND is_supervisor = 1) OR i IS NULL THEN 
		SET rtn = 1;
	ELSE
		SET rtn =0;
	END IF;
	RETURN rtn;
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS `add_employee`;

DELIMITER $$
CREATE PROCEDURE `add_employee`(
first_name varchar(15), last_name varchar(15),
birth_date date ,marital_status varchar(10),  email varchar(45), gender varchar(2) , 
     job_title_id int , pay_grade_id int, employment_status_id int, department_id int, branch_id int,
    is_supervisor boolean, supervisor_id int , contact_no char(10)
)
add_label : BEGIN
 	START TRANSACTION;
 		IF checkSuper(supervisor_id) = 1 THEN
 			INSERT INTO employee_data (first_name, last_name,birth_date,marital_status,email, gender, 
 			job_title_id, pay_grade_id, employment_status_id, department_id, branch_id,is_supervisor, supervisor_id)
 			VALUES (first_name, last_name,birth_date,marital_status,email, gender, 
 			job_title_id, pay_grade_id, employment_status_id, department_id, branch_id,is_supervisor, supervisor_id);
 		ELSE
 			SELECT supervisor_id AS errorSupervisor FROM employee_data WHERE emp_id = supervisor_id;
 			LEAVE add_label;
    END IF;
         INSERT INTO employee_contact(phone_number, emp_id) VALUES (contact_no,last_insert_id());
         INSERT INTO custom_attribute(emp_id) VALUES (last_insert_id());
 		
    IF gender = "M" THEN
 			INSERT INTO leave_summary(emp_id,leave_type_id,leave_count) VALUES (last_insert_id(),1,0),(last_insert_id(),2,0),(last_insert_id(),4,0);
 		ELSE
 			INSERT INTO leave_summary(emp_id,leave_type_id,leave_count) VALUES (last_insert_id(),1,0),(last_insert_id(),2,0),(last_insert_id(),3,0),(last_insert_id(),4,0);
 		END IF;
         select emp_id, email from employee_data where emp_id=last_insert_id(); 
     COMMIT;

 END $$
 DELIMITER ;


DROP TRIGGER IF EXISTS after_leave_approved;

DELIMITER $$

CREATE TRIGGER after_leave_approved
AFTER UPDATE
ON `leave_application`
FOR EACH ROW
BEGIN
	IF NEW.is_approved = 1 THEN
		UPDATE leave_summary SET leave_count= leave_count + 1
		WHERE emp_id = NEW.emp_id and leave_type_id = NEW.leave_type_id;
	END IF;
END$$

DELIMITER ;

DROP PROCEDURE IF EXISTS GetEmp_profile;
DELIMITER //
CREATE PROCEDURE GetEmp_profile(IN empid INT)
	BEGIN
		SELECT emp_id, first_name,last_name,birth_date,marital_status,email,gender,job_name,pay_level,category,department_name,branch_name,is_supervisor,supervisor_id, custom_attribute.*
		FROM employee_data
        INNER JOIN job_title USING (job_title_id) 
        INNER JOIN pay_grade USING(pay_grade_id) 
        INNER JOIN employment_status USING (employment_status_id) 
		INNER JOIN department USING (department_id) 
        INNER JOIN branch USING (branch_id) 
        LEFT JOIN custom_attribute USING (emp_id)
        WHERE emp_id=empid;
	END//
DELIMITER ;

DROP PROCEDURE IF EXISTS GetAllEmp_branch;
DELIMITER //
CREATE PROCEDURE GetAllEmp_branch(IN id INT)
	BEGIN
		SELECT emp_id, first_name,last_name,birth_date,marital_status,email,gender,job_name,pay_level,category,department_name,branch_name,is_supervisor,supervisor_id 
		FROM employee_data
        INNER JOIN job_title USING (job_title_id) 
        INNER JOIN pay_grade USING (pay_grade_id) 
        INNER JOIN employment_status USING (employment_status_id) 
		INNER JOIN department USING (department_id) 
        INNER JOIN branch USING (branch_id) 
        WHERE branch_id=id AND is_deleted = 0;
	END//
DELIMITER ;

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
        SELECT leave_count  INTO taken FROM leave_summary WHERE leave_type_id = leave_id AND emp_id = empid;
        SELECT count(*)  INTO applied FROM leave_application WHERE leave_type_id = leave_id AND emp_id = empid AND is_approved is NULL AND leave_date >= curdate();
		IF (max_leave <= (taken+applied)) THEN
			Return "Alloweed Leave Count exceeded";
		END IF;
		INSERT INTO `leave_application` (emp_id,leave_date,leave_type_id) VALUES (empid, l_date,leave_id);
		RETURN "SUCESSFUL";
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS GetLeaveDetails;
DELIMITER //
CREATE PROCEDURE GetLeaveDetails(IN superId INT)
	BEGIN
		SELECT *
		FROM leave_application
        INNER JOIN employee_data USING (emp_id) 
        INNER JOIN paygrade_leave USING (pay_grade_id,leave_type_id) 
        INNER JOIN leave_summary USING (emp_id,leave_type_id) 
        WHERE supervisor_id = superId AND is_approved IS NULL;
	END//
DELIMITER ;

DROP USER IF EXISTS 'juser'@'localhost';
CREATE USER 'juser'@'localhost' IDENTIFIED BY 'user123';
ALTER USER 'juser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'user123';

DROP USER IF EXISTS 'jadmin'@'localhost';
CREATE USER 'jadmin'@'localhost' IDENTIFIED BY 'admin123';
ALTER USER 'jadmin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin123';

DROP USER IF EXISTS 'jsuper'@'localhost';
CREATE USER 'jsuper'@'localhost' IDENTIFIED BY 'super123';
ALTER USER 'jsuper'@'localhost' IDENTIFIED WITH mysql_native_password BY 'super123';

DROP USER IF EXISTS 'jemp'@'localhost';
CREATE USER 'jemp'@'localhost' IDENTIFIED BY 'emp123';
ALTER USER 'jemp'@'localhost' IDENTIFIED WITH mysql_native_password BY 'emp123';

DROP USER IF EXISTS 'jhrm'@'localhost';
CREATE USER 'jhrm'@'localhost' IDENTIFIED BY 'hrm123';
ALTER USER 'jhrm'@'localhost' IDENTIFIED WITH mysql_native_password BY 'hrm123';

GRANT SELECT ON jupiterdb.branch TO 'jemp'@'localhost', 'jhrm'@'localhost', 'jsuper'@'localhost', 'jadmin'@'localhost' ;
GRANT INSERT,DELETE ON jupiterdb.branch TO 'jadmin'@'localhost';

GRANT SELECT ON jupiterdb.job_title TO 'jemp'@'localhost', 'jhrm'@'localhost', 'jsuper'@'localhost', 'jadmin'@'localhost' ;
GRANT INSERT,DELETE ON jupiterdb.job_title TO 'jadmin'@'localhost';

GRANT SELECT ON jupiterdb.employment_status  TO 'jemp'@'localhost', 'jhrm'@'localhost', 'jsuper'@'localhost', 'jadmin'@'localhost' ;
GRANT INSERT,DELETE ON jupiterdb.employment_status TO 'jadmin'@'localhost';

GRANT SELECT ON jupiterdb.department TO 'jemp'@'localhost', 'jhrm'@'localhost', 'jsuper'@'localhost', 'jadmin'@'localhost' ;
GRANT INSERT,DELETE ON jupiterdb.department TO 'jadmin'@'localhost';

GRANT SELECT ON jupiterdb.leave_structure TO 'jemp'@'localhost', 'jhrm'@'localhost', 'jsuper'@'localhost', 'jadmin'@'localhost' ;
GRANT INSERT,DELETE ON jupiterdb.leave_structure TO 'jadmin'@'localhost';

GRANT SELECT ON jupiterdb.pay_grade TO 'jemp'@'localhost', 'jhrm'@'localhost', 'jsuper'@'localhost', 'jadmin'@'localhost' ;
GRANT INSERT,DELETE ON jupiterdb.pay_grade TO 'jadmin'@'localhost';

GRANT SELECT ON jupiterdb.paygrade_leave TO 'jemp'@'localhost', 'jhrm'@'localhost', 'jsuper'@'localhost', 'jadmin'@'localhost' ;
GRANT INSERT,DELETE ON jupiterdb.pay_grade TO 'jadmin'@'localhost';

GRANT SELECT ON jupiterdb.employee_contact TO 'jemp'@'localhost', 'jhrm'@'localhost', 'jsuper'@'localhost', 'jadmin'@'localhost' ;
GRANT INSERT, DELETE ON jupiterdb.employee_contact TO  'jhrm'@'localhost', 'jadmin'@'localhost' ;

GRANT SELECT ON jupiterdb.employee_data TO 'jemp'@'localhost', 'jhrm'@'localhost', 'jsuper'@'localhost', 'jadmin'@'localhost' ;
GRANT INSERT, UPDATE ON jupiterdb.employee_data TO 'jhrm'@'localhost', 'jadmin'@'localhost' ;

GRANT SELECT ON jupiterdb.custom_attribute TO 'jemp'@'localhost', 'jhrm'@'localhost', 'jsuper'@'localhost', 'jadmin'@'localhost' ;
GRANT INSERT, UPDATE ON jupiterdb.custom_attribute TO 'jhrm'@'localhost', 'jadmin'@'localhost' ;
GRANT ALTER ON jupiterdb.custom_attribute TO 'jadmin'@'localhost';

GRANT SELECT ON jupiterdb.basic_settings TO 'jadmin'@'localhost';

GRANT SELECT ON jupiterdb.leave_summary TO 'jemp'@'localhost', 'jhrm'@'localhost', 'jsuper'@'localhost', 'jadmin'@'localhost' ;

GRANT SELECT ON jupiterdb.leave_application TO 'jemp'@'localhost', 'jhrm'@'localhost', 'jsuper'@'localhost', 'jadmin'@'localhost' ;
GRANT UPDATE ON jupiterdb.leave_application TO 'jsuper'@'localhost';

GRANT SELECT, INSERT, UPDATE ON jupiterdb.user_account TO 'juser'@'localhost', 'jemp'@'localhost', 'jhrm'@'localhost', 'jsuper'@'localhost', 'jadmin'@'localhost' ;

GRANT SELECT ON jupiterdb.present_employee_data TO 'jemp'@'localhost', 'jhrm'@'localhost', 'jsuper'@'localhost', 'jadmin'@'localhost';

GRANT EXECUTE ON PROCEDURE jupiterdb.GetAllEmp_branch TO 'jadmin'@'localhost';
GRANT EXECUTE ON PROCEDURE jupiterdb.GetLeaveDetails TO 'jsuper'@'localhost';
GRANT EXECUTE ON PROCEDURE jupiterdb.add_employee TO 'jhrm'@'localhost', 'jadmin'@'localhost';
GRANT EXECUTE ON PROCEDURE jupiterdb.GetEmp_profile TO 'jemp'@'localhost', 'jhrm'@'localhost', 'jsuper'@'localhost', 'jadmin'@'localhost' ;
GRANT EXECUTE ON FUNCTION jupiterdb.leave_insert TO 'jemp'@'localhost', 'jhrm'@'localhost', 'jsuper'@'localhost', 'jadmin'@'localhost' ;


INSERT INTO `basic_settings` VALUES (1000,'Jupiter Apparel','Jupiter, Head Office, Union Place, Colombo, Sri Lanka');

INSERT INTO `branch` VALUES (3,'Bangladesh'),(2,'Pakistan'),(1,'Sri Lanka');

INSERT INTO `department` VALUES (2,'Finance_Department'),(1,'HR_Department');
INSERT INTO `department` (department_name) VALUES ('Software_Department');

INSERT INTO `employment_status` VALUES (3,'Contract-Fulltime'),(4,'Contract-Parttime'),(6,'Freelance'),(1,'Intern-Fulltime'),(2,'Intern-Parttime'),(5,'Permanent');

INSERT INTO `job_title` VALUES (2,'Accountant'),(1,'HR_Manager'),(4,'QA_Engineer'),(3,'Software_Engineer');

INSERT INTO `leave_structure` VALUES (1,'Annual'),(2,'Casual'),(3,'Maternity'),(4,'No-Pay');

INSERT INTO `pay_grade` VALUES (1,'Level_1'),(2,'Level_2'),(3,'Level_3');

INSERT INTO `paygrade_leave` VALUES (1,1,40),(2,1,20),(3,1,80),(4,1,50),(1,2,30),(2,2,20),(3,2,80),(4,2,50),(1,3,38),(2,3,32),(3,3,80),(4,3,50);

call add_employee('Nimal', 'Perera', '1997-10-09', 'M', 'ksrassignment@gmail.com', 'M', 1, 1, 5, 1, 1,0 , NULL,'0778764323');
call add_employee('Roshinie', 'Jayasndara', '1997-09-09', 'S', 'roshini@gmail.com', 'F', 1, 1, 5, 1, 1,0 , NULL, '0776765456');
call add_employee('Sunil', 'Perera', '1978-10-09', 'M', 'sunil@gmail.com', 'M', 2, 2, 5, 2, 1,1 , NULL,'0776767676');
call add_employee('Kumari', 'Perera', '1978-10-09', 'M', 'Kumari@gmail.com', 'F', 3, 1, 5, 3, 1,1 , NULL,'0776767543');
call add_employee('Amali', 'Kure', '1978-10-09', 'S', 'testmailadrs2020@gmail.com', 'F', 3, 1, 2, 3, 1,0 , 10002,'0715656764');
call add_employee('Sunil', 'Jaya', '1990-10-09', 'S', 'isuruariyarathne97@gmail.com', 'M', 2, 1, 2, 2, 1,0 , 10002,'0715656123');
call add_employee('Gayan', 'Kure', '1980-10-09', 'S', 'rnjayasundara97@gmail.com', 'M', 1, 1, 5, 1, 1,1 , 10002,'0715689064');
call add_employee('Jayani', 'Jaya', '1990-06-09', 'S', 'roshinie.18@cse.mrt.ac.lk', 'F', 4, 1, 2, 2, 1,0 , 10003,'0715789764');

INSERT INTO `leave_application` (emp_id,leave_date,leave_type_id) VALUES (10004,'2021-03-03',1);
INSERT INTO `leave_application` (emp_id,leave_date,leave_type_id) VALUES (10004,'2021-03-21',1);
INSERT INTO `leave_application` (emp_id,leave_date,leave_type_id) VALUES (10004,'2021-03-11',2);
INSERT INTO `leave_application` (emp_id,leave_date,leave_type_id) VALUES (10004,'2021-03-29',3);
INSERT INTO `leave_application` (emp_id,leave_date,leave_type_id) VALUES (10004,'2021-03-22',4);
INSERT INTO `leave_application` (emp_id,leave_date,leave_type_id) VALUES (10004,'2021-04-03',1);
INSERT INTO `leave_application` (emp_id,leave_date,leave_type_id) VALUES (10004,'2021-05-21',1);
INSERT INTO `leave_application` (emp_id,leave_date,leave_type_id) VALUES (10004,'2021-06-11',2);
INSERT INTO `leave_application` (emp_id,leave_date,leave_type_id) VALUES (10004,'2021-07-29',3);
INSERT INTO `leave_application` (emp_id,leave_date,leave_type_id) VALUES (10004,'2021-08-22',4);

INSERT INTO `leave_application` (emp_id,leave_date,leave_type_id) VALUES (10005,'2021-03-10',1);
INSERT INTO `leave_application` (emp_id,leave_date,leave_type_id) VALUES (10005,'2021-03-21',4);
INSERT INTO `leave_application` (emp_id,leave_date,leave_type_id) VALUES (10005,'2021-04-03',2);
INSERT INTO `leave_application` (emp_id,leave_date,leave_type_id) VALUES (10005,'2021-04-10',1);
INSERT INTO `leave_application` (emp_id,leave_date,leave_type_id) VALUES (10005,'2021-04-21',4);
INSERT INTO `leave_application` (emp_id,leave_date,leave_type_id) VALUES (10005,'2021-05-03',2);

INSERT INTO `leave_application` (emp_id,leave_date,leave_type_id) VALUES (10007,'2021-03-11',1);
INSERT INTO `leave_application` (emp_id,leave_date,leave_type_id) VALUES (10007,'2021-03-19',2);


INSERT INTO `user_account` VALUE ('10000','$2b$10$rUHk0Ioj.jTbwCMarYHg.uIsM/Ud6Y1mGyEjI39GGSvvMkKSI0lgi','1');
INSERT INTO `user_account` VALUE ('10001', '$2b$10$t16SQLjcb8MfrePcIYUG/OMIDLytZwhtHgHL43s8Vn.mHHzFGoDK6', '0');
INSERT INTO `user_account` VALUE ('10002', '$2b$10$3Blbgc78mCFp1d01a9Bc9ORwGUglgqkHxSaqOTkWABLw9i7j6Ii/q', '0');
INSERT INTO `user_account` VALUE ('10004', '$2b$10$9YR91lr1ruInqy7QvqHmMeZ0Wa.DBebi.Y27tR22RvOIlpF9VnlxO', '0');


update leave_application set is_approved=1 where emp_id=10004 and leave_date="2021-03-03";
update leave_application set is_approved=1 where emp_id=10004 and leave_date="2021-03-11";
update leave_application set is_approved=0 where emp_id=10004 and leave_date="2021-03-22";
update leave_application set is_approved=1 where emp_id=10004 and leave_date="2021-07-29";
update leave_application set is_approved=0 where emp_id=10004 and leave_date="2021-08-22";

update leave_application set is_approved=1 where emp_id=10005 and leave_date="2021-03-10";
update leave_application set is_approved=1 where emp_id=10005 and leave_date="2021-03-21";
update leave_application set is_approved=0 where emp_id=10005 and leave_date="2021-05-03";

-- Reports

DROP procedure IF EXISTS `DeptLeaves`;

DELIMITER $$
USE `jupiterdb`$$
CREATE PROCEDURE `DeptLeaves`(IN id int, IN sdt date, IN edt date)
BEGIN

	select count(*) as Total_count from leave_application left outer join employee_data on leave_application.emp_id = employee_data.emp_id where (employee_data.department_id = id AND leave_application.leave_date < edt AND leave_application.leave_date > sdt AND leave_application.is_approved = 1 AND is_deleted = 0);
    
END$$

DELIMITER ;

DROP procedure IF EXISTS `EmpFetchDept`;

DELIMITER $$
CREATE PROCEDURE `EmpFetchDept`(IN id INT )
BEGIN
	
    select emp_id,first_name,last_name,email,job_name from employee_data left outer join job_title ON (employee_data.job_title_id = job_title.job_title_id) where employee_data.department_id = id AND is_deleted = 0;

END$$

DELIMITER ;

DROP procedure IF EXISTS `EmpFetchGrade`;

DELIMITER $$
CREATE PROCEDURE `EmpFetchGrade`(IN id INT)
BEGIN

	select emp_id,first_name,last_name,email,department_name from employee_data left outer join department ON (employee_data.department_id = department.department_id) where employee_data.pay_grade_id = id ;

END$$

DELIMITER ;

DROP procedure IF EXISTS `EmpFetchNationality`;

DELIMITER $$
CREATE PROCEDURE `EmpFetchNationality`(IN nation varchar(45))
BEGIN

	select custom_attribute.emp_id,first_name,last_name,email  from custom_attribute left outer join employee_data ON (custom_attribute.emp_id = employee_data.emp_id) where custom_attribute.nationality = nation AND is_deleted = 0;

END$$

DELIMITER ;


DROP procedure IF EXISTS `EmpFetchQualification`;

DELIMITER $$
CREATE PROCEDURE `EmpFetchQualification`(IN qual varchar(45))
BEGIN

	select custom_attribute.emp_id,first_name,last_name,email  from custom_attribute left outer join employee_data ON (custom_attribute.emp_id = employee_data.emp_id) where custom_attribute.qualification = qual AND is_deleted=0;

END$$

DELIMITER ;


DROP procedure IF EXISTS `EmpFetchReligion`;

DELIMITER $$
CREATE PROCEDURE `EmpFetchReligion`(IN religion varchar(45))
BEGIN
	select custom_attribute.emp_id,first_name,last_name,email  from custom_attribute left outer join employee_data ON (custom_attribute.emp_id = employee_data.emp_id) where custom_attribute.religion = religion AND is_deleted=0;
END$$

DELIMITER ;


DROP procedure IF EXISTS `EmpFetchTitle`;

DELIMITER $$
CREATE PROCEDURE `EmpFetchTitle`(IN id INT)
BEGIN

	select emp_id,first_name,last_name,email,department_name from employee_data left outer join department ON (employee_data.department_id = department.department_id) where employee_data.job_title_id = id AND is_deleted=0;

END$$

DELIMITER ;


DROP procedure IF EXISTS `EmpFetchService`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `EmpFetchService`(IN dt date)
BEGIN

	select custom_attribute.emp_id,first_name,last_name,email from employee_data left outer join custom_attribute ON (employee_data.emp_id = custom_attribute.emp_id) where custom_attribute.joined > dt AND is_deleted = 0;

END$$

DELIMITER ;

ALTER TABLE `jupiterdb`.`custom_attribute` 
ADD COLUMN `religion` VARCHAR(20) NULL AFTER `nationality`,
ADD COLUMN `qualification` VARCHAR(20) NULL AFTER `religion`,
ADD COLUMN `joined` DATE NULL AFTER `qualification`;

UPDATE custom_attribute set nationality = 'SL', religion = 'Buddhist', qualification = 'Bsc-Eng', joined = '2015-08-09' where emp_id = 10002;
UPDATE custom_attribute set nationality = 'SL', religion = 'Muslim', qualification = 'Diploma', joined = '2016-08-09' where emp_id = 10003;
UPDATE custom_attribute set nationality = 'SL', religion = 'Buddhist', qualification = 'Bsc-Eng', joined = '2018-08-09' where emp_id = 10004;
UPDATE custom_attribute set nationality = 'SL', religion = 'Tamil', qualification = 'Diploma', joined = '2016-12-09' where emp_id = 10005;
UPDATE custom_attribute set nationality = 'India', religion = 'Buddhist', qualification = 'Bsc-Eng', joined = '2018-08-09' where emp_id = 10006;
UPDATE custom_attribute set nationality = 'India', religion = 'Muslim', qualification = 'Diploma', joined = '2016-12-09' where emp_id = 10007;

GRANT EXECUTE ON PROCEDURE jupiterdb.DeptLeaves TO 'jhrm'@'localhost' , 'jadmin'@'localhost';

GRANT EXECUTE ON PROCEDURE jupiterdb.EmpFetchDept TO 'jhrm'@'localhost', 'jadmin'@'localhost';

GRANT EXECUTE ON PROCEDURE jupiterdb.EmpFetchGrade TO 'jhrm'@'localhost', 'jadmin'@'localhost';

GRANT EXECUTE ON PROCEDURE jupiterdb.EmpFetchNationality TO 'jhrm'@'localhost', 'jadmin'@'localhost';

GRANT EXECUTE ON PROCEDURE jupiterdb.EmpFetchQualification TO 'jhrm'@'localhost', 'jadmin'@'localhost';

GRANT EXECUTE ON PROCEDURE jupiterdb.EmpFetchReligion TO 'jhrm'@'localhost', 'jadmin'@'localhost';

GRANT EXECUTE ON PROCEDURE jupiterdb.EmpFetchService TO 'jhrm'@'localhost', 'jadmin'@'localhost';

GRANT EXECUTE ON PROCEDURE jupiterdb.EmpFetchTitle TO 'jhrm'@'localhost', 'jadmin'@'localhost';
