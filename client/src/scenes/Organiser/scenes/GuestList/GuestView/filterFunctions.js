export const filterByShowConfirmedOnly = guests => {
  return guests.filter(
    guest =>
      guest.guestGroup.submissionDate || guest.guestGroup.manualSubmissionDate
  );
};

export const filterByShowUnconfirmedOnly = guests => {
  return guests.filter(
    guest =>
      !guest.guestGroup.submissionDate && !guest.guestGroup.manualSubmissionDate
  );
};

export const filterByShowWithAccomodationOnly = guests => {
  return guests.filter(
    guest => guest.guestGroup.allowAccomodation && guest.guestGroup.accomodation
  );
};

export const filterByShowVegetariansOnly = guests => {
  return guests.filter(guest => guest.isVegetarian);
};

export const filterByShowPresentOnly = guests => {
  return guests.filter(guest => guest.isPresent);
};

export const filterByShowDraftsOnly = guests => {
  return guests.filter(guest => guest.guestGroup.isDraft);
};

export const filterByShowWithTransportOnly = guests => {
  return guests.filter(guest => guest.guestGroup.transport);
};

export const filterByShowWithoutTransportOnly = guests => {
  return guests.filter(guest => !guest.guestGroup.transport);
};
