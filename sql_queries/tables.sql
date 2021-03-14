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
  `marital_status` varchar(10) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `gender` varchar(2) NOT NULL,
  `job_title_id` int NOT NULL,
  `pay_grade_id` int NOT NULL,
  `employment_status_id` int DEFAULT NULL,
  `department_id` int NOT NULL,
  `branch_id` int NOT NULL,
  `is_supervisor` tinyint DEFAULT '0',
  `supervisor_id` varchar(10) DEFAULT NULL,
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
  `date` date NOT NULL,
  `leave_type_id` int NOT NULL,
  `is_approved` tinyint DEFAULT NULL,
  PRIMARY KEY (`emp_id`,`date`),
  FOREIGN KEY (`emp_id`) REFERENCES `employee_data` (`emp_id`),
  FOREIGN KEY (`leave_type_id`) REFERENCES `leave_structure` (`leave_type_id`)
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
  `nationality` varchar(45) DEFAULT NULL,
  FOREIGN KEY (`emp_id`) REFERENCES `employee_data` (`emp_id`)
);

ALTER TABLE employee_data AUTO_INCREMENT=10000; 


