import Network from '../constants/Network';
import EndPoint from '../constants/EndPoint';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Strings from '../../Resources/Strings';

const createPromotionPost = params =>
    new Promise((resolve, reject) => {
        AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then(value => {
            try {
                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + value,
                    },
                };
                Network.post(`${EndPoint.create_promotion}`, params, config)
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(error => {
                        if (error?.response?.data) {
                            console.log('error?.response?.data', error?.response?.data);
                            resolve(error?.response?.data);
                        } else {
                            reject(
                                error?.response?.data ? error?.response?.data : error?.response,
                            );
                            console.log(JSON.stringify(error));
                        }
                    });
            } catch (error) {
                reject(error);
                console.log(error);
            }
        });
    });

const fetchPromotionService = () =>
    new Promise((resolve, reject) => {
        AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then((value) => {
            try {
                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + value,
                    },
                };
                Network.get(`${EndPoint.get_promotion}`, config)
                    .then((response) => {
                        resolve(response.data);
                    })
                    .catch((error) => {
                        reject(error);
                        console.log('fetchStoriesErr>>>>', error);
                    });
            } catch (error) {
                reject(error);
                console.log('fetchStoriesErr>>>>', error);

            }
        });
    });

const deletePromotionById = params =>
    new Promise((resolve, reject) => {
        AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then(value => {
            try {
                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + value,
                    },
                };
                Network.delete(`${EndPoint.delete_promotion}?id=${params.id}`, config)
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(error => {
                        if (error?.response?.data) {
                            console.log('error?.response?.data', error?.response?.data);
                            resolve(error?.response?.data);
                        } else {
                            reject(
                                error?.response?.data ? error?.response?.data : error?.response,
                            );
                            console.log(JSON.stringify(error));
                        }
                    });
            } catch (error) {
                reject(error);
                console.log(error);
            }
        });
    });

const updatePromotionPost = params =>
    new Promise((resolve, reject) => {
        AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY).then(value => {
            try {
                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + value,
                    },
                };
                Network.post(`${EndPoint.edit_promotion}`, params.data, config)
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(error => {
                        if (error?.response?.data) {
                            console.log('error?.response?.data', error?.response?.data);
                            resolve(error?.response?.data);
                        } else {
                            reject(
                                error?.response?.data ? error?.response?.data : error?.response,
                            );
                            console.log('error?.response?.data', error?.response?.data);
                            console.log(JSON.stringify(error));
                        }
                    });
            } catch (error) {
                reject(error);
                console.log(error);
            }
        });
    });

export { createPromotionPost, fetchPromotionService, deletePromotionById, updatePromotionPost };
