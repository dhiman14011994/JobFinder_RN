export const shortEducationData = (array) => {
  var data = array?.sort(function (a, b) {
    return new Date(b.updated_at) - new Date(a.updated_at);
  });
  return data;
};
export const shortEducationsData = (array) => {
  var data = array?.sort(function (a, b) {
    return new Date(b.created_at) - new Date(a.created_at);
  });
  return data;
};
export const shortWorkInfoData = (array) => {
  var data = array?.sort(function (a, b) {
    return (
      (b.is_currently_working ? new Date() : new Date(b.end_date)) -
      (a.is_currently_working ? new Date() : new Date(a.end_date))
    );
  });
  return data;
};

export const shortCertificatesInfoData = (array) => {
  var data = array?.sort(function (a, b) {
    return new Date(b.end_date) - new Date(a.end_date);
  });
  return data;
};
