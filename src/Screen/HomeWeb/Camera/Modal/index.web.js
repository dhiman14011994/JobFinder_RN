
import React, { useState, useEffect } from 'react';
import Colors from '../../../../Resources/Colors';
import Webcam from 'react-webcam';
import { TouchableOpacity, useWindowDimensions, View, Modal, Image } from 'react-native-web';
import { cameraIcon, crossIcon } from '../../../../Resources/assets';
import { decode as atob, encode as btoa } from 'base-64'

const CameraModal = ({
    showCameraModal,
    setCameraModal,
    setCameraData,
}) => {
    const { width, height } = useWindowDimensions();
    const webcamRef = React.useRef(null);

    const getFileFromBase64 = (string64, fileName) => {
        const imageContent = atob(string64);
        const buffer = new ArrayBuffer(string64.length);
        const view = new Uint8Array(buffer);

        for (let n = 0; n < imageContent.length; n++) {
            view[n] = imageContent.charCodeAt(n);
        }
        const type = 'image/jpeg';
        const blob = new Blob([buffer], { type });
        return new File([blob], fileName, { lastModified: new Date().getTime(), type });
    }

    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            var data = "data:image/jpeg;base64,";
            var removeData = imageSrc.replace(data, "");
            const fileName = "post_" + new Date().getTime() + ".png"
            const dataFile = getFileFromBase64(removeData, fileName)
            setCameraData(dataFile)
            setCameraModal(!showCameraModal);
        },
        [webcamRef]
    );

    return (
        <Modal
            animationType="transparent"
            transparent={true}
            visible={showCameraModal}
            onRequestClose={() => {
                setCameraModal(!showCameraModal);
            }}
        >
            <View
                style={{
                    width: width,
                    height: height,
                    backgroundColor: Colors.Black,
                }}
            >
                <View style={{
                    width: width, justifyContent: 'flex-end', flexDirection: "row", position: 'absolute', left: 0,
                    top: 0, bottom: 0
                }}>
                    <TouchableOpacity
                        onPress={() => { setCameraModal(!showCameraModal) }}
                        style={{
                            padding: 10
                        }}>
                        <Image
                            resizeMode="contain"
                            style={{ height: height * 0.03, width: width * 0.03, tintColor: Colors.Red }}
                            source={crossIcon}
                        />
                    </TouchableOpacity>
                </View>
                <Webcam
                    resizeMode={"cover"}
                    audio={false}
                    width={width}
                    height={height}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{
                        width: width,
                        height: height,
                        facingMode: "user",
                        position: 'absolute'
                    }}
                />

                <View style={{
                    width: width, justifyContent: 'center', flexDirection: "row", position: 'absolute', bottom: 10,
                }}>
                    <TouchableOpacity
                        onPress={capture}
                        style={{
                            padding: 6,
                            backgroundColor: Colors.Blueberry,
                            shadowRadius: 20,
                            shadowOpacity: 1,
                            shadowColor: Colors.gray2,
                            borderRadius: 10,
                            padding: 10
                        }}>
                        <Image
                            resizeMode="contain"
                            style={{
                                height: height * 0.05, width: width * 0.05, tintColor: Colors.White,
                            }}
                            source={cameraIcon}
                        />
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
};

export default CameraModal;
