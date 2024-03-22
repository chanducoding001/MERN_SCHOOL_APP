const {Students} = require('../models/Students');

const updateAttendance = async (studentId, date, status) => {
    try {
      const student = await Students.findById(studentId);
      if (!student) {
        console.log(`Student with ID ${studentId} not found!`);
        return;
      }
  
      // Find existing attendance entry for the provided date
      const existingAttendanceIndex = student.attendance.findIndex(entry =>
        entry.date && entry.date.toDateString() === new Date(date).toDateString()
      );
  
      if (existingAttendanceIndex !== -1) {
        // Update the status of the existing attendance entry
        student.attendance[existingAttendanceIndex].status = status;
      } else {
        // Create a new attendance entry
        student.attendance.push({ date, status });
      }
  
      await student.save();
      console.log(`Attendance updated for student ${studentId} on ${date}`);
    } catch (err) {
      console.log(`Error updating attendance for student ${studentId} on ${date}:`, err);
    }
  };
  

const attendanceController = async (req, res) => {
  if (!req.body) {
    return res.status(402).json({ message: 'Data is required!' });
  }

  try {
    const studentAttendance = req.body;
    for (const { studentId, date, status } of studentAttendance) {
      await updateAttendance(studentId, date, status);
    }

    console.log('Attendance saved for all students.');
    return res.status(200).json({ message: 'Attendance saved for all students.' });
  } catch (err) {
    console.log('Error at attendance:', err);
    return res.status(500).json({ message: 'Internal server error', error: err });
  }
};

module.exports = { attendanceController };
