function getLetterGrade(score) {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return "F";
}

function hasPassed(score) {
    return score >= 60;
}

function getFeedback(grade) {
    switch (grade) {
        case 'A':
            return 'Excellent work';
        case 'B':
            return 'Great job';
        case 'C':
        case 'D':
            return 'You passed';
    }
    return 'Keep practicing';
}

function createGradeReport(name, score) {
    const grade = getLetterGrade(score);
    return {
        name,
        score,
        grade,
        passed: hasPassed(score),
        feedback: getFeedback(grade),
    }
}

console.log(createGradeReport('Ava', 92));
console.log(createGradeReport('Noah', 48));
console.log(createGradeReport('Mina', 75));
console.log(createGradeReport('Sam', 60));