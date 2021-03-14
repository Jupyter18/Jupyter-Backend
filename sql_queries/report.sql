USE `jupit`;
DROP procedure IF EXISTS `DeptLeaves`;

DELIMITER $$
USE `jupit`$$
CREATE PROCEDURE `DeptLeaves`(IN id int, IN sdt date, IN edt date)
BEGIN

	select leave_application.emp_id from leave_application left outer join employee_data on leave_application.emp_id = employee_data.emp_id where (employee_data.department_id = id AND leave_application.date < edt AND leave_application.date > sdt AND leave_application.is_approved = 1 AND is_deleted = 0);
    
END$$

DELIMITER ;


USE `jupit`;
DROP procedure IF EXISTS `EmpFetchDept`;

DELIMITER $$
USE `jupit`$$
CREATE PROCEDURE `EmpFetchDept`(IN id INT )
BEGIN
	
    select emp_id,first_name,last_name,email,job_name from employee_data left outer join job_title ON (employee_data.job_title_id = job_title.job_title_id) where employee_data.department_id = id AND is_deleted = 0;

END$$

DELIMITER ;


USE `jupit`;
DROP procedure IF EXISTS `EmpFetchGrade`;

DELIMITER $$
USE `jupit`$$
CREATE PROCEDURE `EmpFetchGrade`(IN id INT)
BEGIN

	select emp_id,first_name,last_name,email,department_name from employee_data left outer join department ON (employee_data.department_id = department.department_id) where employee_data.pay_grade_id = id ;

END$$

DELIMITER ;


USE `jupit`;
DROP procedure IF EXISTS `EmpFetchNationality`;

DELIMITER $$
USE `jupit`$$
CREATE PROCEDURE `EmpFetchNationality`(IN nation varchar(45))
BEGIN

	select custom_attribute.emp_id,first_name,last_name,email  from custom_attribute left outer join employee_data ON (custom_attribute.emp_id = employee_data.emp_id) where custom_attribute.nationality = nation AND is_deleted = 0;

END$$

DELIMITER ;


USE `jupit`;
DROP procedure IF EXISTS `EmpFetchQualification`;

DELIMITER $$
USE `jupit`$$
CREATE PROCEDURE `EmpFetchQualification`(IN qual varchar(45))
BEGIN

	select custom_attribute.emp_id,first_name,last_name,email  from custom_attribute left outer join employee_data ON (custom_attribute.emp_id = employee_data.emp_id) where custom_attribute.qualification = qual AND is_deleted=0;

END$$

DELIMITER ;


USE `jupit`;
DROP procedure IF EXISTS `EmpFetchReligion`;

DELIMITER $$
USE `jupit`$$
CREATE PROCEDURE `EmpFetchReligion`(IN religion varchar(45))
BEGIN
	select custom_attribute.emp_id,first_name,last_name,email  from custom_attribute left outer join employee_data ON (custom_attribute.emp_id = employee_data.emp_id) where custom_attribute.religion = religion AND is_deleted=0;
END$$

DELIMITER ;




USE `jupit`;
DROP procedure IF EXISTS `EmpFetchTitle`;

DELIMITER $$
USE `jupit`$$
CREATE PROCEDURE `EmpFetchTitle`(IN id INT)
BEGIN

	select emp_id,first_name,last_name,email,department_name from employee_data left outer join department ON (employee_data.department_id = department.department_id) where employee_data.job_title_id = id AND is_deleted=0;

END$$

DELIMITER ;




USE `jupit`;
DROP procedure IF EXISTS `EmpFetchService`;

DELIMITER $$
USE `jupit`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `EmpFetchService`(IN dt date)
BEGIN

	select custom_attribute.emp_id,first_name,last_name,email from employee_data left outer join custom_attribute ON (employee_data.emp_id = custom_attribute.emp_id) where custom_attribute.joined > dt AND is_deleted = 0;

END$$

DELIMITER ;








ALTER TABLE `jupit`.`custom_attribute` 
ADD COLUMN `religion` VARCHAR(45) NULL AFTER `nationality`,
ADD COLUMN `qualification` VARCHAR(45) NULL AFTER `religion`;
ADD COLUMN `joined` DATE NULL AFTER `qualification`;


INSERT INTO 'custom_attribute' (emp_id,nationality,religion,qualification,joined) VALUES (10000,'SL','Buddhist','BSc Eng','2015-08-09');

INSERT INTO 'custom_attribute' (emp_id,nationality,religion,qualification,joined) VALUES (10001,'SL','Muslim','Diploma','2016-08-09');






GRANT EXECUTE ON PROCEDURE jupit.DeptLeaves TO 'jhrm'@'localhost';

GRANT EXECUTE ON PROCEDURE jupit.EmpFetchDept TO 'jhrm'@'localhost';

GRANT EXECUTE ON PROCEDURE jupit.EmpFetchGrade TO 'jhrm'@'localhost';

GRANT EXECUTE ON PROCEDURE jupit.EmpFetchNationality TO 'jhrm'@'localhost';

GRANT EXECUTE ON PROCEDURE jupit.EmpFetchQualification TO 'jhrm'@'localhost';

GRANT EXECUTE ON PROCEDURE jupit.EmpFetchReligion TO 'jhrm'@'localhost';

GRANT EXECUTE ON PROCEDURE jupit.EmpFetchService TO 'jhrm'@'localhost';

GRANT EXECUTE ON PROCEDURE jupit.EmpFetchTitle TO 'jhrm'@'localhost';