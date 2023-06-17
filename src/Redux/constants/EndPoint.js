import Config from 'react-native-config';

const EndPoint = {
  baseURL: 'https://api.axesseq.com/api/',
  baseAssestURL: Config.IMAGE_URL,
  imageBaseURL: 'https://api.axesseq.com',
  localURL: 'https://api.axesseq.com/api/',
  googleDriveDocument: 'https://drive.google.com/file/d/',
  googleDriveImage: 'https://drive.google.com/thumbnail?id=',
  developmentBaseUrl: 'http://35.73.254.164/api/',

  roles: 'roles',
  login: 'login',
  socialLogin: 'social-login',
  signUp: 'register',
  verifyOtp: 'verifyotp',
  sendOtp: 'sendOTP',
  resetPassword: 'resetpassword',
  changePassword: 'changepassword',
  auth: 'auth/',
  categories: 'categories/',
  customer: 'customer/',
  butcher: 'butcher/',
  butchers: 'butchers/',
  users: 'users',
  uploadImage: 'uploadImage', //
  profile: 'account/profile',
  forgotPassword: 'resetpassword',
  changepassword: 'changepassword',
  updateProfile: 'account/updateProfile',
  logout: 'account/logout',
  list: 'list',
  nearBy: 'nearBy',
  orders: 'orders',
  checkEmail: 'check_email_exist',
  linkedinAuth: 'linkedinauth',

  addProduct: 'addProduct',
  products: 'products',
  productById: 'product',
  store: 'store',

  create_job: 'create-job',
  create_event: 'create-event',

  pro_profile: 'profile',
  rec_profile: 'Recruiterprofile',
  org_profile: 'Organizationprofile',
  edit_profile: 'edit/',
  get_other_user: 'get_user_data',

  // Promotion
  create_promotion: 'create-promotion',
  get_promotion: 'get-promotions',
  delete_promotion: 'delete-promotion',
  edit_promotion: 'edit-promotion',

  // Professional
  get_stories_professional: 'professional/story/list',
  create_story_professional: 'professional/story/store',
  upload_image: 'professional/story/image-upload',
  get_story_by_id: 'professional/story/info/',
  edit_professional: 'edit/',
  edit_recruiter: 'Recruiteredit/',
  edit_organization: 'Organizationedit/',

  // post
  create_post: 'create-post',
  get_posts: 'get-posts',
  like_post: 'like_post',
  add_comment: 'add-comment',
  hide_post: 'hide_post',
  block_user: 'block-user',
  imageUpload: 'professional/story/image-upload',
  interested_story: 'professional/story/interestedStory',
  share: 'share',
  getpostbyid: 'getpostbyid/',
  POST: 'post/',

  // Job and Event
  get_all_jobs: 'get_all_jobs',
  get_all_events: 'get_all_events',
  get_job_by_id: 'job/',
  get_event_by_id: 'event/',
  get_my_jobs: 'get_user_jobs',
  get_my_events: 'get_user_events',
  event_calender: 'event-calender',
  delete_job_by_id: 'deleteJob',
  delete_event_by_id: 'deleteEvent',
  // Calender

  Get_Event_Calender: 'get_event_calender',
  Event_delete: 'delete/',
  apply_jobs: 'apply_jobs',
  apply_event: 'eventApply',

  //support
  get_user_support: 'get_user_support',
  get_user_support_record: 'get_user_support_record',
  send_support_message: 'send_support_message',
  createSupport: 'createSupport',

  //settings

  update_privacy_setting: 'update_privacy_setting',
  get_privacy_setting: 'get_user_pricay_data',

  //subscription
  getsubscription: 'getsubscription',
  create_subscription: 'userCreateSubscription',
  cancel_subscription: 'userCancelSubscription',
  ios_create_subscription: 'userCreateSubscriptionios',

  //Payment
  get_cards: 'getalllist',
  create_new_card: 'createcustomer',
  delete_card: 'deleteCardDetail',
  update_card: 'updateCardDetail',
  set_card_default: 'cardSetDefault',
  get_card: 'getSingleCardDetail',

  // follow
  follow_user: 'follower',
  unfollow_user: 'unfollow',
  all_connections: 'follows-followers',

  //search
  search_users: 'searchUserData',
  get_notification: 'get_notification',
  profile_view_notifications: 'profile_view_notifications',

  // interview
  scheduleInterview: 'scheduleInterview',
  getScheduledInterviews: 'getScheduledInterviews',
  deleteInterview: 'deleteInterview',

  // delete user account
  deleteAccount: 'deleteAccount',
  deleteEducation: 'delete-education',
  deleteWorkInfo: 'remove_work_info',
  SIGN_OUT: 'sign-out',

  // Report Api
  GET_BLOCK: 'block_users',

  // Suggestion user api
  GET_SUGGESTION: 'suggestions',
  CANCEL_SUGGESTION: 'remove-suggestion',

  //follow list
  FOLLOW_LIST: 'follower-list',

  //version
  POST_VERSION: 'version/create',
  GET_VERSION: 'version/list',
};

export default EndPoint;
