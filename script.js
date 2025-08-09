// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451, // the ID of the course the assignment group belongs to
  group_weight: 25, // the percentage weight of the entire assignment group
  assignments: [
    {
      id: 1,
      name: "Declare a letiable",
      due_at: "2023-01-25", // the due date for the assignment
      points_possible: 50 // the maximum points possible for the assignment
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27", // the due date for the assignment
      points_possible: 150 // the maximum points possible for the assignment
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15", // the due date for the assignment
      points_possible: 500 // the maximum points possible for the assignment
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

function getLearnerData(course, ag, submissions) {
  // here, we would process this data to achieve the desired result.
  const result = [];

  // ############################ ⬇️ WRITE CODE BELOW ⬇️ #############################

  // Printing out each parameter for clarity
  // console.log(course);
  // console.log(ag);
  // console.log(submissions);

  // Get unique list of learners
  function getUniqueLearners(submissions) {
    const learners = [];
    submissions.forEach(sub => {
      if (!learners.includes(sub.learner_id)) {
        learners.push(sub.learner_id);
      }
    });
    //console.log(learners);
    return learners;
  }

  // Get all unique learners
  const learners = getUniqueLearners(submissions);
  //console.log("Unique learners:", learners);

  // Get assignment info by ID
  function getAssignmentInfo(assignmentId) {
    return ag.assignments.find(a => a.id === assignmentId);
  }

  // Today's date 
  const today = "2025-08-08";

  // Is assignment due?
  function isAssignmentDue(dueDate) {
    return dueDate <= today;
  }

  // Is assignment late?
  function lateAssignment(score, submittedAt, dueDate, possiblePoints) {
    if (submittedAt > dueDate) {
      return score - (possiblePoints * 0.1);
    }
    return score;
  }

  // Validate course ID
  if (course.id !== ag.course_id) {
    throw new Error("Invalid Input: Course ID");
  }

  // Create an object for each learner, and their submissions:
  // id, learner_id
  // avg score (submission.score / points_possible)
  // each assingment:
  //        id, score

  learners.forEach(learnerId => {
    const learnerObj = { id: learnerId };
    let totalEarned = 0;
    let totalPossible = 0;

    submissions.forEach(sub => {
      if (sub.learner_id === learnerId) {
        const assignment = getAssignmentInfo(sub.assignment_id);
      }
    });

    // Push to final results
    result.push(learnerObj);
  });

  // ############################ ⬆️ WRITE CODE ABOVE ⬆️ #############################

  return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);

// ######################## 4 actionable steps

// Step 1 - loop thgrought LearnerSubmissions and get learner_id & assignment_id; 
// Step 2 - get assignment info
// Step 3 - find out assignment status
// Step 4 - calculate

// ######################## Given data

// object = course_id
// object = assignments
// each assignment = id, due_at, points_possible
// array = LearnerSubmissions
// each submission = learner_id, assignment_id, submission
// inside submission = submitted_at, score

// ######################## Expected data

// array of learner objects with
// id (learner id)
// avg = (sum of earned points) / (sum of points_possible)
// assignment ids
//    value = fraction between 0 and 1)

// ######################## Expected result

// const result = [
//     {
//       id: 125,
//       avg: 0.985, // (47 + 150) / (50 + 150)
//       1: 0.94, // 47 / 50
//       2: 1.0 // 150 / 150
//     },
//     {
//       id: 132,
//       avg: 0.82, // (39 + 125) / (50 + 150)
//       1: 0.78, // 39 / 50
//       2: 0.833 // late: (140 - 15) / 150
//     }
//   ];

// ###################### How to get today's date | DO NOT USE!

// let today = new Date();
// const year = today.getFullYear(); // Gets the full year
// const month = String(today.getMonth() + 1).padStart(2, '0'); // Months starts from 0
// const day = today.getDate(); // Gets the day of the month (1-31)
// today = `${year}-${month}-${day}`;
// console.log(`Today's Date:`);
// console.log(today);

// ######################## Data Validation | Use try/catch and others to handle errors

// if AssignmentGroup{assignments[due_at]} > today's date = Skip assignment
// if LearnerSubmissions[submission{submitted_at}] > AssignmentGroup{assignments[due_at]} = AssignmentGroup{assignments[points_possible]} - 10%

// if AssignmentGroup{course_id} != CourseInfo{id} = throw an error "Invalid Input"
// if points_possible = 0 = throw an error "Invalid Input"
// if points_possible = "string" => convert to Number
