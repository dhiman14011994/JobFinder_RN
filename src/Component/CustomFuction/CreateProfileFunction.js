import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  GDrive,
  MimeTypes,
} from '@robinbobin/react-native-google-drive-api-wrapper';
import Strings from '../../Resources/Strings';

export const getGoogleDirveData = async () => {
  await GoogleSignin.signOut();

  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    var gdrive = new GDrive();
    gdrive.accessToken = (await GoogleSignin.getTokens()).accessToken;
    var gData = await gdrive.files.list();
    let newGoogleData = gData?.files?.filter((item) => {
      return (
        item.mimeType == 'application/vnd.google-apps.document' ||
        item.mimeType == 'application/pdf'
      );
    });
    let driveData = {
      data: newGoogleData || [],
      error: false,
    };
    return driveData;
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      let driveData = {
        data: [],
        error: true,
      };
      return driveData;
      console.log('google error', error);
    } else if (error.code === statusCodes.IN_PROGRESS) {
      let driveData = {
        data: [],
        error: true,
      };
      return driveData;
      console.log('google error', error);
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      let driveData = {
        data: [],
        error: true,
      };
      return driveData;
      console.log('google error', error);
    } else {
      let driveData = {
        data: [],
        error: true,
      };
      return driveData;
      console.log('google error', error);
    }
  }
};

export const createProfileParams = ({
  selectUser,
  setSocial,
  educationData,
  name,
  email,
  userData,
  workExperienceData,
  localeFile,
  userImage,
  about,
  route,
  data,
  resumeType,
  resumeName,
  companyName,
  companyEmail,
  companyPhone,
  businessAddress,
  businessNumber,
  aboutCompany,
}) => {
  const details =
    selectUser === Strings.PROFESSIONAL
      ? setSocial
        ? {
            education_info: educationData?.allEducations,
            name: name,
            email: email.trim().toLowerCase(),
            role: selectUser,
            phone_number: userData?.data?.phone_number
              ? userData?.data?.phone_number == 'undefined'
                ? '1234567896'
                : userData?.data?.phone_number
              : '1234567896',
            country_code: userData?.data?.country_code
              ? userData?.data?.country_code == 'undefined'
                ? '91'
                : userData?.data?.country_code
              : '91',
            work_info: workExperienceData,
            link_your_resume: localeFile,
            image: userImage,
            about_me: about,
            from_social: setSocial,
            is_create: true,
            user_id: userData?.data?._id,
            uid: route?.params?.result?.data?.uid || data.data?.uid,
            provider:
              route?.params?.result?.data?.provider || data.data?.provider,
            resume_type: resumeType,
            resume_name: resumeName,
          }
        : {
            education_info: educationData?.allEducations,
            name: name,
            email: email.trim().toLowerCase(),
            role: selectUser,
            phone_number: userData?.data?.phone_number
              ? userData?.data?.phone_number == 'undefined'
                ? '1234567896'
                : userData?.data?.phone_number
              : '1234567896',
            country_code: userData?.data?.country_code
              ? userData?.data?.country_code == 'undefined'
                ? '91'
                : userData?.data?.country_code
              : '91',
            work_info: workExperienceData,
            link_your_resume: localeFile,
            image: userImage,
            about_me: about,
            from_social: setSocial,
            is_create: true,
            user_id: userData?.data?._id,
            resume_type: resumeType,
            resume_name: resumeName,
          }
      : setSocial
      ? {
          name: name,
          email: email.trim().toLowerCase(),
          role: userType || selectUser,
          phone_number: userData?.data?.phone_number
            ? userData?.data?.phone_number == 'undefined'
              ? '1234567896'
              : userData?.data?.phone_number
            : '1234567896',
          country_code: userData?.data?.country_code
            ? userData?.data?.country_code == 'undefined'
              ? '91'
              : userData?.data?.country_code
            : '91',
          company_name: companyName,
          company_email: companyEmail,
          company_phone: companyPhone,
          business_address: businessAddress,
          business_number: businessNumber,
          about_company: aboutCompany,
          image: userImage,
          from_social: setSocial,
          is_create: true,
          user_id: userData?.data?._id,
          uid: route?.params?.result?.data?.uid || data.data?.uid,
          provider:
            route?.params?.result?.data?.provider || data.data?.provider,
        }
      : {
          name: name,
          email: email.trim().toLowerCase(),
          role: userType || selectUser,
          phone_number: userData?.data?.phone_number
            ? userData?.data?.phone_number == 'undefined'
              ? '1234567896'
              : userData?.data?.phone_number
            : '1234567896',
          country_code: userData?.data?.country_code
            ? userData?.data?.country_code == 'undefined'
              ? '91'
              : userData?.data?.country_code
            : '91',
          company_name: companyName,
          company_email: companyEmail,
          company_phone: companyPhone,
          business_address: businessAddress,
          business_number: businessNumber,
          about_company: aboutCompany,
          image: userImage,
          from_social: setSocial,
          is_create: true,
          user_id: userData?.data?._id,
        };
  return details;
};
