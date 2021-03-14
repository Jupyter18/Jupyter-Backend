const viewLeave ={
    fixedLeave :
         `SELECT leave_type, leave_amount FROM leave_structure NATURAL JOIN leave_summary NATURAL JOIN paygrade_leave NATURAL JOIN employee_data WHERE emp_id=?`,

    approvedLeave :
         `select leave_type, leave_count from leave_summary inner join leave_structure using(leave_type_id) where emp_id=?`,

    appliedLeave : 
        `select leave_type, count(*) as applied from leave_application inner join leave_structure using(leave_type_id) where emp_id= ? and  (( is_approved is null and leave_date >= curdate()) or is_approved =1)   group by leave_type_id`,

     leaveHistory :
          `select leave_date, leave_type , is_approved from leave_application natural join leave_structure where emp_id = ? and leave_date > curdate()`
}

module.exports = viewLeave;