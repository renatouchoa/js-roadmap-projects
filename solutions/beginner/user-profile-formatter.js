function getDisplayName(user) {
    return `${user.firstName} ${user.lastName}`;
}

function getLocation(user) {
    return `${user.address.city}, ${user.address.country}`;
}

function getContactSummary(user) {
    return {
        email: user.email,
        phone: user.phone
    };
}

function isAccountActive(user) {
    return user.account.status === 'active';
}

function createProfileSummary(user) {
    return {
        displayName: getDisplayName(user),
        location: getLocation(user),
        contact: getContactSummary(user),
        active: isAccountActive(user),
        plan: user.account.plan,
    };
}

// Sample checks ...

const user = {
  id: 42,
  firstName: 'Ava',
  lastName: 'Stone',
  email: 'ava@example.com',
  phone: null,
  address: {
    city: 'London',
    country: 'UK',
  },
  account: {
    status: 'active',
    plan: 'pro',
  },
};

console.log(createProfileSummary(user));
console.log(getDisplayName(user));
console.log(isAccountActive(user));
console.log(getContactSummary(user));