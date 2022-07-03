exports.createText = (name, age) => {
    if (!age) return `Hi I am ${name}`;
    if (!name) return `I am ${age} years old`;
    return `Hi I am ${name} and I am ${age} years old`;
}