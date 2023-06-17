import moment from 'moment';

const theme = {
  fontBold: { fontFamily: 'Gilroy-Bold' },
  fontSemiBold: { fontFamily: 'Gilroy-SemiBold' },
  fontRegular: { fontFamily: 'Gilroy-Regular' },
  fontMedium: { fontFamily: 'Gilroy-Medium' },
};

const STRIPE_PUBLISHABLE_KEY =
  'pk_test_51LfkihSJnRVNbFVx0hasWj7Qon9dvuICbFDTYTNJUT563pDFCfvIqjy6hMRocGlCmjxjzWCOyQNmpQ10Sljl8c5V00WvZar7P8';

const getDateTime = (date1) => {
  var msDiff = new Date();
  var PastYear = moment(date1).format('yyyy');
  var PastMonth = moment(date1).format('MM');
  var PastDate = moment(date1).format('DD');
  var PastHours = moment(date1).format('HH');
  var PastMinutes = moment(date1).format('mm');
  var PastSeconds = moment(date1).format('ss');

  var currentYear = msDiff.getFullYear();
  var currentmonth = msDiff.getMonth() + 1;
  var currentday = msDiff.getDate();
  var currentHours = msDiff.getHours();
  var currentMinutes = msDiff.getMinutes();
  var currentSeconds = msDiff.getSeconds();
  var defYear = currentYear - PastYear;
  var defMonth = currentmonth - PastMonth;
  var defDay = currentday - PastDate;
  var defHour = currentHours - PastHours;
  var defMinutes = currentMinutes - PastMinutes;
  var defSecond = currentSeconds - PastSeconds;
  if (defYear > 0) {
    var deffMonth =
      PastMonth > currentmonth
        ? Number(PastMonth) + Number(currentmonth) - 12
        : 0;
    if (deffMonth > 0) {
      var deffDate =
        PastDate > currentday ? 31 - Number(PastDate) + Number(currentday) : 0;
      if (deffDate > 0) {
        let year =
          deffMonth == 1 ? deffDate + ' D' : Number(deffMonth - 1) + ' M';
        return year;
      }
      let year = deffMonth + ' M';
      return year;
    } else {
      let year = defYear + ' Y';
      return year;
    }
  } else if (Number(defMonth) > 0) {
    var deM =
      PastMonth == 4 || PastMonth == 6 || PastMonth == 9 || PastMonth == 11;
    var defMDate =
      PastDate > currentday
        ? (PastMonth == 2 ? 28 : deM ? 30 : 31) -
          Number(PastDate) +
          Number(currentday)
        : 0;
    let year =
      defMDate > 0
        ? defMonth < 2
          ? Number(defMonth) - 1 + ' M'
          : defMDate + ' D'
        : defMonth + ' M';
    return year;
  } else if (Number(defDay) > 0) {
    let checkHour =
      PastHours > currentHours
        ? 24 - Number(PastHours) + Number(currentHours)
        : 0;
    let year =
      checkHour > 0
        ? defDay < 2
          ? checkHour + ' hr'
          : Number(defDay) - 1 + ' D'
        : defDay + ' D';
    return year;
  } else if (Number(defHour) > 0) {
    let checkMinutes =
      PastMinutes > currentMinutes
        ? 60 - Number(PastMinutes) + Number(currentMinutes)
        : 0;
    let year =
      checkMinutes > 0
        ? defHour < 2
          ? checkMinutes + ' min'
          : Number(defHour) - 1 + ' hr'
        : defHour + ' hr';
    return year;
  } else if (Number(defMinutes) > 0) {
    let checkSec =
      PastSeconds > currentSeconds
        ? 60 - Number(PastSeconds) + Number(currentSeconds)
        : 0;
    let year =
      checkSec > 0
        ? defMinutes < 2
          ? checkSec + ' sec'
          : Number(defMinutes) - 1 + ' min'
        : defMinutes + ' min';
    return year;
  } else {
    let year = defSecond + ' sec';
    return year;
  }
};
const getWorkExperience = ({ startDate, endDate }) => {
  var msDiff = new Date();
  var PastYear = moment(startDate).format('yyyy');
  var PastMonth = moment(startDate).format('MM');
  var PastDate = moment(startDate).format('DD');

  var endYear = moment(endDate).format('yyyy');
  var endmonth = moment(endDate).format('MM');
  var endday = moment(endDate).format('DD');
  var currentYear = msDiff.getFullYear();
  var currentmonth = msDiff.getMonth() + 1;
  var currentday = msDiff.getDate();
  var defYear = endYear - PastYear;
  var defMonth = endmonth - PastMonth;
  var defDay = endday - PastDate;

  var presentYear = currentYear - PastYear;
  var presentMonth = currentmonth - PastMonth;
  var presentDay = currentday - PastDate;
  var presentEndYear = currentYear - PastYear;
  var presentEndMonth = currentmonth - PastMonth;
  var presentEndDay = currentday - PastDate;

  if (
    (presentYear == 0 && presentMonth == 0 && presentDay == 0) ||
    (presentEndYear == 0 && presentEndMonth == 0 && presentEndDay == 0)
  ) {
    return 'One Month';
  } else {
    if (defYear > 0) {
      if (Number(defMonth) > 0) {
        let year =
          defYear +
          (defYear == 1 ? ' Year ' : ' Years ') +
          defMonth +
          (defMonth == 1 ? ' Month' : ' Months');
        return year;
      } else if (Number(defMonth) < 0) {
        let distanceMonth = Number(defMonth) + 12;
        let distanceYear = Number(defYear) - 1;
        let year =
          distanceYear == 0
            ? distanceMonth + (distanceMonth == 1 ? ' Month' : ' Months')
            : distanceYear +
              (distanceYear == 1 ? ' Year ' : ' Years ') +
              distanceMonth +
              (distanceMonth == 1 ? ' Month' : ' Months');
        return year;
      } else {
        let year = defYear + (defYear == 1 ? ' Year' : ' Years');
        return year;
      }
    } else if (Number(defMonth) > 0) {
      if (Number(defDay) > 0) {
        let year =
          defMonth +
          (defMonth == 1 ? ' Month ' : ' Months ') +
          defDay +
          (defDay == 1 ? ' Day' : ' Days');
        return year;
      } else {
        let year = defMonth + (defMonth == 1 ? ' Month' : ' Months');
        return year;
      }
    } else if (Number(defDay) > 0) {
      let year = defDay + (defDay == 1 ? ' Day' : ' Days');
      return year;
    } else {
      return 'One Month';
    }
  }
};

