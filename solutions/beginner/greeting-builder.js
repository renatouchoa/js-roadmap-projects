const formatName = (firstName, lastName) => {
    return `${firstName} ${lastName}`;
}

const getGreeting = (timeOfDay) => {
    return `Good ${timeOfDay}`;
}

const createGreeting = (firstName, lastName, timeOfDay) => {
    return `${getGreeting(timeOfDay)}, ${formatName(firstName, lastName)}`;
}

console.log(createGreeting("Ava", "Stone", "morning"));
console.log(createGreeting("Noah", "Kim", "evening"));
console.log(createGreeting("Mina", "Patel", "afternoon"));