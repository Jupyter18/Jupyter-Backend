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
  `marital_status` varchar(10) DEFAULT NULL CHECK (marital_status IN ('S','M')),
  `email` varchar(45) NOT NULL,
  `gender` varchar(2) NOT NULL  CHECK (gender IN ('M','F')),
  `job_title_id` int NOT NULL,
  `pay_grade_id` int NOT NULL,
  `employment_status_id` int DEFAULT NULL,
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
  FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`)
);

DROP TABLE IF EXISTS `session`;

CREATE TABLE `session` (
  `session_id` varchar(50) NOT NULL,
  `emp_id` int NOT NULL,
  `expire_date` datetime NOT NULL,
  `job_title` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`session_id`),
  FOREIGN KEY (`emp_id`) REFERENCES `employee_data` (`emp_id`)
);

DROP TABLE IF EXISTS `employee_contact`;

CREATE TABLE `employee_contact` (
  `phone_number` char(10) NOT NULL,
  `emp_id` int NOT NULL,
  PRIMARY KEY (`phone_number`),
FOREIGN KEY (`emp_id`) REFERENCES `employee_data` (`emp_id`)
);

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
  `leave_count` int DEFAULT NULL,
  PRIMARY KEY (`emp_id`,`leave_type_id`),
  FOREIGN KEY (`emp_id`) REFERENCES `employee_data` (`emp_id`),
  FOREIGN KEY (`leave_type_id`) REFERENCES `leave_structure` (`leave_type_id`)
);

DROP TABLE IF EXISTS `leave_application`;

CREATE TABLE `leave_application` (
  `emp_id` int NOT NULL,
  `leave_date` date NOT NULL,
  `leave_type_id` int NOT NULL,
  `is_approved` tinyint DEFAULT NULL,
  PRIMARY KEY (`emp_id`,`leave_date`),
  FOREIGN KEY (`emp_id`) REFERENCES `employee_data` (`emp_id`),
  FOREIGN KEY (`leave_type_id`) REFERENCES `leave_structure` (`leave_type_id`),
  FOREIGN KEY (`emp_id`,`leave_type_id`) REFERENCES `leave_summary`(`emp_id`,`leave_type_id`)
) ;

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
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

ALTER TABLE employee_data AUTO_INCREMENT=10000; 


DROP PROCEDURE IF EXISTS `add_employee`;

DELIMITER $$
CREATE PROCEDURE `add_employee`(
	first_name varchar(15), last_name varchar(15),
	birth_date date ,marital_status varchar(10),  email varchar(45), gender varchar(2) , 
    job_title_id int , pay_grade_id int, employment_status_id int, department_id int, branch_id int,
    is_supervisor boolean, supervisor_id int , contact_no char(10)
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


INSERT INTO `basic_settings` VALUES (1000,'Jupiter Apparel','Jupiter, Head Office, Union Place, Colombo, Sri Lanka');

INSERT INTO `branch` VALUES (3,'Bangladesh'),(2,'Pakistan'),(1,'Sri Lanka');

INSERT INTO `department` VALUES (2,'Finance_Department'),(1,'HR_Department');
INSERT INTO `department` (department_name) VALUES ('Software_Department');

INSERT INTO `employment_status` VALUES (3,'Contract-Fulltime'),(4,'Contract-Parttime'),(6,'Freelance'),(1,'Intern-Fulltime'),(2,'Intern-Parttime'),(5,'Permanent');

INSERT INTO `job_title` VALUES (2,'Accountant'),(1,'HR_Manager'),(4,'QA_Engineer'),(3,'Software_Engineer');

INSERT INTO `leave_structure` VALUES (1,'Annual'),(2,'Casual'),(3,'Maternity'),(4,'No-Pay');

INSERT INTO `pay_grade` VALUES (1,'Level_1'),(2,'Level_2'),(3,'Level_3');

INSERT INTO `paygrade_leave` VALUES (1,1,40),(2,1,20),(3,1,80),(4,1,50),(1,2,30),(2,2,20),(3,2,80),(4,2,50);

call add_employee('Roshinie', 'Jayasndara', '1997-09-09', 'S', 'roshini@gmail.com', 'F', 1, 1, 1, 1, 1,0 , NULL, '0775676543');
call add_employee('Nimal', 'Perera', '1997-10-09', 'M', 'nimal@gmail.com', 'M', 2, 1, 2, 1, 1,0 , NULL, '0779876543');
call add_employee('Sunil', 'Perera', '1978-10-09', 'M', 'sunil@gmail.com', 'M', 2, 2, 2, 1, 1,1 , NULL, '0779876548');
call add_employee('Kumari', 'Perera', '1978-10-09', 'M', 'Kumari@gmail.com', 'F', 2, 3, 2, 2, 1,1 , NULL, '0773456349');
call add_employee('Amali', 'Kure', '1978-10-09', 'S', 'amali@gmail.com', 'F', 3, 1, 2, 2, 1,1 , NULL, '0774567897');

INSERT INTO `leave_application` (emp_id,leave_date,leave_type_id) VALUES (10000,'2021-03-03',1);
INSERT INTO `leave_application` (emp_id,leave_date,leave_type_id) VALUES (10001,'2021-03-10',1);
INSERT INTO `leave_application` (emp_id,leave_date,leave_type_id) VALUES (10000,'2021-03-11',2);
INSERT INTO `leave_application` (emp_id,leave_date,leave_type_id) VALUES (10000,'2021-03-21',1);
INSERT INTO `leave_application` (emp_id,leave_date,leave_type_id) VALUES (10003,'2021-03-21',4);

update leave_application set is_approved=1 where emp_id=10000 and leave_date="2021-03-03";
update leave_application set is_approved=1 where emp_id=10000 and leave_date="2021-03-11";

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

GRANT EXECUTE ON PROCEDURE jupiterdb.GetAllEmp_branch TO 'jadmin'@'localhost';
GRANT EXECUTE ON PROCEDURE jupiterdb.add_employee TO 'jadmin'@'localhost';
GRANT SELECT,INSERT ON jupiterdb.employee_contact TO 'jadmin'@'localhost';
GRANT SELECT,UPDATE ON jupiterdb.employee_data TO 'jadmin'@'localhost';

GRANT SELECT,ALTER ON jupiterdb.custom_attribute TO 'jadmin'@'localhost';

GRANT EXECUTE ON PROCEDURE jupiterdb.GetAllEmp_branch TO 'jhrm'@'localhost';
GRANT EXECUTE ON PROCEDURE jupiterdb.add_employee TO 'jhrm'@'localhost';

GRANT INSERT ON jupiterdb.leave_application TO 'jemp'@'localhost';
GRANT SELECT ON jupiterdb.employee_data TO 'jemp'@'localhost';
GRANT EXECUTE ON PROCEDURE jupiterdb.GetEmp_profile TO 'jemp'@'localhost';
GRANT EXECUTE ON FUNCTION jupiterdb.leave_insert TO 'jemp'@'localhost';


GRANT SELECT ON jupiterdb.branch TO 'jemp'@'localhost','jadmin'@'localhost','jsuper'@'localhost','jhrm'@'localhost';
GRANT SELECT ON jupiterdb.department TO 'jemp'@'localhost','jadmin'@'localhost','jsuper'@'localhost','jhrm'@'localhost';
GRANT SELECT ON jupiterdb.employment_status TO 'jemp'@'localhost','jadmin'@'localhost','jsuper'@'localhost','jhrm'@'localhost';
GRANT SELECT ON jupiterdb.job_title TO 'jemp'@'localhost','jadmin'@'localhost','jsuper'@'localhost','jhrm'@'localhost';
GRANT SELECT ON jupiterdb.pay_grade TO 'jemp'@'localhost','jadmin'@'localhost','jsuper'@'localhost','jhrm'@'localhost';

GRANT SELECT,INSERT ON jupiterdb.user TO 'juser'@'localhost';