function empty(str) {
  if (
    typeof str == 'undefined' ||
    !str ||
    str.length === 0 ||
    str === '' ||
    !/[^\s]/.test(str) ||
    /^\s*$/.test(str) ||
    str.replace(/\s/g, '') === ''
  ) {
    return true;
  } else {
    return false;
  }
}

const compareTwoDate = ({ startDate, endDate }) => {
  var PastYear = moment(startDate).format('yyyy');
  var PastMonth = moment(startDate).format('MM');
  var PastDate = moment(startDate).format('DD');

  var endYear = moment(endDate).format('yyyy');
  var endmonth = moment(endDate).format('MM');
  var endday = moment(endDate).format('DD');
  var defYear = endYear - PastYear;
  var defMonth = endmonth - PastMonth;
  var defDay = endday - PastDate;

  if (defYear == 0) {
    if (Number(defMonth) == 0) {
      if (Number(defDay) == 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const compareTodayDate = (date1) => {
  var msDiff = new Date();
  var PastYear = moment(date1).format('yyyy');
  var PastMonth = moment(date1).format('MM');
  var PastDate = moment(date1).format('DD');

  var currentYear = msDiff.getFullYear();
  var currentmonth = msDiff.getMonth() + 1;
  var currentday = msDiff.getDate();

  var defYear = currentYear - PastYear;
  var defMonth = currentmonth - PastMonth;
  var defDay = currentday - PastDate;

  if (defYear == 0) {
    if (defMonth == 0) {
      if (defDay == 0) {
        return 'Today';
      } else if (defDay == 1) {
        return 'Yesterday';
      } else {
        return moment(date1).format('YYYY-MM-DD');
      }
    } else {
      var deDay =
        PastMonth == 2
          ? PastDate > 27
            ? true
            : false
          : PastMonth == 4 ||
            PastMonth == 6 ||
            PastMonth == 9 ||
            PastMonth == 11
          ? PastDate == 30
            ? true
            : false
          : PastDate == 31;
      if (deDay && currentday == 1) {
        return 'Yesterday';
      } else {
        return moment(date1).format('YYYY-MM-DD');
      }
    }
  } else {
    if (currentday == 1 && PastMonth == 12 && PastDate == 31) {
      return 'Yesterday';
    } else {
      return moment(date1).format('YYYY-MM-DD');
    }
  }
};

export {
  theme,
  STRIPE_PUBLISHABLE_KEY,
  getDateTime,
  getWorkExperience,
  empty,
  compareTwoDate,
  compareTodayDate,
};
