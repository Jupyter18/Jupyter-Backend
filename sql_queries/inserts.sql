USE jupiterdb;

INSERT INTO `basic_settings` VALUES (1000,'Jupiter Apparel','Jupiter, Head Office, Union Place, Colombo, Sri Lanka');

INSERT INTO `branch` VALUES (3,'Bangladesh'),(2,'Pakistan'),(1,'Sri Lanka');

INSERT INTO `department` VALUES (2,'Finance_Department'),(1,'HR_Department');
INSERT INTO `department` (department_name) VALUES ('Software_Department');

INSERT INTO `employment_status` VALUES (3,'Contract-Fulltime'),(4,'Contract-Parttime'),(6,'Freelance'),(1,'Intern-Fulltime'),(2,'Intern-Parttime'),(5,'Permanent');

INSERT INTO `job_title` VALUES (2,'Accountant'),(1,'HR_Manager'),(4,'QA_Engineer'),(3,'Software_Engineer');

INSERT INTO `leave_structure` VALUES (1,'Annual'),(2,'Casual'),(3,'Maternity'),(4,'No-Pay');

INSERT INTO `pay_grade` VALUES (1,'Level_1'),(2,'Level_2'),(3,'Level_3');

INSERT INTO `paygrade_leave` VALUES (1,1,40),(2,1,20),(3,1,80),(4,1,50),(1,2,30),(2,2,20),(3,2,80),(4,2,50);

call add_employee('Roshinie', 'Jayasndara', '1997-09-09', 'S', 'roshini@gmail.com', 'F', 1, 1, 1, 1, 1,0 , '', '0775676543');
call add_employee('Nimal', 'Perera', '1997-10-09', 'M', 'nimal@gmail.com', 'M', 2, 1, 2, 1, 1,0 , '', '0779876543');
call add_employee('Sunil', 'Perera', '1978-10-09', 'M', 'sunil@gmail.com', 'M', 2, 2, 2, 1, 1,1 , '', '0779876548');
call add_employee('Kumari', 'Perera', '1978-10-09', 'M', 'Kumari@gmail.com', 'F', 2, 3, 2, 2, 1,1 , '', '0773456349');
call add_employee('Amali', 'Kure', '1978-10-09', 'S', 'amali@gmail.com', 'F', 3, 1, 2, 2, 1,1 , '', '0774567897');

INSERT INTO `leave_application` (emp_id,date,leave_type_id) VALUES (10000,'2021-03-03',1);
INSERT INTO `leave_application` (emp_id,date,leave_type_id) VALUES (10001,'2021-03-10',1);
INSERT INTO `leave_application` (emp_id,date,leave_type_id) VALUES (10000,'2021-03-11',2);
INSERT INTO `leave_application` (emp_id,date,leave_type_id) VALUES (10000,'2021-03-21',1);
INSERT INTO `leave_application` (emp_id,date,leave_type_id) VALUES (10003,'2021-03-21',4);

update leave_application set is_approved=1 where emp_id=10000 and date="2021-03-03";
update leave_application set is_approved=1 where emp_id=10000 and date="2021-03-11";