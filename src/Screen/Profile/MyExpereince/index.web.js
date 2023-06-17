/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Colors from '../../../Resources/Colors';
import { useDispatch, useSelector } from 'react-redux';
import EndPoint from '../../../Redux/constants/EndPoint';
import { style } from '../styles';
import Strings from '../../../Resources/Strings';
import {
  fetchMyProfile,
  fetchOrganizationMyProfile,
  fetchRecruiterMyProfile,
  updateMyProfile,
  updateOrganizationMyProfile,
  updateRecruiterMyProfile,
} from '../../../Redux/actions/profileAction';
import {
  ContainerView,
  CustomText,
  CustomView,
  Image,
} from '../../../Component/CustomComponent';
import {
  DotIcon,
  Email,
  Call,
  CompanyIcon,
} from '../../../Resources/assets/ProfileAssets';
import CustomButton from '../../../Component/CustomButton';
import { dummyImage, pdfIcon, webEditIcon } from '../../../Resources/assets';
import DetailsComponent from '../../../Component/DetailsComponent';
import AddressComponent from '../../../Component/AddressComponent';
import WorkExperienceComponent from '../../../Component/WorkExperienceComponent';
import { useNavigation } from '@react-navigation/native';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { styles } from './style';
import { theme } from '../../../Util/constant';
import UpdateBasicDetails from './UpdateBasicDetails';
import UpdateWorkExperence from './UpdateWorkExperence';
import UpdateCertificate from './UpdateCertificate';
import moment from 'moment';
import toast from 'react-simple-toasts';
import { setLoading } from '../../../Redux/actions/authAction';
import CustomHeader from '../../../Component/CustomHeader';
import { fontResize } from '../../../Util/font';
import CustomInputText from '../../../Component/CustomInputText';
import Emitter from '../../../Util/eventEmitter';
import {
  containsOnlyEmail,
  containsOnlyNumbers,
  containsOnlyPhone,
  containsOnlyStrings,
} from '../../../Util/validation';
import Type from '../../../Constants/Type/type';
import CustomEducationComponent from '../../../Component/CustomEducationComponent';

