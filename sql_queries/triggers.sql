use jupiterdb;

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
