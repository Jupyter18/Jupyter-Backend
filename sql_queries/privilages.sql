DROP USER IF EXISTS 'juser'@'localhost'
CREATE USER 'juser'@'localhost' IDENTIFIED BY 'user123';
ALTER USER 'juser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'user123';

DROP USER IF EXISTS 'jadmin'@'localhost'
CREATE USER 'jadmin'@'localhost' IDENTIFIED BY 'admin123';
ALTER USER 'jadmin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin123';

DROP USER IF EXISTS 'jsuper'@'localhost'
CREATE USER 'jsuper'@'localhost' IDENTIFIED BY 'super123';
ALTER USER 'jsuper'@'localhost' IDENTIFIED WITH mysql_native_password BY 'super123';

DROP USER IF EXISTS 'jemp'@'localhost'
CREATE USER 'jemp'@'localhost' IDENTIFIED BY 'emp123';
ALTER USER 'jemp'@'localhost' IDENTIFIED WITH mysql_native_password BY 'emp123';

DROP USER IF EXISTS 'jhrm'@'localhost'
CREATE USER 'jhrm'@'localhost' IDENTIFIED BY 'hrm123';
ALTER USER 'jhrm'@'localhost' IDENTIFIED WITH mysql_native_password BY 'hrm123';

GRANT EXECUTE ON PROCEDURE jupiterdb.GetAllEmp_branch TO 'jadmin'@'localhost';
GRANT SELECT,INSERT ON jupiterdb.employee_contact TO 'jadmin'@'localhost';
GRANT SELECT,UPDATE ON jupiterdb.employee_data TO 'jadmin'@'localhost';
GRANT SELECT,ALTER ON jupiterdb.custom_attribute TO 'jadmin'@'localhost';
GRANT INSERT ON jupiterdb.employee_contact TO 'jadmin'@'localhost';
GRANT EXECUTE ON PROCEDURE jupiterdb.add_employee TO 'jadmin'@'localhost';

GRANT EXECUTE ON PROCEDURE jupiterdb.GetAllEmp_branch TO 'jhrm'@'localhost';

GRANT SELECT ON jupiterdb.branch TO 'jemp'@'localhost','jadmin'@'localhost','jsuper'@'localhost','jhrm'@'localhost';
GRANT SELECT ON jupiterdb.department TO 'jemp'@'localhost','jadmin'@'localhost','jsuper'@'localhost','jhrm'@'localhost';
GRANT SELECT ON jupiterdb.employment_status TO 'jemp'@'localhost','jadmin'@'localhost','jsuper'@'localhost','jhrm'@'localhost';
GRANT SELECT ON jupiterdb.job_title TO 'jemp'@'localhost','jadmin'@'localhost','jsuper'@'localhost','jhrm'@'localhost';
GRANT SELECT ON jupiterdb.pay_grade TO 'jemp'@'localhost','jadmin'@'localhost','jsuper'@'localhost','jhrm'@'localhost';

GRANT INSERT ON jupiterdb.leave_application TO 'jemp'@'localhost';
GRANT SELECT ON jupiterdb.employee_data TO 'jemp'@'localhost';
GRANT EXECUTE ON PROCEDURE jupiterdb.GetEmp_profile TO 'jemp'@'localhost';
GRANT EXECUTE ON FUNCTION jupiterdb.leave_insert TO 'jemp'@'localhost';

GRANT SELECT,INSERT ON jupiterdb.employee_contact TO 'jadmin'@'localhost';
GRANT SELECT,INSERT ON jupiterdb.user TO 'juser'@'localhost';