const MyExpereince = () => {
  const window = useWindowDimensions();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state?.profile?.myProfile);
  const userData = useSelector((state) => state.auth.userData);
  const token = useSelector((state) => state.auth.token);
  const type = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;

  const [isBasicDetails, setBasicDetails] = useState(false);
  const [isExperenceDetails, setExperenceDetails] = useState(false);
  const [isCertificateDetails, setCertificateDetails] = useState(false);
  const [certificateData, setCertificateData] = useState({
    allCertificate: [
      {
        id: 0,
        title: '',
        company_name: '',
        start_date: '',
        end_date: '',
        certificate_image: '',
        is_currently_working: false,
      },
    ],
  });

  const [educationData, setEducationData] = useState({
    allEducations: [
      {
        id: '',
        school: '',
        degree_title: '',
        study: '',
      },
    ],
  });

  const [experienceData, setExperienceData] = useState({
    allExperience: [
      {
        id: 0,
        company_name: '',
        your_role: '',
        start_date: '',
        end_date: '',
        your_experience: '',
        is_currently_working: false,
      },
    ],
  });

  const [localeFile, setLocaleFile] = useState(userInfo?.link_your_resume);
  const [userImage, setuserImage] = useState(
    type == Strings.PROFESSIONAL
      ? userInfo?.image
        ? userInfo?.image
        : ''
      : userInfo?.userinfo?.profile_pic
      ? userInfo?.userinfo?.profile_pic
      : ''
  );
  const [companyImage, setCompanyImage] = useState(
    userInfo?.image ? userInfo?.image : ''
  );
  const [name, setName] = useState(userInfo?.name);
  const [companyName, setCompanyName] = useState(
    userInfo?.userinfo?.company_name
  );
  const [companyEmail, setCompanyEmail] = useState(
    userInfo?.userinfo?.company_email
  );
  const [companyPhone, setCompanyPhone] = useState(
    userInfo?.userinfo?.company_phone
  );
  const [companyAddress, setCompanyAddress] = useState(
    userInfo?.userinfo?.business_address
  );
  const [businessNumber, setBusinessNumber] = useState(
    userInfo?.userinfo?.business_number
  );
  const [aboutCompany, setAboutCompany] = useState(
    userInfo?.userinfo?.about_company
  );
  var inputRef = useRef(null);

  const [phone, setPhone] = useState(
    userInfo?.phone_number ? userInfo?.phone_number : ''
  );
  const jobSalaryRangeList = [
    '0 - 100',
    '100 - 1000',
    '1000 - 5000',
    '5000 - 90000',
  ];
  const companyinfoData =
    userInfo?.companyinfo == null ? '' : userInfo?.companyinfo || '';
  const [email, setEmail] = useState(userInfo?.email);
  const [about, setAbout] = useState(
    userInfo?.about_me || userInfo?.userinfo?.about_company
  );
  const [address, setAddress] = useState(userInfo?.userinfo?.business_address);
  const [website, setwebsite] = useState(userInfo?.userinfo?.website);
  const [industry, setIndustry] = useState(companyinfoData?.industry);
  const [founded, setFounded] = useState(companyinfoData?.founded);
  const [sizeOfComapny, setSizeCompany] = useState(
    companyinfoData?.size_of_company || jobSalaryRangeList[0]
  );
  const [headquarters, setHeadquarters] = useState(
    companyinfoData?.headquarters
  );
  const [userBackground, setUserBackground] = useState(
    userInfo?.cover_photo ? userInfo?.cover_photo : ''
  );

  useEffect(() => {
    // get user information
    fetchProProfile();

    setCertificateInfoData();
  }, []);

  const fetchProProfile = () => {
    if (type === Strings.PROFESSIONAL) {
      dispatch(
        fetchMyProfile({
          token,
          onSuccess: (result) => {
            if (userInfo?.education_info?.length != 0) {
              var updateEducation = userInfo?.education_info?.map(
                (item, index) => {
                  let cureentData = {
                    id: item?._id ? item?._id : '',
                    school: item?.school ? item?.school : '',
                    degree_title: item?.degree_title ? item?.degree_title : '',
                    study: item?.study ? item?.study : '',
                  };
                  return cureentData;
                }
              );
              setEducationData({
                ...educationData,
                allEducations: updateEducation,
              });
            }
          },
          onError: (error) => {},
        })
      );
    } else if (type === Strings.RECRUITER) {
      dispatch(
        fetchRecruiterMyProfile({
          token,
          onSuccess: (result) => {},
          onError: (error) => {},
        })
      );
    } else if (type === Strings.ORGANIZATION) {
      dispatch(
        fetchOrganizationMyProfile({
          token,
          onSuccess: (result) => {},
          onError: (error) => {},
        })
      );
    }
  };

  const setCertificateInfoData = () => {
    if (type === Strings.PROFESSIONAL) {
      // set work experience professional user
      if (userInfo?.work_info?.length != 0) {
        var updateExp = userInfo?.work_info?.map((item, index) => {
          var startD = moment(item?.start_date, 'YYYY-MM-DD');
          var endD = moment(item?.end_date, 'YYYY-MM-DD');
          let cureentData = {
            id: item?._id ? item?._id : index,
            company_name: item?.company_name ? item?.company_name : '',
            your_role: item?.your_role ? item?.your_role : '',
            start_date: item?.start_date ? new Date(startD) : '',
            end_date: item?.end_date ? new Date(endD) : '',
            your_experience: item?.your_experience ? item?.your_experience : '',
            is_currently_working: item?.is_currently_working
              ? item?.is_currently_working
              : false,
          };
          return cureentData;
        });
        setExperienceData({ ...experienceData, allExperience: updateExp });
      }

      if (userInfo?.certificates?.length != 0) {
        var updateCertificate = userInfo?.certificates?.map((item, index) => {
          var startD = moment(item?.start_date, 'YYYY-MM-DD');
          var endD = moment(item?.end_date, 'YYYY-MM-DD');
          let cureentData = {
            id: item?._id ? item?._id : index,
            title: item?.title ? item?.title : '',
            company_name: item?.company_name ? item?.company_name : '',
            start_date: item?.start_date ? new Date(startD) : '',
            end_date: item?.end_date ? new Date(endD) : '',
            certificate_image: item?.certificate_image
              ? item?.certificate_image
              : '',
          };
          return cureentData;
        });
        setCertificateData({
          ...certificateData,
          allCertificate: updateCertificate,
        });
      }
    }
  };

  const addNewCertificate = () => {
    var indexs = certificateData.allCertificate.length - 1;
    if (certificateData.allCertificate[indexs].title == '') {
      toast('Certificate field are empty');
    } else {
      let newData = {
        id: certificateData.allCertificate.length,
        title: '',
        company_name: '',
        start_date: '',
        end_date: '',
        certificate_image: '',
        is_currently_working: false,
      };
      var updateData = certificateData.allCertificate;
      updateData.push(newData);
      setCertificateData({ ...certificateData, allCertificate: updateData });
    }
  };

  const updateCertificateValue = ({ index, text, key }) => {
    let updateItem = certificateData.allCertificate.map((item, i) => {
      if (i === index) {
        if (key === 'title') {
          return { ...item, title: text };
        } else if (key === 'company_name') {
          return { ...item, company_name: text };
        }
      }
      return item;
    });
    setCertificateData({ ...certificateData, allCertificate: updateItem });
  };

  const updateEducation = ({ index, text, key }) => {
    let updateItem = educationData.allEducations.map((item, i) => {
      if (i == index) {
        if (key == Type.EDUCATION.EDUCATION_NAME) {
          return { ...item, school: text };
        } else if (key == Type.EDUCATION.DEGREE) {
          return { ...item, degree_title: text };
        } else if (key == Type.EDUCATION.FIELD_OF_STUDY) {
          return { ...item, study: text };
        }
      }
      return item;
    });
    setEducationData({ ...educationData, allEducations: updateItem });
  };

  const removeEducation = ({ index }) => {
    var updateData = educationData.allEducations;
    updateData.splice(index, 1);
    setEducationData({ ...educationData, allEducations: updateData });
  };

  const updateCertificateImage = (updateCertificate) => {
    setCertificateData({
      ...certificateData,
      allCertificate: updateCertificate,
    });
  };

  const addNewEducation = () => {
    var index = educationData.allEducations.length - 1;
    if (educationData.allEducations[index].school == '') {
      toast(Strings.EDUCATION_TYPE.EDUCATION_NAME_ERROR);
    } else if (educationData.allEducations[index].degree_title == '') {
      toast(Strings.EDUCATION_TYPE.DEGREE_TITLE_ERROR);
    } else if (educationData.allEducations[index].study == '') {
      toast(Strings.EDUCATION_TYPE.FIELD_OF_STUDY_ERROR);
    } else {
      let newData = {
        id: '',
        school: '',
        degree_title: '',
        study: '',
      };
      var updateData = educationData.allEducations;
      updateData.push(newData);
      setEducationData({ ...educationData, allEducations: updateData });
    }
  };

  // Work Experience list render
  const renderItem = ({ item, index }) => {
    return (
      <WorkExperienceComponent
        data={item}
        image={CompanyIcon}
        title={item?.your_role}
        date={item.start_date}
        jobType={''}
        Experience={'one year'}
        role={item?.company_name ? item?.company_name : 'XYZ'}
        startDate={item?.start_date}
        endDate={item?.end_date}
      />
    );
  };

  // certificate list render
  const certificateRenderItem = ({ item, index }) => {
    return (
      <WorkExperienceComponent
        data={item}
        image={
          item.certificate_image
            ? {
                uri: `${EndPoint.baseAssestURL}${item.certificate_image}`,
              }
            : CompanyIcon
        }
        title={item?.title}
        date={item.start_date}
        startDate={item?.start_date}
        endDate={item?.end_date}
        jobType={''}
        Experience={'one year'}
        role={item?.company_name ? item?.company_name : 'XYZ'}
      />
    );
  };

  const editExperenceDetails = () => {
    if (isExperenceDetails) {
      setExperenceDetails(!isExperenceDetails);
      if (type === Strings.RECRUITER) {
        updateRecruiterBasicData();
      } else if (type === Strings.ORGANIZATION) {
        updateOrganizationBasicData();
      } else {
        updateExperenceDetails();
      }
    } else {
      setExperenceDetails(!isExperenceDetails);
    }
  };
  const editBasicDetails = () => {
    if (isBasicDetails) {
      if (type === Strings.RECRUITER) {
        updateRecruiterBasicData();
        setBasicDetails(!isBasicDetails);
      } else if (type === Strings.ORGANIZATION) {
        updateOrganizationBasicData();
        setBasicDetails(!isBasicDetails);
      } else {
        updateBasicData();
      }
    } else {
      setBasicDetails(!isBasicDetails);
    }
  };
  const editCertificateDetails = () => {
    try {
      if (isCertificateDetails) {
        setCertificateDetails(!isCertificateDetails);
        if (type === Strings.RECRUITER) {
        } else {
          updateExperenceDetails();
        }
      } else {
        setCertificateDetails(!isCertificateDetails);
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
    }
  };

  const onValidation = () => {
    var isValid = true;
    var educationLastIndex = educationData?.allEducations.length - 1;
    if (type == Strings.PROFESSIONAL) {
      if (
        educationData?.allEducations[educationLastIndex]?.school.length == 0
      ) {
        isValid = false;
        toast(Strings.EDUCATION_TYPE.EMPTY_EDUCATION);
      } else if (
        educationData?.allEducations[educationLastIndex]?.degree_title.length ==
        0
      ) {
        isValid = false;
        toast(Strings.EDUCATION_TYPE.EMPTY_DEGREE);
      } else if (
        educationData?.allEducations[educationLastIndex]?.study.length == 0
      ) {
        isValid = false;
        toast(Strings.EDUCATION_TYPE.EMPTY_STUDY);
      }
    }
    return isValid;
  };

  const updateBasicData = () => {
    try {
      if (onValidation()) {
        const workExperienceData = experienceData.allExperience.filter(
          (item) => item.your_role !== ''
        );
        const allCertificateData = certificateData.allCertificate.filter(
          (item) => item.title !== ''
        );
        let data = {
          image: userImage,
          cover_photo: userBackground,
          name: name,
          email: email,
          phone_number: phone,
          country_code: userInfo?.country_code,
          about_me: about,
          work_info: workExperienceData,
          certificates: allCertificateData,
          is_hide: false,
          link_your_resume: localeFile,
          education_info: educationData?.allEducations,
        };
        let id = userInfo?._id;

        dispatch(setLoading(true));
        dispatch(
          updateMyProfile({
            token,
            data,
            id,
            onSuccess: (result) => {
              if (result.code === 200) {
                toast(result.message);
                setBasicDetails(!isBasicDetails);
                dispatch(setLoading(false));
                dispatch(
                  fetchMyProfile({
                    token,
                    onSuccess: (result) => {
                      setCertificateInfoData();
                      dispatch(setLoading(false));
                    },
                    onError: (error) => {
                      dispatch(setLoading(false));
                      console.log('error');
                    },
                  })
                );
              }
              dispatch(setLoading(false));
            },
            onError: (error) => {
              dispatch(setLoading(false));
              console.log('error', error?.response?.data || error);
            },
          })
        );
      }
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  const updateOrganizationBasicData = () => {
    try {
      let data = {
        name: userInfo?.name || '',
        business_number: userInfo?.userinfo?.business_number || '',
        profile_pic: userImage || userInfo?.userinfo?.image,
        image: userInfo?.image || '',
        cover_pic: userBackground || userInfo?.userinfo?.cover_pic || '',
        company_name: name || userInfo?.userinfo?.company_name,
        company_email: email || userInfo?.userinfo?.company_email,
        company_phone: phone || userInfo?.userinfo?.company_phone,
        about_company: about || userInfo?.userinfo?.about_company,
        business_address: address || userInfo?.userinfo?.business_address,
        website: website || userInfo?.userinfo?.website,
        industry: industry || companyinfoData?.industry,
        headquarters: headquarters || companyinfoData?.headquarters,
        founded: founded || companyinfoData?.founded,
        size_of_company: sizeOfComapny || companyinfoData?.size_of_company,
      };

      let id = userInfo?._id;
      dispatch(setLoading(true));
      dispatch(
        updateOrganizationMyProfile({
          token,
          data,
          id,
          onSuccess: (result) => {
            if (result.code === 200) {
              toast(result.message);

              dispatch(setLoading(false));
              dispatch(
                fetchMyProfile({
                  token,
                  onSuccess: (result) => {
                    setCertificateInfoData();
                    dispatch(setLoading(false));
                  },
                  onError: (error) => {
                    dispatch(setLoading(false));
                    console.log('error');
                  },
                })
              );
            }
            dispatch(setLoading(false));
          },
          onError: (error) => {
            dispatch(setLoading(false));
            console.log('error', error?.response?.data || error);
          },
        })
      );
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  const updateRecruiterBasicData = () => {
    try {
      let data = {
        email: email,
        phone_number: phone,
        country_code: userInfo?.country_code,
        name: name ? name : userInfo?.name || '',
        business_number: businessNumber
          ? businessNumber
          : userInfo?.userinfo?.business_number || '',
        profile_pic: userImage || userInfo?.userinfo?.image,
        image: companyImage || userInfo?.image || '',
        cover_pic: userBackground || userInfo?.userinfo?.cover_pic || '',
        company_name: companyName || userInfo?.userinfo?.company_name,
        company_email: companyEmail || userInfo?.userinfo?.company_email,
        company_phone: companyPhone || userInfo?.userinfo?.company_phone,
        about_company: aboutCompany || userInfo?.userinfo?.about_company,
        business_address:
          companyAddress || userInfo?.userinfo?.business_address,
        website: website || userInfo?.userinfo?.website,
        industry: industry || companyinfoData?.industry,
        headquarters: headquarters || companyinfoData?.headquarters,
        founded: founded || companyinfoData?.founded,
        size_of_company: sizeOfComapny || companyinfoData?.size_of_company,
      };

      let id = userInfo?._id;
      dispatch(setLoading(true));
      dispatch(
        updateRecruiterMyProfile({
          token,
          data,
          id,
          onSuccess: (result) => {
            if (result.code === 200) {
              toast(result.message);
              Emitter.emit('profileUpdate');
              dispatch(setLoading(false));
              fetchProProfile();
            }
            dispatch(setLoading(false));
          },
          onError: (error) => {
            dispatch(setLoading(false));
            console.log('error', error?.response?.data || error);
          },
        })
      );
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  const setChangeFile = ({ type, value }) => {
    switch (type) {
      case 'name':
        if (containsOnlyStrings(value)) {
          setName(value);
        }
        if (value == '') {
          setName('');
        }
        break;
      case 'email':
        if (containsOnlyEmail(value)) {
          setEmail(value);
        }
        if (value == '') {
          setEmail('');
        }
        break;
      case 'phone':
        if (containsOnlyPhone(value)) {
          setPhone(value);
        }
        if (value == '') {
          setPhone('');
        }
        break;
      case 'about':
        if (containsOnlyStrings(value)) {
          setAbout(value);
        }
        if (value == '') {
          setAbout('');
        }
        break;
      case 'address':
        if (containsOnlyStrings(value)) {
          setAddress(value);
        }
        if (value == '') {
          setAddress('');
        }
        break;
      case 'website':
        setwebsite(value);
        break;
      case 'user_image':
        setuserImage(value);
        break;
      case 'local_file':
        setLocaleFile(value);
        break;
      case 'coverimage':
        setUserBackground(value);
        break;
    }
  };

  const updateCompanyValue = ({ type, value }) => {
    switch (type) {
      case 'industry':
        if (containsOnlyStrings(value)) {
          setIndustry(value);
        }
        if (value == '') {
          setIndustry('');
        }
        break;
      case 'size of company':
        if (containsOnlyNumbers(value)) {
          setSizeCompany(value);
        }
        if (value == '') {
          setSizeCompany('');
        }
        break;
      case 'headquarters':
        if (containsOnlyStrings(value)) {
          setHeadquarters(value);
        }
        if (value == '') {
          setHeadquarters('');
        }
        break;
      case 'founded':
        if (containsOnlyStrings(value)) {
          setFounded(value);
        }
        if (value == '') {
          setFounded('');
        }
        break;
      case 'companyAddress':
        if (containsOnlyStrings(value)) {
          setCompanyAddress(value);
        }
        if (value == '') {
          setCompanyAddress('');
        }
        break;
      case 'companyName':
        if (containsOnlyStrings(value)) {
          setCompanyName(value);
        }
        if (value == '') {
          setCompanyName('');
        }
        break;
      case 'companyEmail':
        if (containsOnlyEmail(value)) {
          setCompanyEmail(value);
        }
        if (value == '') {
          setCompanyEmail('');
        }
        break;
      case 'companyPhone':
        if (containsOnlyPhone(value)) {
          setCompanyPhone(value);
        }
        if (value == '') {
          setCompanyPhone('');
        }
        break;
      case 'companyImage':
        setCompanyImage(value);
        break;
      case 'businessPhone':
        if (containsOnlyPhone(value)) {
          setBusinessNumber(value);
        }
        if (value == '') {
          setBusinessNumber('');
        }
        break;
      case 'aboutCompany':
        if (containsOnlyStrings(value)) {
          setAboutCompany(value);
        }
        if (value == '') {
          setAboutCompany('');
        }
        break;
    }
  };
  const updateExperenceDetails = () => {
    try {
      const workExperienceData = experienceData.allExperience.filter(
        (item) => item.your_role !== ''
      );
      const allCertificateData = certificateData.allCertificate.filter(
        (item) => item.title !== ''
      );
      let data = {
        image: userInfo.image,
        cover_photo: userInfo?.cover_photo || '',
        name: userInfo.name,
        email: userInfo.email,
        phone_number: userInfo?.phone_number,
        country_code: userInfo?.country_code,
        about_me: userInfo.about_me,
        work_info: workExperienceData,
        certificates: allCertificateData,
        is_hide: false,
        link_your_resume: userInfo?.link_your_resume,
      };
      let id = userInfo?._id;

      dispatch(setLoading(true));
      dispatch(
        updateMyProfile({
          token,
          data,
          id,
          onSuccess: (result) => {
            if (result.code === 200) {
              toast(result.message);

              dispatch(setLoading(false));
              dispatch(
                fetchMyProfile({
                  token,
                  onSuccess: (result) => {
                    setCertificateInfoData();
                    dispatch(setLoading(false));
                  },
                  onError: (error) => {
                    dispatch(setLoading(false));
                  },
                })
              );
            }
            dispatch(setLoading(false));
          },
          onError: (error) => {
            dispatch(setLoading(false));
            console.log('error', error?.response?.data || error);
          },
        })
      );
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  const updateValue = ({ index, text, key }) => {
    let updateItem = experienceData.allExperience.map((item, i) => {
      if (i === index) {
        if (key === 'your role') {
          return { ...item, your_role: text };
        } else if (key === 'your experience') {
          return { ...item, your_experience: text };
        } else if (key === 'company_name') {
          return { ...item, company_name: text };
        } else if (key === 'currently_working') {
          return { ...item, is_currently_working: text };
        }
      }
      return item;
    });
    setExperienceData({ ...experienceData, allExperience: updateItem });
  };

  const addNewData = () => {
    var index = experienceData.allExperience.length - 1;
    if (experienceData.allExperience[index].your_role == '') {
      toast('Work experience field are empty');
    } else {
      let newData = {
        id: experienceData.allExperience.length,
        your_role: '',
        start_date: '',
        end_date: '',
        your_experience: '',
      };
      var updateData = experienceData.allExperience;
      updateData.push(newData);
      setExperienceData({ ...experienceData, allExperience: updateData });
    }
  };
  const setExperience = (data) => {
    setExperienceData({
      ...experienceData,
      allExperience: data,
    });
  };

  return (
    <>
      <CustomHeader
        window={window}
        activeTab={''}
        isProfile={true}
        backPress={() => navigation.goBack()}
      />
      <View style={[styles.webContainer, { marginTop: '1%' }]}>
        {/* User basic information view */}

        <View style={styles.subContainer}>
          {/* user basic information edit button */}
          <TouchableOpacity
            style={[
              styles.editWebBtn,
              isBasicDetails
                ? {
                    backgroundColor: Colors.UFOGreen1,
                    padding: 5,
                    borderRadius: 5,
                  }
                : {},
            ]}
            onPress={() => {
              editBasicDetails();
            }}
          >
            {!isBasicDetails && (
              <Image
                resizeMode={'contain'}
                height={'15px'}
                width={'15px'}
                source={webEditIcon}
              />
            )}
            <CustomText
              fontSize="14px"
              marginLeft="5px"
              style={{ ...theme.fontMedium }}
              textColor={isBasicDetails ? Colors.UFOGreen : Colors.Blueberry}
            >
              {isBasicDetails ? Strings.APPLY_CHANGES : Strings.EDIT_DETAILS}
            </CustomText>
          </TouchableOpacity>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            {isBasicDetails ? (
              <View style={[style.webContainer, { marginBottom: '10%' }]}>
                <UpdateBasicDetails
                  window={window}
                  userData={userData}
                  userInfo={userInfo}
                  name={name}
                  email={email}
                  phone={phone}
                  about={about}
                  address={address}
                  website={website}
                  userImage={
                    userImage != ''
                      ? userImage
                      : type === Strings.PROFESSIONAL
                      ? userInfo?.image
                        ? userInfo?.image
                        : ''
                      : userInfo?.userinfo?.profile_pic
                      ? userInfo?.userinfo.profile_pic
                      : ''
                  }
                  localeFile={localeFile}
                  setChangeFile={setChangeFile}
                  userBackground={userBackground}
                />

                {type == Strings.PROFESSIONAL && (
                  <Text style={style.aboutTx}>{Strings.EDUCATION}</Text>
                )}

                {type == Strings.PROFESSIONAL &&
                  educationData.allEducations.map((data, index) => {
                    return (
                      <View style={{ width: '100%' }}>
                        <CustomInputText
                          marginTop={'5%'}
                          width={'100%'}
                          editable={true}
                          label={Strings.EDUCATION_TYPE.EDUCATION_NAME}
                          value={data?.school}
                          window={window}
                          onChangeText={(text) => {
                            updateEducation({
                              index,
                              text,
                              key: Type.EDUCATION.EDUCATION_NAME,
                            });
                          }}
                        />

                        <CustomInputText
                          marginTop={'5%'}
                          width={'100%'}
                          editable={true}
                          label={Strings.EDUCATION_TYPE.DEGREE_TITLE}
                          value={data?.degree_title}
                          window={window}
                          onChangeText={(text) => {
                            updateEducation({
                              index,
                              text,
                              key: Type.EDUCATION.DEGREE,
                            });
                          }}
                        />

                        <CustomInputText
                          marginTop={'5%'}
                          width={'100%'}
                          editable={true}
                          label={Strings.EDUCATION_TYPE.FIELD_OF_STUDY}
                          value={data?.study}
                          window={window}
                          onChangeText={(text) => {
                            updateEducation({
                              index,
                              text,
                              key: Type.EDUCATION.FIELD_OF_STUDY,
                            });
                          }}
                        />

                        {educationData.allEducations.length - 1 != index && (
                          <CustomView
                            marginTop={'5%'}
                            width={window.width * 0.98}
                            height={'1px'}
                            bgColor={Colors.PrimaryGray}
                            marginLeft={window.width * 0.01}
                            marginBottom={window.height * 0.02}
                          />
                        )}

                        {index != 0 && data?.id.length == 0 && (
                          <CustomButton
                            onPress={() => {
                              removeEducation({ index });
                            }}
                            width={'40%'}
                            height={'50px'}
                            backgroundColor={Colors.PrimaryLightGray}
                            marginTop={window.height * 0.03}
                            marginBottom={window.height * 0.03}
                            borderRadius={'10px'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            fontFamily={'Gilroy-SemiBold'}
                            fontSize={'18px'}
                            textColor={Colors.Blueberry}
                            text={Strings.CANCEL}
                            borderWidth={1}
                            borderColor={Colors.Blueberry}
                            alignSelf={'flex-end'}
                            buttonContainer={{
                              shadowColor: Colors.Blueberry,
                              shadowOffset: { width: 0, height: 5 },
                              shadowOpacity: 0.8,
                              elevation: 1,
                            }}
                          />
                        )}
                      </View>
                    );
                  })}

                <CustomButton
                  onPress={() => {
                    addNewEducation();
                  }}
                  width={'40%'}
                  height={'50px'}
                  backgroundColor={Colors.PrimaryLightGray}
                  marginTop={window.height * 0.03}
                  marginBottom={window.height * 0.03}
                  borderRadius={'10px'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  fontFamily={'Gilroy-SemiBold'}
                  fontSize={'18px'}
                  textColor={Colors.Blueberry}
                  text={Strings.ADD_NEW}
                  borderWidth={1}
                  borderColor={Colors.Blueberry}
                  alignSelf={'flex-end'}
                  buttonContainer={{
                    shadowColor: Colors.Blueberry,
                    shadowOffset: { width: 0, height: 5 },
                    shadowOpacity: 0.8,
                    elevation: 1,
                  }}
                />
              </View>
            ) : (
              <View style={[style.webContainer, { marginBottom: '10%' }]}>
                <Image
                  style={{
                    height: window?.height * 0.1,
                    width: window?.height * 0.1,
                    borderRadius: window?.height * 0.2,
                    alignSelf: 'center',
                  }}
                  resizeMode="cover"
                  source={
                    type == Strings.PROFESSIONAL
                      ? userInfo?.image
                        ? {
                            uri: `${EndPoint.baseAssestURL}${userInfo?.image}`,
                          }
                        : dummyImage
                      : userInfo?.userinfo?.profile_pic
                      ? {
                          uri: `${EndPoint.baseAssestURL}${userInfo?.userinfo?.profile_pic}`,
                        }
                      : dummyImage
                  }
                />

                <View style={style.userDetailsVw}>
                  <Text style={style.userNameTx}>
                    {userInfo?.name ? userInfo?.name : ''}
                  </Text>
                  <Text style={style.userRoleTx}>
                    {type === Strings.PROFESSIONAL
                      ? userInfo?.work_info != null &&
                        userInfo?.work_info.length > 0
                        ? `${
                            userInfo?.work_info[0].is_currently_working
                              ? userInfo?.work_info[0]?.company_name
                              : userInfo?.work_info[
                                  userInfo?.work_info.length - 1
                                ]?.company_name
                          } \u25CF\n ${
                            userInfo?.education_info != null &&
                            userInfo?.education_info.length > 0
                              ? userInfo?.education_info[
                                  userInfo?.education_info.length - 1
                                ].school
                              : ''
                          }`
                        : ''
                      : ''}
                  </Text>
                  <View style={style.connectionView}>
                    <Text
                      style={style.connectionTx}
                    >{`${userInfo.followers} ${Strings.CONNECTIONS}`}</Text>
                  </View>

                  <View style={style.webProfileCompleteVw}>
                    <Text style={style.profileCompletionTx}>
                      {Strings.PROFILE_COMPLETION}
                    </Text>
                    <View style={style.webEmptyVw} />
                    <View style={{ width: 40, height: 40 }}>
                      <CircularProgressbar
                        value={userInfo?.profile_completion || 10}
                        text={`${userInfo?.profile_completion || 10}%`}
                      />
                    </View>
                  </View>
                  <View style={style.lineVw} />

                  <DetailsComponent
                    imageWidth={20}
                    onPress={() => {}}
                    title={Strings.CONTACT_INFO}
                    containerStyle={[
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 10,
                        width: '100%',
                      },
                      style.profileMarginBottom,
                      style.profileMarginTop,
                    ]}
                  />
                  <AddressComponent
                    image={Email}
                    text={userInfo?.email ? userInfo?.email : ''}
                  />
                  <AddressComponent
                    image={Call}
                    text={
                      userInfo?.phone_number
                        ? `${userInfo?.country_code} ${userInfo?.phone_number}`
                        : ''
                    }
                  />

                  {type == Strings.PROFESSIONAL && userInfo?.about_me ? (
                    <>
                      <Text style={style.aboutTx}>{Strings.ABOUT}</Text>
                      <Text style={style.aboutDetailsTx}>
                        {userInfo?.about_me
                          ? userInfo?.about_me
                          : userInfo?.userinfo?.about_company
                          ? userInfo?.userinfo?.about_company
                          : ''}
                      </Text>
                    </>
                  ) : (
                    <View />
                  )}

                  {type == Strings.PROFESSIONAL && (
                    <>
                      <Text style={style.aboutTx}>{Strings.EDUCATION}</Text>
                      {userInfo?.education_info?.map((item, index) => (
                        <CustomEducationComponent data={item} />
                      ))}
                    </>
                  )}
                </View>
              </View>
            )}
          </ScrollView>
        </View>
        <View style={styles.subContainer}>
          {/* user work experience edit button */}
          <TouchableOpacity
            style={[
              styles.editWebBtn,
              isExperenceDetails
                ? {
                    backgroundColor: Colors.UFOGreen1,
                    padding: 5,
                    borderRadius: 5,
                  }
                : {},
            ]}
            onPress={() => {
              editExperenceDetails();
            }}
          >
            {!isExperenceDetails && (
              <Image
                resizeMode={'contain'}
                height={'15px'}
                width={'15px'}
                source={webEditIcon}
              />
            )}
            <CustomText
              fontSize="14px"
              marginLeft="5px"
              style={{ ...theme.fontMedium }}
              textColor={
                isExperenceDetails ? Colors.UFOGreen : Colors.Blueberry
              }
            >
              {isExperenceDetails
                ? Strings.APPLY_CHANGES
                : Strings.EDIT_DETAILS}
            </CustomText>
          </TouchableOpacity>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            {isExperenceDetails ? (
              <View style={style.webContainer}>
                <UpdateWorkExperence
                  window={window}
                  experienceData={experienceData}
                  companyinfoData={companyinfoData}
                  updateValue={updateValue}
                  updateCompanyValue={updateCompanyValue}
                  addNewData={addNewData}
                  companyName={companyName}
                  companyEmail={companyEmail}
                  companyPhone={companyPhone}
                  companyAddress={companyAddress}
                  businessNumber={businessNumber}
                  aboutCompany={aboutCompany}
                  setExperience={setExperience}
                  industry={industry}
                  sizeOfComapny={sizeOfComapny}
                  headquarters={headquarters}
                  founded={founded}
                  companyImage={companyImage}
                  setChangeFile={setChangeFile}
                />
              </View>
            ) : (
              <View style={style.webContainer}>
                {type == Strings.PROFESSIONAL ? (
                  <>
                    <Text style={style.aboutTx}>{Strings.WORK_EXPERIENCE}</Text>
                    {/* view work experience */}
                    <FlatList
                      style={{ marginTop: 20 }}
                      bounces={false}
                      data={userInfo?.work_info}
                      renderItem={renderItem}
                      ListFooterComponent={
                        <View>
                          {userInfo?.link_your_resume && (
                            <>
                              <Text style={style.aboutTx}>{'Resume'}</Text>
                              <View style={style.pdfVw}>
                                <Image
                                  resizeMode="contain"
                                  style={{ width: 40, height: 40 }}
                                  source={pdfIcon}
                                />
                                <Text style={style.cvtx}>{'Resume.pdf'}</Text>
                              </View>
                            </>
                          )}
                        </View>
                      }
                    />
                  </>
                ) : (
                  <View>
                    <ContainerView
                      marginTop={window?.height * 0.05}
                      marginBottom={window?.height * 0.05}
                      width={'100%'}
                      flexDirection={'row'}
                      alignItems={'center'}
                    >
                      <CustomText
                        fontSize={fontResize(window?.height * 0.02)}
                        fontFamily={'Gilroy-Medium'}
                        textColor={Colors.EerieBlack}
                      >
                        {Strings.COMPANY_INFO}
                      </CustomText>
                      <CustomView
                        width={'70%'}
                        marginLeft={'5%'}
                        height={'1px'}
                        bgColor={Colors.PrimaryGray}
                      />
                    </ContainerView>

                    {type == Strings.RECRUITER && (
                      <View>
                        <Image
                          style={{
                            height: window?.height * 0.1,
                            width: window?.height * 0.1,
                            borderRadius: window?.height * 0.2,
                            alignSelf: 'center',
                          }}
                          resizeMode="cover"
                          source={
                            userInfo?.userinfo?.image
                              ? {
                                  uri: `${EndPoint.baseAssestURL}${userInfo.userinfo.image}`,
                                }
                              : dummyImage
                          }
                        />

                        <CustomInputText
                          marginTop={'5%'}
                          width={'100%'}
                          editable={false}
                          label={Strings.COMPANY_NAME}
                          value={companyName}
                          window={window}
                        />

                        <CustomInputText
                          marginTop={'5%'}
                          width={'100%'}
                          editable={false}
                          label={Strings.COMPANY_EMAIL}
                          value={companyEmail}
                          window={window}
                        />

                        <CustomInputText
                          marginTop={'5%'}
                          width={'100%'}
                          editable={false}
                          label={Strings.COMPANY_PHONE}
                          value={companyPhone}
                          window={window}
                        />

                        <CustomInputText
                          marginTop={'5%'}
                          width={'100%'}
                          editable={false}
                          label={Strings.BUSINESS_ADDRESS}
                          value={companyAddress}
                          window={window}
                        />

                        <CustomInputText
                          marginTop={'5%'}
                          width={'100%'}
                          editable={false}
                          label={Strings.BUSINESS_NUMBER}
                          value={businessNumber}
                          window={window}
                        />
                      </View>
                    )}

                    <CustomInputText
                      marginTop={'5%'}
                      width={'100%'}
                      editable={false}
                      label={Strings.INDUSTRY}
                      value={industry}
                      window={window}
                    />

                    <CustomInputText
                      marginTop={'5%'}
                      width={'100%'}
                      editable={false}
                      label={Strings.SIZE_OF_COMPANY}
                      errorMessage={''}
                      value={sizeOfComapny}
                      window={window}
                    />

                    <CustomInputText
                      marginTop={'5%'}
                      width={'100%'}
                      editable={false}
                      label={Strings.HEADQUARTES}
                      errorMessage={''}
                      value={headquarters}
                      window={window}
                    />

                    <CustomInputText
                      marginTop={'5%'}
                      width={'100%'}
                      label={Strings.FOUNDED}
                      editable={false}
                      errorMessage={''}
                      value={founded}
                      window={window}
                    />

                    {type == Strings.RECRUITER && (
                      <View style={{ marginBottom: 30 }}>
                        <Text style={style.aboutTx}>
                          {Strings.ABOUT_COMPANY}
                        </Text>
                        <Text style={style.aboutDetailsTx}>
                          {userInfo?.userinfo?.about_company
                            ? userInfo?.userinfo?.about_company
                            : ''}
                        </Text>
                      </View>
                    )}
                  </View>
                )}
              </View>
            )}
          </ScrollView>
        </View>
        <View style={styles.subContainer}>
          <TouchableOpacity
            style={[
              styles.editWebBtn,
              isCertificateDetails
                ? {
                    backgroundColor: Colors.UFOGreen1,
                    padding: 5,
                    borderRadius: 5,
                  }
                : {},
            ]}
            onPress={() => {
              editCertificateDetails();
            }}
          >
            {type == Strings.PROFESSIONAL && (
              <>
                {!isCertificateDetails && (
                  <Image
                    resizeMode={'contain'}
                    height={'15px'}
                    width={'15px'}
                    source={webEditIcon}
                  />
                )}
                <CustomText
                  fontSize="14px"
                  marginLeft="5px"
                  style={{ ...theme.fontMedium }}
                  textColor={
                    isCertificateDetails ? Colors.UFOGreen : Colors.Blueberry
                  }
                >
                  {isCertificateDetails
                    ? Strings.APPLY_CHANGES
                    : Strings.EDIT_DETAILS}
                </CustomText>
              </>
            )}
          </TouchableOpacity>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            {isCertificateDetails ? (
              <View style={style.webContainer}>
                <UpdateCertificate
                  window={window}
                  updateCertificateImage={updateCertificateImage}
                  certificateData={certificateData}
                  updateCertificateValue={updateCertificateValue}
                  addNewCertificate={addNewCertificate}
                />
              </View>
            ) : type == Strings.PROFESSIONAL ? (
              <View style={style.webContainer}>
                <Text style={style.aboutTx}>{Strings.LICENSES}</Text>

                {/* view user certificates? */}
                <FlatList
                  style={{ marginTop: 20 }}
                  bounces={false}
                  data={userInfo?.certificate}
                  renderItem={certificateRenderItem}
                />
              </View>
            ) : (
              <View />
            )}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default MyExpereince;
