export const filterByShowConfirmedOnly = guestGroups => {
  return guestGroups.filter(
    guestGroup => guestGroup.submissionDate || guestGroup.manualSubmissionDate
  );
};

export const filterByShowUnconfirmedOnly = guestGroups => {
  return guestGroups.filter(
    guestGroup => !guestGroup.submissionDate && !guestGroup.manualSubmissionDate
  );
};

export const filterByShowWithAccomodationOnly = guestGroups => {
  return guestGroups.filter(
    guestGroup => guestGroup.allowAccomodation && guestGroup.accomodation
  );
};

export const filterByShowDraftsOnly = guestGroups => {
  return guestGroups.filter(guestGroup => guestGroup.isDraft);
};

export const filterByShowWithTransportOnly = guestGroups => {
  return guestGroups.filter(guestGroup => guestGroup.transport);
};

export const filterByShowWithoutTransportOnly = guestGroups => {
  return guestGroups.filter(guestGroup => !guestGroup.transport);
};

export const filterByShowPresentOnly = guestGroups => {
  return guestGroups.filter(guestGroup =>
    guestGroup.guests.some(guest => guest.isPresent)
  );
};
