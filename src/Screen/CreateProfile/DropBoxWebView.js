import {View, Modal, TouchableOpacity} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import {client_id, client_secret, mxHeight, redirect_uri} from '../../Util';
import {WebView} from 'react-native-webview';
import {backIcon} from '../../Resources/assets';
import {BackButton} from '../Authentication/VerificationStyle';
import {getLinkdinAccessTokenService} from '../../Redux/services/profileService';

const DropBoxWebView = ({showLinkedIn, onClose, onSuccess}) => {
  const webViewRef = useRef(null);
  const [userLog, setUserLog] = useState('');
  useEffect(() => {
    if (webViewRef.current) {
      console.log('here');
      webViewRef.current.reload();
    }
  }, []);

  return (
    <Modal
      animationType={'slide'}
      transparent={false}
      visible={showLinkedIn}
      onRequestClose={() => {
        console.log('Modal has been closed.');
      }}>
      {/*All views of Modal*/}

      <View
        style={{
          height: mxHeight * 0.85,
          width: '100%',
        }}>
        <View>
          <TouchableOpacity
            onPress={() => onClose()}
            style={{height: 44, paddingHorizontal: 22, marginTop: '5%'}}>
            <BackButton resizeMode="contain" source={backIcon} />
          </TouchableOpacity>
        </View>
        <WebView
          ref={webViewRef}
          keyboardDisplayRequiresUserAction={true}
          onNavigationStateChange={navState => {
            console.log('navState???', navState);
            // if (navState && navState.url) {
            //   var url = navState.url;
            //   if (url.includes('code')) {
            //     var array = url?.split('code=');
            //     var code = array ? array[1]?.split('&state=') : [];
            //     if (code?.length > 0) {
            //       setUserLog(code[0]);
            //       onSuccess(code[0]);
            //       onClose();
            //     } else {
            //       setUserLog('');
            //     }
            //   } else {
            //     setUserLog('');
            //   }
            // } else {
            //   setUserLog('');
            // }
          }}
          source={{
            uri: 'https://www.dropbox.com/chooser?origin=https%3A%2F%2Fwww.dropbox.com&app_key=dropbox&link_type=direct&trigger=button&multiselect=false&extensions=images&folderselect=false&iframe=false&version=2',
          }}
        />
      </View>
    </Modal>
  );
};

export default DropBoxWebView;
