// Restricted states array (admin-editable)
const restrictedStates = ['AK', 'HI', 'NY'];

// Check user state on form submission
if (restrictedStates.includes(userState)) {
  showModal('state-restriction');
  captureEmail();
  return false;
}